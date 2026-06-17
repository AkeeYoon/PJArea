const fs = require('fs');
let html = fs.readFileSync('PJArea_V2.1_Portable.html', 'utf8');
html = html.replace(/h-\[100dvh\]/g, 'h-screen');
html = html.replace(/<body[^>]*>/, match => {
    if (match.includes('style=')) {
        return match.replace('style="', 'style="height: 100dvh; ');
    } else {
        return match.replace('<body ', '<body style="height: 100dvh;" ');
    }
});
fs.writeFileSync('PJArea_V2.1_Portable.html', html);
console.log('Replaced successfully');
