import React, { useEffect, useRef } from 'react';
import { useGun } from '../../../hooks/useGun';

const GunPlayer = ({width}) => {
    const gun = useGun();
    const viewRef = useRef(null);

    useEffect(() =>{
        gun.get('test').get('recordings').on(data => {
            //console.log(data);
            viewRef.current.load();
            viewRef.current.src = data;
        }, true);

        viewRef.current.addEventListener('canplay', () => viewRef.current.play());
    // eslint-disable-next-line
    },[]);

    return (
        <React.Fragment>
            <video ref={viewRef} id="view" muted>
                GunPlayer
            </video>
        </React.Fragment>
    );
}

export default GunPlayer;