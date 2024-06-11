const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images/');
const blurhashesFile = path.join(__dirname, '../blurhashes.json');

const images = fs.readdirSync(imagesDir);
const blurhashes = {};

(async () => {
  const { blurHashedImage } = await import('../utils/blurHashedImage.js');

  for (const image of images) {
    const imagePath = path.join(imagesDir, image);
    const blurhash = await blurHashedImage(imagePath);
    const imageKey = imagePath.replace(imagesDir, '');
    blurhashes[imageKey] = blurhash;
}

  fs.writeFileSync(blurhashesFile, JSON.stringify(blurhashes));
})();

