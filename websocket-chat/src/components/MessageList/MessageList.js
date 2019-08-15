import React from 'react';
import { connect } from 'react-redux';
import selectMessages from '../../store/selectors/messages';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    height: '90vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '0 auto',
    overflowWrap: 'break-word',
  },
  root: {
    width: '60%',
    float: 'right',
    padding: theme.spacing(3, 2),
    margin:  theme.spacing(3, 2),
    color: 'white',
    background: 'linear-gradient(145deg, #80deea 10%, #00bcd4 40%)',
    textAlign: 'right',
  },
}));

function MessageList(props) {
  const classes = useStyles();

  function getDate(ms) {
    const time = new Date(ms);
    return `Date: ${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}, ${time.getHours()}:${time.getMinutes()}`
  }

  return (
    <div className={classes.container}>
      {props.messages.map((message) => {
        // console.log(localStorage.getItem('currentNick'), message.from)
        return (
        <Paper key={message.id} className={classes.root}
            style={localStorage.getItem('currentNick')
            && (localStorage.getItem('currentNick') === message.from) ?
            {float: 'left', background: 'linear-gradient(145deg, #f48fb1 10%, #ad1457 40%)'}
            : {float: 'right', background: 'linear-gradient(145deg, #80deea 10%, #00bcd4 40%)'}}
            elevation={5}>
          <Typography variant="h6" component="p">
            {message.message}
          </Typography>
          <Typography variant="subtitle2" component="p">
            FROM: {message.from}, {getDate(message.time)}
          </Typography>
        </Paper>
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
