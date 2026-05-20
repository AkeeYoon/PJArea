function updateOpticalMath(trigger) {
    const proj = projectorData[OpticalState.model];
    const tr = parseFloat(OpticalState.tr) || 1.6;
    const model = projectorData[OpticalState.model];
    const trMin = model.lenses[OpticalState.lens].throwRatio.min;
    const trMax = model.lenses[OpticalState.lens].throwRatio.max;
    
    // Read from mapping mode inputs to respect rotation
    const elInpW = document.getElementById('inpW');
    const elInpH = document.getElementById('inpH');
    const wPx = elInpW ? parseInt(elInpW.value) : model.resolution.w;
    const hPx = elInpH ? parseInt(elInpH.value) : model.resolution.h;
    const arVal = wPx / hPx;
    
    const curLens = model.lenses[OpticalState.lens];
    const baseCutoffW = Math.sqrt((model.lumens * arVal) / (100 * Math.PI));
    const lMaxW = baseCutoffW * 2.0; 
    const lMaxD = lMaxW * trMax;
    const lMinD = (curLens.minScreenSize && curLens.minScreenSize.dist) || 1.0;

    const maxWidthM = lMaxW;
    const minWidthM = 0.5;
    const maxDistM = lMaxD;
    const minDistM_val = lMinD;

    const elRangeDistMax = document.getElementById('opt-range-dist-max');
    const elRangeWidthMax = document.getElementById('opt-range-width-max');
    if (elRangeDistMax) elRangeDistMax.textContent = `${parseFloat(maxDistM).toFixed(1)}m`;
    if (elRangeWidthMax) elRangeWidthMax.textContent = `${parseFloat(maxWidthM).toFixed(1)}m`;

    const isLockedZ = document.getElementById('opt-lock-zoom') ? document.getElementById('opt-lock-zoom').checked : true;

    if (trigger === 'zoom' || trigger === 'tr') {
        OpticalState.dist = parseFloat((OpticalState.width * tr).toFixed(3));
    } else if (trigger === 'dist') {
        let currentWidth = Math.max(0.1, OpticalState.width);
        let newTR = OpticalState.dist / currentWidth;
        if (isLockedZ || newTR < trMin || newTR > trMax) {
            OpticalState.tr = isLockedZ ? tr : (newTR < trMin ? trMin : (newTR > trMax ? trMax : newTR));
            OpticalState.width = parseFloat((OpticalState.dist / OpticalState.tr).toFixed(3));
        } else {
            OpticalState.tr = parseFloat(newTR.toFixed(3));
        }
    } else if (trigger === 'width') {
        let currentDist = Math.max(0.1, OpticalState.dist);
        let newTR = currentDist / OpticalState.width;
        if (isLockedZ || newTR < trMin || newTR > trMax) {
            OpticalState.tr = isLockedZ ? tr : (newTR < trMin ? trMin : (newTR > trMax ? trMax : newTR));
            OpticalState.dist = parseFloat((OpticalState.width * OpticalState.tr).toFixed(3));
        } else {
            OpticalState.tr = parseFloat(newTR.toFixed(3));
        }
    }
    
    if (OpticalState.width > maxWidthM) OpticalState.width = parseFloat(maxWidthM.toFixed(3));
    if (OpticalState.width < minWidthM) OpticalState.width = parseFloat(minWidthM.toFixed(3));
    if (OpticalState.dist > maxDistM) OpticalState.dist = parseFloat(maxDistM.toFixed(3));
    if (OpticalState.dist < minDistM_val) OpticalState.dist = parseFloat(minDistM_val.toFixed(3));
    
    if (trigger === 'dist' || trigger === 'width') {
        OpticalState.tr = parseFloat((OpticalState.dist / OpticalState.width).toFixed(3));
    }

    const distM = OpticalState.dist;
    const widthM = OpticalState.width;
    const finalTR = OpticalState.tr;

    const cutoffW = Math.sqrt((proj.lumens * arVal) / (100 * Math.PI));
    const cutoffD = cutoffW * ((trMin + trMax) / 2); // Use average TR for stable UI distance mapping

    const barDist = document.getElementById('opt-range-bar-dist');
    const barWidth = document.getElementById('opt-range-bar-width');
    
    if (barDist) {
        const dMin = widthM * trMin;
        const dMax = widthM * trMax;
        const dLeft = metricToValue(dMin, minDistM_val, maxDistM, cutoffD);
        const dRight = metricToValue(dMax, minDistM_val, maxDistM, cutoffD);
        barDist.style.left = `${Math.max(0, dLeft)}%`;
        barDist.style.width = `${Math.max(0, Math.min(100 - dLeft, dRight - dLeft))}%`;
    }

    if (barWidth) {
        const wMin = distM / trMax;
        const wMax = distM / trMin;
        const wLeft = metricToValue(wMin, minWidthM, maxWidthM, cutoffW);
        const wRight = metricToValue(wMax, minWidthM, maxWidthM, cutoffW);
        barWidth.style.left = `${Math.max(0, wLeft)}%`;
        barWidth.style.width = `${Math.max(0, Math.min(100 - wLeft, wRight - wLeft))}%`;
    }

    const zoomFactor = trMax / finalTR;
    const elZoomFactor = document.getElementById('opt-zoom-factor');
    if (elZoomFactor) elZoomFactor.textContent = `(${zoomFactor.toFixed(2)}x)`;

    const elValDist = document.getElementById('opt-val-dist-m');
    const elValWidth = document.getElementById('opt-val-width-m');
    const elZoomVal = document.getElementById('opt-zoom-val');
    if (elValDist) elValDist.textContent = `${distM.toFixed(2)}m`;
    if (elValWidth) elValWidth.textContent = `${widthM.toFixed(2)}m`;
    if (elZoomVal) elZoomVal.innerText = finalTR.toFixed(2);
    
    const elRangeDistMin = document.getElementById('opt-range-dist-min');
    const elRangeWidthMin = document.getElementById('opt-range-width-min');
    if (elRangeDistMin) elRangeDistMin.textContent = `${minDistM_val.toFixed(1)}m`;
    if (elRangeWidthMin) elRangeWidthMin.textContent = `${minWidthM.toFixed(1)}m`;

    const sDist = document.getElementById('opt-slider-dist');
    const sWidth = document.getElementById('opt-slider-width');
    const sZoom = document.getElementById('opt-slider-zoom');
    const inpDist = document.getElementById('opt-inp-dist');
    const inpWidth = document.getElementById('opt-inp-width');
    
    const newValDist = metricToValue(distM, minDistM_val, maxDistM, cutoffD);
    const newValWidth = metricToValue(widthM, minWidthM, maxWidthM, cutoffW);
    
    if (sDist && Math.abs(newValDist - parseFloat(sDist.value)) > 0.05) sDist.value = newValDist;
    if (sWidth && Math.abs(newValWidth - parseFloat(sWidth.value)) > 0.05) sWidth.value = newValWidth;
    if (sZoom) sZoom.value = finalTR;
    if (inpDist) inpDist.value = distM.toFixed(2);
    if (inpWidth) inpWidth.value = widthM.toFixed(2);
    
    const heightM = widthM / arVal;
    const diagInch = Math.sqrt(widthM**2 + heightM**2) * 39.37;
    
    const elHeight = document.getElementById('opt-txt-height');
    const elWidthRes = document.getElementById('opt-txt-width-res');
    const elDiag = document.getElementById('opt-txt-diag');
    if (elHeight) elHeight.innerHTML = `${heightM.toFixed(2)}<span class="text-[10px] ml-1">m</span>`;
    if (elWidthRes) elWidthRes.innerHTML = `${widthM.toFixed(2)}<span class="text-[10px] ml-1">m</span>`;
    if (elDiag) elDiag.innerHTML = `${Math.round(diagInch)}<span class="text-[10px] ml-1">"</span>`;
    
    const svM = (OpticalState.sv / 100) * heightM;
    const shM = (OpticalState.sh / 100) * widthM;
    const elSvM = document.getElementById('opt-txt-sv-m');
    const elShM = document.getElementById('opt-txt-sh-m');
    const elSv = document.getElementById('opt-txt-sv');
    const elSh = document.getElementById('opt-txt-sh');
    if (elSvM) elSvM.textContent = `${svM >= 0 ? '+' : ''}${svM.toFixed(2)}m`;
    if (elShM) elShM.textContent = `${shM >= 0 ? '+' : ''}${shM.toFixed(2)}m`;
    if (elSv) elSv.textContent = `${OpticalState.sv}%`;
    if (elSh) elSh.textContent = `${OpticalState.sh}%`;

    const area = widthM * heightM || 1;
    const nits = Math.round(proj.lumens / (area * Math.PI));
    
    const mmPerPx = (widthM * 1000) / wPx;
    const elMmPx = document.getElementById('opt-txt-mmpx');
    if (elMmPx) elMmPx.innerText = `${mmPerPx.toFixed(2)} mm/px`;

    const elLux = document.getElementById('opt-txt-lux');
    const elLuxBar = document.getElementById('opt-bar-lux');
    const elLuxDesc = document.getElementById('opt-txt-lux-desc');
    
    let desc = "";
    let colorClass = "";
    
    if (nits < 100) {
        colorClass = "text-[#ff2a5f]";
        desc = "경고 상태 (너무 어두움)";
    } else if (nits < 200) {
        colorClass = "text-[#ffc107]";
        desc = "완전 암막 상태";
    } else if (nits <= 400) {
        colorClass = "text-primary";
        desc = "일반 전시 환경";
    } else {
        colorClass = "text-primary";
        desc = "밝은 실내 환경";
    }

    if (elLux) {
        elLux.innerText = `${nits} Nits`;
        elLux.className = "font-bold text-sm transition-colors duration-300 ";
        elLux.className += colorClass;
        if (elLuxDesc) {
            elLuxDesc.innerText = `"${desc}"`;
        }
    }
    
    if (elLuxBar) {
        const nitPct = Math.min(100, Math.max(0, (nits / 500) * 100)); 
        elLuxBar.style.left = `${nitPct}%`;
        elLuxBar.className = `absolute top-1/2 -translate-y-1/2 -ml-1.5 w-4 h-4 border-2 border-neutral-900 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 z-10 bg-current ${colorClass}`;
    }
    
    drawOpticalDiagram();
}

function drawOpticalDiagram() {
    drawSideView();
    drawTopView();
    if (OpticalState.viewMode === '3D') {
        update3DView();
    }
}

function drawSideView() {
    const rays = document.getElementById('side-svg-rays');
    const screen = document.getElementById('side-svg-screen');
    const projGroup = document.getElementById('side-svg-proj');
    if (!rays || !screen || !projGroup) return;
    
    const labDist = document.getElementById('side-lab-dist');
    const labH = document.getElementById('side-lab-h');
    
    const proj = projectorData[OpticalState.model];
    const ar = proj.resolution.w / proj.resolution.h;
    const hMeters = OpticalState.width / ar;
    
    const scale = 300 / Math.max(OpticalState.dist, 4);
    const dPx = OpticalState.dist * scale;
    const hPx = hMeters * scale;
    const startX = (500 - dPx) / 2;
    const projY = 250;
    
    projGroup.setAttribute('transform', `translate(${startX}, ${projY}) ${OpticalState.isCeiling ? 'rotate(180)' : ''}`);
    const shiftOffset = (OpticalState.sv / 100) * hPx * (OpticalState.isCeiling ? -1 : 1);
    const screenY = projY - (hPx/2) - shiftOffset;
    
    screen.setAttribute('x', startX + dPx);
    screen.setAttribute('y', screenY);
    screen.setAttribute('height', hPx);
    screen.setAttribute('width', 6);
    
    const dPath = `M ${startX+15} ${projY} L ${startX+dPx} ${screenY} L ${startX+dPx} ${screenY+hPx} Z`;
    rays.setAttribute('d', dPath);
    if (labDist) {
        labDist.textContent = `D: ${OpticalState.dist}m`;
        labDist.setAttribute('x', startX + dPx/2);
    }
    if (labH) { 
        labH.textContent = `H: ${hMeters.toFixed(2)}m`; 
        labH.setAttribute('x', startX + dPx + 30); 
        labH.setAttribute('y', projY); 
        labH.setAttribute('transform', `rotate(-90, ${startX + dPx + 30}, ${projY})`);
    }
}

function drawTopView() {
    const rays = document.getElementById('top-svg-rays');
    const screen = document.getElementById('top-svg-screen');
    const projGroup = document.getElementById('top-svg-proj');
    if (!rays || !screen || !projGroup) return;
    
    const labDist = document.getElementById('top-lab-dist');
    const labW = document.getElementById('top-lab-w');
    
    const scale = 300 / Math.max(OpticalState.dist, 4);
    const dPx = OpticalState.dist * scale;
    const wPx = OpticalState.width * scale;
    const startX = (500 - dPx) / 2;
    const projY = 250;
    
    projGroup.setAttribute('transform', `translate(${startX}, ${projY})`);
    
    const projRect = projGroup.querySelector('rect');
    if (projRect) {
        projRect.setAttribute('height', '50');
        projRect.setAttribute('y', '-25');
    }

    const hShiftOffset = (OpticalState.sh / 100) * wPx;
    const screenTop = projY - (wPx/2) + hShiftOffset;
    
    screen.setAttribute('x', startX + dPx);
    screen.setAttribute('y', screenTop);
    screen.setAttribute('width', '6');
    screen.setAttribute('height', wPx);
    
    const dPath = `M ${startX+15} ${projY} L ${startX+dPx} ${screenTop} L ${startX+dPx} ${screenTop+wPx} Z`;
    rays.setAttribute('d', dPath);
    if (labDist) {
        labDist.textContent = `D: ${OpticalState.dist}m`;
        labDist.setAttribute('x', startX + dPx/2);
    }
    if (labW) { 
        labW.textContent = `W: ${OpticalState.width.toFixed(2)}m`; 
        labW.setAttribute('x', startX + dPx + 30); 
        labW.setAttribute('y', projY); 
        labW.setAttribute('transform', `rotate(-90, ${startX + dPx + 30}, ${projY})`);
    }
}

function update3DView() {
    const screen = document.getElementById('opt-3d-screen');
    const beam = document.getElementById('opt-3d-beam');
    const labW = document.getElementById('lab-3d-w');
    const labH = document.getElementById('lab-3d-h');
    const labDist = document.getElementById('lab-3d-dist');
    const scene = document.getElementById('scene-3d');
    
    const fFront = document.getElementById('proj-f-front');
    const fBack = document.getElementById('proj-f-back');
    const fTop = document.getElementById('proj-f-top');
    const fBottom = document.getElementById('proj-f-bottom');
    const fRight = document.getElementById('proj-f-right');
    const fLeft = document.getElementById('proj-f-left');
    const fLabel = document.getElementById('proj-label');

    if (!screen || !beam || !scene || !fFront) return;

    const widthM = OpticalState.width;
    const distM = OpticalState.dist;
    const proj = projectorData[OpticalState.model];
    const ar = proj.resolution.w / proj.resolution.h;
    const heightM = widthM / ar;
    
    const SCALE_3D = 100;
    const wPx = widthM * SCALE_3D;
    const hPx = heightM * SCALE_3D;
    const dPx = distM * SCALE_3D;
    
    const vSh = (OpticalState.sv / 100) * hPx;
    const hSh = (OpticalState.sh / 100) * wPx;

    const baseViewWidth = 6000;
    const maxBound = Math.max(dPx, wPx, hPx, 200); 
    const fitScale = Math.min(15.0, (baseViewWidth / maxBound) * 0.07) * (OpticalState.camZoom || 1.0);

    const rotX = OpticalState.camRotX;
    const rotY = OpticalState.camRotY; 
    
    document.getElementById('txt-cam-rotX').innerText = `${rotX}°`;
    document.getElementById('txt-cam-rotY').innerText = `${rotY}°`;
    
    scene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${fitScale}, ${fitScale}, ${fitScale})`;
    scene.style.zIndex = "100";

    const centerOffset = -dPx / 2;

    const base = 'translate(-50%, -50%) ';
    const cr = OpticalState.isCeiling ? 'rotateX(180deg)' : '';
    
    const pH = 22.4; 
    const pW = 56.1; 
    const pD = 43.9; 

    [fFront, fBack, fTop, fBottom, fRight, fLeft].forEach(el => el.style.opacity = "1");

    fFront.style.width = `${pW}px`; fFront.style.height = `${pH}px`;
    fBack.style.width  = `${pW}px`; fBack.style.height  = `${pH}px`;
    fTop.style.width   = `${pD}px`; fTop.style.height   = `${pW}px`;
    fBottom.style.width= `${pD}px`; fBottom.style.height= `${pW}px`;
    fRight.style.width = `${pD}px`; fRight.style.height = `${pH}px`;
    fLeft.style.width  = `${pD}px`; fLeft.style.height = `${pH}px`;

    fFront.style.transform  = `${base} translate3d(${centerOffset}px, 0px, 0px) rotateY(90deg) ${cr}`;
    fBack.style.transform   = `${base} translate3d(${centerOffset - pD}px, 0px, 0px) rotateY(-90deg) ${cr}`;
    fTop.style.transform    = `${base} translate3d(${centerOffset - pD/2}px, -${pH/2}px, 0px) rotateX(90deg) ${cr}`;
    fBottom.style.transform = `${base} translate3d(${centerOffset - pD/2}px, ${pH/2}px, 0px) rotateX(-90deg) ${cr}`;
    fRight.style.transform  = `${base} translate3d(${centerOffset - pD/2}px, 0px, ${pW/2}px) ${cr}`;
    fLeft.style.transform   = `${base} translate3d(${centerOffset - pD/2}px, 0px, -${pW/2}px) rotateY(180deg) ${cr}`;

    fFront.innerHTML = `<div style="width: 25px; height: 25px; background: radial-gradient(circle, #000 30%, #111 60%, #333 100%); border-radius: 50%;"></div>`;
    fLeft.innerHTML = ``;
    
    const invScale = 1 / fitScale;
    const invScaleStr = `scale(${invScale})`;
    
    fLabel.innerText = OpticalState.model; 
    fLabel.style.transformOrigin = "center center";
    fLabel.style.transform = `${base} translate3d(${centerOffset - pD/2}px, ${pH/2 + 25}px, 0px) rotateY(${-rotY}deg) rotateX(${-rotX}deg) ${invScaleStr}`;

    // --- 4. Beam (SVG triangle) ---
    const beamPoly = beam.querySelector('polygon');
    const safeBeamLength = Math.max(0, dPx - 1); // Stop 1px short of screen to prevent Z-fighting intersection
    beam.setAttribute('width', safeBeamLength);
    beam.setAttribute('height', hPx);
    beam.setAttribute('viewBox', `0 0 ${safeBeamLength} ${hPx}`);
    beam.style.width = `${safeBeamLength}px`;
    beam.style.height = `${hPx}px`;
    beam.style.border = 'none';
    if (beamPoly) {
        beamPoly.setAttribute('points', `0,${hPx/2} ${safeBeamLength},0 ${safeBeamLength},${hPx}`);
    }
    
    const pitch = Math.atan2(vSh, dPx) * (180 / Math.PI);
    const yaw = Math.atan2(hSh, dPx) * (180 / Math.PI);
    
    beam.style.transform = `translate3d(${centerOffset}px, -${hPx/2}px, 0) rotateY(${-yaw}deg) rotateZ(${pitch}deg) translateZ(5px)`;

    screen.style.width = `${wPx}px`;
    screen.style.height = `${hPx}px`;
    screen.style.transformOrigin = "center center";
    screen.style.transform = `${base} translate3d(${centerOffset + dPx}px, ${vSh}px, ${hSh}px) rotateY(-90deg)`;

    labW.innerText = `W: ${widthM.toFixed(2)}m`;
    labW.style.fontSize = "16px";
    labW.style.transformOrigin = "center center";
    labW.style.transform = `${base} translate3d(${centerOffset + dPx}px, ${vSh - hPx/2 - 20}px, ${hSh}px) rotateY(-90deg) translateZ(8px) ${invScaleStr} translate(0, -60%)`;
    
    labH.innerText = `H: ${heightM.toFixed(2)}m`;
    labH.style.fontSize = "16px";
    labH.style.transformOrigin = "center center";
    labH.style.transform = `${base} translate3d(${centerOffset + dPx}px, ${vSh}px, ${hSh - wPx/2}px) rotateY(-90deg) translateZ(8px) ${invScaleStr} translate(-60%, 0)`;
    
    labDist.innerText = `D: ${distM.toFixed(2)}m`;
    labDist.style.fontSize = "26px"; 
    labDist.style.transformOrigin = "center center";
    labDist.style.transform = `${base} translate3d(${centerOffset}px, -${hPx/2}px, 0) rotateY(${-yaw}deg) rotateZ(${pitch}deg) translateX(${dPx/2}px) translateY(${hPx/2}px) translateZ(20px) ${invScaleStr}`;
}
