const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    'blog-benefits-quran.png',
    'blog-tajweed-tips.png',
    'blog-hifz-guide.png',
    'blog-choose-academy.png',
    'blog-adult-quran.png'
];

const publicDir = 'c:\\Users\\HP\\Desktop\\Academy-Website\\public\\images';

async function convert() {
    for (const img of images) {
        const inputPath = path.join(publicDir, img);
        const outputPath = path.join(publicDir, img.replace('.png', '.webp'));

        try {
            if (fs.existsSync(inputPath)) {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted ${img} to webp`);
                // Optionally delete the png after conversion
                fs.unlinkSync(inputPath);
            } else {
                console.log(`File not found: ${inputPath}`);
            }
        } catch (err) {
            console.error(`Error converting ${img}:`, err);
        }
    }
}

convert();
