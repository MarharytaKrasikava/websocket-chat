import React from 'react';
import { connect } from 'react-redux';
import selectMessages from '../../store/selectors/messages';
import { makeStyles } from '@material-ui/core/styles';
/* import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'; */
import Message from '../Message/Message';

const useStyles = makeStyles(theme => ({
  container: {
    height: '90vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '0 auto',
    overflowWrap: 'break-word',
    backgroundColor: 'white',
  },
  root: {
    width: '60%',
    padding: theme.spacing(3, 2),
    margin:  theme.spacing(3, 2),
    color: 'white',
    textAlign: 'right',
  },
}));

function MessageList(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.messages.map((message) => {
        return (
        <Message
          message={message.message}
          id={message.id}
          from={message.from}
          time={message.time}
        />
        )})}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: selectMessages(state.messages, state.filters),
  }
};

export default connect(mapStateToProps)(MessageList);
