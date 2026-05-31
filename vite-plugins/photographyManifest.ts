import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const PHOTO_DIR = 'public/images/photography';
const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;

function readPhotos(root: string): string[] {
  const dir = path.resolve(root, PHOTO_DIR);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f))
    .sort()
    .map((f) => `/images/photography/${f}`);
}

export function photographyManifestPlugin(): Plugin {
  let photos: string[] = [];

  return {
    name: 'photography-manifest',
    config() {
      photos = readPhotos(process.cwd());
      return {
        define: {
          __PHOTOGRAPHY_IMAGES__: JSON.stringify(photos),
        },
      };
    },
    configureServer(server) {
      const refresh = () => {
        photos = readPhotos(process.cwd());
        server.ws.send({ type: 'full-reload' });
      };
      const dir = path.resolve(process.cwd(), PHOTO_DIR);
      try {
        fs.watch(dir, { persistent: false }, refresh);
      } catch {
        /* dir created on first add */
      }
    },
    buildStart() {
      photos = readPhotos(process.cwd());
    },
  };
}
