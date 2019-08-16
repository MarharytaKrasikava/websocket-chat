import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    color: 'white',
    textAlign: 'right',
  },
  error: {
    width: '80%',
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'red',
  }
}));

export default function Message({ message, id, from, time }) {
  const classes = useStyles();
  if (id === time) {
    return (
      <Paper key={id} className={classes.error}>
        <Typography variant="h6" component="p">
          Error!
      </Typography>
        <Typography variant="subtitle2" component="p">
          Server is closed
      </Typography>
      </Paper>
    )
  }

  return (
    <Paper key={id} className={classes.root}
      style={localStorage.getItem('currentNick')
        && (localStorage.getItem('currentNick') === from) ?
        { float: 'left', background: 'linear-gradient(145deg, #f48fb1, #ad1457)' }
        : { float: 'right', background: 'linear-gradient(145deg, #80deea, #00bcd4)' }}
      elevation={5}>
      <Typography variant="h6" component="p">
        {message}
      </Typography>
      <Typography variant="subtitle2" component="p">
        FROM: {from}, {new Date(time).toTimeString()}
      </Typography>
    </Paper>
  )
}
