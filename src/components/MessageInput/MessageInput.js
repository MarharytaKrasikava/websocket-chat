import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addOfflineMessage } from '../../store/actions/offline';
import { clearOfflineStore } from '../../store/actions/offline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './MessageInput.css';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1, 3),
    backgroundColor: 'white'
  },
  button: {
    margin: theme.spacing(1, 3),
    backgroundColor: '#c2185b'
  }
}));

function Input(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    message: '',
    nick: '',
    connect: ''
  });

  props.socket.onopen = () => {
    setState({ ...state, connect: 'online' }); // check if app is online from the start
  };

  function handleMessageChange(event) {
    setState({ ...state, message: event.target.value });
  }

  function handleNickChange(event) {
    setState({ ...state, nick: event.target.value });
    localStorage.setItem('currentNick', event.target.value);
  }

  function sendMessage(event) {
    const name = state.nick ? state.nick : localStorage.getItem('currentNick');
    if (state.connect === 'online') { // when app is connected, use send message to server
      const outgoingMessage = JSON.stringify({
        from: name,
        message: state.message
      });
      if (name) {
        props.socket.send(outgoingMessage);
      }
    } else { // otherwise, save message is the store
      props.dispatch(addOfflineMessage({ from: name, message: state.message }));
    }
    setState({ ...state, message: '' }); // clean input
    event.preventDefault();
  }

  const handleConnectionChange = event => {
    const condition = navigator.onLine ? 'online' : 'offline'; // listen online/offline status during work
    if (condition === 'online') {
      setState({ ...state, connect: event.type });
      props.offline.forEach(message => { // if online, send messages stored offline
        props.socket.send(
          JSON.stringify({
            from: message.from,
            message: message.message
          })
        );
      });
      props.dispatch(clearOfflineStore());
    } else { // else, just change state to 'offline'
      setState({ ...state, connect: event.type });
    }
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange); // imitate componentDidMount
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange); // imitate componentWillUnmount
      window.removeEventListener('offline', handleConnectionChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.offline]);

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
        style={{ width: '40vw' }}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Отправить
      </Button>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    offline: state.offline
  };
};

export default connect(mapStateToProps)(Input);
