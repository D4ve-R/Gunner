import React, {useEffect, useRef} from "react";
import { useGun } from '../../../hooks/useGun';

const pushRate = 5000; // in ms
const node = 'streaming';

const GunStream = () => {
    const gun = useGun();
    const streamRef = useRef(null);

    useEffect(() => {
        const s = streamRef.current;
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            const recorder = new MediaRecorder(stream, {mimeType: 'video/webm'}); //mimeType + codecs ?
            recorder.ondataavailable = (ev) => {
                let reader = new FileReader();
                reader.readAsDataURL(ev.data);
                reader.onloadend = () => {
                    let result = reader.result;
                    //b64 = 'data:video/webm' + result.slice(result.indexOf(';'))
                    let [codecs, b64] = result.split(',');
                    //console.log("Client using Encoding=" + codecs);
                    // push to gun, encrypt here, making func async + await SEA.encrypt
                    gun.get('test').get(node).put(b64);
                }
            }
            recorder.start(pushRate);
            s.srcObject = stream;
            s.play();
        })
        .catch(e => console.log(e));
// eslint-disable-next-line        
    },[]);

    return (
        <React.Fragment>
            <video ref={streamRef} id="stream">Streamer</video>
        </React.Fragment>
    );
}

export default GunStream;