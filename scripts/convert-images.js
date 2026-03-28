const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Image-specific settings for high-impact files
const SETTINGS = {
    // Logo: keep crisp
    'almaas-online-quran-academy-logo.webp': { width: 400, quality: 90 },
    'logo_v2.webp': { width: 400, quality: 90 },

    // Team Photos: These were 2-5MB! Resizing to 600px width and compressing.
    'raheel.webp': { width: 600, quality: 75 },
    'huzaifa.webp': { width: 600, quality: 75 },
    'subhan.webp': { width: 600, quality: 75 },
    'usaid.webp': { width: 600, quality: 75 },

    // Hero Slides: These were 600KB+. Resizing to 1600px and compressing.
    'hero-slide-1-student-v3.webp': { width: 1600, quality: 70 },
    'hero-slide-2-children.webp': { width: 1600, quality: 70 },
    'hero-slide-2-scholar.webp': { width: 1600, quality: 70 },
    'hero-slide-2-teacher.webp': { width: 1600, quality: 70 },
    'hero-slide-3-quran.webp': { width: 1600, quality: 70 },
    'hero-slide-4-family.webp': { width: 1600, quality: 70 },
    'hero-slide-5-calligraphy.webp': { width: 1600, quality: 70 },
    'hero-slide-6-age.webp': { width: 1600, quality: 70 },
};

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

async function convertAndOptimize() {
    const files = getAllFiles(publicDir);
    console.log(`\n🔄 Found ${files.length} image(s) to process...\n`);

    const results = [];

    for (const filePath of files) {
        const file = path.basename(filePath);
        const dir = path.dirname(filePath);
        const ext = path.extname(file).toLowerCase();
        const baseName = path.parse(file).name;
        const outputFileName = baseName + '.webp';
        const outputPath = path.join(dir, outputFileName);

        // Check if we have specific settings for this file, or use defaults
        const settings = SETTINGS[file] || { width: 1000, quality: 80 };

        const originalSize = fs.statSync(filePath).size;

        // Skip if it's a webp that's already small enough, unless it has specific settings
        if (ext === '.webp' && originalSize < 100 * 1024 && !SETTINGS[file]) {
            // console.log(`⏩ Skipping ${file} (already small webp)`);
            continue;
        }

        try {
            let pipeline = sharp(filePath);

            // Resize if width is specified
            if (settings.width) {
                pipeline = pipeline.resize({
                    width: settings.width,
                    withoutEnlargement: true,
                });
            }

            const tmpPath = outputPath + '.tmp';
            await pipeline
                .webp({ quality: settings.quality || 80, effort: 6 })
                .toFile(tmpPath);

            const newSize = fs.statSync(tmpPath).size;

            // Only replace if the new one is actually smaller
            if (newSize < originalSize || ext !== '.webp') {
                if (fs.existsSync(outputPath) && filePath !== outputPath) {
                    fs.unlinkSync(filePath); // remove original if it was png/jpg
                }
                fs.renameSync(tmpPath, outputPath);

                const savedPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
                results.push({
                    file: outputFileName,
                    before: (originalSize / 1024).toFixed(1) + ' KB',
                    after: (newSize / 1024).toFixed(1) + ' KB',
                    saved: savedPct + '%',
                });
                console.log(`✅ ${file}: ${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB (-${savedPct}%)`);
            } else {
                fs.unlinkSync(tmpPath);
                // console.log(`⏩ Skipping ${file} (no size gain)`);
            }

        } catch (err) {
            console.error(`❌ Failed: ${file} — ${err.message}`);
        }
    }

    console.log('\n📊 Optimization Summary:');
    console.table(results);
}

convertAndOptimize();
