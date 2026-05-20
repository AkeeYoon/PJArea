const projectorData = {
    "PT-REQ12BU": {
        brand: "Panasonic",
        resolution: { w: 3840, h: 2400 },
        supportedRes: [
            { label: "WUXGA (1920x1200)", w: 1920, h: 1200 },
            { label: "4K UHD (3840x2400)", w: 3840, h: 2400 },
            { label: "FHD (1920x1080)", w: 1920, h: 1080 }
        ],
        aspectRatio: "16:10",
        lumens: 12000,
        defaultLens: "ET-C1W300",
        displayType: "1-Chip DLP (Laser)",
        hardware: {
            size: { width: 498, height: 212, depth: 648 },
            weight: "28.8 kg",
            power: "1050W"
        },
        lenses: {
            "ET-C1U100": { type: "Zoom", throwRatio: { min: 0.308, max: 0.330 }, lensShift: { v_up: 50, v_down: -50, h_right: 23, h_left: -23 } },
            "ET-C1U200": { type: "Fixed", throwRatio: { min: 0.380, max: 0.380 }, lensShift: { v_up: 0, v_down: 0, h_right: 0, h_left: 0 } },
            "ET-C1W300": { type: "Zoom", throwRatio: { min: 0.550, max: 0.690 }, lensShift: { v_up: 50, v_down: -50, h_right: 23, h_left: -23 } },
            "ET-C1W400": { type: "Zoom", throwRatio: { min: 0.680, max: 0.950 }, lensShift: { v_up: 60, v_down: -60, h_right: 29, h_left: -29 } },
            "ET-C1W500": { type: "Zoom", throwRatio: { min: 0.940, max: 1.390 }, lensShift: { v_up: 60, v_down: -60, h_right: 29, h_left: -29 } },
            "ET-C1S600": { type: "Zoom", throwRatio: { min: 1.360, max: 2.100 }, lensShift: { v_up: 60, v_down: -60, h_right: 29, h_left: -29 } },
            "ET-C1T700": { type: "Zoom", throwRatio: { min: 2.070, max: 3.380 }, lensShift: { v_up: 60, v_down: -60, h_right: 29, h_left: -29 } },
            "ET-C1T800": { type: "Zoom", throwRatio: { min: 3.340, max: 6.050 }, lensShift: { v_up: 60, v_down: -60, h_right: 29, h_left: -29 } }
        }
    },
    "EV-LD700ST": {
        brand: "xtrmVISION",
        resolution: { w: 1920, h: 1080 },
        aspectRatio: "16:9",
        lumens: 7000,
        displayType: "DLP (ALPD LASER)",
        hardware: {
            size: { width: 438, height: 99, depth: 334 },
            weight: "9.1 kg",
            power: "290W"
        },
        lenses: {
            "내장형": { type: "Fixed", throwRatio: { min: 0.49, max: 0.49 }, lensShift: { v_up: 0, v_down: 0, h_right: 0, h_left: 0 } }
        }
    },
    "EV-LD820U": {
        brand: "xtrmVISION",
        resolution: { w: 1920, h: 1200 },
        aspectRatio: "16:10",
        lumens: 8200,
        displayType: "1-Chip DLP (ALPD Laser)",
        hardware: {
            size: { width: 454, height: 177, depth: 454 },
            weight: "17 kg",
            power: "550W"
        },
        lenses: {
            "단초점 렌즈": { type: "Fixed", throwRatio: { min: 0.50, max: 0.50 }, lensShift: { v_up: 100, v_down: -100, h_right: 40, h_left: -40 } },
            "기본 줌 렌즈 (기본)": { type: "Zoom", throwRatio: { min: 1.23, max: 1.97 }, lensShift: { v_up: 100, v_down: -100, h_right: 40, h_left: -40 } }
        }
    },
    "Custom Setup": { lumens: 10000, resolution: { w: 1920, h: 1080 }, displayType: "Custom", hardware: { size: {width: 500, height: 200, depth: 500}, weight: "0 kg", power: "0 W" }, lenses: { "Custom Lens": { throwRatio: { min: 1.5, max: 2.0 }, lensShift: { v_up: 50, v_down: -50, h_right: 20, h_left: -20 } } } }
};

const Calculator = {
    calculateSystem: function (wallW, wallH, pw, ph, p, r, overlapPct) {
        const overlapX = pw * (overlapPct / 100);
        const totalW = pw * p - overlapX * (p - 1);
        const pixelOverlapX = Math.round(overlapX);
        return { totalW, pixelOverlapX };
    }
};

const OpticalState = {
    model: 'PT-REQ12BU',
    lens: 'ET-C1W300',
    dist: 5.0,    
    width: 3.125, 
    tr: 1.6,
    lock: 'dist',
    sv: 0,
    sh: 0,
    isCeiling: false,
    viewMode: '2D',
    camRotX: -25,
    camRotY: 60,
    camZoom: 1.0
};
