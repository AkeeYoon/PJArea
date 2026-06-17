import * as fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf8');

js = js.replace(
    /window\.setManualZoom\(1, 0, 0\);[\s\S]*?\}/,
    `window.setManualZoom(1, 0, 0);
            }
            const view2D = document.querySelector('#opt-container-2d');
            if(view2D) Array.from(view2D.children).forEach(c => c.style.transform = '');
            const sceneContainer = document.getElementById('scene-3d')?.parentElement;
            if(sceneContainer) sceneContainer.style.transform = '';`
);

fs.writeFileSync('public/js/main.js', js);
console.log("Done");
