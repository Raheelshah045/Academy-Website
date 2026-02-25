const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Image-specific settings
const SETTINGS = {
    // Logo: keep crisp — high quality webp, resize to max 200px
    'almaas-online-quran-academy-logo.png': { width: 200, height: 200, fit: 'inside', quality: 90 },
    'logo_v2.png': { width: 200, height: 200, fit: 'inside', quality: 90 },
    // farzululoom is huge 500KB PNG — aggressive compress
    'farz-e-uloom-essential-islamic-knowledge.png': { width: 800, quality: 75 },
    // Course images — resize to max 800px wide, quality 80
    'quran-qaida-beginners-course.jpg': { width: 800, quality: 80 },
    'online-quran-reading-course.jpg': { width: 800, quality: 80 },
    'online-quran-memorization-hifz-classes.png': { width: 800, quality: 80 },
    'quran-translation-course-online.jpg': { width: 800, quality: 80 },
    'quran-tafseer-course-online.jpg': { width: 800, quality: 80 },
    'arabic-language-course-online.jpg': { width: 800, quality: 80 },
    'new-muslim-quran-course-online.jpg': { width: 800, quality: 80 },
    'seerat-un-nabi-course-online.jpg': { width: 800, quality: 80 },
    'quran-tajweed-tarteel-course-online.jpg': { width: 800, quality: 80 },
    'dars-e-nizami-islamic-scholarship-course.jpg': { width: 800, quality: 80 },
    'short-shariah-course-online.jpg': { width: 800, quality: 80 },
};

const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function convertToWebP() {
    const files = fs.readdirSync(publicDir).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return EXTENSIONS.includes(ext);
    });

    console.log(`\n🔄 Found ${files.length} image(s) to convert...\n`);

    const results = [];

    for (const file of files) {
        const inputPath = path.join(publicDir, file);
        const baseName = path.parse(file).name;
        const outputFileName = baseName + '.webp';
        const outputPath = path.join(publicDir, outputFileName);

        const settings = SETTINGS[file] || { width: 800, quality: 80 };
        const originalSize = fs.statSync(inputPath).size;

        try {
            let pipeline = sharp(inputPath);

            // Resize if width is specified
            if (settings.width || settings.height) {
                pipeline = pipeline.resize({
                    width: settings.width,
                    height: settings.height || undefined,
                    fit: settings.fit || 'inside',
                    withoutEnlargement: true,
                });
            }

            await pipeline
                .webp({ quality: settings.quality || 80, effort: 6 })
                .toFile(outputPath);

            const newSize = fs.statSync(outputPath).size;
            const savedPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

            results.push({
                file: outputFileName,
                before: (originalSize / 1024).toFixed(1) + ' KB',
                after: (newSize / 1024).toFixed(1) + ' KB',
                saved: savedPct + '%',
                status: '✅',
            });

            console.log(`✅ ${file}`);
            console.log(`   ${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB  (saved ${savedPct}%)`);

            // Remove old file
            fs.unlinkSync(inputPath);
            console.log(`   🗑️  Deleted original: ${file}\n`);
        } catch (err) {
            console.error(`❌ Failed: ${file} — ${err.message}`);
        }
    }

    console.log('\n📊 Summary:');
    console.table(results);
    console.log('\n✅ All images converted to .webp successfully!');
    console.log('⚠️  Remember to update all image references in App.js from .jpg/.png → .webp\n');
}

convertToWebP();
