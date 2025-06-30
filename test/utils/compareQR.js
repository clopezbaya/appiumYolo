import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export async function compareQR(buffer1, buffer2) {
  const img1 = PNG.sync.read(buffer1);
  const img2 = PNG.sync.read(buffer2);

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const pixelDiff = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  return pixelDiff;
}
