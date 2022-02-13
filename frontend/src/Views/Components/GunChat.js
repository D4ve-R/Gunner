import { useState, useReducer, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Gun from 'gun';
import { useGun } from '../../hooks/useGun';
import {MessageRight, MessageLeft} from './Blob';

const SEA = Gun.SEA;
const node = 'msg3';

function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

function formatDate(date){
    let d = new Date(date)
    return (
      d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+" "
      +((d.getHours() < 10) ? '0'+d.getHours() : d.getHours())
      +":"+((d.getMinutes() < 10) ? '0'+d.getMinutes() : d.getMinutes())
      +":"+((d.getSeconds() < 10) ? '0'+d.getSeconds() : d.getSeconds()));
}

/*
      <div key={message.key}>
        <h2>{message.message}</h2>
        <h3>From: {message.name}</h3>
        <p>{formatDate(message.createdAt)}</p>
      </div>
      */

const List = ({username}) => {
  const gun = useGun();
  const [state, dispatch] = useReducer(reducer, { messages: [] });
  useEffect(() => {
    gun.get(node).map().once(async (m, key)=> {
      let text = await SEA.decrypt(m.message, 'key');
      let msg = {
        name: m.name,
        message: text,
        createdAt: m.createdAt,
        key: key
      }
      //if(!state.messages.find(el => (msg.key === el.key))) {
          dispatch(msg);
          console.log(msg);
        //}
    });
  },[]);

  const list = state.messages.map((message) => 
    ((message.name !== username) ? 
      ( <MessageLeft id={message.key} message={message.message} timestamp={formatDate(message.createdAt)} displayName={username}/>)
      :(<MessageRight id={message.key} message={message.message} timestamp={formatDate(message.createdAt)}/>))
  );

  return (
    <Paper sx={{maxHeight: 300, overflow: 'auto', bgcolor: '#7d6d6b'}}>
      {list}
    </Paper>
  );
}

const Input = ({username}) => {
  const gun = useGun();
  const [text, setText] = useState('');
  async function saveMessage(e) {
    e.preventDefault();
    let msg = await SEA.encrypt(text, 'key');
    gun.get(node).set({
      name: username,
      message: msg,
      createdAt: Date.now()
    });
    setText('');
  }

  function handleChange(e){
    setText(e.target.value)
  }

  return (
    <Box component="form" noValidate onSubmit={saveMessage} sx={{ m: 1, flex: 1}}>
        <TextField
            value={text}
            name="message"
            margin="normal"	required
            fullWidth id="msg"
            label="Nachricht"
            onChange={handleChange}
			      autoFocus
        />
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
          Send as {username}
        </Button>
    </Box>
  );
}

export default function GunChat({user}) {

  return (
    <>
      <List/>
      <Input username={user.is.alias}/>
    </>
  );
}