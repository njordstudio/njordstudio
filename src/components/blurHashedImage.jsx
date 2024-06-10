import { encode } from "blurhash";

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

const blurHashedImage = async (image, alt) => {

  console.log("HERE:", image.src, image.width, image.height, alt)

  const encodedImage = await encodeImageToBlurhash(image.src);
  return (
    <Image
      src={`data:image/jpeg;base64,${encodedImage}`}
      width={image.width / 2}
      height={image.height / 2}
      densities={[1.5, 2]}
      alt={alt}
      loading="lazy"
    />
  );
};

export default blurHashedImage;