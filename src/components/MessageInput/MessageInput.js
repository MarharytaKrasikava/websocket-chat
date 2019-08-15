import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './MessageInput.css';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1,3),
    backgroundColor: 'white',
  },
  button: {
    margin: theme.spacing(1,3),
    backgroundColor: '#c2185b',
  },
}));

export default function Input({ socket }) {
    const classes = useStyles();

    const [message, setMessage] = React.useState({
        value: '',
    });
    const [nick, setNick] = React.useState({
      value: '',
    });

    function handleMessageChange(event) {
        setMessage({value: event.target.value});
      }

    function handleNickChange(event) {
      setNick({value: event.target.value});
      localStorage.setItem('currentNick', event.target.value);
    }

    function sendMessage (event) {
        const name = nick.value
          ? nick.value : localStorage.getItem('currentNick');
        const outgoingMessage = JSON.stringify({
          from: name,
          message: message.value,
        });
        if (name) {
          socket.send(outgoingMessage);
        }
        setMessage({value: ''});
        event.preventDefault();
      }

    return (
      <form name="message" onSubmit={sendMessage}>
        <TextField
          id="outlined-name"
          label="Сообщение:"
          className={classes.textField}
          value={message.value}
          onChange={handleMessageChange}
          margin="normal"
          variant="outlined"
          style={{width: '40vw'}}
        />
        <TextField
          id="outlined-name"
          label="Имя:"
          className={classes.textField}
          value={nick.value}
          onChange={handleNickChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Отправить
        </Button>
      </form>
    );
}
