import React, { useEffect, useRef } from 'react';
import { useGun } from '../../../hooks/useGun';

const GunVideo = () => {
    const gun = useGun();
    const viewRef = useRef(null);
    const sourceRef = useRef(null);

    useEffect(() =>{
        gun.get('test').get('video').on(data => {
            console.log(data);
            sourceRef.current.src = data;
            viewRef.current.load();
            viewRef.current.play();
        }, true);
    },[]);
    return (
        <React.Fragment>
            <video ref={viewRef} id="view" width={300} preload="auto">
                <source ref={sourceRef} type="video/webm"></source>
            </video>
        </React.Fragment>
    );
}

export default GunVideo;