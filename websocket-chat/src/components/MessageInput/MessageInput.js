import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './MessageInput.css';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1,3),
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

    function handleChange(event) {
        setMessage({value: event.target.value});
      }

    function sendMessage (event) {
        const outgoingMessage = JSON.stringify({
          from: 'HolyDaizy',
          message: message.value,
        });
        socket.send(outgoingMessage);
        setMessage({value: ''});
        event.preventDefault();
      }
    return (
      <form name="publish" onSubmit={sendMessage}>
        <TextField
          id="outlined-name"
          label="Your Message:"
          className={classes.textField}
          value={message.value}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Отправить
        </Button>
      </form>
    );
}
