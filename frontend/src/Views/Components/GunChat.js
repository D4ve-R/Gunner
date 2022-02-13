import { useState, useReducer } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Gun from 'gun';
import { useGun } from '../../hooks/useGun';

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

const List = ({messages}) => {
  const gun = useGun();
  const [state, dispatch] = useReducer(reducer, { messages: messages });
  gun.get(node).map().on(async (m, key)=> {
    let text = await SEA.decrypt(m.message, 'key');
    let msg = {
      name: m.name,
      message: text,
      createdAt: m.createdAt,
      key: key
    }
    if(!state.messages.find(el => (msg.key === el.key))) {
      dispatch(msg);
    }
  }, true);
  return (
    <>
    Messages:
    { state.messages.map(message => (
      <div key={message.key}>
        <h2>{message.message}</h2>
        <h3>From: {message.name}</h3>
        <p>{message.key}</p>
        <p>{formatDate(message.createdAt)}</p>
      </div>))
    }
  </>
  );
}

const Input = ({username}) => {
  const gun = useGun();
  const [text, setText] = useState('');
  async function saveMessage(e) {
    e.preventDefault();
    let msg = await SEA.encrypt(text, 'key');
    const messages = gun.get(node);
    messages.set({
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
    <Box component="form" noValidate onSubmit={saveMessage} sx={{ m: 4}}>
        <TextField
            value={text}
            name="message"
            margin="normal"	required
            fullWidth id="msg"
            label="Nachricht"
            onChange={handleChange}
			      autoFocus
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Send as {username}
        </Button>
    </Box>
  );
}

export default function GunChat({user}) {
  const gun = useGun();
  let pre = [];
  gun.get(node).map().once(async (m, key)=> {
    let text = await SEA.decrypt(m.message, 'key');
    let msg = {
      name: m.name,
      message: text,
      createdAt: m.createdAt,
      key: key
    }
    if(!pre.find(el => (msg.key === el.key))) {
      pre.push(msg);
    }
  });

  return (
    <>
      <Input username={user.is.alias}/>
      <List state={pre}/>
    </>
  );
}