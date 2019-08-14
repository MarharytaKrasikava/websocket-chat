import React from 'react';

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="messages">{message.message}</div>
        ))}
    </div>
  )
}