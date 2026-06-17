const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function run() {
    console.log('Starting compression and embedding...');
    let html = fs.readFileSync('PJArea_V2.1_Portable.html', 'utf8');
    
    // Fix mobile scroll issue again just in case
    html = html.replace(/h-screen(?=\s)/g, 'h-[100dvh]');
    
    // Some elements might still block scrolling. If <main> has `overflow-hidden pb-[60px] md:pb-0`, we can allow mobile scrolling on the aside. 
    // Wait, let's leave it as h-[100dvh] for now, which usually fixes iOS/Android browser bottom bar cutoff issues.

    const images = ['EV-LD700ST.png', 'EV-LD820U.png', 'PT-REQ12BU.png'];
    const b64Map = {};
    
    for (let img of images) {
        if (fs.existsSync(img)) {
            const buffer = await sharp(img)
                .resize({ width: 300, withoutEnlargement: true }) // compress
                .webp({ quality: 60 }) 
                .toBuffer();
                
            const base64 = `data:image/webp;base64,${buffer.toString('base64')}`;
            const modelName = img.replace('.png', '');
            b64Map[modelName] = base64;
            console.log(`Compressed ${img} into WebP Base64`);
        }
    }

    // Inject the map into the HTML head
    const mapScript = `\n<script>window.b64Images = ${JSON.stringify(b64Map)};</script>\n`;
    if (!html.includes('window.b64Images')) {
        html = html.replace('</head>', `${mapScript}</head>`);
    } else {
        html = html.replace(/<script>window\.b64Images = .*?<\/script>/, mapScript.trim());
    }

    // Replace the dynamic assignment
    // Original: bpImage.src = model + '.png';
    const oldSrcAssign = `bpImage.src = model + '.png';`;
    const newSrcAssign = `bpImage.src = window.b64Images && window.b64Images[model] ? window.b64Images[model] : (model + '.png');`;
    
    if (html.includes(oldSrcAssign)) {
        html = html.replace(oldSrcAssign, newSrcAssign);
        console.log('Patched JS dynamic image assignment.');
    } else if (html.includes(newSrcAssign)) {
        console.log('JS dynamic image assignment already patched.');
    } else {
        console.log('Could not find the JS image assignment code. Maybe it was already changed or is formatted differently.');
    }

    fs.writeFileSync('PJArea_V2.1_Portable.html', html);
    console.log('Done! HTML file is now fully self-contained with compressed WebP images.');
}
run();
