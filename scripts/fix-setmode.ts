import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

const mappingBlock = `        } else if (m === 'mapping') {
            panelMap.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');`;

const newMappingBlock = `        } else if (m === 'mapping') {
            panelMap.classList.remove('hidden');
            if (window.innerWidth >= 768) {
                panelOut.classList.remove('hidden');
            }
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');`;

js = js.replace(mappingBlock, newMappingBlock);

fs.writeFileSync('public/js/main.js', js);
console.log('Fixed setMode for mapping output desktop visibility');
