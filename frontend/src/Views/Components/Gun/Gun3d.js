import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useGraph, useFrame } from '@react-three/fiber'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box } from '@mui/material';
import {OBJLoader} from '../../../hooks/OBJLoader';

const Scene = ({url}) => {
    const meshRef = useRef();
    const obj = useLoader(OBJLoader, url);
    const {nodes, materials} = useGraph(obj);
    useFrame(({clock}) => {
        meshRef.current.rotation.y = clock.getElapsedTime() / 4;
    });
    console.log(materials);
    //return <primitive object={obj}/>
     return <mesh ref={meshRef} geometry={nodes.boat.geometry} material={materials.silver}/>
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
    <div style={{width: width, height: height}}>
      <Canvas>
          <Suspense fallback={null}>
            <Scene url={url}/>
          </Suspense>
      </Canvas>
    </div>
  )
}

export default Gun3d