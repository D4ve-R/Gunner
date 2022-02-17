import { useState, useReducer, useEffect, useRef, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Gun from 'gun';
import { useGun } from '../../../hooks/useGun';
import {MessageRight, MessageLeft} from './Blob';
import {NotifyContext} from '../Layout/AppLayout';

const SEA = Gun.SEA;
const node = 'msg3';

function formatDate(date){
    let d = new Date(date)
    return (
      d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+" "
      +((d.getHours() < 10) ? '0'+d.getHours() : d.getHours())
      +":"+((d.getMinutes() < 10) ? '0'+d.getMinutes() : d.getMinutes())
      +":"+((d.getSeconds() < 10) ? '0'+d.getSeconds() : d.getSeconds()));
}

const List = ({username, notify}) => {
  const gun = useGun(); 
  const scrollRef = useRef(null);
  const [state, dispatch] = useReducer((state, message) => {
    notify(prev => prev + 1);
    return {
      messages: [...state.messages, message]
    }
  }, { messages: [] });

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
        //}
    });
    //eslint-disable-next-line
  },[]);

  useEffect(()=>{
    if (scrollRef.current) {
      scrollRef.current.scroll({ behaviour: "smooth", top: scrollRef.current.scrollHeight });
    }
  },[state.messages])

  const list = state.messages.map((msg) => 
    ((msg.name !== username) ? 
      ( <MessageLeft key={msg.key} id={msg.key} message={msg.message} timestamp={formatDate(msg.createdAt)} displayName={msg.name}/>)
      :(<MessageRight key={msg.key} id={msg.key} message={msg.message} timestamp={formatDate(msg.createdAt)} displayName={msg.name}/>))
  );

  return (
    <Paper  ref={scrollRef} sx={{maxHeight: 600, overflow: 'auto', bgcolor: '#404040', pt: 6, pb: 2, px: 2}}>
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
    <Box component="form" noValidate onSubmit={saveMessage} sx={{ m: 1, display: 'flex'}}>
      
        <TextField
            value={text}
            name="message"
            margin="normal"	required
            fullWidth id="msg"
            label="Nachricht"
            onChange={handleChange}
			      autoFocus
        />
       
        <IconButton color="inherit" type="submit" sx={{borderRadius: "5px", backgroundColor: "#75bed9", height: "56px", top: "16px", ml: 1}}>
          <SendIcon />
        </IconButton>
     
    </Box>
  );
}

export default function GunChat({user}) {
  const username = user.is.alias;
  const notify = useContext(NotifyContext);
  return (
    <Paper sx={{mt: 4, mb: 4, p:2}}  onMouseEnter={e => notify.setCount(0)}>
      <List username={username} notify={notify.setCount}/>
      <Input username={username}/>
    </Paper>
  );
}