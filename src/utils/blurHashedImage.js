import { encode } from "blurhash";
import sharp from "sharp";

const loadImage = async (src) => {
    try {
        const image = sharp(src);
        const metadata = await image.metadata();
        console.log("* loaded");
        return { image, ...metadata };
    } catch (error) {
        console.error('Error loading image:', error);
    }
};

const getImageData = async ({ image, width, height }) => {
    try {
        const raw = await image
            .ensureAlpha()
            .raw()
            .toBuffer();
        return { data: new Uint8Array(raw), width, height };
    } catch (error) {
        console.error('Error getting image data:', error);
    }
};

const encodeImageToBlurhash = async (imageUrl) => {
    try {
        const image = await loadImage(imageUrl);
        const imageData = await getImageData(image);
        console.log("* encode");
        return encode(imageData.data, imageData.width, imageData.height, 4, 4);
    } catch (error) {
        console.error('Error encoding image to blurhash:', error);
    }
};

export const blurHashedImage = async (image) => {
    try {
        let imagePath = image.replace('/@fs/', '').split('?')[0];
        imagePath = '/' + imagePath;
        const encodedImage = await encodeImageToBlurhash(imagePath);
        return encodedImage;
    } catch (error) {
        console.error('Error creating blurred image:', error);
        return ''; // return an empty string when an error occurs
    }
};