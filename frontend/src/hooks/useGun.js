import React from 'react';
import Gun from 'gun';
import 'gun/sea';

const gun = Gun({
	peers: ['http://james:8765/gun']
});

const GunContext = React.createContext(gun);

const useGun = () => {
    return React.useContext(GunContext);
}

export {useGun, GunContext, gun};