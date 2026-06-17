import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

if(!html.includes('layoutManager.js')) {
    html = html.replace('<script src="/js/main.js"></script>', '<script src="/js/main.js"></script>\n    <script src="/js/layoutManager.js"></script>');
}

fs.writeFileSync('index.html', html);
