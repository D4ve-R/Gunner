import { useEffect, useState, useReducer, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Gun from 'gun';
import { useGun } from '../../hooks/useGun';

const SEA = Gun.SEA;

const db = 'msg';

const initialState = {
  messages: []
}

function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

function formatDate(date){
    let d = new Date(date)
    return (d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
}

export default function GunChat({user}) {
    const gun = useGun();
    const [formState, setForm] = useState({
    name: '', message: ''
  })

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(reducer, initialState)

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    user.get('alias').once(name => setForm({...formState, name: name}));
    const messages = gun.get(db)
    messages.map().on(async (m)=> {
        let msg = (await SEA.decrypt(m.message, 'key'))+'';
      dispatch({
        name: m.name,
        message: msg,
        createdAt: m.createdAt
      })
    })
  }, [])

  // set a new message in gun, update the local state to reset the form field
  async function saveMessage(e) {
      e.preventDefault();
      let msg = await SEA.encrypt(formState.message, 'key');
      const messages = gun.get(db)
      messages.set({
        name: formState.name,
        message: msg,
        createdAt: Date.now()
      })
    setForm({
      name: '', message: ''
    })
  }

  // update the form state as the user types
  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }

  return (
    <Box component="form" noValidate onSubmit={saveMessage} sx={{ m: 4}}>
        <TextField
            name="message" value={formState.message}
            margin="normal"	required
            fullWidth id="msg"
            label="Nachricht"
			autoFocus
            onChange={onChange}
        />
        <Button type="submit" 
            variant="contained" sx={{ mt: 3, mb: 2 }}
        >
            Submit
        </Button>
      
      {
        state.messages.map(message => (
          <div key={message.createdAt}>
            <h2>{message.message}</h2>
            <h3>From: {message.name}</h3>
            <p>Date: {formatDate(message.createdAt)}</p>
          </div>
        ))
      }
    </Box>
  );
}