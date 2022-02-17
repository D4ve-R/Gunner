import React, { useEffect, useRef } from 'react';
import { useGun } from '../../../hooks/useGun';

function bStringToBuffer(bytes){
    const len = bytes.length;
    const buffer = new ArrayBuffer(len);
    let bufferView = new Uint8Array(buffer);
    for(let i = 0; i < len; i++){
        bufferView[i] = bytes.charCodeAt(i);
    }
    return buffer;
}

const node = 'streaming';

const GunVideo = () => {
    const gun = useGun();
    const viewRef = useRef(null);
    const media = new MediaSource();

    function bufferListener(ev){
        addBuffer(ev.target, viewRef.current);
        ev.target.removeEventListener('sourceopen', bufferListener);
    } 

    function addBuffer(source, videoRef){
        URL.revokeObjectURL(videoRef.src)
        source.duration = +Infinity;
        source.sourceBuffer = source.addSourceBuffer('video/webm; codecs="vp8"');
        source.sourceBuffer.mode = 'sequence';
    }

    function onData(base64){
        let bytes = null //data.split(',')[1];
        try{
            bytes = window.atob(base64);
            if(media.sourceBuffer && !media.sourceBuffer.updating){
                new Blob([bytes], {type: 'text/plain'}).arrayBuffer()
                .then(buffer =>{
                    media.sourceBuffer.appendBuffer(buffer)
                    console.log(new Uint8Array(buffer));
                });
                //media.sourceBuffer.appendBuffer(bStringToBuffer(bytes));
            }
        }catch(e){console.log(e)}
    }

    useEffect(() =>{
        gun.get('test').get(node).on(data => {
            //console.log(data);
            onData(data);
        }, true);

        const vid = viewRef.current;
        vid.preload= 'auto';
        vid.load();
        vid.src = URL.createObjectURL(media);
        if(media.readyState === 'open') addBuffer(media, vid);
        else media.addEventListener('sourceopen', bufferListener, {once: true});

        vid.addEventListener('canplay', vid.play())
    // eslint-disable-next-line
    },[]);

    return (
        <React.Fragment>
            <video ref={viewRef} id="view" muted>
                GunVideo
            </video>
        </React.Fragment>
    );
}

export default GunVideo;