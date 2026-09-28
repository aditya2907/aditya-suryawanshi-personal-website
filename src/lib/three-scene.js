import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Self-contained geometry and studio lighting: no remote assets or per-frame React state.
export function createSculpture(host, initiallyEnabled) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.65;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 7.9);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.03);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const assembly = new THREE.Group();
  scene.add(assembly);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xcbd0c3, metalness: 1, roughness: 0.19,
    clearcoat: 1, clearcoatRoughness: 0.2, envMapIntensity: 1.4,
  });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.06, 0.34, 200, 32, 2, 3), material);
  knot.rotation.set(0.5, -0.35, -0.4);
  assembly.add(knot);
  const orbit = new THREE.Group();
  orbit.rotation.set(1.1, 0.45, 0.25);
  orbit.add(new THREE.Mesh(
    new THREE.TorusGeometry(2.02, 0.006, 6, 150),
    new THREE.MeshBasicMaterial({ color: 0xa9c370, transparent: true, opacity: 0.45 }),
  ));
  const satellite = new THREE.Mesh(
    new THREE.SphereGeometry(0.095, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xc9f36b, emissive: 0x83b432, emissiveIntensity: 0.7, metalness: 0.5, roughness: 0.25 }),
  );
  satellite.position.x = 2.02;
  orbit.add(satellite);
  assembly.add(orbit);
  const secondRing = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.003, 6, 150), new THREE.MeshBasicMaterial({ color: 0x9bada4, transparent: true, opacity: 0.25 }));
  secondRing.rotation.set(0.4, -0.7, 0.35);
  assembly.add(secondRing);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const limeLight = new THREE.PointLight(0xc9f36b, 14);
  limeLight.position.set(2, -1, 3);
  scene.add(limeLight);
  const topLight = new THREE.DirectionalLight(0xffffff, 3);
  topLight.position.set(-3, 4, 2);
  scene.add(topLight);
  let enabled = initiallyEnabled;
  let inView = true;
  let disposed = false;
  let lastFrame = 0;
  let time = 0;
  const pointer = { x: 0, y: 0 };
  function render() { renderer.render(scene, camera); }
  function animate(timestamp) {
    if (timestamp - lastFrame < 1000 / 30) return;
    const delta = Math.min((timestamp - lastFrame) / 1000, 0.05);
    lastFrame = timestamp;
    time += delta;
    knot.rotation.y += delta * 0.14;
    knot.rotation.z += delta * 0.025;
    assembly.rotation.y += (pointer.x * 0.2 - assembly.rotation.y) * 0.04;
    assembly.rotation.x += (pointer.y * 0.13 - assembly.rotation.x) * 0.04;
    assembly.position.y = Math.sin(time * 0.65) * 0.06;
    satellite.position.set(Math.cos(time * 0.4) * 2.02, Math.sin(time * 0.4) * 2.02, 0);
    render();
  }
  function updateLoop() {
    if (disposed) return;
    renderer.setAnimationLoop(enabled && inView && !document.hidden ? animate : null);
    if (inView && !document.hidden) render();
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || disposed) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  }
  function move(event) {
    if (!enabled || event.pointerType !== "mouse") return;
    const rect = host.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
  }
  function leave() { pointer.x = 0; pointer.y = 0; }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateLoop(); }, { threshold: 0.05 });
  observer.observe(host);
  document.addEventListener("visibilitychange", updateLoop);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerleave", leave);
  resize();
  updateLoop();
  return {
    setEnabled(value) { enabled = value; updateLoop(); },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", updateLoop);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      scene.traverse((object) => { object.geometry?.dispose(); object.material?.dispose(); });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
