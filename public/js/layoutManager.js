// Layout Manager for Responsive Behavior
document.addEventListener('DOMContentLoaded', () => {
    const mql = window.matchMedia('(min-width: 768px)');
    
    function handleBreakpoint(e) {
        const isDesktop = e.matches;
        
        const aside = document.querySelector('aside');
        
        const panelMapping = document.getElementById('panel-mapping');
        const panelSettings = document.getElementById('panel-settings');
        const settingsContent = document.getElementById('settings-projector-content');
        
        const tutTarget1 = document.getElementById('tutTarget_1'); // Wall size
        const bottomSpec = document.getElementById('bottom-spec-moved'); // Projector selector
        const panelOutput = document.getElementById('panel-output'); 
        const tutTarget6 = document.getElementById('tutTarget_6'); // Options & Custom Guide
        
        const btnSet = document.getElementById('btnModeSettings');
        const btnOut = document.getElementById('btnModeOutput');
        const rightViewport = document.getElementById('rightViewport');
        const mappingGrid = document.querySelector('.mapping-grid');
        const headerExportControls = document.getElementById('header-export-controls');
        
        if (isDesktop) {
            // --- DESKTOP LAYOUT ---
            // 1. Move Wall Size to top of panel-mapping (before other elements)
            if(tutTarget1 && panelMapping) panelMapping.insertBefore(tutTarget1, panelMapping.firstChild);
            
            // 2. Options and Custom Guide belong in panel-mapping
            if (tutTarget6 && panelMapping) {
                panelMapping.appendChild(tutTarget6);
            }
            
            // 4. Move Projector selection back to the right viewport as a completely separate footer
            if (bottomSpec && rightViewport) {
                bottomSpec.className = "flex-none h-[160px] bg-surface/95 backdrop-blur border-t-2 border-outline-variant/30 shrink-0 p-6 flex items-center gap-8 z-20 overflow-x-auto hide-scrollbar pointer-events-auto w-full shadow-[0_-10px_30px_rgba(0,0,0,0.5)]";
                rightViewport.appendChild(bottomSpec);
            }
            
            // Move Export Controls to Header
            const tutBtn = document.getElementById('btnStartTut');
            if (headerExportControls && tutBtn && tutBtn.parentElement) {
                headerExportControls.className = "hidden md:flex items-center gap-4 shrink-0 flex-col md:flex-row w-full md:w-auto";
                tutBtn.parentElement.appendChild(headerExportControls);
            }

            // 5. Hide Settings and Output tabs in Desktop top bar
            if(btnSet) btnSet.style.display = 'none';
            if(btnOut) btnOut.style.display = 'none';
            
            // If they were on settings or output, kick them to mapping
            if ((panelSettings && !panelSettings.classList.contains('hidden')) || 
                (panelOutput && !panelOutput.classList.contains('hidden'))) {
                const mapTab = document.getElementById('btnModeMapping');
                if(mapTab) mapTab.click();
            }
            
        } else {
            // --- MOBILE LAYOUT ---
            // 1. Wall Size goes to Settings
            if(tutTarget1 && settingsContent) settingsContent.insertBefore(tutTarget1, settingsContent.firstChild);
            
            // 2. Projector spec goes to Settings
            if (bottomSpec && settingsContent) {
                bottomSpec.className = "flex flex-col gap-4 md:gap-6 hide-scrollbar";
                settingsContent.appendChild(bottomSpec);
            }
            
            // Move Options & Custom Guide to Output panel on mobile
            if (tutTarget6 && panelOutput) {
                panelOutput.appendChild(tutTarget6);
            }

            // Move Export controls to Output panel
            if (headerExportControls && panelOutput) {
                headerExportControls.className = "flex items-center gap-4 md:gap-6 shrink-0 flex-col w-full px-4 pt-4 pb-2";
                panelOutput.appendChild(headerExportControls);
            }


            // Restore tabs display
            if(btnSet) btnSet.style.display = '';
            if(btnOut) btnOut.style.display = '';
        }
    }
    
    mql.addEventListener('change', handleBreakpoint);
    handleBreakpoint(mql);
});

