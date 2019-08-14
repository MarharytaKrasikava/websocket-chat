import React from 'react';
import { connect } from 'react-redux';
import selectMessages from '../../store/selectors/messages';

function MessageList(props) {
  return (
    <div>
      {props.messages.map((message, index) => (
        <div key={index} className="messages">{message.message}</div>
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