import React, { useRef, useEffect } from 'react';

function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    bufView = null;
    return buf;
}

const ViewGun = ({data}) => {
    const videoRef = useRef(null);
    const media = new MediaSource();

    function appendBuffer(blob){
        let b64 = atob(blob);
        let arr = str2ab(b64);
        if(!media.sourceBuffer.appendBuffer(arr));
        b64 = arr = null;

    }

    useEffect(() => {
        const vid = videoRef.current;
        vid.preload = "auto";
        vid.load();
        vid.src = URL.createObjectURL(media);
        media.addEventListener('sourceopen', (ev) => {
            const target = ev.target;
            target.sourceBuffer = target.addSourceBuffer('video/webm; codecs="opus,vp8"');
            target.sourceBuffer.mode = 'sequence';
        });
// eslint-disable-next-line
    }, []);

    useEffect(() => {
        const vid = videoRef.current;
        appendBuffer(data);
        if(vid.readyState >= 2 && vid.paused)
            vid.play();
    }, [data]);


    return (
        <React.Fragment>
             <video ref={videoRef} width="20%" poster="https://www.srsd.net/images/video-poster.png" autoplay muted/>
        </React.Fragment>
    );
}

export default ViewGun;