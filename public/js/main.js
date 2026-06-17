// --- GLOBAL UI ORCHESTRATION ---
function init() {
    // 1. Core DOM References
    
    const btnMap = document.getElementById('btnModeMapping');
    const btnOpt = document.getElementById('btnModeOptical');
    const btnSet = document.getElementById('btnModeSettings');
    const panelMap = document.getElementById('panel-mapping');
    const panelOpt = document.getElementById('panel-optical');
    const panelSet = document.getElementById('panel-settings');

    const viewMap = document.getElementById('view-mapping');
    const viewOpt = document.getElementById('view-optical');
    const headerMap = document.getElementById('header-info-mapping');
    const headerOpt = document.getElementById('header-info-optical');

    const btnView2D = document.getElementById('btnView2D');
    const btnView3D = document.getElementById('btnView3D');
    const cont2D = document.getElementById('opt-container-2d');
    const cont3D = document.getElementById('opt-container-3d');

    // 2. Mapping UI References
    const ui = {
        wallW: document.getElementById('inpWallW'), wallH: document.getElementById('inpWallH'),
        W: document.getElementById('inpW'), H: document.getElementById('inpH'),
        P: document.getElementById('inpP'), R: document.getElementById('inpR'),
        TW: document.getElementById('inpTW'), TH: document.getElementById('inpTH'),
        sliderOx: document.getElementById('sliderOx'), sliderOy: document.getElementById('sliderOy'),
        lblOx: document.getElementById('lblOxSlider'), lblOy: document.getElementById('lblOySlider'),
        badgeOx: document.getElementById('badgeOxPct'), badgeOy: document.getElementById('badgeOyPct'),
        chkCircles: document.getElementById('chkCircles'), chkGrid: document.getElementById('chkGrid'),
        chkProjInfo: document.getElementById('chkProjInfo'), chkColorGrid: document.getElementById('chkColorGrid'),
        chkQuickPattern: document.getElementById('chkQuickPattern'),
        chkExportBlend: document.getElementById('chkExportBlend'), exportBtn: document.getElementById('btnExport'),
        inpSvgUpload: document.getElementById('inpSvgUpload'), btnSvgUpload: document.getElementById('btnSvgUpload'), btnSvgClear: document.getElementById('btnSvgClear'),
        svgControls: document.getElementById('svgControls'), 
        inpSvgScale: document.getElementById('inpSvgScale'), sliderSvgScale: document.getElementById('sliderSvgScale'),
        inpSvgTargetW: document.getElementById('inpSvgTargetW'), sliderSvgTargetW: document.getElementById('sliderSvgTargetW'),
        inpSvgX: document.getElementById('inpSvgX'), sliderSvgX: document.getElementById('sliderSvgX'),
        inpSvgY: document.getElementById('inpSvgY'), sliderSvgY: document.getElementById('sliderSvgY'),
        txtTrueW: document.getElementById('txtTrueW'), txtTrueH: document.getElementById('txtTrueH'),
        txtPxToMm: document.getElementById('txtPxToMm'), hdrRes: document.getElementById('hdrRes'),
        mainCanvas: document.getElementById('mainCanvas'),
        chkInvertColors: document.getElementById('chkInvertColors'),
        chkTransparentBg: document.getElementById('chkTransparentBg'),
        inpBgImgUpload: document.getElementById('inpBgImgUpload'), btnBgImgUpload: document.getElementById('btnBgImgUpload'), btnBgImgClear: document.getElementById('btnBgImgClear'),
        bgImgControls: document.getElementById('bgImgControls'),
        inpBgImgScale: document.getElementById('inpBgImgScale'), sliderBgImgScale: document.getElementById('sliderBgImgScale'),
        inpBgImgX: document.getElementById('inpBgImgX'), sliderBgImgX: document.getElementById('sliderBgImgX'),
        inpBgImgY: document.getElementById('inpBgImgY'), sliderBgImgY: document.getElementById('sliderBgImgY'),
        txtCursor: document.getElementById('txtCursor'), txtOutputRes: document.getElementById('txtOutputRes'),
        inpProjName: document.getElementById('inpProjName'),
        axisLockRadios: document.getElementsByName('axisLock'),
        exportOptions: document.getElementsByName('exportFmt'),
        btnSwapRes: document.getElementById('btnSwapRes'),
        valWallAR: document.getElementById('valWallAR')
    };

    // 3. Engines initialization
    const mappingEngine = new CanvasEngine('mainCanvas');
    const mappingExporter = new Exporter(16384);

    // 4. Mode Switching
    
    function setMode(m) {
        const activeClass = "flex-1 py-2 md:py-3 text-[10px] font-bold uppercase tracking-normal font-display text-[var(--color-primary)] border-b-2 border-b-[var(--color-primary)] border-t-transparent border-x-transparent transition-all bg-[var(--color-primary)]/5";
        const inactiveClass = "flex-1 py-2 md:py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-b-2 border-transparent border-t-transparent border-x-transparent";

        const btnOut = document.getElementById('btnModeOutput');
        const panelOut = document.getElementById('panel-output');
        const footerMapping = document.getElementById('footer-mapping');
        const bottomSpec = document.getElementById('bottom-spec-moved');

        if(btnSet) btnSet.className = m === 'settings' ? activeClass : inactiveClass;
        if(btnMap) btnMap.className = m === 'mapping' ? activeClass : inactiveClass;
        if(btnOpt) btnOpt.className = m === 'optical' ? activeClass : inactiveClass;
        if(btnOut) btnOut.className = m === 'output' ? activeClass : inactiveClass;

        if(panelSet) panelSet.classList.add('hidden');
        if(panelMap) panelMap.classList.add('hidden');
        if(panelOpt) panelOpt.classList.add('hidden');
        if(panelOut) panelOut.classList.add('hidden');
        
        // Hide headers if they still exist
        if(headerMap) headerMap.classList.add('hidden');
        if(headerOpt) headerOpt.classList.add('hidden');

        if (m === 'settings') {
            panelSet.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');
            if(footerMapping) footerMapping.style.display = '';
            if(bottomSpec) bottomSpec.style.display = '';
        } else if (m === 'mapping') {
            if(panelMap) panelMap.classList.remove('hidden');
            if(viewMap) viewMap.classList.remove('hidden'); 
            if(viewOpt) viewOpt.classList.add('hidden');
            if(footerMapping) footerMapping.style.display = '';
            if(bottomSpec) bottomSpec.style.display = '';
        } else if (m === 'optical') {
            if(panelOpt) panelOpt.classList.remove('hidden');
            if(viewOpt) viewOpt.classList.remove('hidden'); 
            if(viewMap) viewMap.classList.add('hidden');
            updateOpticalMath();
            if(footerMapping) footerMapping.style.display = 'none';
            if(bottomSpec) bottomSpec.style.display = '';
        } else if (m === 'output') {
            if(panelOut) panelOut.classList.remove('hidden');
            viewMap.classList.remove('hidden'); viewOpt.classList.add('hidden');
            if(footerMapping) footerMapping.style.display = '';
            if(bottomSpec) bottomSpec.style.display = '';
        }
        
        // Force window resize to update canvas dimensions/positions properly when making elements visible
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 10);
    }

    if(btnSet) btnSet.addEventListener('click', () => setMode('settings'));
    if(btnMap) btnMap.addEventListener('click', () => setMode('mapping'));
    if(btnOpt) btnOpt.addEventListener('click', () => setMode('optical'));
    const btnOut = document.getElementById('btnModeOutput');
    if(btnOut) btnOut.addEventListener('click', () => setMode('output'));
    setMode('mapping'); // initialize default mode


    btnView2D.addEventListener('click', () => {
        OpticalState.viewMode = '2D';
        cont2D.classList.remove('hidden'); cont3D.classList.add('hidden');
        btnView2D.className = "px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-normal font-display transition-all bg-primary text-on-primary text-surface-lowest shadow-none";
        btnView3D.className = "px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all";
        const camPanel = document.getElementById('panel-cam-control');
        if (camPanel) camPanel.classList.add('hidden');
        
        // Reset zoom for 2D View
        if (window.innerWidth < 768) {
            if (window.setManualZoom) {
                window.setManualZoom(1, 0, 0);
            }
            const view2D = document.querySelector('#opt-container-2d');
            if(view2D) Array.from(view2D.children).forEach(c => c.style.transform = '');
            const sceneContainer = document.getElementById('scene-3d')?.parentElement;
            if(sceneContainer) sceneContainer.style.transform = '';
        }
        
        drawOpticalDiagram();
    });

    btnView3D.addEventListener('click', () => {
        OpticalState.viewMode = '3D';
        cont3D.classList.remove('hidden'); cont2D.classList.add('hidden');
        btnView3D.className = "px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-normal font-display transition-all bg-primary text-on-primary text-surface-lowest shadow-none";
        btnView2D.className = "px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all";
        const camPanel = document.getElementById('panel-cam-control');
        if (camPanel) camPanel.classList.remove('hidden');
        
        // Mobile 3D view auto-zoom correction
        if (window.innerWidth < 768) {
            if (window.setManualZoom) {
                window.setManualZoom(0.4, 0, 30);
            }
        }
        
        drawOpticalDiagram();
    });

    // 5. Mapping Logic (Calculations & Updates)
    function val(el) { return parseFloat(el.value) || 0; }
    function setVal(el, v) { el.value = Math.round(v); }
    function getLockedAxis() { for (let r of ui.axisLockRadios) { if (r.checked) return r.value; } return 'X'; }
    
    function getOverlapColorStatus(pct) {
        if (pct < 0.1) return { classes: 'bg-red-500/20 text-red-500 border-red-500/50', hex: '#ef4444' };
        if (pct >= 0.1 && pct <= 0.15) return { classes: 'bg-orange-500/20 text-orange-400 border-orange-500/50', hex: '#f97316' };
        if (pct > 0.15 && pct <= 0.30) return { classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50', hex: '#10b981' };
        if (pct > 0.30 && pct <= 0.50) return { classes: 'bg-orange-500/20 text-orange-400 border-orange-500/50', hex: '#f97316' };
        return { classes: 'bg-red-500/20 text-red-500 border-red-500/50', hex: '#ef4444' };
    }
    
    function updateBadgeStyle(badgeEl, pctVal) {
        let s = getOverlapColorStatus(pctVal);
        badgeEl.className = `px-2 py-0.5 rounded text-[10px] font-bold border ${s.classes}`;
        badgeEl.textContent = (pctVal * 100).toFixed(1) + '%';
        return s.hex;
    }
    
    let currentOverlapColors = { x: '#f97316', y: '#f97316' };

    function calcTotalX() { 
        let w=val(ui.W), p=val(ui.P), ox=parseInt(ui.sliderOx.value)||0; 
        if(p<1){setVal(ui.P,1);p=1;} 
        if(p===1){ox=0;} 
        let tw=(w*p)-(ox*(p-1)); 
        setVal(ui.TW,tw); 
    }
    
    function calcTotalY() { 
        let h=val(ui.H), r=val(ui.R), oy=parseInt(ui.sliderOy.value)||0; 
        if(r<1){setVal(ui.R,1);r=1;} 
        if(r===1){oy=0;} 
        let th=(h*r)-(oy*(r-1)); 
        setVal(ui.TH,th); 
    }

    function recalcAll() {
        let tw = val(ui.TW), th = val(ui.TH);
        let wallW = val(ui.wallW), wallH = val(ui.wallH);
        let lockedAxis = getLockedAxis();
        let Ox = parseInt(ui.sliderOx.value) || 0;
        let Oy = parseInt(ui.sliderOy.value) || 0;
        let W = val(ui.W), H = val(ui.H);

        if (ui.valWallAR) ui.valWallAR.textContent = ((wallW||1)/(wallH||1)).toFixed(3) + ':1';

        let oxPct = W > 0 ? Ox / W : 0;
        let oyPct = H > 0 ? Oy / H : 0;
        currentOverlapColors.x = updateBadgeStyle(ui.badgeOx, oxPct);
        currentOverlapColors.y = updateBadgeStyle(ui.badgeOy, oyPct);

        ui.lblOx.textContent = Ox + ' px';
        ui.lblOy.textContent = Oy + ' px';

        let pxToMm = 0;
        if (lockedAxis === 'X' || lockedAxis === 'Auto') {
            pxToMm = tw > 0 ? wallW / tw : 0;
        } else if (lockedAxis === 'Y') {
            pxToMm = th > 0 ? wallH / th : 0;
        }
        if (ui.txtOutputRes) ui.txtOutputRes.innerText = `${tw} x ${th}`;
        const deskRes = document.getElementById('desk-txtOutputRes');
        if (deskRes) deskRes.innerText = `${tw} x ${th}`;
        if (ui.txtPxToMm) ui.txtPxToMm.innerText = isNaN(pxToMm) ? "0.00" : pxToMm.toFixed(2);
        if (ui.hdrRes) ui.hdrRes.innerText = `${tw} x ${th}`;

        let trueW = tw, trueH = th;
        if (wallW > 0 && wallH > 0) {
            if (lockedAxis === 'X' || lockedAxis === 'Auto') { trueW = tw; trueH = Math.round(tw * (wallH / wallW)); }
            else if (lockedAxis === 'Y') { trueH = th; trueW = Math.round(th * (wallW / wallH)); }
        }
        if (ui.txtTrueW) ui.txtTrueW.innerText = isNaN(trueW) ? "--" : trueW;
        if (ui.txtTrueH) ui.txtTrueH.innerText = isNaN(trueH) ? "--" : trueH;

        let projWidthMM = (wallW > 0 && trueW > 0) ? W * (wallW / trueW) : 1000;
        let projWidthMeters = projWidthMM / 1000;
        
        OpticalState.width = parseFloat(projWidthMeters.toFixed(3));
        if (typeof updateOpticalMath !== "undefined" && typeof OpticalState !== "undefined") {
             updateOpticalMath('width');
        }

        mappingEngine.render({
            TW: tw, TH: th, TrueW: trueW, TrueH: trueH,
            W: W, H: H, P: val(ui.P), R: val(ui.R), Ox: Ox, Oy: Oy,
            projName: (ui.inpProjName && ui.inpProjName.value.trim() !== '') ? ui.inpProjName.value : "Akee_Y",
            drawCircles: ui.chkCircles.checked, drawGrid: ui.chkGrid.checked,
            drawProjInfo: ui.chkProjInfo ? ui.chkProjInfo.checked : true,
            drawQuickPattern: ui.chkQuickPattern ? ui.chkQuickPattern.checked : false,
            drawColorGrid: ui.chkColorGrid ? ui.chkColorGrid.checked : false,
            transparentBg: ui.chkTransparentBg ? ui.chkTransparentBg.checked : false,
            gridThin: parseFloat(document.getElementById('inpGridThin')?.value) || 1,
            gridThick: parseFloat(document.getElementById('inpGridThick')?.value) || 2,
            drawBlend: ui.chkExportBlend ? ui.chkExportBlend.checked : true,
            colorX: currentOverlapColors.x, colorY: currentOverlapColors.y,
            WallW: wallW, WallH: wallH, LockedAxis: lockedAxis,
            customSvgImage: window.customSvgImage,
            svgScale: ui.inpSvgScale ? parseFloat(ui.inpSvgScale.value)/100 : 1,
            svgX: ui.inpSvgX ? parseFloat(ui.inpSvgX.value) : 0,
            svgY: ui.inpSvgY ? parseFloat(ui.inpSvgY.value) : 0,
            invertColors: ui.chkInvertColors ? ui.chkInvertColors.checked : false,
            customBgImage: window.customBgImage,
            bgScale: ui.inpBgImgScale ? parseFloat(ui.inpBgImgScale.value)/100 : 1,
            bgX: ui.inpBgImgX ? parseFloat(ui.inpBgImgX.value) : 0,
            bgY: ui.inpBgImgY ? parseFloat(ui.inpBgImgY.value) : 0
        });
        ui.sliderOx.max = Math.round(W);
        ui.sliderOy.max = Math.round(H);
    }

    function autoFitTargetAxis() {
        let Wall_W = val(ui.wallW) || 10000, Wall_H = val(ui.wallH) || 3000;
        let AR = Wall_W / Wall_H;
        let w = val(ui.W) || 1920, h = val(ui.H) || 1200;
        let lockedAxis = getLockedAxis();
        let bestDist = Infinity, bestConfig = null;
        let pIter = lockedAxis === 'X' ? [Math.max(1, val(ui.P))] : [1,2,3,4,5,6,7,8,9,10];
        let rIter = lockedAxis === 'Y' ? [Math.max(1, val(ui.R))] : [1,2,3,4,5,6,7,8];
        
        for (let p of pIter) { 
            for (let r of rIter) { 
                for (let ox_pct = 0.05; ox_pct <= 0.35; ox_pct += 0.01) {
                    let sysX = Calculator.calculateSystem(Wall_W, Wall_H, w, h, p, r, ox_pct * 100);
                    let ox = sysX.pixelOverlapX; if (p === 1) ox = 0;
                    let tw = w * p - ox * (p - 1); let th_target = tw / AR;
                    let oy = 0; if (r > 1) { oy = Math.round((h * r - th_target) / (r - 1)); }
                    let oy_pct = oy / h;
                    if (r === 1 || (oy_pct >= 0.0 && oy_pct <= 0.50)) {
                        let th = h * r - oy * (r - 1); let actualAR = tw / th; let ar_error = Math.abs(actualAR - AR);
                        let penalty = 0;
                        if (ox_pct < 0.15 || ox_pct > 0.25) penalty += 20000;
                        if (oy_pct < 0.15 || oy_pct > 0.25) penalty += 20000;
                        if (p === 1) penalty = 0;
                        if (r === 1) penalty = (ox_pct < 0.15 || ox_pct > 0.25) ? 20000 : 0;
                        let cost = penalty + (ar_error * 1000) + Math.abs(ox_pct - oy_pct) * 10;
                        if (cost < bestDist) { bestDist = cost; bestConfig = { p, r, ox, oy, tw, th }; }
                    }
                }
            }
        }
        
        if (bestConfig) {
            if (lockedAxis !== 'X') setVal(ui.P, bestConfig.p);
            if (lockedAxis !== 'Y') setVal(ui.R, bestConfig.r);
            ui.sliderOx.value = bestConfig.ox;
            ui.sliderOy.value = bestConfig.oy;
            calcTotalX(); calcTotalY(); recalcAll();
        }
    }

    // 6. Mapping Event Bindings
    [ui.wallW, ui.wallH].forEach(el => el.addEventListener('input', autoFitTargetAxis));
    [ui.W, ui.H].forEach(el => el.addEventListener('input', (e) => {
        if (OpticalState.model === 'Custom Setup') {
            projectorData['Custom Setup'].resolution.w = parseInt(ui.W.value) || 1920;
            projectorData['Custom Setup'].resolution.h = parseInt(ui.H.value) || 1080;
        }
        autoFitTargetAxis();
    }));
    ui.axisLockRadios.forEach(r => r.addEventListener('change', autoFitTargetAxis));
    ui.P.addEventListener('input', () => { if (getLockedAxis() === 'X') autoFitTargetAxis(); else { calcTotalX(); recalcAll(); } });
    ui.R.addEventListener('input', () => { if (getLockedAxis() === 'Y') autoFitTargetAxis(); else { calcTotalY(); recalcAll(); } });

    const btnDecP = document.getElementById('btnDecP');
    const btnIncP = document.getElementById('btnIncP');
    const btnDecR = document.getElementById('btnDecR');
    const btnIncR = document.getElementById('btnIncR');
    
    if (btnDecP) btnDecP.addEventListener('click', () => { ui.P.value = Math.max(1, parseInt(ui.P.value) - 1); ui.P.dispatchEvent(new Event('input')); });
    if (btnIncP) btnIncP.addEventListener('click', () => { ui.P.value = parseInt(ui.P.value) + 1; ui.P.dispatchEvent(new Event('input')); });
    if (btnDecR) btnDecR.addEventListener('click', () => { ui.R.value = Math.max(1, parseInt(ui.R.value) - 1); ui.R.dispatchEvent(new Event('input')); });
    if (btnIncR) btnIncR.addEventListener('click', () => { ui.R.value = parseInt(ui.R.value) + 1; ui.R.dispatchEvent(new Event('input')); });
    ui.sliderOx.addEventListener('input', () => { calcTotalX(); recalcAll(); });
    ui.sliderOy.addEventListener('input', () => { calcTotalY(); recalcAll(); });
    [ui.chkCircles, ui.chkGrid, ui.chkProjInfo, ui.chkColorGrid, ui.chkQuickPattern, ui.chkExportBlend, ui.chkInvertColors, ui.chkTransparentBg].forEach(el => { if(el) el.addEventListener('change', recalcAll); });
    
    let prevQuickPatternState = { blend: true, info: true, colorGrid: false };

    if(ui.chkQuickPattern) {
        ui.chkQuickPattern.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (ui.chkExportBlend) prevQuickPatternState.blend = ui.chkExportBlend.checked;
                if (ui.chkProjInfo) prevQuickPatternState.info = ui.chkProjInfo.checked;
                if (ui.chkColorGrid) prevQuickPatternState.colorGrid = ui.chkColorGrid.checked;
                
                if (ui.chkExportBlend) ui.chkExportBlend.checked = false;
                if (ui.chkProjInfo) ui.chkProjInfo.checked = false;
                if (ui.chkColorGrid) ui.chkColorGrid.checked = true;
            } else {
                if (ui.chkExportBlend) ui.chkExportBlend.checked = prevQuickPatternState.blend;
                if (ui.chkProjInfo) ui.chkProjInfo.checked = prevQuickPatternState.info;
                if (ui.chkColorGrid) ui.chkColorGrid.checked = prevQuickPatternState.colorGrid;
            }
            recalcAll();
        });
    }

    if(ui.inpProjName) {
        ui.inpProjName.addEventListener('input', (e) => {
            recalcAll();
        });
    }

    if(ui.btnSwapRes) ui.btnSwapRes.addEventListener('click', () => { 
        let t=val(ui.W); setVal(ui.W, val(ui.H)); setVal(ui.H, t); 
        if (OpticalState.model === 'Custom Setup') {
            projectorData['Custom Setup'].resolution.w = val(ui.W);
            projectorData['Custom Setup'].resolution.h = val(ui.H);
        }
        autoFitTargetAxis(); 
    });
    
    function getCanvasCoords(e, mainCanvas) {
        let cw = mainCanvas.width, ch = mainCanvas.height;
        let clW = mainCanvas.clientWidth, clH = mainCanvas.clientHeight; 
        
        let canvasAspect = cw / ch;
        let clientAspect = clW / clH;
        let renderW, renderH, renderX, renderY;
        
        if (clientAspect > canvasAspect) {
            renderH = clH;
            renderW = clH * canvasAspect;
            renderX = (clW - renderW) / 2;
            renderY = 0;
        } else {
            renderW = clW;
            renderH = clW / canvasAspect;
            renderX = 0;
            renderY = (clH - renderH) / 2;
        }
        
        let tw = parseInt(ui.TW.value) || cw;
        let th = parseInt(ui.TH.value) || parseInt(ui.TH.innerText) || ch;
        if (ui.TH && ui.TH.tagName === 'INPUT') th = parseFloat(ui.TH.value) || th;
        
        let trueW = parseInt(ui.txtTrueW.innerText) || tw;
        let trueH = parseInt(ui.txtTrueH.innerText) || th;
        
        let canvasMouseX = ((e.offsetX - renderX) / renderW) * cw;
        let canvasMouseY = ((e.offsetY - renderY) / renderH) * ch;
        
        let patOffsetX = (cw - tw) / 2;
        let patOffsetY = (ch - th) / 2;
        
        let curX = Math.round(canvasMouseX - patOffsetX);
        let curY = Math.round((patOffsetY + th) - canvasMouseY);
        return { curX, curY, cw, ch, tw, th, trueW, trueH };
    }

    let isDraggingSvg = false;
    let isDraggingBgImg = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let svgInitialX = 0;
    let svgInitialY = 0;
    let bgImgInitialX = 0;
    let bgImgInitialY = 0;

    ui.mainCanvas.addEventListener('mousedown', (e) => {
        let coords = getCanvasCoords(e, ui.mainCanvas);
        let curPxX = coords.curX;
        let curPxY = coords.curY;
        
        if (window.customSvgImage && !ui.svgControls.classList.contains('hidden')) {
        let wallW = val(ui.wallW) || 1;
        let trueW = parseInt(ui.txtTrueW.innerText) || coords.tw;
        let mmToPx = (wallW > 0) ? (trueW / wallW) : 1;
        
        let svgX = parseFloat(ui.inpSvgX.value) || 0;
        let svgY = parseFloat(ui.inpSvgY.value) || 0;
        let svgScale = (parseFloat(ui.inpSvgScale.value) || 100) / 100;
        
        let svgPxW = (window.customSvgImageBaseW || 0) * svgScale;
        let svgPxH = (window.customSvgImageBaseH || 0) * svgScale;
        
        // Bounding box hit test
        if (curPxX >= svgX && curPxX <= svgX + svgPxW && curPxY >= svgY && curPxY <= svgY + svgPxH) {
            isDraggingSvg = true;
            dragStartX = curPxX;
            dragStartY = curPxY;
            svgInitialX = svgX;
            svgInitialY = svgY;
            return;
        }
        }

        if (window.customBgImage && !ui.bgImgControls.classList.contains('hidden')) {
            let bgX = parseFloat(ui.inpBgImgX.value) || 0;
            let bgY = parseFloat(ui.inpBgImgY.value) || 0;
            let bgScale = (parseFloat(ui.inpBgImgScale.value) || 100) / 100;
            let bgPxW = (window.customBgImageBaseW || 0) * bgScale;
            let bgPxH = (window.customBgImageBaseH || 0) * bgScale;
            
            if (curPxX >= bgX && curPxX <= bgX + bgPxW && curPxY >= bgY && curPxY <= bgY + bgPxH) {
                isDraggingBgImg = true;
                dragStartX = curPxX;
                dragStartY = curPxY;
                bgImgInitialX = bgX;
                bgImgInitialY = bgY;
            }
        }
    });

    ui.mainCanvas.addEventListener('mousemove', (e) => { 
        let coords = getCanvasCoords(e, ui.mainCanvas);
        ui.txtCursor.textContent=`${coords.curX}, ${coords.curY}`; 
        
        if (isDraggingSvg) {
            let wallW = val(ui.wallW) || 1;
            let trueW = parseInt(ui.txtTrueW.innerText) || coords.tw;
            let mmToPx = (wallW > 0) ? (trueW / wallW) : 1;
            
            let curPxX = coords.curX;
            let curPxY = coords.curY;
            
            let newX = svgInitialX + (curPxX - dragStartX);
            let newY = svgInitialY + (curPxY - dragStartY);
            
            // Snap edges to canvas bounds
            let wallH = val(ui.wallH) || 1;
            let trueH = parseInt(ui.txtTrueH.innerText) || coords.th;
            let projW = trueW;
            let projH = trueH;
            
            let svgScale = (parseFloat(ui.inpSvgScale.value) || 100) / 100;
            let svgPxW = (window.customSvgImageBaseW || 0) * svgScale;
            let svgPxH = (window.customSvgImageBaseH || 0) * svgScale;
            
            let snapDist = 30 * mmToPx; // 30mm snapping distance translated to pixels
            let snapGrid = 100 * mmToPx; // Snap to 100mm grid lines translated to pixels
            
            let minXDist = snapDist;
            let xPointsToSnap = [0, svgPxW]; // Box left, right
            if (window.customSvgInnerSnapX && window.customSvgVw) {
                window.customSvgInnerSnapX.forEach(vx => {
                    xPointsToSnap.push((vx / window.customSvgVw) * svgPxW);
                });
            }
            xPointsToSnap.forEach(sx => {
                let absX = newX + sx;
                let d0 = 0 - absX; 
                if (Math.abs(d0) < Math.abs(minXDist)) minXDist = d0;
                let dw = projW - absX;
                if (Math.abs(dw) < Math.abs(minXDist)) minXDist = dw;
                let dg = Math.round(absX / snapGrid) * snapGrid - absX;
                if (Math.abs(dg) < Math.abs(minXDist)) minXDist = dg;
            });
            if (Math.abs(minXDist) < snapDist) newX += minXDist;

            let minYDist = snapDist;
            let yPointsToSnap = [0, svgPxH]; // Box bottom, top
            if (window.customSvgInnerSnapY && window.customSvgVh) {
                window.customSvgInnerSnapY.forEach(vy => {
                    // vy is distance from TOP inside SVG viewbox.
                    // yPointsToSnap expects distance from BOTTOM inside SVG box:
                    let yFromBottom = svgPxH - ((vy / window.customSvgVh) * svgPxH);
                    yPointsToSnap.push(yFromBottom);
                });
            }
            yPointsToSnap.forEach(sy => {
                let absY = newY + sy;
                let d0 = 0 - absY; 
                if (Math.abs(d0) < Math.abs(minYDist)) minYDist = d0;
                let dw = projH - absY;
                if (Math.abs(dw) < Math.abs(minYDist)) minYDist = dw;
                let dg = Math.round(absY / snapGrid) * snapGrid - absY;
                if (Math.abs(dg) < Math.abs(minYDist)) minYDist = dg;
            });
            if (Math.abs(minYDist) < snapDist) newY += minYDist;
            
            ui.inpSvgX.value = Math.round(newX);
            ui.inpSvgY.value = Math.round(newY);
            recalcAll();
        }

        if (isDraggingBgImg) {
            let curPxX = coords.curX;
            let curPxY = coords.curY;
            
            let newX = bgImgInitialX + (curPxX - dragStartX);
            let newY = bgImgInitialY + (curPxY - dragStartY);
            
            ui.inpBgImgX.value = Math.round(newX);
            ui.inpBgImgY.value = Math.round(newY);
            if (ui.sliderBgImgX) ui.sliderBgImgX.value = Math.round(newX);
            if (ui.sliderBgImgY) ui.sliderBgImgY.value = Math.round(newY);
            recalcAll();
        }
    });
    
    ui.mainCanvas.addEventListener('mouseup', () => { isDraggingSvg = false; isDraggingBgImg = false; });
    ui.mainCanvas.addEventListener('mouseleave', () => { ui.txtCursor.textContent = '0, 0'; isDraggingSvg = false; isDraggingBgImg = false; });
    
    window.customSvgImage = null;
    
    if (ui.btnSvgUpload && ui.inpSvgUpload) {
        ui.btnSvgUpload.addEventListener('click', () => {
            ui.inpSvgUpload.click();
        });
        
        ui.inpSvgUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const text = ev.target.result;
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "image/svg+xml");
                
                const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f97316'];
                let cIdx = 0;
                
                const hexToRgba = (hex, alpha) => {
                    let c = hex.substring(1);
                    if (c.length === 3) c = c.split('').map(x => x + x).join('');
                    let r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                };
                
                const elements = doc.querySelectorAll('path, rect, polygon, circle, ellipse, line, polyline');
                elements.forEach(el => {
                    const color = colors[cIdx % colors.length];
                    cIdx++;
                    const fillColor = hexToRgba(color, 0.25);
                    el.style.fill = fillColor;
                    el.style.stroke = color;
                    el.style.strokeWidth = '3';
                    el.setAttribute('fill', fillColor);
                    el.setAttribute('stroke', color);
                    el.setAttribute('stroke-width', '3');
                    el.setAttribute('vector-effect', 'non-scaling-stroke');
                });
                
                const svgEl = doc.querySelector('svg');
                svgEl.style.backgroundColor = 'transparent';
                svgEl.style.background = 'transparent';
                let w = svgEl.getAttribute('width');
                let h = svgEl.getAttribute('height');
                const vB = svgEl.getAttribute('viewBox');
                
                let vW = 1000, vH = 1000;
                // Ensure we have a strict numeric width/height for canvas rendering
                if (vB) {
                     const parts = vB.split(/[ ,]+/);
                     if (parts.length >= 4) {
                         vW = parseFloat(parts[2]);
                         vH = parseFloat(parts[3]);
                         if (!w || w.includes('%') || !h || h.includes('%')) {
                             svgEl.setAttribute('width', vW);
                             svgEl.setAttribute('height', vH);
                         }
                     }
                } else if (!w || w.includes('%')) {
                    svgEl.setAttribute('width', '1000');
                    svgEl.setAttribute('height', '1000');
                }
                
                // store SVG coordinate system dimensions for scaling snapping later:
                window.customSvgVw = parseFloat(svgEl.getAttribute('width')) || vW;
                window.customSvgVh = parseFloat(svgEl.getAttribute('height')) || vH;

                const offscreen = document.createElement('div');
                offscreen.style.position = 'absolute';
                offscreen.style.top = '0';
                offscreen.style.left = '0';
                offscreen.style.visibility = 'hidden';
                offscreen.style.pointerEvents = 'none';
                
                // use a container with a fixed size and let the SVG fill it or match it
                offscreen.innerHTML = svgEl.outerHTML;
                document.body.appendChild(offscreen);
                
                const inDocSvg = offscreen.querySelector('svg');
                let simW = 1000;
                let simH = (window.customSvgVh / window.customSvgVw) * simW;
                if (isNaN(simH) || simH === 0) simH = 1000;
                inDocSvg.style.width = simW + 'px';
                inDocSvg.style.height = simH + 'px';
                inDocSvg.style.margin = '0';
                inDocSvg.style.padding = '0';
                
                const svgRect = inDocSvg.getBoundingClientRect();
                let snapEdgesX = new Set();
                let snapEdgesY = new Set();
                
                inDocSvg.querySelectorAll('path, rect, polygon, circle, ellipse, line, polyline').forEach(node => {
                    try {
                        let box = node.getBoundingClientRect();
                        if (box.width > 0 || box.height > 0) {
                            // Map from screen coordinates back to intrinsic SVG coordinates
                            let intrinsicLeft = ((box.left - svgRect.left) / svgRect.width) * window.customSvgVw;
                            let intrinsicRight = ((box.right - svgRect.left) / svgRect.width) * window.customSvgVw;
                            let intrinsicTop = ((box.top - svgRect.top) / svgRect.height) * window.customSvgVh;
                            let intrinsicBottom = ((box.bottom - svgRect.top) / svgRect.height) * window.customSvgVh;
                            
                            snapEdgesX.add(intrinsicLeft);
                            snapEdgesX.add(intrinsicRight);
                            snapEdgesY.add(intrinsicTop);
                            snapEdgesY.add(intrinsicBottom);
                        }
                    } catch(e) {}
                });
                
                document.body.removeChild(offscreen);
                window.customSvgInnerSnapX = Array.from(snapEdgesX);
                window.customSvgInnerSnapY = Array.from(snapEdgesY);
                
                const serializer = new XMLSerializer();
                const svgStr = serializer.serializeToString(doc.documentElement);
                const svgBlob = new Blob([svgStr], {type: "image/svg+xml;charset=utf-8"});
                const url = URL.createObjectURL(svgBlob);
                
                const img = new Image();
                img.onload = () => {
                    window.customSvgImage = img;
                    // We also need to store natural dimensions if possible
                    window.customSvgImageBaseW = img.naturalWidth || img.width;
                    window.customSvgImageBaseH = img.naturalHeight || img.height;
                    if (ui.inpSvgTargetW) {
                        ui.inpSvgTargetW.value = Math.round(window.customSvgImageBaseW);
                        if(ui.sliderSvgTargetW) ui.sliderSvgTargetW.value = Math.round(window.customSvgImageBaseW);
                    }
                    if (ui.inpSvgScale) {
                        ui.inpSvgScale.value = 100;
                        if(ui.sliderSvgScale) ui.sliderSvgScale.value = 100;
                    }
                    ui.btnSvgClear.classList.remove('hidden');
                    if (ui.svgControls) {
                        ui.svgControls.classList.remove('hidden');
                        ui.svgControls.classList.add('flex');
                    }
                    recalcAll();
                };
                img.src = url;
            };
            reader.readAsText(file);
        });
        
        ui.btnSvgClear.addEventListener('click', () => {
            window.customSvgImage = null;
            ui.btnSvgClear.classList.add('hidden');
            if (ui.svgControls) {
                ui.svgControls.classList.add('hidden');
                ui.svgControls.classList.remove('flex');
            }
            ui.inpSvgUpload.value = '';
            recalcAll();
        });
        
        const syncAndRecalc = () => { recalcAll(); };
        
        const attachSync = (inp, slider, processVal) => {
            if(inp && slider) {
                inp.addEventListener('input', () => { 
                    slider.value = inp.value; 
                    if(processVal) processVal();
                    syncAndRecalc(); 
                });
                slider.addEventListener('input', () => { 
                    inp.value = slider.value; 
                    if(processVal) processVal();
                    syncAndRecalc(); 
                });
            }
        };

        attachSync(ui.inpSvgScale, ui.sliderSvgScale, () => {
            if (window.customSvgImageBaseW) {
                let scale = parseFloat(ui.inpSvgScale.value) || 0;
                let targetVW = Math.round((window.customSvgImageBaseW * scale) / 100);
                if(ui.inpSvgTargetW) ui.inpSvgTargetW.value = targetVW;
                if(ui.sliderSvgTargetW) ui.sliderSvgTargetW.value = targetVW;
            }
        });

        attachSync(ui.inpSvgTargetW, ui.sliderSvgTargetW, () => {
            if (window.customSvgImageBaseW) {
                let w = parseFloat(ui.inpSvgTargetW.value) || 0;
                let scale = ((w / window.customSvgImageBaseW) * 100).toFixed(1);
                if(ui.inpSvgScale) ui.inpSvgScale.value = scale;
                if(ui.sliderSvgScale) ui.sliderSvgScale.value = scale;
            }
        });

        attachSync(ui.inpSvgX, ui.sliderSvgX);
        attachSync(ui.inpSvgY, ui.sliderSvgY);
        
        window.customBgImage = null;
        if (ui.btnBgImgUpload && ui.inpBgImgUpload) {
            ui.btnBgImgUpload.addEventListener('click', () => { ui.inpBgImgUpload.click(); });
            ui.inpBgImgUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        window.customBgImage = img;
                        window.customBgImageBaseW = img.naturalWidth || img.width;
                        window.customBgImageBaseH = img.naturalHeight || img.height;
                        if (ui.inpBgImgScale) ui.inpBgImgScale.value = 100;
                        if (ui.sliderBgImgScale) ui.sliderBgImgScale.value = 100;
                        if (ui.inpBgImgX) ui.inpBgImgX.value = 0;
                        if (ui.sliderBgImgX) ui.sliderBgImgX.value = 0;
                        if (ui.inpBgImgY) ui.inpBgImgY.value = 0;
                        if (ui.sliderBgImgY) ui.sliderBgImgY.value = 0;
                        ui.btnBgImgClear.classList.remove('hidden');
                        if (ui.bgImgControls) {
                            ui.bgImgControls.classList.remove('hidden');
                            ui.bgImgControls.classList.add('flex');
                        }
                        recalcAll();
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
            ui.btnBgImgClear.addEventListener('click', () => {
                window.customBgImage = null;
                ui.btnBgImgClear.classList.add('hidden');
                if (ui.bgImgControls) {
                    ui.bgImgControls.classList.add('hidden');
                    ui.bgImgControls.classList.remove('flex');
                }
                ui.inpBgImgUpload.value = '';
                recalcAll();
            });
        }
        
        attachSync(ui.inpBgImgScale, ui.sliderBgImgScale);
        attachSync(ui.inpBgImgX, ui.sliderBgImgX);
        attachSync(ui.inpBgImgY, ui.sliderBgImgY);

        if(ui.inpProjName) {
            ui.inpProjName.addEventListener('input', (e) => {
                syncAndRecalc();
            });
        }
    }

    // Quick Grid Logic
    const btnQuickGridModal = document.getElementById('btnQuickGridModal');
    const modalQuickGrid = document.getElementById('modal-quick-grid');
    const btnCloseQuickGrid = document.getElementById('btn-close-quick-grid');
    const btnCancelQuickGrid = document.getElementById('btn-cancel-quick-grid');
    const btnExportQuickGrid = document.getElementById('btn-export-quick-grid');
    
    if (btnQuickGridModal && modalQuickGrid) {
        btnQuickGridModal.addEventListener('click', () => {
            modalQuickGrid.classList.remove('hidden');
            modalQuickGrid.classList.add('flex');
            setTimeout(() => {
                modalQuickGrid.classList.remove('opacity-0');
                modalQuickGrid.firstElementChild.classList.remove('scale-95');
                modalQuickGrid.firstElementChild.classList.add('scale-100');
            }, 10);
        });

        const closeQuickGrid = () => {
            modalQuickGrid.classList.add('opacity-0');
            modalQuickGrid.firstElementChild.classList.add('scale-95');
            modalQuickGrid.firstElementChild.classList.remove('scale-100');
            setTimeout(() => {
                modalQuickGrid.classList.add('hidden');
                modalQuickGrid.classList.remove('flex');
            }, 300);
        };

        btnCloseQuickGrid.addEventListener('click', closeQuickGrid);
        btnCancelQuickGrid.addEventListener('click', closeQuickGrid);

        btnExportQuickGrid.addEventListener('click', () => {
            const w = parseInt(document.getElementById('inpQG-resW').value) || 1920;
            const h = parseInt(document.getElementById('inpQG-resH').value) || 1080;
            const invert = document.getElementById('chkQG-invert').checked;
            const transparent = document.getElementById('chkQG-transparent').checked;
            const colorGrid = document.getElementById('chkQG-colorgrid') ? document.getElementById('chkQG-colorgrid').checked : false;
            
            mappingEngine.render({
                TW: w, TH: h, TrueW: w, TrueH: h,
                W: w, H: h, P: 1, R: 1, Ox: 0, Oy: 0,
                drawGrid: true, drawCircles: true, drawBlend: false, drawColorGrid: colorGrid, drawProjInfo: false,
                invertColors: invert,
                transparentBg: transparent
            });
            
            mappingExporter.exportImage(mappingEngine.canvas, w, h);
            
            recalcAll();
            closeQuickGrid();
        });
    }

    ui.exportBtn.addEventListener('click', () => {
        let fmt = 'true'; 
        if (ui.exportOptions) { for (let r of ui.exportOptions) { if (r.checked) fmt = r.value; } }
        let tw = val(ui.TW), th = val(ui.TH), eW = tw, eH = th;
        let trueW = parseInt(ui.txtTrueW.innerText) || tw;
        let trueH = parseInt(ui.txtTrueH.innerText) || th;
        
        let missingArea = (trueW > tw) || (trueH > th);
        if (missingArea) {
            const modalId = 'export-warning-modal';
            if(document.getElementById(modalId)) return;
            
            let modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm';
            modal.innerHTML = `
                <div class="bg-surface-lowest border border-rose-500/50 p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4">
                    <h3 class="text-rose-400 font-bold mb-3 flex items-center gap-2">
                        ⚠️ Missing Area 경고
                    </h3>
                    <div class="text-[13px] text-on-surface/80 leading-relaxed mb-4">
                        Missing Area(해상도 부족 영역)가 존재하여 패턴 정상 출력에 문제가 있을 수 있습니다.<br><br>
                        <strong>💡 해결 방법:</strong><br>
                        1. Array Settings에서 프로젝터 갯수를 늘려주세요.<br>
                        2. 우측 화면표시 옵션에서 'Info' 체크를 해제한 뒤 출력하세요.
                    </div>
                    <p class="text-[11px] text-rose-300 font-bold mb-4">계속해서 출력하시겠습니까?</p>
                    <div class="flex gap-3 justify-end mt-6">
                        <button id="btn-warn-cancel" class="px-4 py-2 hover:bg-[#484847] border border-outline-variant/15 text-on-surface/80 rounded text-xs transition-colors cursor-pointer">취소</button>
                        <button id="btn-warn-proceed" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 border border-rose-500 text-on-surface rounded text-xs font-bold transition-colors cursor-pointer">강제 출력</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('btn-warn-cancel').addEventListener('click', () => {
                modal.remove();
            });

            document.getElementById('btn-warn-proceed').addEventListener('click', () => {
                modal.remove();
                if (fmt === 'true') { eW = trueW; eH = trueH; }
                mappingExporter.exportImage(mappingEngine.canvas, eW, eH);
            });
            return;
        }

        if (fmt === 'true') { eW = trueW; eH = trueH; }
        mappingExporter.exportImage(mappingEngine.canvas, eW, eH);
    });

    // 7. Optical UI Elements
    const selGlobalProj = document.getElementById('bp-sel-proj');
    const selLens = document.getElementById('bp-sel-lens');
    const btnCeiling = document.getElementById('opt-btn-ceiling');
    const sliderCamX = document.getElementById('slider-cam-rotX');
    const sliderCamY = document.getElementById('slider-cam-rotY');
    const sliderCamZoom = document.getElementById('slider-cam-zoom');
    const btnCamReset = document.getElementById('btn-cam-reset');
    const btnCopyCam = document.getElementById('btn-copy-cam');

    // Model Selection Sync
    for (let key in projectorData) {
        let optG = document.createElement('option'); optG.value = key; optG.innerText = key;
        selGlobalProj.appendChild(optG);
    }

    function syncModelSelection(model, forceRes = true) {
        selGlobalProj.value = model;
        OpticalState.model = model;
        const res = projectorData[model].resolution;
        if (forceRes) {
            if (model === 'PT-REQ12BU') {
                if (ui.W) ui.W.value = Math.floor(res.w / 2);
                if (ui.H) ui.H.value = Math.floor(res.h / 2);
            } else {
                if (ui.W) ui.W.value = res.w; 
                if (ui.H) ui.H.value = res.h;
            }
        }
        
        const bpImage = document.getElementById('bp-image');
        if (bpImage) {
            bpImage.style.display = 'block'; // Reset display in case it was hidden by onerror
            bpImage.src = model + '.png';
        }

        const btnEdit = document.getElementById('btn-edit-custom-proj');
        if(btnEdit) { 
            if(model === 'Custom Setup') btnEdit.classList.remove('hidden');
            else btnEdit.classList.add('hidden');
        }
        
        const tut2 = document.getElementById('tutTarget_2');
        if(tut2) {
            if(model === 'Custom Setup') tut2.classList.remove('hidden');
            else tut2.classList.add('hidden');
        }

        // Update Bottom Panel Specs
        const currentModel = projectorData[model];
        if (currentModel) {
            const w = parseInt(ui.W.value) || currentModel.resolution.w;
            const h = parseInt(ui.H.value) || currentModel.resolution.h;
            
            let computedAR = "--";
            if (w === 3840 && h === 2400) computedAR = "16:10";
            else if (w === 2400 && h === 3840) computedAR = "10:16";
            else if (w === 3840 && h === 2160) computedAR = "16:9";
            else if (w === 2160 && h === 3840) computedAR = "9:16";
            else if (w === 1920 && h === 1200) computedAR = "16:10";
            else if (w === 1200 && h === 1920) computedAR = "10:16";
            else if (w === 1920 && h === 1080) computedAR = "16:9";
            else if (w === 1080 && h === 1920) computedAR = "9:16";
            else {
                let gcd = function(a, b) { return b ? gcd(b, a % b) : a; };
                let divisor = gcd(w, h);
                computedAR = `${w / divisor}:${h / divisor}`;
            }

            document.getElementById('bp-lumens').innerText = currentModel.lumens.toLocaleString();
            document.getElementById('bp-ar').innerText = computedAR;
            document.getElementById('bp-brand').innerText = currentModel.brand || 'Custom';
            
            // Update Active Resolution text and buttons
            
            const btnResNative = document.getElementById('bp-btn-res-native');
            const btnResHalf = document.getElementById('bp-btn-res-half');
            if (btnResNative && btnResHalf) {
                const isNative = w === currentModel.resolution.w && h === currentModel.resolution.h;
                const isHalf = w === Math.floor(currentModel.resolution.w / 2) && h === Math.floor(currentModel.resolution.h / 2);
                
                if (isNative) {
                    btnResNative.classList.add('bg-surface-highest', 'text-primary');
                    btnResNative.classList.remove('text-on-surface/40', 'hover:text-on-surface/80', 'bg-transparent');
                } else {
                    btnResNative.classList.add('text-on-surface/40', 'hover:text-on-surface/80', 'bg-transparent');
                    btnResNative.classList.remove('bg-surface-highest', 'text-primary');
                }
                
                if (isHalf) {
                    btnResHalf.classList.add('bg-surface-highest', 'text-primary');
                    btnResHalf.classList.remove('text-on-surface/40', 'hover:text-on-surface/80', 'bg-transparent');
                } else {
                    btnResHalf.classList.add('text-on-surface/40', 'hover:text-on-surface/80', 'bg-transparent');
                    btnResHalf.classList.remove('bg-surface-highest', 'text-primary');
                }
                
                btnResNative.innerText = `Native (${currentModel.resolution.w}×${currentModel.resolution.h})`;
                btnResHalf.innerText = `Half (${Math.floor(currentModel.resolution.w/2)}×${Math.floor(currentModel.resolution.h/2)})`;
            }
            
            if (currentModel.hardware) {
                document.getElementById('bp-type').innerText = currentModel.displayType || '--';
                document.getElementById('bp-weight').innerText = currentModel.hardware.weight || '--';
                document.getElementById('bp-power').innerText = currentModel.hardware.power || '--';
                if (currentModel.hardware.size) {
                    document.getElementById('bp-dim-w').innerText = currentModel.hardware.size.width || '--';
                    document.getElementById('bp-dim-h').innerText = currentModel.hardware.size.height || '--';
                    document.getElementById('bp-dim-d').innerText = currentModel.hardware.size.depth || '--';
                }
            }
        }

        syncLenses(); 
        autoFitTargetAxis();
    }

    function syncLenses(preserveSelection = false) {
        const prevLens = selLens.value;
        selLens.innerHTML = '';
        const modelKey = selGlobalProj.value;
        const currentModel = projectorData[modelKey];
        const lenses = currentModel.lenses;
        
        for (let key in lenses) {
            let opt = document.createElement('option');
            opt.value = key; 
            opt.innerText = lenses[key].type === 'Fixed' ? `${key} (고정)` : key;
            selLens.appendChild(opt);
        }
        OpticalState.model = modelKey;
        
        if (preserveSelection && lenses[prevLens]) {
            selLens.value = prevLens;
        } else if (!preserveSelection && currentModel.defaultLens && lenses[currentModel.defaultLens]) {
            selLens.value = currentModel.defaultLens;
        }
        
        OpticalState.lens = selLens.value;
        const curLens = lenses[selLens.value];
        OpticalState.tr = curLens.throwRatio.min;
        
        // Update Bottom Panel Lens Info
        if (curLens.throwRatio.min === curLens.throwRatio.max) {
            document.getElementById('bp-lens-tr').innerText = `TR: ${curLens.throwRatio.min.toFixed(2)}`;
        } else {
            document.getElementById('bp-lens-tr').innerText = `TR: ${curLens.throwRatio.min.toFixed(2)} ~ ${curLens.throwRatio.max.toFixed(2)}`;
        }
        
        const sliderDist = document.getElementById('opt-slider-dist');
        const sliderWidth = document.getElementById('opt-slider-width');
        const sliderZoom = document.getElementById('opt-slider-zoom');
        const sliderSv = document.getElementById('opt-slider-sv');
        const sliderSh = document.getElementById('opt-slider-sh');
        
        if (sliderDist) { sliderDist.min = 0; sliderDist.max = 100; sliderDist.step = 0.01; }
        if (sliderWidth) { sliderWidth.min = 0; sliderWidth.max = 100; sliderWidth.step = 0.01; }
        if (sliderZoom) {
            sliderZoom.min = curLens.throwRatio.min;
            sliderZoom.max = curLens.throwRatio.max;
            sliderZoom.value = OpticalState.tr;
        }

        if (sliderSv) {
            sliderSv.min = curLens.lensShift.v_down;
            sliderSv.max = curLens.lensShift.v_up;
        }
        if (sliderSh) {
            sliderSh.min = curLens.lensShift.h_left;
            sliderSh.max = curLens.lensShift.h_right;
        }

        updateOpticalMath('tr');
    }

    selGlobalProj.addEventListener('change', (e) => syncModelSelection(e.target.value));
    selLens.addEventListener('change', () => { syncLenses(true); });

    const btnResNative = document.getElementById('bp-btn-res-native');
    const btnResHalf = document.getElementById('bp-btn-res-half');
    if (btnResNative && btnResHalf) {
        btnResNative.addEventListener('click', () => {
            const currentModel = projectorData[OpticalState.model];
            if (currentModel && ui.W && ui.H) {
                ui.W.value = currentModel.resolution.w;
                ui.H.value = currentModel.resolution.h;
                syncModelSelection(OpticalState.model, false);
                recalcAll();
            }
        });
        btnResHalf.addEventListener('click', () => {
            const currentModel = projectorData[OpticalState.model];
            if (currentModel && ui.W && ui.H) {
                ui.W.value = Math.floor(currentModel.resolution.w / 2);
                ui.H.value = Math.floor(currentModel.resolution.h / 2);
                syncModelSelection(OpticalState.model, false);
                recalcAll();
            }
        });
    }

    // Optical Event Bindings
    document.getElementById('opt-slider-dist').addEventListener('input', (e) => {
        const S = parseFloat(e.target.value);
        const proj = projectorData[OpticalState.model];
        const arV = proj.resolution.w / proj.resolution.h;
        const curLens = proj.lenses[OpticalState.lens];
        const baseCutoffW = Math.sqrt((proj.lumens * arV) / (100 * Math.PI));
        const lMaxW = baseCutoffW * 2.0;
        const lMaxD = lMaxW * curLens.throwRatio.max;
        const lMinD = curLens.minScreenSize?.dist || 1.0;
        const staticCutoffD = baseCutoffW * ((curLens.throwRatio.min + curLens.throwRatio.max) / 2);
        
        OpticalState.dist = parseFloat(valueToMetric(S, lMinD, lMaxD, staticCutoffD).toFixed(3));
        updateOpticalMath('dist');
    });

    document.getElementById('opt-slider-width').addEventListener('input', (e) => {
        const S = parseFloat(e.target.value);
        const proj = projectorData[OpticalState.model];
        const arV = proj.resolution.w / proj.resolution.h;
        const curLens = proj.lenses[OpticalState.lens];
        const baseCutoffW = Math.sqrt((proj.lumens * arV) / (100 * Math.PI));
        const lMaxW = baseCutoffW * 2.0;
        
        OpticalState.width = parseFloat(valueToMetric(S, 0.5, lMaxW, baseCutoffW).toFixed(3));
        updateOpticalMath('width');
    });

    document.getElementById('opt-slider-zoom').addEventListener('input', (e) => {
        OpticalState.tr = parseFloat(e.target.value);
        updateOpticalMath('zoom');
    });

    document.getElementById('opt-inp-dist').addEventListener('change', (e) => {
        const val = parseFloat(e.target.value);
        if(!isNaN(val)) { OpticalState.dist = val; updateOpticalMath('dist'); }
    });

    document.getElementById('opt-inp-width').addEventListener('change', (e) => {
        const val = parseFloat(e.target.value);
        if(!isNaN(val)) { OpticalState.width = val; updateOpticalMath('width'); }
    });

    if(document.getElementById('opt-lock-zoom')) {
        document.getElementById('opt-lock-zoom').addEventListener('change', () => updateOpticalMath('dist'));
    }

    document.getElementById('opt-slider-sv').addEventListener('input', (e) => {
        OpticalState.sv = parseInt(e.target.value);
        updateOpticalMath('sv');
    });
    
    document.getElementById('opt-slider-sh').addEventListener('input', (e) => {
        OpticalState.sh = parseInt(e.target.value);
        updateOpticalMath('sh');
    });
    
    btnCeiling.addEventListener('click', () => {
        OpticalState.isCeiling = !OpticalState.isCeiling;
        document.getElementById('opt-header-mode').innerText = OpticalState.isCeiling ? "Ceiling Mount" : "Standard Front";
        drawOpticalDiagram();
    });

    // Camera Controls
    sliderCamX.addEventListener('input', (e) => { OpticalState.camRotX = parseInt(e.target.value); update3DView(); });
    sliderCamY.addEventListener('input', (e) => { OpticalState.camRotY = parseInt(e.target.value); update3DView(); });
    sliderCamZoom.addEventListener('input', (e) => { 
        OpticalState.camZoom = parseFloat(e.target.value); 
        const lbl = document.getElementById('txt-cam-zoom');
        if(lbl) lbl.innerText = OpticalState.camZoom.toFixed(1) + 'x';
        update3DView(); 
    });
    
    btnCamReset.addEventListener('click', () => {
                OpticalState.camRotX = -25; OpticalState.camRotY = 60; OpticalState.camZoom = 1.0;
        sliderCamX.value = -25; sliderCamY.value = 60; sliderCamZoom.value = 1.0;
        const lbl = document.getElementById('txt-cam-zoom');
        if(lbl) lbl.innerText = '1.0x';
        update3DView();
    });
    
    btnCopyCam.addEventListener('click', () => {
                OpticalState.camRotX = -25; OpticalState.camRotY = 60; OpticalState.camZoom = 1.0;
        sliderCamX.value = -25; sliderCamY.value = 60; sliderCamZoom.value = 1.0;
        const lbl = document.getElementById('txt-cam-zoom');
        if(lbl) lbl.innerText = '1.0x';
        update3DView();
        
        const originalText = btnCopyCam.innerHTML;
        btnCopyCam.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Reset!`;
        setTimeout(() => { btnCopyCam.innerHTML = originalText; }, 1500);
    });

    // Custom Projector Modal Logic
    const modalCustom = document.getElementById('modal-custom-proj');
    const btnEditCustom = document.getElementById('btn-edit-custom-proj');
    const btnCloseCustom = document.getElementById('btn-close-modal');
    const btnCancelCustom = document.getElementById('btn-cancel-custom');
    const btnSaveCustom = document.getElementById('btn-save-custom');

    function openCustomModal() {
        const cData = projectorData["Custom Setup"];
        const curLens = cData.lenses["Custom Lens"];
        document.getElementById('inpC-lumens').value = cData.lumens;
        document.getElementById('inpC-resW').value = cData.resolution.w;
        document.getElementById('inpC-resH').value = cData.resolution.h;
        document.getElementById('inpC-trMin').value = curLens.throwRatio.min;
        document.getElementById('inpC-trMax').value = curLens.throwRatio.max;
        document.getElementById('inpC-vUp').value = curLens.lensShift.v_up;
        document.getElementById('inpC-vDown').value = curLens.lensShift.v_down;
        document.getElementById('inpC-hRight').value = curLens.lensShift.h_right;
        document.getElementById('inpC-hLeft').value = curLens.lensShift.h_left;
        
        modalCustom.classList.remove('hidden');
        setTimeout(() => { modalCustom.classList.remove('opacity-0'); }, 10);
    }

    function closeCustomModal() {
        modalCustom.classList.add('opacity-0');
        setTimeout(() => { modalCustom.classList.add('hidden'); }, 300);
    }

    if(btnEditCustom) btnEditCustom.addEventListener('click', openCustomModal);
    if(btnCloseCustom) btnCloseCustom.addEventListener('click', closeCustomModal);
    if(btnCancelCustom) btnCancelCustom.addEventListener('click', closeCustomModal);
    if(btnSaveCustom) {
        btnSaveCustom.addEventListener('click', () => {
            projectorData["Custom Setup"] = {
                lumens: parseInt(document.getElementById('inpC-lumens').value) || 10000,
                resolution: { 
                    w: parseInt(document.getElementById('inpC-resW').value) || 1920, 
                    h: parseInt(document.getElementById('inpC-resH').value) || 1080 
                },
                lenses: {
                    "Custom Lens": {
                        throwRatio: { 
                            min: parseFloat(document.getElementById('inpC-trMin').value) || 1.5, 
                            max: Math.max(parseFloat(document.getElementById('inpC-trMin').value), parseFloat(document.getElementById('inpC-trMax').value)) || 2.0 
                        },
                        lensShift: {
                            v_up: parseInt(document.getElementById('inpC-vUp').value) || 0,
                            v_down: parseInt(document.getElementById('inpC-vDown').value) || 0,
                            h_right: parseInt(document.getElementById('inpC-hRight').value) || 0,
                            h_left: parseInt(document.getElementById('inpC-hLeft').value) || 0
                        }
                    }
                }
            };
            closeCustomModal();
            syncModelSelection("Custom Setup"); // Refresh everything
        });
    }

    // 8. Tutorial Initialization
    const uiBtnStart = document.getElementById('btnStartTut');
    const btnTutQuit = document.getElementById('tutQuit');
    if (uiBtnStart) uiBtnStart.addEventListener('click', startTutorial);
    if (btnTutQuit) btnTutQuit.addEventListener('click', stopTutorial);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isTutPlaying) stopTutorial();
    });

    // 9. Easter Egg Logic
    const easterEggLogo = document.getElementById('easterEggLogo');
    const toastEasterEgg = document.getElementById('toast-easter-egg');
    const modalEasterEgg = document.getElementById('modal-easter-egg');
    const btnEasterEggClose = document.getElementById('btnEasterEggClose');
    
    let easterClickCount = 0;
    let easterStartTime = 0;
    
    if (easterEggLogo) {
        easterEggLogo.addEventListener('click', () => {
            const now = Date.now();
            if (easterClickCount === 0 || (now - easterStartTime) > 10000) {
                easterClickCount = 1;
                easterStartTime = now;
            } else {
                easterClickCount++;
            }
            
            const remaining = 10 - easterClickCount;
            
            if (remaining <= 5 && remaining > 0) {
                toastEasterEgg.innerText = `숨겨진 메세지까지 ${remaining}단계 남았습니다.`;
                toastEasterEgg.classList.remove('opacity-0');
                
                // hide toast after 2 seconds
                clearTimeout(toastEasterEgg.hideTimeout);
                toastEasterEgg.hideTimeout = setTimeout(() => {
                    toastEasterEgg.classList.add('opacity-0');
                }, 2000);
            }
            
            if (easterClickCount >= 10 && (now - easterStartTime) <= 10000) {
                toastEasterEgg.classList.add('opacity-0');
                modalEasterEgg.classList.remove('hidden');
                setTimeout(() => { modalEasterEgg.classList.remove('opacity-0'); }, 10);
                easterClickCount = 0;
            }
        });
    }
    if (btnEasterEggClose) {
        btnEasterEggClose.addEventListener('click', () => {
            modalEasterEgg.classList.add('opacity-0');
            setTimeout(() => { modalEasterEgg.classList.add('hidden'); }, 500);
        });
    }

    // 10. Pan/Zoom Logic
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomReset = document.getElementById('btnZoomReset');
    
    let wrapScale = 1;
    let wrapTx = 0;
    let wrapTy = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    
    window.setManualZoom = function(scale, tx, ty) {
        wrapScale = scale;
        wrapTx = tx;
        wrapTy = ty;
        updateWrapTransform();
    };
    
    function updateWrapTransform() {
        if (canvasWrapper) {
            canvasWrapper.style.transform = `translate(${wrapTx}px, ${wrapTy}px) scale(${wrapScale})`;
        }
        
        // Apply transform to optical elements if they exist
        const view2D = document.querySelector('#opt-container-2d');
        if (view2D) {
            // Apply scale and translate to the contents of 2D view (both SVG containers)
            Array.from(view2D.children).forEach(child => {
                child.style.transform = `translate(${wrapTx}px, ${wrapTy}px) scale(${wrapScale})`;
                child.style.transformOrigin = 'center';
            });
        }
        
        const scene3D = document.getElementById('scene-3d');
        if (scene3D) {
            // we must retain the rotX and rotY which are set inline or by interaction
            // To do this simply, we can apply transform to the parent wrapper of scene-3d
            // which is the relative container
            const container3D = scene3D.parentElement;
            if (container3D && container3D.classList.contains('flex')) {
                container3D.style.transform = `translate(${wrapTx}px, ${wrapTy}px) scale(${wrapScale})`;
                container3D.style.transformOrigin = 'center';
            }
        }
    }
    
    function zoom(amount, cx, cy) {
        const oldScale = wrapScale;
        wrapScale = Math.max(0.1, Math.min(wrapScale + amount, 10));
        
        // Adjust translation to zoom around cx, cy (if provided)
        if (cx !== undefined && cy !== undefined && canvasWrapper) {
            const rect = canvasWrapper.parentElement.getBoundingClientRect();
            // Center of parent
            const pcx = rect.width / 2;
            const pcy = rect.height / 2;
            
            const dx = cx - rect.left - pcx;
            const dy = cy - rect.top - pcy;
            
            const scaleRatio = wrapScale / oldScale;
            wrapTx -= dx * (scaleRatio - 1);
            wrapTy -= dy * (scaleRatio - 1);
        }
        
        updateWrapTransform();
    }
    
    const viewOptical = document.getElementById('view-optical');
    if (viewOptical) {
        viewOptical.addEventListener('mousedown', (e) => {
            // Ignore if clicking on buttons
            if (e.target.tagName.toLowerCase() === 'button') return;
            isPanning = true;
            startX = e.clientX - wrapTx;
            startY = e.clientY - wrapTy;
            viewOptical.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        viewOptical.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.ctrlKey || e.metaKey) {
                // Zoom
                const amount = e.deltaY > 0 ? -0.1 : 0.1;
                zoom(amount);
            } else {
                // Pan
                wrapTx -= e.deltaX;
                wrapTy -= e.deltaY;
                updateWrapTransform();
            }
        }, { passive: false });
    }

    if (canvasWrapper) {
        // Panning
        canvasWrapper.addEventListener('mousedown', (e) => {
            if (isDraggingSvg || isDraggingBgImg) return;
            isPanning = true;
            startX = e.clientX - wrapTx;
            startY = e.clientY - wrapTy;
            canvasWrapper.classList.add('cursor-grabbing');
            canvasWrapper.classList.remove('cursor-grab', 'transition-transform', 'duration-75');
            e.preventDefault();
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            wrapTx = e.clientX - startX;
            wrapTy = e.clientY - startY;
            updateWrapTransform();
        });
        
        window.addEventListener('mouseup', () => {
            if (isPanning) {
                isPanning = false;
                if(canvasWrapper) {
                    canvasWrapper.classList.add('cursor-grab', 'transition-transform', 'duration-75');
                    canvasWrapper.classList.remove('cursor-grabbing');
                }
                if(viewOptical) {
                    viewOptical.style.cursor = '';
                }
            }
        });

        // Touch logic for mobile (Pan + Pinch Zoom)
        let initialPinchDist = null;
        let initialScale = 1;
        canvasWrapper.addEventListener('touchstart', (e) => {
            if (isDraggingSvg || isDraggingBgImg) return;
            canvasWrapper.classList.remove('transition-transform', 'duration-75');
            if (e.touches.length === 1) {
                isPanning = true;
                startX = e.touches[0].clientX - wrapTx;
                startY = e.touches[0].clientY - wrapTy;
            } else if (e.touches.length === 2) {
                initialPinchDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialScale = wrapScale;
            }
        }, {passive: false});

        canvasWrapper.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1 && isPanning) {
                wrapTx = e.touches[0].clientX - startX;
                wrapTy = e.touches[0].clientY - startY;
                updateWrapTransform();
            } else if (e.touches.length === 2 && initialPinchDist) {
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                wrapScale = Math.max(0.1, Math.min(initialScale * (dist / initialPinchDist), 10));
                updateWrapTransform();
            }
        }, {passive: false});

        canvasWrapper.addEventListener('touchend', (e) => {
            canvasWrapper.classList.add('transition-transform', 'duration-75');
            if (e.touches.length < 2) initialPinchDist = null;
            if (e.touches.length === 0) isPanning = false;
        });

        // Mouse Wheel Zoom
        canvasWrapper.parentElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const amount = e.deltaY > 0 ? -0.1 : 0.1;
            zoom(amount * wrapScale, e.clientX, e.clientY);
        }, { passive: false });
    }
    
    if (btnZoomIn) btnZoomIn.addEventListener('click', () => zoom(0.2));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => zoom(-0.2));
    if (btnZoomReset) {
        btnZoomReset.addEventListener('click', () => {
            wrapScale = 1;
            wrapTx = 0;
            wrapTy = 0;
            updateWrapTransform();
        });
    }

    // Initial Sync
    const btnRotateBottom = document.getElementById('bp-btn-rotate');
    if (btnRotateBottom) {
        btnRotateBottom.addEventListener('click', () => {
             if (ui.btnSwapRes) ui.btnSwapRes.click();
             syncModelSelection(OpticalState.model, false);
        });
    }

    syncModelSelection(selGlobalProj.value);
    recalcAll();
}

// Global Entry Point
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
