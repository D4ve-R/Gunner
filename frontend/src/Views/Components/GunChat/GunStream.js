import React, {useEffect, useRef} from "react";
import { useGun } from '../../../hooks/useGun';

const width = 300;
const pushRate = 20000; // in ms

const GunStream = () => {
    const gun = useGun();
    const streamRef = useRef(null);
    const streaming = useRef(false);

    useEffect(() => {
        const s = streamRef.current;
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            const recoder = new MediaRecorder(stream, {mimeType: 'video/webm'}); //mimeType + codecs ?
            recoder.ondataavailable = (ev) => {
                // streamdata available in ev.data
                const data = ev.data;
                let reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = async() => {
                    let b64 = reader.result;
                    b64 = 'data:video/webm;base64,' + b64.split(',')[1];
                    //console.log(b64)
                    // push to gun, encrypt here, making func async + await SEA.encrypt
                    gun.get('test').get('video').put(b64);
                    //gun.get('test').get('video').once(console.log);
                }
            }
            recoder.start(pushRate);
            s.srcObject = stream;
            s.play();
            s.addEventListener('canplay', ev => {
                if(!streaming){
                    let height = s.videoHeight / (s.videoWidth/width);
                    s.setAttribute('width', width);
                    s.setAttribute('height', height);
                    streaming.current = true;
                }
            }, false);
        })
        .catch(e => console.log(e));
    },[]);

    return (
        <React.Fragment>
            <video ref={streamRef} id="stream">Streamer</video>
        </React.Fragment>
    );
}

export default GunStream;