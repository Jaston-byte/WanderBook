// copied from Form/styles.js
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, deepOrange } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    color: theme.palette.getContrastText(deepPurple[700]),
    backgroundColor: deepPurple[700],
  },
  buttonClear: {
      color: theme.palette.getContrastText(deepOrange[700]),
      backgroundColor: deepOrange[700],
  },
}));