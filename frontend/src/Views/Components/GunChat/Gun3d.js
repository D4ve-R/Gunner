import React, {useRef, useEffect, Suspense } from 'react';
import * as three from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box } from '@mui/material';
import {OBJLoader} from '../../../hooks/OBJLoader';

function animate(obj, scene, camera, renderer){
  requestAnimationFrame(animate(obj, scene, camera, renderer));
  obj.rotation.x += 0.01;
  obj.rotation.y += 0.01;
  renderer.render(scene, camera);
}

const Scene = ({url}) => {
    const obj = useLoader(OBJLoader, url);
    return <primitive object={obj}/>
}

const Gun3d = ({url, width, height}) => {
  if(url === ''){
    return (
      <>
      <Box width={width} height={height} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ViewInArIcon fontSize="large"/>
      </Box>
      </>
    );
  }
  return (
    <div style={{maxWidth: width, maxHeight: height}}>
      <Canvas>
          <Suspense fallback={null}>
            <Scene url={url}/>
          </Suspense>
      </Canvas>
    </div>
  )
}

export default Gun3d