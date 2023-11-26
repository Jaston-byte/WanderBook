import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteList } from '../../../actions/lists';

import campFire from '../../../images/campFire1.jpg';
import useStyles from './styles';

const List = ({ list, setCurrentId }) => {
    const currentUser = JSON.parse(localStorage.getItem('profile')) || { result: { name: null } };
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    

    const openList= (e) => {
        history.push(`/lists/${list._id}`);
    }
    
    const handleMenuOpen = (e) => {
        e.stopPropagation();
        setMenuAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDeleteList = (e) => {
        e.stopPropagation();
        dispatch(deleteList(list._id));
        handleMenuClose();
    };
    if (!isCurrentUserList) {
        // Don't render the list if it's not created by the current user
        
        console.log("isCurrentUserList is Null");
        return null;
    } else {
        
        console.log("currentUser.result.name is not Null");
    }
    console.log('returning card');
    return (
        <Card className={classes.card}>
            <ButtonBase 
            component="span" 
            name="test" 
            className={ classes.cardAction } 
            onClick={ openList }
            >
                <CardMedia className={classes.media} image={campFire} alt={list.title} title={list.title} />
                    <div className={classes.overlay}>
                        <Typography variant="h6">{list.creator}</Typography>
                    </div>
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(list._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                    <CardContent>
                        <Typography className={classes.title} variant="h5" gutterBottom>{list.title}</Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => dispatch(deleteList(list._id))}>
                        <DeleteIcon fontSize="small" />
                            Delete List
                    </Button>
                </CardActions>
        </Card>
    );
};

export default List;