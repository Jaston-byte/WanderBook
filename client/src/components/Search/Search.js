import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Search = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);

  const [site, setSite] = useState('');
  const [state, setState] = useState('');
  const [ampsSelected, setAmpsSelected] = useState(false);
  const [waterSelected, setWaterSelected] = useState(false);
  const [petsSelected, setPetsSelected] = useState(false);
  const [sewerSelected, setSewerSelected] = useState(false);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <TextField
                name="site"
                variant="outlined"
                label="Site #"
                fullWidth
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
              <TextField
                style={{ margin: "10px 0" }}
                name="state"
                variant="outlined"
                label="State ex: KY"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ampsSelected}
                    onChange={(e) => setAmpsSelected(e.target.checked)}
                    name="ampsSelected"
                    color="primary"
                  />
                }
                label="Amps"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={waterSelected}
                    onChange={(e) => setWaterSelected(e.target.checked)}
                    name="waterSelected"
                    color="primary"
                  />
                }
                label="Water"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={petsSelected}
                    onChange={(e) => setPetsSelected(e.target.checked)}
                    name="petsSelected"
                    color="primary"
                  />
                }
                label="Pets"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sewerSelected}
                    onChange={(e) => setSewerSelected(e.target.checked)}
                    name="sewerSelected"
                    color="primary"
                  />
                }
                label="Sewer"
              />

              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Search;