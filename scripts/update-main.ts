import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

// Replace the mode variables
const newVariables = `
    const btnMap = document.getElementById('btnModeMapping');
    const btnOpt = document.getElementById('btnModeOptical');
    const btnSet = document.getElementById('btnModeSettings');
    const btnOut = document.getElementById('btnModeOutput');
    const panelMap = document.getElementById('panel-mapping');
    const panelOpt = document.getElementById('panel-optical');
    const panelSet = document.getElementById('panel-settings');
    const panelOut = document.getElementById('panel-output');
`;
js = js.replace(/const btnMap = document\.getElementById\('btnModeMapping'\);\s*const btnOpt = document\.getElementById\('btnModeOptical'\);\s*const panelMap = document\.getElementById\('panel-mapping'\);\s*const panelOpt = document\.getElementById\('panel-optical'\);/, newVariables);


// Handle headerMap and headerOpt existence safely if they are used elsewhere
// Replace setMode body
const newSetMode = `
    function setMode(m) {
        const activeClass = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-[var(--color-primary)] border-b-2 border-b-[var(--color-primary)] border-t-transparent border-x-transparent transition-all bg-[var(--color-primary)]/5";
        const inactiveClass = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-b-2 border-transparent border-t-transparent border-x-transparent";

        btnSet.className = m === 'settings' ? activeClass : inactiveClass;
        btnMap.className = m === 'mapping' ? activeClass : inactiveClass;
        btnOpt.className = m === 'optical' ? activeClass : inactiveClass;
        btnOut.className = m === 'output' ? activeClass : inactiveClass;

        panelSet.classList.add('hidden');
        panelMap.classList.add('hidden');
        panelOpt.classList.add('hidden');
        panelOut.classList.add('hidden');
        
        // Hide headers if they still exist
        if(headerMap) headerMap.classList.add('hidden');
        if(headerOpt) headerOpt.classList.add('hidden');

        if (m === 'settings') {
            panelSet.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');
        } else if (m === 'mapping') {
            panelMap.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');
        } else if (m === 'optical') {
            panelOpt.classList.remove('hidden');
            viewOpt.classList.remove('hidden'); viewMap.classList.add('hidden');
            updateOpticalMath();
        } else if (m === 'output') {
            panelOut.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');
        }
    }

    btnSet.addEventListener('click', () => setMode('settings'));
    btnMap.addEventListener('click', () => setMode('mapping'));
    btnOpt.addEventListener('click', () => setMode('optical'));
    btnOut.addEventListener('click', () => setMode('output'));
`;

js = js.replace(/function setMode\(m\) {[\s\S]*?btnOpt\.addEventListener\('click', \(\) => setMode\('optical'\)\);/, newSetMode);

fs.writeFileSync('public/js/main.js', js);
console.log('main.js updated');
