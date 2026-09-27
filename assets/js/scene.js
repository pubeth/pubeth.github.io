(function () {
  const root = document.getElementById("scene-root");
  if (!root || typeof THREE === "undefined") return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarseMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isCoarseMobile && reducedMotion) {
    return;
  }

  const scene = new THREE.Scene();

  const light = new THREE.SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarseMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enabled = false;

  const cubemapUrls = [
    "model/px.png",
    "model/nx.png",
    "model/py.png",
    "model/ny.png",
    "model/pz.png",
    "model/nz.png",
  ];

  const envTexture = new THREE.CubeTextureLoader().load(cubemapUrls);
  envTexture.mapping = THREE.CubeReflectionMapping;
  scene.background = envTexture;

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    envMap: envTexture,
    metalness: 0.25,
    roughness: 0.4,
    opacity: 1.0,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
  });

  const loader = new THREE.STLLoader();
  loader.load(
    "model/guitar.stl",
    function (geometry) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.1, 0.1, 0.1);
      scene.add(mesh);
      const fallback = document.getElementById("scene-fallback");
      if (fallback) fallback.classList.add("is-hidden");
    },
    undefined,
    function (error) {
      console.warn("STL load failed:", error);
    }
  );

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onWindowResize, false);

  function render() {
    if (!reducedMotion) {
      const timer = Date.now() * 0.0005;
      camera.position.x = Math.cos(timer) * 4;
      camera.position.z = Math.sin(timer) * 4;
      camera.lookAt(0, 0, 0);
    }
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }

  function start() {
    animate();
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(start, { timeout: 800 });
  } else {
    setTimeout(start, 200);
  }
})();
