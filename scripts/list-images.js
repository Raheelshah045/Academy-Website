const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('public')
    .filter(f => ['.webp', '.jpg', '.png', '.jpeg'].includes(path.extname(f)));

let output = '\n=== IMAGE SIZES AFTER CONVERSION ===\n\n';
files
    .sort((a, b) => fs.statSync('public/' + b).size - fs.statSync('public/' + a).size)
    .forEach(f => {
        const kb = (fs.statSync('public/' + f).size / 1024).toFixed(1);
        const bar = '█'.repeat(Math.floor(kb / 10));
        output += `${String(kb).padStart(7)} KB  ${f}\n`;
    });

fs.writeFileSync('scripts/image-report.txt', output);
console.log(output);
