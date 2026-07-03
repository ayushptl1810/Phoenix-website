import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { getCategoryForPartName } from "./Drone3DModal";

// Helper to resolve the active component container group (unwrapping top-level CAD assembly containers if needed)
const getDroneRootGroup = (scene) => {
  if (!scene || !scene.children || scene.children.length === 0) return null;
  let root = scene.children[0];
  if (root && root.children && root.children.length < 5) {
    // If a child is an assembly container holding the actual component parts (count > 3), use it
    const wrapper = root.children.find((c) => c.children && c.children.length > 3);
    if (wrapper) return wrapper;
  }
  return root;
};

// Helper to recursively find a category mapping for a mesh by traversing up its parent chain until the drone root is reached
const getCategoryForMesh = (mesh, droneRoot, drone) => {
  let current = mesh;
  while (current && current !== droneRoot) {
    if (current.name) {
      const cat = getCategoryForPartName(current.name, drone);
      if (cat) return cat;
    }
    current = current.parent;
  }
  return null;
};

// Drone Model component that parses GLTF, centers it, and animates the exploded view
const DroneModel = ({
  drone,
  modelUrl,
  explosionFactor,
  hoveredPart,
  setHoveredPart,
  cameraPreset,
  setCameraPreset,
}) => {
  const { scene } = useGLTF(modelUrl);
  const { camera } = useThree();
  const controlsRef = useRef();
  const currentExplosion = useRef(0);
  
  const [setupDone, setSetupDone] = useState(false);
  const originalPositions = useRef(new Map());
  const upVector = useRef(new THREE.Vector3(0, 1, 0)); // Default to Y-up vertical axis
  const center = useRef(new THREE.Vector3(0, 0, 0));

  // Default camera preset offsets if not specified in metadata JSON
  const presets = drone.cameraPresets || {
    top: [0, 1.8, 0.01],
    front: [0, 0, 1.8],
    side: [1.8, 0, 0],
    iso: [1.2, 1.2, 1.2],
  };

  // Setup geometry, center it, clone materials, and precompute vertical vector
  useEffect(() => {
    let droneRoot = null;
    if (scene) {
      // 1. Clone materials to ensure independent highlighting
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
        }
      });

      // 2. Calculate bounding box and center of the entire scene in world space
      const box = new THREE.Box3().setFromObject(scene);
      box.getCenter(center.current);

      // Find the active drone component root group
      droneRoot = getDroneRootGroup(scene);
      if (droneRoot && droneRoot.children) {
        // 3. Set explosion axis vector (default to Y-up)
        const explodeAxis = drone.explodeAxis || [0, 1, 0];
        upVector.current.set(explodeAxis[0], explodeAxis[1], explodeAxis[2]);

        // 4. Store original unshifted positions of children of droneRoot
        droneRoot.children.forEach((child) => {
          originalPositions.current.set(child.uuid, child.position.clone());
        });
      }

      setSetupDone(true);
    }

    return () => {
      if (droneRoot && droneRoot.children) {
        droneRoot.children.forEach((child) => {
          const orig = originalPositions.current.get(child.uuid);
          if (orig) {
            child.position.copy(orig);
          }
        });
      }
    };
  }, [scene]);

  // Set initial camera position (Isometric view) and orbit target on load
  useEffect(() => {
    if (setupDone) {
      const c = center.current;
      const isoOffset = presets.iso || [1.2, 1.2, 1.2];
      const camUp = drone.cameraUp || [0, 1, 0];
      
      camera.up.set(camUp[0], camUp[1], camUp[2]);
      camera.position.set(c.x + isoOffset[0], c.y + isoOffset[1], c.z + isoOffset[2]);
      camera.lookAt(c);
      
      if (controlsRef.current) {
        controlsRef.current.target.copy(c);
        controlsRef.current.update();
      }
    }
  }, [setupDone, camera, drone]);

  // Hover highlighting effect
  useEffect(() => {
    if (!setupDone) return;
    const droneRoot = getDroneRootGroup(scene);
    if (!droneRoot) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const partCategory = getCategoryForMesh(child, droneRoot, drone);
        let isHovered = false;
        if (hoveredPart) {
          const hoveredLower = hoveredPart.toLowerCase();
          if (partCategory && partCategory.toLowerCase() === hoveredLower) {
            isHovered = true;
          } else {
            // Check if any ancestor node name matches hoveredPart directly
            let temp = child;
            while (temp && temp !== droneRoot) {
              if (temp.name && temp.name.toLowerCase() === hoveredLower) {
                isHovered = true;
                break;
              }
              temp = temp.parent;
            }
          }
        }

        if (!child.userData.originalEmissive) {
          child.userData.originalEmissive = child.material.emissive
            ? child.material.emissive.clone()
            : new THREE.Color(0, 0, 0);
          child.userData.originalEmissiveIntensity =
            child.material.emissiveIntensity !== undefined
              ? child.material.emissiveIntensity
              : 1;
        }

        if (isHovered) {
          child.material.emissive.set("#f97316"); // Glowing orange highlight
          child.material.emissiveIntensity = 0.8;
        } else {
          child.material.emissive.copy(child.userData.originalEmissive);
          child.material.emissiveIntensity = child.userData.originalEmissiveIntensity;
        }
      }
    });
  }, [hoveredPart, scene, setupDone, drone]);

  // Camera Presets relative to root center aligned with drone dynamic axis metadata
  useEffect(() => {
    if (!cameraPreset) return;

    const c = center.current;
    const offset = presets[cameraPreset];
    const camUp = drone.cameraUp || [0, 1, 0];

    camera.up.set(camUp[0], camUp[1], camUp[2]);
    if (offset) {
      camera.position.set(c.x + offset[0], c.y + offset[1], c.z + offset[2]);
    }

    camera.lookAt(c);

    if (controlsRef.current) {
      controlsRef.current.target.copy(c);
      controlsRef.current.update();
    }

    setCameraPreset(null);
  }, [cameraPreset, camera, setCameraPreset, presets, drone]);

  // Main Render Loop
  useFrame((state, delta) => {
    if (!setupDone) return;

    // 1. Lerp explosion factor
    currentExplosion.current = THREE.MathUtils.lerp(
      currentExplosion.current,
      explosionFactor,
      0.1
    );
    const t = currentExplosion.current;

    // 2. Move parts based on names (Dynamic Vertical Explosion Layers from Drone Data)
    const droneRoot = getDroneRootGroup(scene);
    if (droneRoot && droneRoot.children) {
      droneRoot.children.forEach((child) => {
        const orig = originalPositions.current.get(child.uuid);
        if (!orig) return;

        let vOffset = 0;
        const name = child.name || "";
        const catId = getCategoryForPartName(name, drone);
        const cat = drone.partCategories?.find((c) => c.id === catId);

        if (drone.allowExplode !== false) {
          if (cat && cat.vOffset !== undefined) {
            vOffset = cat.vOffset;
          } else if (!cat) {
            // Fallback based on original y coordinate relative to center
            const isTop = orig.y > center.current.y;
            vOffset = isTop ? 0.4 : -0.4;
          }
        }

        if (cat?.spin) {
          // Spin propeller around its local Z axis
          child.rotateOnAxis(new THREE.Vector3(0, 0, 1), delta * (t * 8 + 0.5));
        }

        // Displace ONLY along the vertical axis (upVector)
        const targetPos = orig.clone().addScaledVector(upVector.current, vOffset * t);
        child.position.copy(targetPos);
      });
    }
  });

  // Resolve hover part names
  const handlePointerOver = (e) => {
    e.stopPropagation();
    const droneRoot = getDroneRootGroup(scene);
    const category = getCategoryForMesh(e.object, droneRoot, drone);
    if (category) {
      setHoveredPart(category);
    } else {
      // Fallback: Traverse up to get the direct child node of droneRoot
      let ancestor = e.object;
      while (ancestor && ancestor.parent && ancestor.parent !== droneRoot) {
        ancestor = ancestor.parent;
      }
      if (ancestor && ancestor.parent === droneRoot) {
        setHoveredPart(ancestor.name);
      }
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredPart(null);
  };

  return (
    <>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={false}
      />
    </>
  );
};

const Drone3DCanvas = ({
  drone,
  modelUrl,
  explosionFactor,
  hoveredPart,
  setHoveredPart,
  cameraPreset,
  setCameraPreset,
}) => {
  return (
    <div className="w-full h-full relative" id="drone-3d-canvas-container">
      <Canvas
        camera={{ position: [2.5, 2.5, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#f97316" />
        
        <DroneModel
          drone={drone}
          modelUrl={modelUrl}
          explosionFactor={explosionFactor}
          hoveredPart={hoveredPart}
          setHoveredPart={setHoveredPart}
          cameraPreset={cameraPreset}
          setCameraPreset={setCameraPreset}
        />
      </Canvas>
    </div>
  );
};

export default Drone3DCanvas;
