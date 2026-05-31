import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotion } from '@/lib/gsap';
import { isTouchDevice } from '@/lib/device';

const COUNT = 1500;
const CONNECT_DIST = 120;
const REPEL_RADIUS = 150;

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || isReducedMotion() || isTouchDevice()) return;

    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
        ),
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 2,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const lineGeom = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7b2fbe,
      transparent: true,
      opacity: 0.15,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    const mouse = new THREE.Vector2(9999, 9999);
    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => {
      mouse.set(9999, 9999);
    };
    mount.addEventListener('mousemove', onMouse);
    mount.addEventListener('mouseleave', onLeave);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const pos = geometry.attributes.position.array as Float32Array;

      const mx = mouse.x * 600;
      const my = mouse.y * 400;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        pos[ix] += velocities[i].x;
        pos[ix + 1] += velocities[i].y;
        pos[ix + 2] += velocities[i].z;

        if (Math.abs(pos[ix]) > 600) velocities[i].x *= -1;
        if (Math.abs(pos[ix + 1]) > 400) velocities[i].y *= -1;
        if (Math.abs(pos[ix + 2]) > 300) velocities[i].z *= -1;

        const dx = pos[ix] - mx;
        const dy = pos[ix + 1] - my;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          pos[ix] += (dx / dist) * force * 4;
          pos[ix + 1] += (dy / dist) * force * 4;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      const linePositions: number[] = [];
      const sample = Math.min(COUNT, 400);
      const step = Math.floor(COUNT / sample);
      for (let i = 0; i < sample; i += step) {
        const ax = pos[i * 3];
        const ay = pos[i * 3 + 1];
        const az = pos[i * 3 + 2];
        for (let j = i + step; j < sample; j += step) {
          const bx = pos[j * 3];
          const by = pos[j * 3 + 1];
          const bz = pos[j * 3 + 2];
          const d = Math.hypot(ax - bx, ay - by, az - bz);
          if (d < CONNECT_DIST) {
            linePositions.push(ax, ay, az, bx, by, bz);
          }
        }
      }
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      points.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouse);
      mount.removeEventListener('mouseleave', onLeave);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  if (isReducedMotion() || isTouchDevice()) {
    return (
      <div
        ref={mountRef}
        className="absolute inset-0 bg-gradient-to-b from-purple/10 via-void to-void"
        aria-hidden
      />
    );
  }

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
