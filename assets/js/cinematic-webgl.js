/**
 * ORBIT — 3D KINETIC WEBGL & ORBITAL ENGINE
 * Procedural orbital curves, instanced particle lattice, velocity streaks,
 * dynamic scroll-driven camera trajectories, and luminous focal nodes.
 */

class OrbitKineticEngine {
  constructor() {
    this.container = document.getElementById('orbital-webgl-canvas');
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.orbitGroup = null;
    this.streakGroup = null;
    this.particles = null;
    this.ribbonLines = [];
    this.focalNodes = [];
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    this.speedMultiplier = 1.0;
    this.time = 0;

    this.isMobile = window.innerWidth < 768;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      this.initCanvasFallback();
      return;
    }

    try {
      this.initThree();
      this.createOrbitalRibbons();
      this.createParticleLattice();
      this.createVelocityStreaks();
      this.bindEvents();
      this.animate();
    } catch (e) {
      console.warn('Three.js initialization notice, falling back to 2D canvas', e);
      this.initCanvasFallback();
    }
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020203, 0.012);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 45);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.orbitGroup = new THREE.Group();
    this.scene.add(this.orbitGroup);

    // Subtle lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6EA8FF, 2.5, 60);
    pointLight.position.set(0, 0, 10);
    this.scene.add(pointLight);
  }

  createOrbitalRibbons() {
    // Generate 4 dynamic elliptical 3D spline ribbons
    const ribbonConfigs = [
      { rx: 18, ry: 9, rz: 14, tiltX: 0.35, tiltZ: -0.4, color: 0x6EA8FF, opacity: 0.75, width: 1.5 },
      { rx: 24, ry: 13, rz: 18, tiltX: -0.5, tiltZ: 0.3, color: 0xA5C9FF, opacity: 0.45, width: 1.0 },
      { rx: 12, ry: 6, rz: 10, tiltX: 0.8, tiltZ: 0.1, color: 0xF5F7FA, opacity: 0.85, width: 2.0 },
      { rx: 30, ry: 16, rz: 22, tiltX: -0.2, tiltZ: -0.6, color: 0x6EA8FF, opacity: 0.25, width: 1.0 }
    ];

    ribbonConfigs.forEach((cfg, idx) => {
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * cfg.rx;
        const y = Math.sin(theta) * cfg.ry;
        const z = Math.sin(theta * 2) * (cfg.rz * 0.35);
        
        // Apply rotation
        const rotatedX = x * Math.cos(cfg.tiltZ) - y * Math.sin(cfg.tiltZ);
        const rotatedY = (x * Math.sin(cfg.tiltZ) + y * Math.cos(cfg.tiltZ)) * Math.cos(cfg.tiltX) - z * Math.sin(cfg.tiltX);
        const rotatedZ = (x * Math.sin(cfg.tiltZ) + y * Math.cos(cfg.tiltZ)) * Math.sin(cfg.tiltX) + z * Math.cos(cfg.tiltX);
        
        points.push(new THREE.Vector3(rotatedX, rotatedY, rotatedZ));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(geometry, material);
      line.userData = { config: cfg, speed: 0.002 * (idx % 2 === 0 ? 1 : -1) };
      this.orbitGroup.add(line);
      this.ribbonLines.push(line);

      // Add a luminous focal point travelling along this trajectory
      const nodeGeo = new THREE.SphereGeometry(idx === 2 ? 0.38 : 0.24, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: idx === 2 ? 0xF5F7FA : 0x6EA8FF,
        transparent: true,
        opacity: 0.95
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { points, offset: idx * 0.25, speed: 0.004 + idx * 0.002 };
      this.orbitGroup.add(nodeMesh);
      this.focalNodes.push(nodeMesh);
    });
  }

  createParticleLattice() {
    const particleCount = this.isMobile ? 120 : 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      opacities[i] = 0.2 + Math.random() * 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x6EA8FF,
      size: this.isMobile ? 0.6 : 0.85,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createVelocityStreaks() {
    this.streakGroup = new THREE.Group();
    const streakCount = 20;
    
    for (let i = 0; i < streakCount; i++) {
      const points = [
        new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20),
        new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20)
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0x6EA8FF,
        transparent: true,
        opacity: 0
      });
      const streak = new THREE.Line(geo, mat);
      this.streakGroup.add(streak);
    }
    
    this.scene.add(this.streakGroup);
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / this.width - 0.5) * 2;
      this.targetMouseY = (e.clientY / this.height - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;

    if (this.camera && this.renderer) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }
  }

  setSpeedBoost(boost) {
    this.speedMultiplier = boost ? 4.5 : 1.0;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.time += 0.01 * this.speedMultiplier;

    // Smooth lerps
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;

    if (this.orbitGroup) {
      // Rotation influenced by mouse and scroll
      this.orbitGroup.rotation.y = this.time * 0.15 + this.mouseX * 0.35 + this.scrollProgress * Math.PI;
      this.orbitGroup.rotation.x = this.time * 0.08 - this.mouseY * 0.25 + Math.sin(this.scrollProgress * Math.PI) * 0.4;
      this.orbitGroup.rotation.z = this.scrollProgress * 0.5;

      // Update focal nodes along splines
      this.focalNodes.forEach(node => {
        const data = node.userData;
        const totalPoints = data.points.length;
        const progress = ((this.time * data.speed + data.offset) % 1 + 1) % 1;
        const index = Math.floor(progress * (totalPoints - 1));
        const nextIndex = (index + 1) % totalPoints;
        const alpha = (progress * (totalPoints - 1)) - index;

        const currentPos = data.points[index];
        const nextPos = data.points[nextIndex];
        if (currentPos && nextPos) {
          node.position.lerpVectors(currentPos, nextPos, alpha);
        }
      });
    }

    if (this.particles) {
      this.particles.rotation.y = -this.time * 0.05;
      this.particles.rotation.x = this.mouseY * 0.1;
    }

    // Camera trajectory response to scroll
    if (this.camera) {
      const zPos = 45 - Math.sin(this.scrollProgress * Math.PI) * 15;
      this.camera.position.z += (zPos - this.camera.position.z) * 0.05;
      this.camera.position.x += (this.mouseX * 4 - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY * 3 - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initCanvasFallback() {
    const canvas = this.container;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const render = () => {
      requestAnimationFrame(render);
      time += 0.015;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Trajectory 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35 + Math.sin(time * 0.2) * 0.05);

      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.38, h * 0.16, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(110, 168, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Node
      const angle = time * 0.8;
      const nx = Math.cos(angle) * (w * 0.38);
      const ny = Math.sin(angle) * (h * 0.16);

      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#6EA8FF';
      ctx.shadowColor = '#6EA8FF';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Trajectory 2
      ctx.rotate(0.7);
      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.28, h * 0.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 247, 250, 0.2)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.restore();
    };
    render();
  }
}

window.OrbitKineticEngine = OrbitKineticEngine;
