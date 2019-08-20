import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import selectMessages from '../../store/selectors/messages';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../Message/Message';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
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
          id={message.id ? message.id : message.id+message.time}
          from={message.from}
          time={message.time}
          key={message.id ? message.id : message.id+message.time}
        />
        )})}
        {props.offline.map((message, index) => {
        return (
        <Message
          message={message.message}
          from={message.from}
          time={Date.now()}
          key={index}
          offline="OFFLINE!!!"
        />
        )})}
      <div style={{ float:"left", clear: "both" }} ref={(el) => (bottom = el)}></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: selectMessages(state.messages, state.filters),
    offline: state.offline,
  }
};

export default connect(mapStateToProps)(MessageList);
