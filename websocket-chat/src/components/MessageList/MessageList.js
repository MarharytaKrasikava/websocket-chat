import React from 'react';
import { connect } from 'react-redux';
import selectMessages from '../../store/selectors/messages';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import './MessageList.css';

const useStyles = makeStyles(theme => ({
  container: {
    width: '70vw',
    height: '90vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '0 auto',
    overflowWrap: 'break-word',
  },
  root: {
    padding: theme.spacing(3, 2),
    margin:  theme.spacing(3, 2),
    color: 'white',
    background: 'linear-gradient(145deg, #80deea 10%, #00bcd4 40%)',
  },
}));

function MessageList(props) {
  const classes = useStyles();
  function getDate(ms) {
    const time = new Date(ms);
    return `Date: ${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}, Time: ${time.getHours()}:${time.getMinutes()}`
  }

  return (
    <div className={classes.container}>
      {props.messages.map((message) => (
        <Paper key={message.id} className={classes.root} elevation={5}>
          <Typography variant="h6" component="p">
            {message.message}
          </Typography>
          <Typography variant="subtitle2" component="p">
            FROM: {message.from}, {getDate(message.time)}
          </Typography>
        </Paper>
        ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: selectMessages(state.messages, state.filters),
  }
};

export default connect(mapStateToProps)(MessageList);
