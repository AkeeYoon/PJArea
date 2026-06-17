import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Clean the Header
// The header contains <div class="flex items-center gap-6" id="header-info-mapping">
// Let's just find "id="header-info-mapping"" and null it out manually or via string replacing.
// Wait! Mapping export is needed! I'll extract it first to a variable.

const mappingExtractMatches = html.match(/<div class="flex items-center gap-6" id="header-info-mapping">([\s\S]*?)<\/button>\s*<\/div>\s*<\/div>/);
const opticalExtractMatches = html.match(/<div class="flex items-center gap-6 hidden" id="header-info-optical">([\s\S]*?System Status.*?)<\/div>\s*<\/div>\s*<\/div>/);

// We'll replace the full blocks in HTML
if (mappingExtractMatches) html = html.replace(mappingExtractMatches[0], ' ');
if (opticalExtractMatches) html = html.replace(opticalExtractMatches[0], ' ');

// 2. Change Desktop Tabs
const desktopTabs = `
            <div class="hidden md:flex shrink-0 sticky top-0 bg-surface-low z-30">
                <button id="btnModeSettings" class="flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-primary border-b-2 border-b-[var(--color-primary)] border-t-transparent border-x-transparent transition-all bg-primary/5">
                    Settings
                </button>
                <button id="btnModeMapping" class="flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-b-2 border-transparent border-t-transparent border-x-transparent">
                    Mapping
                </button>
                <button id="btnModeOptical" class="flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-b-2 border-transparent border-t-transparent border-x-transparent">
                    Optical
                </button>
                <button id="btnModeOutput" class="flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-b-2 border-transparent border-t-transparent border-x-transparent">
                    Output
                </button>
            </div>`;

html = html.replace(/<div class="hidden md:flex shrink-0 sticky top-0 bg-surface-low z-30">[\s\S]*?<\/div>/, desktopTabs);

// 3. New Sidebar Panels Structure:
// We need to inject <div id="panel-settings"> before <div id="panel-mapping">, and <div id="panel-output"> after <div id="panel-optical">
const settingsPanelHtml = `
            <div id="panel-settings" class="flex flex-col flex-1 pb-16">
                <div class="p-6 pb-2" id="tutTarget_settings">
                    <div class="flex justify-between items-center cyber-group-header">
                        <h2 class="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">HARDWARE_IDENTITY</h2>
                        <span class="text-[10px] font-mono text-primary">001</span>
                    </div>
                    <div id="settings-projector-content" class="flex flex-col gap-4">
                        <!-- We will migrate the projector specs here -->
                    </div>
                </div>
            </div>
`;

html = html.replace(/<div id="panel-mapping"/, settingsPanelHtml + '\n            <div id="panel-mapping" class="hidden ');

const outputPanelHtml = `
            <div id="panel-output" class="hidden flex flex-col p-6 space-y-6 flex-1 pb-16">
                 <div class="flex justify-between items-center cyber-group-header">
                    <h2 class="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">EXPORT PROTOCOL</h2>
                    <span class="text-[10px] font-mono text-[var(--color-primary)]">EXP</span>
                </div>
                
                <div class="bg-surface-high border border-outline-variant/15 p-4 flex flex-col gap-3">
                    <span class="text-[9px] text-on-surface/40 uppercase tracking-normal font-display block mb-2">TARGET SURFACE OPTIONS</span>
                    <label class="text-xs text-on-surface/80 flex items-center gap-2 cursor-pointer hover:text-primary">
                        <input type="radio" name="exportFmt" value="true" class="accent-primary w-4 h-4" checked> True Wall Resolution
                    </label>
                    <label class="text-xs text-on-surface/80 flex items-center gap-2 cursor-pointer hover:text-primary">
                        <input type="radio" name="exportFmt" value="total" class="accent-primary w-4 h-4"> Total Projector Area
                    </label>
                    <div class="h-px bg-neutral-600 my-2"></div>
                    <label class="text-xs text-orange-200 flex items-center gap-2 cursor-pointer hover:text-orange-400">
                        <input type="checkbox" id="chkExportBlend" class="accent-orange-500 w-4 h-4" checked> Apply Orange Blend Tint
                    </label>
                </div>

                <div class="mt-8 flex justify-center">
                     <button id="btnExport" class="w-full bg-[var(--color-primary)] hover:bg-[#00e6b8] text-neutral-900 border-none font-bold uppercase text-[15px] tracking-widest py-4 transition-all shadow-[0_0_15px_rgba(0,255,200,0.3)] hover:shadow-[0_0_25px_rgba(0,255,200,0.6)]">
                         INITIATE RENDER
                     </button>
                </div>
            </div>
`;
html = html.replace(/<\/div>\s*<!-- \/panel-optical -->/, '</div>\n\n' + outputPanelHtml + '\n<!-- /panel-optical -->'); 
// Wait, the end of panel optical is just `</div>` so we should use a marker.
// Find the exact place.
html = html.replace(/<div id="view-mapping"/, outputPanelHtml + '\n                <div id="view-mapping"');


// 4. Mobile Bottom Nav Sync Update
// Update the 4 buttons inside <nav id="mobile-bottom-nav"
const newNavHTML = `
    <!-- Mobile Bottom Navigation -->
    <nav id="mobile-bottom-nav" class="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-[#0a0a0a] border-t border-outline-variant/30 flex z-[200]">
        <button id="mobNavSettings" onclick="document.getElementById('btnModeSettings').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full text-primary border-t-2 border-primary mt-[-1px] bg-primary/5 transition-all">
            <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Settings</span>
        </button>
        <button id="mobNavMapping" onclick="document.getElementById('btnModeMapping').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
            <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Mapping</span>
        </button>
        <button id="mobNavOptical" onclick="document.getElementById('btnModeOptical').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
            <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Optical</span>
        </button>
        <button id="mobNavOutput" onclick="document.getElementById('btnModeOutput').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
           <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" x2="2.01" y1="20" y2="20"></line></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Output</span>
        </button>
    </nav>
`;

html = html.replace(/<nav id="mobile-bottom-nav"[\s\S]*?<\/nav>/, newNavHTML);

// 5. Update the mobile sync script in HTML
const newSyncScript = `
<script>
  // Sync Bottom Nav Active States
  setInterval(() => {
    const isSet = !document.getElementById('panel-settings').classList.contains('hidden');
    const isMap = !document.getElementById('panel-mapping').classList.contains('hidden');
    const isOpt = !document.getElementById('panel-optical').classList.contains('hidden');
    const isOut = !document.getElementById('panel-output').classList.contains('hidden');
    
    const setBtn = document.getElementById('mobNavSettings');
    const mapBtn = document.getElementById('mobNavMapping');
    const optBtn = document.getElementById('mobNavOptical');
    const outBtn = document.getElementById('mobNavOutput');
    
    function makeActive(btn) {
      if(!btn) return;
      btn.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-[var(--color-primary)] border-t-2 border-[var(--color-primary)] mt-[-1px] bg-primary/5 transition-all";
    }
    function makeInactive(btn) {
      if(!btn) return;
      btn.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all opacity-40 hover:opacity-100";
    }

    if(isSet) { makeActive(setBtn); makeInactive(mapBtn); makeInactive(optBtn); makeInactive(outBtn); }
    else if(isMap) { makeInactive(setBtn); makeActive(mapBtn); makeInactive(optBtn); makeInactive(outBtn); }
    else if(isOpt) { makeInactive(setBtn); makeInactive(mapBtn); makeActive(optBtn); makeInactive(outBtn); }
    else if(isOut) { makeInactive(setBtn); makeInactive(mapBtn); makeInactive(optBtn); makeActive(outBtn); }
    
  }, 100);
</script>
`;

html = html.replace(/<script>\s*\/\/\s*Sync Bottom Nav Active States[\s\S]*?<\/script>/, newSyncScript);

// 6. Delete bottom-spec-panel completely. We will let the init JS build its inner contents inside panel-settings in JS.
const bottomSpecMatch = html.match(/<div id="bottom-spec-panel"[\s\S]*?<!-- End Projector Details -->\s*<\/div>\s*<\/div>/);
if(bottomSpecMatch) {
    // We just take the whole inner flex container and move it into panel-settings.
    // Replace it in DOM with empty space, then we inject it inside panel-settings
    const content = bottomSpecMatch[0].replace(/<div id="bottom-spec-panel"[^>]*>/, '<div id="settings-projector-content-inner" class="flex flex-col gap-6">');
    html = html.replace(bottomSpecMatch[0], ''); // Remove from bottom
    html = html.replace('<!-- We will migrate the projector specs here -->', content);
}


fs.writeFileSync('index.html', html);
console.log('Done HTML parsing.');
