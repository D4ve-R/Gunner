import React from 'react';
import Container from '@mui/material/Container';

import {useGun} from '../hooks/useGun';
import Copyright from './Components/Layout/Copyright';
import GunChat from './Components/Gun/GunChat';

const Dashboard = () => {
    const gun = useGun();
    const user = gun.user();
  return (
    <>
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        {user.is ? <GunChat user={user}/> : <h2>Chat</h2>}
    </Container>
    </>
  )
}

export default Dashboard;