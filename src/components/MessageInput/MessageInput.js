import React, { useEffect } from 'react';
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

    const [state, setState] = React.useState({
        message: '',
        nick: '',
        connection: '',
    });

    function handleMessageChange(event) {
        setState({...state, message: event.target.value});
      }

    function handleNickChange(event) {
      setState({...state, nick: event.target.value});
      localStorage.setItem('currentNick', event.target.value);
    }

    function sendMessage (event) {
        const name = state.nick
          ? state.nick : localStorage.getItem('currentNick');
        const outgoingMessage = JSON.stringify({
          from: name,
          message: state.message,
        });
        if (name) {
          socket.send(outgoingMessage);
        }
        setState({...state, message: ''});
        event.preventDefault();
      }

      /* const handleConnectionChange = () => {

      }

      useEffect(() => {
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        return () => {
          window.removeEventListener('online', handleConnectionChange);
          window.removeEventListener('offline', handleConnectionChange);
        }
      }, []);  */

    return (
      <form name="message" onSubmit={sendMessage}>
        <TextField
          id="outlined-name"
          label="Сообщение:"
          className={classes.textField}
          value={state.message}
          onChange={handleMessageChange}
          margin="normal"
          variant="outlined"
          style={{width: '40vw'}}
        />
        <TextField
          id="outlined-name"
          label="Имя:"
          className={classes.textField}
          value={state.nick ? state.nick : localStorage.getItem('currentNick')}
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
