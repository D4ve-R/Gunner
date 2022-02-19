import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useGraph, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box } from '@mui/material';
import {OBJLoader} from '../../../hooks/OBJLoader';

const MeshLoader = ({obj}) => {
  return (<mesh geometry={obj.geometry} material={obj.material}>
  </mesh>);
}

const Models = ({url}) => {
    const obj = useLoader(OBJLoader, url);
    return (
      <group>{obj.children.map((mesh, idx) => <MeshLoader key={idx} obj={mesh}/>)}</group>
    );
}

const PlaceHolder = ({width, height}) => {
  return (
    <>
    <Box width={width} height={height} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#bababa',}}>
      <ViewInArIcon fontSize="large"/>
    </Box>
    </>
  );
}

const Gun3d = ({url, width, height}) => {
  if(url === ''){
    return (
      <PlaceHolder width={width} height={height}/>
    );
  }
  return (
    <Box style={{width: width, height: height, backgroundColor: 'black'}}>
      <Suspense fallback={<PlaceHolder/>}>
      <Canvas>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Stars radius={400} depth={50} faded />
        <ambientLight intensity={0.1}/>
        <spotLight position={[50, 100, 50]} />
        <spotLight position={[-50, 100, 50]} />
        <Models url={url}/>
      </Canvas>
      </Suspense>
    </Box>
  )
}

export default Gun3d