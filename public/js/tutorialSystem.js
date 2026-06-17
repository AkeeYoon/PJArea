const tutStepsMapping = [
    { target: 'tutTarget_1', title: '1. Physical Wall Size', desc: '가장 먼저 영상을 투사할 <strong>실제 스크린 구조물</strong>의 물리적인 크기를 기입합니다. 단위는 <strong>밀리미터(mm)</strong> 입니다. (예: 10m 스크린 -> 10000 기입)<br><br>입력 즉시 실시간으로 <code>Target Aspect Ratio (타겟 비율)</code>가 계산되어 표기됩니다.' },
    { target: 'bottom-spec-moved', title: '2. Projector Specs & Lens', desc: '현장에 실제로 보낼 프로젝터 스펙과 렌즈를 선택합니다.<br><br>기본 제공되는 프리셋 외에도 <strong>Custom Projector</strong>를 선택하면 투사 해상도 옵션(가로/세로)과 밝기 등을 직접 타이핑하여 커스텀 단말기 기반 렌더링을 진행할 수 있습니다.<br><br>또한 프로젝터 프리셋에 맞춰 하단에서 <strong>사용할 렌즈(Lens)</strong>의 투사 비율을 선택할 수 있으며, 이에 따라 오버랩과 필요한 프로젝터 대수가 달라집니다.' },
    { target: 'tutTarget_3', title: '3. Overlap Control', desc: '빛이 겹쳐 밝기를 혼합하는 가장자리 <strong>블렌딩(Edge Blending) 구간</strong>의 픽셀을 지정합니다.<br><br><span class="text-emerald-400 bg-emerald-900/40 px-1 py-0.5 rounded text-xs block mt-2">💡 팁: 초록색 뱃지가 뜨는 15~25% 비율을 타겟으로 조절하는 것이 실무상 빛 감쇠가 가장 자연스럽습니다.</span>' },
    { target: 'tutTarget_4', title: '4. Array Settings (Auto-Fit)', desc: '프로젝터를 스크린에 어떻게 배열할지 설정합니다.<br><br>새롭게 추가된 <strong>(+) / (-) 버튼</strong>을 클릭하여 손쉽게 대수를 증감할 수 있습니다.<br>만약 1줄로만 길게 쏜다면 <strong>[Lock Rows]</strong> 를 선택하고 세로(Rows) 숫자를 <strong>1</strong> 로 고정하십시오. 오토핏 알고리즘이 빈 벽을 채우고 초록색 오버랩을 유지하기 위해 <span class="text-rose-400 font-bold border-b border-rose-500">이상적인 반대쪽 댓수(Columns)를 자동 산출</span>합니다.' },
    { target: 'tutTarget_5', title: '5. Resolution Output', desc: '<span class="text-primary font-bold block mb-1">True Wall Resolution</span>우리가 찾던 결과물입니다! 디자이너가 미디어 아트를 제작할 때 캔버스 크기로 잡아야 할 <strong>실제 오버랩과 스크린 비율이 반영된 맞춤형 크롭 해상도</strong> 입니다.<br><br><span class="text-rose-400 text-xs mt-1 block">⚠️ 주의: 투사 면적이 벽면에 모자랄 경우 수치가 빨갛게 변하며 우측 화면에 MISSING AREA 빗금 구역이 생성됩니다. 이땐 기기를 추가 투입해야 합니다.</span><br><span class="text-yellow-400 text-xs block mt-1">💡 참고: 벽면을 넘치는 오버슛(Overshoot) 빛 영역은 우측 시각화 화면에서 노란색 빗금으로 표시됩니다.</span>' },
    { target: 'tutTarget_6', title: '6. Viewport Decor', desc: '가이드 맵 옵션입니다. <br><strong>Color Grid</strong> 모드를 활성화하면 화려한 HSL 타일이 입혀져 렌즈 왜곡을 잡을 때 유리합니다.<br><br><strong>Custom Guide Text</strong>로 텍스트를 커스텀하거나 <strong>Custom SVG (Floorplan)</strong> 기능으로 도면을 업로드하여 더욱 직관적인 맵핑 시안을 구성해 보세요.' },
    { target: 'tutTarget_7', title: '7. Export Result', desc: '설정이 끝났습니다! 우측 상단 <strong>Export Pattern</strong> 버튼을 눌러 투명 PNG 가이드 맵을 저장합니다.<br><br><span class="text-primary font-bold block mb-1">🎯 Target(타겟) 옵션:</span><span class="text-[11px] leading-relaxed block text-on-surface/80 mb-2 p-2 bg-surface-lowest rounded border border-outline-variant/30">- <strong>True Wall</strong>: 실제 벽면에 딱 떨어지는 크롭 해상도로 추출합니다.<br>- <strong>Total</strong>: 스크린 밖을 벗어나는 빛(오버슛) 영역 전체를 추출합니다.</span><span class="text-secondary font-bold block mb-1 mt-2">⚡ Quick Grid Export:</span>중앙 헤더의 <strong>Quick Grid</strong> 버튼을 누르면 인버트, 투명 배경, 컬러 그리드(Color Grid) 등의 옵션이 적용된 커스텀 사이즈 패턴을 빠르게 추출할 수 있습니다!' }
];

const tutStepsOptical = [
    { target: 'optTutTarget_1', title: '1. 투사 거리 & 화면 크기', desc: '프로젝터에서 스크린까지의 <strong>투사 거리(Throw Distance)</strong>와 <strong>화면 너비(Image Width)</strong>를 조절합니다.<br><br>세 개의 슬라이더는 서로 <strong>물리적으로 연동</strong>됩니다. 줌 렌즈가 잠금 상태이면 거리를 변경할 때 화면 크기가 자동으로 계산됩니다.<br><br><span class="text-primary bg-cyan-900/30 px-1 py-0.5 rounded text-xs block mt-2">💡 팁: 초록색 범위 막대가 현재 줌 렌즈로 가능한 유효 범위를 나타냅니다.</span>' },
    { target: 'optTutTarget_2', title: '2. 직접 입력 (미터 단위)', desc: '슬라이더 대신 정확한 숫자를 <strong>직접 입력</strong>할 수 있습니다.<br><br><strong>Distance</strong>: 프로젝터 렌즈~스크린 간 거리 (미터)<br><strong>Width</strong>: 투사되는 영상의 가로 폭 (미터)<br><br>입력 후 Enter 또는 포커스를 벗어나면 모든 수치가 즉시 재계산됩니다.' },
    { target: 'optTutTarget_3', title: '3. 렌즈 시프트', desc: '프로젝터의 <strong>렌즈 시프트(Lens Shift)</strong> 기능을 시뮬레이션합니다.<br><br><strong>Vertical Shift</strong>: 위/아래로 영상을 이동합니다. 높은 위치에 프로젝터를 설치할 때 사용합니다.<br><strong>Horizontal Shift</strong>: 좌/우로 영상을 이동합니다. 중앙이 아닌 위치에 설치할 때 사용합니다.<br><br>수치는 <strong>백분율(%)</strong>과 실제 <strong>미터(m)</strong>로 동시에 표시됩니다.' },
    { target: 'optTutTarget_4', title: '4. 밝기 게이지 (Nits)', desc: '현재 설정에서 스크린에 도달하는 <strong>추정 밝기(Estimated Brightness)</strong>를 Nits 단위로 보여줍니다.<br><br><span class="text-emerald-400 font-bold">200 Nits 이상</span>이면 밝은 환경에서도 선명하게 보입니다.<br><span class="text-orange-400 font-bold">100~200 Nits</span>는 어두운 환경에서 적합합니다.<br><span class="text-rose-400 font-bold">100 Nits 미만</span>은 매우 어두워 일반 상영에 부적합합니다.<br><br><span class="text-slate-400 text-xs">화면 크기가 커질수록 밝기는 반비례하여 줄어듭니다.</span>' },
    { target: 'optTutTarget_5', title: '5. 2D / 3D 시각화', desc: '우측 상단의 버튼으로 <strong>뷰 모드</strong>를 전환할 수 있습니다.<br><br><strong>2D Multi-View</strong>: 측면도(단면도)와 평면도를 동시에 표시합니다. 실제 설치 현장에서 천장~바닥 높이와 좌우 투사 범위를 한눈에 파악할 수 있습니다.<br><br><strong>3D Perspective</strong>: 프로젝터, 광선(빔), 스크린의 3차원 모델을 렌더링합니다. 프로젝터의 물리적 위치와 투사 경로를 직관적으로 확인할 수 있어 프레젠테이션 자료로도 활용 가능합니다.' }
];

let currentTutSteps = tutStepsMapping;
let tutActiveStep = 0;
let isTutPlaying = false;
let tutFrameId = null;

function updateTutHole() {
    if (!isTutPlaying) return;
    
    const steps = currentTutSteps;
    const s = steps[tutActiveStep];
    if (!s) return;
    
    const targetEl = document.getElementById(s.target);
    if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        
        const topOverlay = document.getElementById('tutOverlayTop');
        const bottomOverlay = document.getElementById('tutOverlayBottom');
        const leftOverlay = document.getElementById('tutOverlayLeft');
        const rightOverlay = document.getElementById('tutOverlayRight');
        const borderOverlay = document.getElementById('tutOverlayBorder');

        if (topOverlay && bottomOverlay && leftOverlay && rightOverlay && borderOverlay) {
            topOverlay.style.top = '0';
            topOverlay.style.left = '0';
            topOverlay.style.width = '100vw';
            topOverlay.style.height = `${Math.max(0, rect.top)}px`;

            bottomOverlay.style.top = `${rect.bottom}px`;
            bottomOverlay.style.left = '0';
            bottomOverlay.style.width = '100vw';
            bottomOverlay.style.height = `calc(100vh - ${rect.bottom}px)`;

            leftOverlay.style.top = `${rect.top}px`;
            leftOverlay.style.left = '0';
            leftOverlay.style.width = `${Math.max(0, rect.left)}px`;
            leftOverlay.style.height = `${rect.height}px`;

            rightOverlay.style.top = `${rect.top}px`;
            rightOverlay.style.left = `${rect.right}px`;
            rightOverlay.style.width = `calc(100vw - ${rect.right}px)`;
            rightOverlay.style.height = `${rect.height}px`;

            borderOverlay.style.top = `${rect.top}px`;
            borderOverlay.style.left = `${rect.left}px`;
            borderOverlay.style.width = `${rect.width}px`;
            borderOverlay.style.height = `${rect.height}px`;
        }
        
        const uiTutBox = document.getElementById('tutorialBox');
        const tutBoxMinimized = document.getElementById('tutBoxMinimized');
        if (uiTutBox) {
            const isMinimized = tutBoxMinimized && tutBoxMinimized.classList.contains('flex');
            positionTutBox(targetEl, uiTutBox, s.target, isMinimized);
        }
    }
    
    tutFrameId = requestAnimationFrame(updateTutHole);
}

function startTutorial() {
    if (isTutPlaying) return;
    isTutPlaying = true;
    document.body.classList.add('tutorial-active');
    
    const panelOpt = document.getElementById('panel-optical');
    const isOptical = (panelOpt && !panelOpt.classList.contains('hidden'));
    currentTutSteps = isOptical ? tutStepsOptical : tutStepsMapping;
    
    // Elevate viewport over backdrop
    const rightViewport = document.getElementById('rightViewport');
    if (rightViewport) rightViewport.style.zIndex = '102';

    tutActiveStep = 0;
    const uiTutBox = document.getElementById('tutorialBox');
    const tutBackdrop = document.getElementById('tutorialBackdrop');
    const tutOverlayBorder = document.getElementById('tutOverlayBorder');
    if (tutBackdrop) {
        tutBackdrop.classList.remove('hidden');
        if (tutOverlayBorder) tutOverlayBorder.classList.remove('hidden');
        setTimeout(() => tutBackdrop.classList.remove('opacity-0'), 10);
    }
    if (uiTutBox) {
        uiTutBox.classList.remove('hidden');
        setTimeout(() => { 
            uiTutBox.classList.remove('opacity-0', 'translate-y-4'); 
            showTutStep(tutActiveStep); 
            if (!tutFrameId) updateTutHole();
        }, 50);
    }
}

function stopTutorial() {
    isTutPlaying = false;
    document.body.classList.remove('tutorial-active');
    
    // Restore viewport z-index
    const rightViewport = document.getElementById('rightViewport');
    if (rightViewport) rightViewport.style.zIndex = '';

    if (tutFrameId) {
        cancelAnimationFrame(tutFrameId);
        tutFrameId = null;
    }
    clearTutHighlights();
    const uiTutBox = document.getElementById('tutorialBox');
    const tutBackdrop = document.getElementById('tutorialBackdrop');
    const tutOverlayBorder = document.getElementById('tutOverlayBorder');
    if (tutBackdrop) {
        tutBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            tutBackdrop.classList.add('hidden');
            if (tutOverlayBorder) tutOverlayBorder.classList.add('hidden');
        }, 300);
    }
    if (uiTutBox) {
        uiTutBox.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => { uiTutBox.classList.add('hidden'); }, 300);
    }
}

function clearTutHighlights() { 
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight')); 
}

function showTutStep(idx) {
    tutActiveStep = idx;
    clearTutHighlights();
    const steps = currentTutSteps;
    const s = steps[idx];
    if (!s) return;

    const oTutTitle = document.getElementById('tutTitle');
    const oTutDesc = document.getElementById('tutDesc');
    const oTutBadge = document.getElementById('tutStepBadge');
    const btnTutPrev = document.getElementById('tutPrev');
    const btnTutNext = document.getElementById('tutNext');
    const uiTutBox = document.getElementById('tutorialBox');
    
    // Toggle Logic
    const tutBoxContent = document.getElementById('tutBoxContent');
    const tutBoxMinimized = document.getElementById('tutBoxMinimized');
    const tutMinBtn = document.getElementById('tutMinBtn');
    const tutIconMin = document.getElementById('tutIconMin');
    const tutCloseBtn = document.getElementById('tutCloseBtn');
    const tutQuit = document.getElementById('tutQuit');
    
    if (tutQuit) tutQuit.onclick = stopTutorial;
    if (tutCloseBtn) tutCloseBtn.onclick = stopTutorial;
    
    // Safety
    if (tutMinBtn && tutBoxMinimized && tutBoxContent) {
        tutMinBtn.onclick = () => {
            tutBoxContent.classList.add('hidden');
            tutBoxMinimized.classList.remove('hidden');
            tutBoxMinimized.classList.add('flex');
            positionTutBox(targetEl, uiTutBox, s.target, true);
        };
        tutBoxMinimized.onclick = () => {
            tutBoxMinimized.classList.add('hidden');
            tutBoxMinimized.classList.remove('flex');
            tutBoxContent.classList.remove('hidden');
            positionTutBox(targetEl, uiTutBox, s.target, false);
        };
        
        // ensure default visible
        if (tutBoxMinimized.classList.contains('flex')) {
             tutBoxMinimized.classList.remove('flex');
             tutBoxMinimized.classList.add('hidden');
             tutBoxContent.classList.remove('hidden');
        }
    }
    
    if (tutIconMin) tutIconMin.innerText = idx + 1;

    if (oTutTitle) oTutTitle.innerHTML = `<span class="bg-primary text-on-primary font-display text-surface-lowest w-5 h-5 md:w-6 md:h-6 rounded-none flex items-center justify-center text-[10px] md:text-[12px] shrink-0">${idx + 1}</span> <span>${s.title}</span>`;
    if (oTutDesc) oTutDesc.innerHTML = s.desc;
    if (oTutBadge) oTutBadge.innerText = `${idx + 1} / ${steps.length}`;
    
    if (btnTutPrev) {
        btnTutPrev.style.visibility = idx === 0 ? 'hidden' : 'visible';
        btnTutPrev.onclick = () => showTutStep(idx - 1);
    }

    if (btnTutNext) {
        if (idx === steps.length - 1) {
            btnTutNext.innerHTML = 'Finish ✓';
            btnTutNext.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
            btnTutNext.classList.add('bg-emerald-500', 'hover:bg-emerald-400');
            btnTutNext.onclick = stopTutorial;
        } else {
            btnTutNext.innerHTML = 'Next ➔';
            btnTutNext.classList.remove('bg-emerald-500', 'hover:bg-emerald-400');
            btnTutNext.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
            btnTutNext.onclick = () => showTutStep(idx + 1);
        }
    }

    const targetEl = document.getElementById(s.target);
    
    // Switch to appropriate panel tracking the tutorial
    if (currentTutSteps === tutStepsMapping) {
        let activeBtnId = null;
        if (window.innerWidth < 768) {
            if (s.target === 'tutTarget_1' || s.target === 'bottom-spec-moved') {
                activeBtnId = 'btnModeSettings';
            } else if (s.target === 'tutTarget_3' || s.target === 'tutTarget_4' || s.target === 'tutTarget_5') {
                activeBtnId = 'btnModeMapping';
            } else if (s.target === 'tutTarget_6' || s.target === 'tutTarget_7') {
                activeBtnId = 'btnModeOutput';
            }
        } else {
            activeBtnId = 'btnModeMapping';
        }
        
        if (activeBtnId) {
            const btn = document.getElementById(activeBtnId);
            if (btn) btn.click();
        }
        // Trigger layout recalculation trick
        document.body.offsetWidth;
    }

    if (targetEl && uiTutBox) {
        targetEl.classList.add('tutorial-highlight');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Initial position
        const isMinimized = tutBoxMinimized && tutBoxMinimized.classList.contains('flex');
        positionTutBox(targetEl, uiTutBox, s.target, isMinimized);
    }
}

function positionTutBox(targetEl, uiTutBox, targetId, isMinimized = false) {
    if (!targetEl || !uiTutBox) return;
    const rect = targetEl.getBoundingClientRect();
    
    let topPos = rect.top;
    let leftPos = rect.right + 20;

    if (window.innerWidth < 768) {
        // Mobile Optimization
        if (isMinimized) {
            uiTutBox.style.width = '180px';
            leftPos = window.innerWidth - 190;
            topPos = window.innerHeight - 60 - 50; 
        } else {
            uiTutBox.style.width = 'calc(100vw - 40px)';
            leftPos = 20;
            let h = uiTutBox.offsetHeight || 250;
            
            if (targetId === 'bottom-spec-moved' || targetId === 'tutTarget_7') {
                topPos = 80; // top area
            } else {
                topPos = window.innerHeight - 60 - h - 5;
            }
        }
    } else {
        // Desktop Optimization
        if (isMinimized) {
            uiTutBox.style.width = '180px';
            leftPos = window.innerWidth - 200;
            topPos = window.innerHeight - 80;
        } else {
            uiTutBox.style.width = '380px';
            if (leftPos + 400 > window.innerWidth) {
                leftPos = rect.left - 400;
            }

            if (targetId === 'tutTarget_7' || targetId === 'optTutTarget_5') { 
                topPos = rect.bottom + 15; 
                leftPos = rect.right - 380; 
            } else if (targetId === 'bottom-spec-moved') {
                topPos = rect.top - (uiTutBox.offsetHeight || 300) - 20;
                leftPos = rect.left;
            } else if (targetId === 'tutTarget_4') {
                topPos = rect.top - 50;
            } else if (targetId === 'tutTarget_6' || targetId === 'optTutTarget_4') {
                topPos = rect.top - 150;
            }
            
            if (topPos + (uiTutBox.offsetHeight || 300) > window.innerHeight) { 
                topPos = window.innerHeight - (uiTutBox.offsetHeight || 300) - 20; 
            }
        }
    }

    if (topPos < 10) topPos = 70; 
    if (!isMinimized && leftPos < 10) leftPos = 10;
    if (!isMinimized && window.innerWidth >= 768 && leftPos + 400 > window.innerWidth) leftPos = window.innerWidth - 410;

    uiTutBox.style.top = `${topPos}px`;
    uiTutBox.style.left = `${leftPos}px`;
}
