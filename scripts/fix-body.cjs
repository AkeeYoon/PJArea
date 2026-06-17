const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<body style="(height: 100dvh; )+"/, '<body style="height: 100dvh;"');
fs.writeFileSync('index.html', html);
