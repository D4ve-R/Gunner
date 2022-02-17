import React, {useEffect, useRef} from "react";
import { useGun } from '../../../hooks/useGun';


const GunRecorder = () => {
    const gun = useGun();
    const streamRef = useRef(null);
    const recorderRef = useRef(null);
    const buffer = useRef([]);

    useEffect(() => {
        const s = streamRef.current;
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            const recorder = new MediaRecorder(stream, {mimeType: 'video/webm'}); //mimeType + codecs ?
            recorder.ondataavailable = (ev) => { buffer.current.push(ev.data);}
            recorder.onstop = () => {
                let reader = new FileReader();
                reader.readAsDataURL(new Blob(buffer.current));
                reader.onloadend = () => {
                    let b64 = reader.result;
                    b64 = 'data:video/webm' + b64.slice(b64.indexOf(';'))

                    // push to gun, encrypt here, making func async + await SEA.encrypt
                    console.log(b64);
                    gun.get('test').get('recordings').put(b64);
                    buffer.current = [];
                }
            }
            recorderRef.current = recorder;
            s.srcObject = stream;
            s.play();
        })
        .catch(e => console.log(e));
// eslint-disable-next-line        
    },[]);

    return (
        <React.Fragment>
            <video ref={streamRef} id="stream">Streamer</video>
            <button onClick={e => {e.preventDefault(); recorderRef.current.start(5000)}}>Record</button>
            <button onClick={e => {e.preventDefault(); recorderRef.current.stop()}}>Stop</button>
        </React.Fragment>
    );
}

export default GunRecorder;