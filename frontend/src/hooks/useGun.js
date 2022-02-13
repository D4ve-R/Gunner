import React from 'react';
import Gun from 'gun';
import 'gun/sea';
//import 'gun/axe';

const gun = Gun({
	peers: ['http://james:8765/gun'],
    localStorage: false
});

const GunContext = React.createContext(gun);

const useGun = () => {
    return React.useContext(GunContext);
}

export {useGun, GunContext, gun};