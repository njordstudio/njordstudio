import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import matter from 'gray-matter';

async function copyImages() {
    // Path to your MDX files
    const postsDir = path.join(process.cwd(), 'src/pages/posts');
    // Path to the destination directory
    const publicImagesDir = path.join(process.cwd(), 'public/images');

    // Ensure the destination directory exists
    if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    // Get all MDX files
    const mdxFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));

    for (const file of mdxFiles) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);

        if (frontmatter.image && frontmatter.image.url) {
            let imageUrl = frontmatter.image.url;

            // Remove leading ../../../ from imageUrl
            imageUrl = imageUrl.replace(/^\.\.\.\//, '');
            imageUrl = imageUrl.replace(/^\.\.\.\//, '');
            imageUrl = imageUrl.replace(/^\.\.\.\//, '');

            // Adjust the URL to match the local image path
            const localImagePath = imageUrl.replace('http://www.njordstudio.com', 'src');

            if (fs.existsSync(localImagePath)) {
                const imageFileName = path.basename(localImagePath);

                // Extract project folder name from the imageUrl
                const projectFolderMatch = imageUrl.match(/project_\d+/);
                if (!projectFolderMatch) {
                    console.warn(`Project folder not found in image URL: ${imageUrl}`);
                    continue;
                }
                const projectFolderName = projectFolderMatch[0];

                const projectFolderPath = path.join(publicImagesDir, projectFolderName);

                // Ensure the project folder exists in the destination directory
                if (!fs.existsSync(projectFolderPath)) {
                    fs.mkdirSync(projectFolderPath, { recursive: true });
                }

                const destinationPath = path.join(projectFolderPath, imageFileName);

                try {
                    // Use sharp to process and save the image
                    await sharp(localImagePath)
                        .jpeg({ quality: 80 })
                        .toFile(destinationPath);

                    console.log(`Copied and optimized ${localImagePath} to ${destinationPath}`);
                } catch (error) {
                    console.error(`Error processing image ${localImagePath}:`, error);
                }
            } else {
                console.warn(`Image not found: ${localImagePath}`);
            }
        }
    }
}

copyImages().catch(err => {
    console.error(err);
});
