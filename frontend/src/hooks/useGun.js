import React from 'react';
import Gun from 'gun';
import 'gun/sea';
import 'gun/axe';

const db = Gun({
	peers: ['http://james:8765/gun'],
    localStorage: false
});

const GunContext = React.createContext(db);

const useGun = () => {
    return React.useContext(GunContext);
}

export {useGun, GunContext, db};