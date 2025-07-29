import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Starfield = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    // Get the positions attribute
    const positions = ref.current.geometry.attributes.position.array;

    // Loop through all the stars
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += delta * 0.1; 

      // If the star is past the camera, reset its position to the back
      if (positions[i + 2] > 1.2) {
        positions[i + 2] = -1.2;
      }
    }
    
    // Mark the attribute as needing an update
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Starfield />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;