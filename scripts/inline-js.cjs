const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('PJArea_V2.1_Portable.html', 'utf8');

html = html.replace(/<script src="\.\/js\/([^"]+)"><\/script>/g, (match, filename) => {
    const jsPath = path.join('public', 'js', filename);
    if (fs.existsSync(jsPath)) {
        const jsContent = fs.readFileSync(jsPath, 'utf8');
        console.log(`Inlined ${filename}`);
        return `<script>\n${jsContent}\n</script>`;
    } else {
        console.log(`Warning: ${jsPath} not found!`);
        return match;
    }
});

fs.writeFileSync('PJArea_V2.1_Portable.html', html);
console.log("Finished inlining JS.");
