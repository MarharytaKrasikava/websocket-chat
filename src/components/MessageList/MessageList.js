import React, { useEffect } from 'react';
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
}));

function MessageList(props) {
  const classes = useStyles();
  let bottom;

  useEffect(() => {
    bottom.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className={classes.container}>
      {props.messages.map((message) => {
        return (
        <Message
          message={message.message}
          id={message.id}
          from={message.from}
          time={message.time}
          key={message.id}
        />
        )})}
      <div style={{ float:"left", clear: "both" }} ref={(el) => (bottom = el)}></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: selectMessages(state.messages, state.filters),
  }
};

export default connect(mapStateToProps)(MessageList);
