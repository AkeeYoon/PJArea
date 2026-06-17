class CanvasEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d', { alpha: true });
        }
    }

    render(data) {
        if (!this.canvas || !this.ctx) return;
        
        const { TW, TH, W, H, P, R, Ox, Oy, drawCircles, drawGrid, drawBlend, colorX, colorY, WallW, WallH, LockedAxis, TrueW, TrueH } = data;
        const canvasW = Math.max(TW, TrueW || TW);
        const canvasH = Math.max(TH, TrueH || TH);
        
        this.canvas.width = canvasW;
        this.canvas.height = canvasH;
        const ctx = this.ctx;
        
        if (data.transparentBg) {
            ctx.clearRect(0, 0, canvasW, canvasH);
        } else {
            ctx.fillStyle = data.invertColors ? '#ffffff' : '#0e0e0e'; 
            ctx.fillRect(0, 0, canvasW, canvasH);
        }
        
        const offsetX = (canvasW - TW) / 2;
        const offsetY = (canvasH - TH) / 2;
        
        ctx.save();
        ctx.translate(offsetX, offsetY);
        
        // Background for projection area
        if (!data.transparentBg) {
            ctx.fillStyle = data.invertColors ? '#f8f8f8' : '#000000';
            ctx.fillRect(0, 0, TW, TH);
        }
        
        // 1.5 Custom Background Image Layer
        if (data.customBgImage) {
            ctx.save();
            let bgW = data.customBgImage.naturalWidth || data.customBgImage.width;
            let bgH = data.customBgImage.naturalHeight || data.customBgImage.height;
            let renderW = bgW * (data.bgScale !== undefined ? data.bgScale : 1);
            let renderH = bgH * (data.bgScale !== undefined ? data.bgScale : 1);
            let targetX = (data.bgX !== undefined ? data.bgX : 0);
            let targetY = TH - renderH - (data.bgY !== undefined ? data.bgY : 0);
            ctx.drawImage(data.customBgImage, targetX, targetY, renderW, renderH);
            ctx.restore();
        }
        
        const trueW = TrueW || TW;
        const trueH = TrueH || TH;
        const gThick = (data.gridThick !== undefined && !isNaN(data.gridThick)) ? data.gridThick : 2;
        const gThin = (data.gridThin !== undefined && !isNaN(data.gridThin)) ? data.gridThin : 1;

        // 2. Square Grid
        if (drawGrid) {
            const gridSize = 100;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const cx = TW / 2;
            const cy = TH / 2;
            
            ctx.save();
            ctx.beginPath();
            if (data.drawQuickPattern) {
                ctx.rect(-offsetX, -offsetY, canvasW, canvasH);
            } else {
                ctx.rect(0, 0, TW, TH);
            }
            ctx.clip();
            
            ctx.font = "bold 40px 'Inter', sans-serif";
            const boundW = data.drawQuickPattern ? canvasW : TW;
            const boundH = data.drawQuickPattern ? canvasH : TH;
            const stepsXLimit = Math.ceil(boundW / gridSize);
            const stepsYLimit = Math.ceil(boundH / gridSize);
            
            for (let i = -stepsXLimit; i <= stepsXLimit; i++) {
                for (let j = -stepsYLimit; j <= stepsYLimit; j++) {
                    const cellX = cx + (i * gridSize);
                    const cellY = cy + (j * gridSize);
                    
                    let inBounds = false;
                    if (data.drawQuickPattern) {
                        inBounds = (cellX + gridSize >= -offsetX && cellX <= canvasW - offsetX && cellY + gridSize >= -offsetY && cellY <= canvasH - offsetY);
                    } else {
                        inBounds = (cellX + gridSize >= 0 && cellX <= TW && cellY + gridSize >= 0 && cellY <= TH);
                    }
                    
                    if (inBounds) {
                        if (data.drawColorGrid) {
                            const normX = (i % 16 + 16) % 16;
                            const normY = (j % 16 + 16) % 16;
                            const colorIndex = (normX + normY) % 16;
                            ctx.fillStyle = `hsl(${colorIndex * 22.5}, 90%, 45%)`;
                            ctx.fillRect(cellX, cellY, gridSize, gridSize);
                            ctx.fillStyle = 'rgba(0,0,0,1)';
                            ctx.fillText(colorIndex.toString(16).toUpperCase(), cellX + gridSize / 2, cellY + gridSize / 2);
                        }
                    }
                }
            }
            
            ctx.font = "bold 15px 'JetBrains Mono', monospace";
            // Vertical lines
            let vLimitX = data.drawQuickPattern ? canvasW - offsetX : TW;
            let vMinX = data.drawQuickPattern ? -offsetX : 0;
            let vLimitY = data.drawQuickPattern ? canvasH - offsetY : TH;
            let vMinY = data.drawQuickPattern ? -offsetY : 0;
            
            for (let i = 0; cx + i * gridSize <= vLimitX || cx - i * gridSize >= vMinX; i++) {
                const isThick = (i % 5 === 0);
                const colorNorm = isThick ? 'rgba(0, 255, 200, 0.4)' : 'rgba(0, 255, 200, 0.15)';
                const colorInv = isThick ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)';
                ctx.strokeStyle = data.drawColorGrid ? (isThick ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)') : (data.invertColors ? colorInv : colorNorm);
                ctx.lineWidth = isThick ? gThick : gThin;
                if (cx + i * gridSize <= vLimitX) {
                    let rx = cx + i * gridSize;
                    ctx.beginPath(); ctx.moveTo(rx, vMinY); ctx.lineTo(rx, vLimitY); ctx.stroke();
                    if (isThick && i !== 0 && !data.drawColorGrid) { ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)'; ctx.fillText(i, rx, vMinY + 25); ctx.fillText(i, rx, vLimitY - 25); }
                }
                if (i !== 0 && cx - i * gridSize >= vMinX) {
                    let lx = cx - i * gridSize;
                    ctx.beginPath(); ctx.moveTo(lx, vMinY); ctx.lineTo(lx, vLimitY); ctx.stroke();
                    if (isThick && !data.drawColorGrid) { ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)'; ctx.fillText(-i, lx, vMinY + 25); ctx.fillText(-i, lx, vLimitY - 25); }
                }
            }
            // Horizontal lines
            for (let i = 0; cy + i * gridSize <= vLimitY || cy - i * gridSize >= vMinY; i++) {
                const isThick = (i % 5 === 0);
                const colorNorm = isThick ? 'rgba(0, 255, 200, 0.4)' : 'rgba(0, 255, 200, 0.15)';
                const colorInv = isThick ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)';
                ctx.strokeStyle = data.drawColorGrid ? (isThick ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)') : (data.invertColors ? colorInv : colorNorm);
                ctx.lineWidth = isThick ? gThick : gThin;
                if (cy + i * gridSize <= vLimitY) {
                    let by = cy + i * gridSize;
                    ctx.beginPath(); ctx.moveTo(vMinX, by); ctx.lineTo(vLimitX, by); ctx.stroke();
                    if (isThick && i !== 0 && !data.drawColorGrid) { ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)'; const ch = String.fromCharCode(97 + (i / 5 - 1)); ctx.fillText(ch, vMinX + 25, by); ctx.fillText(ch, vLimitX - 25, by); }
                }
                if (i !== 0 && cy - i * gridSize >= vMinY) {
                    let ty = cy - i * gridSize;
                    ctx.beginPath(); ctx.moveTo(vMinX, ty); ctx.lineTo(vLimitX, ty); ctx.stroke();
                    if (isThick && !data.drawColorGrid) { ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)'; const ch = String.fromCharCode(65 + (i / 5 - 1)); ctx.fillText(ch, vMinX + 25, ty); ctx.fillText(ch, vLimitX - 25, ty); }
                }
            }
            
            // True Wall Boundary
            const sx = (TW - trueW) / 2;
            const sy = (TH - trueH) / 2;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
            ctx.lineWidth = 4;
            ctx.strokeRect(sx, sy, trueW, trueH);
            ctx.restore();
        }

        // 3. Alignment Circles
        if (drawCircles) {
            const radius = Math.min(trueW, trueH) / 2;
            ctx.strokeStyle = data.invertColors ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            const cx = TW / 2;
            const cy = TH / 2;
            ctx.beginPath();
            if (trueW >= trueH) {
                const n = Math.ceil((trueW / 2) / (radius * 2)) + 1;
                for (let i = -n; i <= n; i++) {
                    const cX = cx + (i * radius * 2);
                    ctx.moveTo(cX + radius, cy);
                    ctx.arc(cX, cy, radius, 0, Math.PI * 2);
                }
            } else {
                const n = Math.ceil((trueH / 2) / (radius * 2)) + 1;
                for (let i = -n; i <= n; i++) {
                    const cY = cy + (i * radius * 2);
                    ctx.moveTo(cx + radius, cY);
                    ctx.arc(cx, cY, radius, 0, Math.PI * 2);
                }
            }
            ctx.stroke();
            
            // Center crosshair
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo((TW - trueW) / 2, cy); ctx.lineTo((TW + trueW) / 2, cy);
            ctx.moveTo(cx, (TH - trueH) / 2); ctx.lineTo(cx, (TH + trueH) / 2);
            ctx.stroke();
        }

        // 4. Projector Bounds & Blend Zones
        ctx.lineWidth = 2; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        for (let r = 0; r < R; r++) {
            for (let p = 0; p < P; p++) {
                const sx = p * (W - Ox);
                const sy = r * (H - Oy);
                if (drawBlend) {
                    ctx.strokeStyle = data.invertColors ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 255, 200, 0.5)';
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(sx, sy, W, H);
                }
                if (drawBlend && p < P - 1 && Ox > 0) {
                    ctx.fillStyle = hexToRgba(colorX || '#f97316', 0.15);
                    ctx.fillRect(sx + W - Ox, sy, Ox, H);
                }
                if (drawBlend && r < R - 1 && Oy > 0) {
                    ctx.fillStyle = hexToRgba(colorY || '#f97316', 0.15);
                    ctx.fillRect(sx, sy + H - Oy, W, Oy);
                }
                if (drawBlend && p < P - 1 && r < R - 1 && Ox > 0 && Oy > 0) {
                    ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
                    ctx.fillRect(sx + W - Ox, sy + H - Oy, Ox, Oy);
                }
                const cx = sx + (W / 2);
                const cy = sy + (H / 2);
                ctx.beginPath();
                ctx.strokeStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)';
                ctx.lineWidth = 2;
                ctx.moveTo(cx - 30, cy); ctx.lineTo(cx + 30, cy);
                ctx.moveTo(cx, cy - 30); ctx.lineTo(cx, cy + 30);
                ctx.stroke();
                
                if (data.drawProjInfo) {
                    const sF = Math.max(0.5, Math.min(W, H) / 1000);
                    ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                    ctx.font = `bold ${Math.round(80 * sF)}px 'Courier New', Courier, monospace`;
                    ctx.fillText(`P${p + 1} R${r + 1}`, cx, cy + (60 * sF));
                    ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 255, 200, 0.8)';
                    ctx.font = `${Math.round(30 * sF)}px 'Courier New'`;
                    ctx.fillText(`Res: ${W}x${H} | Offset: ${sx},${sy}`, cx, cy + (120 * sF));
                }
            }
        }

        // 5. Custom SVG Layer
        if (data.customSvgImage) {
            ctx.save();
            let imgW = data.customSvgImage.naturalWidth || data.customSvgImage.width;
            let imgH = data.customSvgImage.naturalHeight || data.customSvgImage.height;
            
            let baseRenderW = imgW;
            let baseRenderH = imgH;
            
            let renderW = baseRenderW * (data.svgScale !== undefined ? data.svgScale : 1);
            let renderH = baseRenderH * (data.svgScale !== undefined ? data.svgScale : 1);
            
            let targetX = (data.svgX !== undefined ? data.svgX : 0);
            // 0,0 is bottom-left mapping
            let targetY = TH - renderH - (data.svgY !== undefined ? data.svgY : 0);
            
            ctx.drawImage(data.customSvgImage, targetX, targetY, renderW, renderH);
            ctx.restore();
        }

        // 6. Center Main Info
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        const tScale = Math.max(0.7, Math.min(trueW, trueH) / 1500);
        ctx.shadowColor = data.invertColors ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10 * tScale;
        ctx.fillStyle = data.invertColors ? '#000000' : '#ffffff';
        ctx.font = `bold ${Math.round(130 * tScale)}px 'Inter', sans-serif`;
        ctx.fillText(data.projName || "PJ Area", TW / 2, TH / 2 - (320 * tScale));
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        ctx.font = `bold ${Math.round(60 * tScale)}px 'Inter', sans-serif`;
        ctx.fillText(`${trueW}px x ${trueH}px`, TW / 2, TH / 2 - (170 * tScale));
        
        ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        ctx.font = `bold ${Math.round(45 * tScale)}px 'Inter', sans-serif`;
        ctx.fillText(`AR ${(trueW / trueH).toFixed(2)}:1`, TW / 2, TH / 2 - (100 * tScale));
        
        ctx.font = `bold ${Math.round(45 * tScale)}px 'Inter', sans-serif`;
        ctx.fillText(`Grid[100]: ${(trueW / 100).toFixed(1)} x ${(trueH / 100).toFixed(1)} full squares`, TW / 2, TH / 2 - (40 * tScale));
        
        ctx.textAlign = "left"; ctx.font = "20px Arial"; ctx.fillStyle = data.invertColors ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 255, 200, 0.4)';
        ctx.fillText("0,0", 20, 30);
        ctx.textAlign = "right"; ctx.fillText(`${TW},${TH}`, TW - 20, TH - 20);

        // 6. Overflow/Shortage Mask
        if (trueW > TW || trueH > TH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                // Outer rect (True Wall)
                ctx.rect(sx, sy, trueW, trueH);
                // Inner rect (Projector Area - to be excluded)
                // Using counter-clockwise direction to create a hole
                ctx.moveTo(0, 0);
                ctx.lineTo(0, TH);
                ctx.lineTo(TW, TH);
                ctx.lineTo(TW, 0);
                ctx.closePath();
                ctx.clip("evenodd");

                // Fill the missing area with a semi-transparent red wash
                ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
                ctx.fillRect(sx, sy, trueW, trueH);

                // Draw diagonal stripes
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = sx - trueH; d < sx + trueW + trueH; d += step) {
                    ctx.moveTo(d, sy);
                    ctx.lineTo(d + trueH, sy + trueH);
                }
                ctx.stroke();

                // Draw text labels
                ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
                ctx.font = `bold ${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (sy < 0) {
                    const topY = sy / 2;
                    const botY = TH - (sy / 2);
                    ctx.fillText('MISSING AREA', TW / 2, topY);
                    ctx.fillText('MISSING AREA', TW / 2, botY);
                }
                if (sx < 0) {
                    ctx.save();
                    ctx.translate(sx / 2, TH / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText('MISSING AREA', 0, 0);
                    ctx.restore();
                    
                    ctx.save();
                    ctx.translate(TW - (sx / 2), TH / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText('MISSING AREA', 0, 0);
                    ctx.restore();
                }
                
                                ctx.restore();
            }
        }

        // 7. Overshoot Mask (Yellow)
        if (TW > trueW || TH > trueH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                // Outer rect (Projector Area)
                ctx.rect(0, 0, TW, TH);
                // Inner rect (True Wall - to be excluded)
                // Using counter-clockwise direction to create a hole
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + trueH);
                ctx.lineTo(sx + trueW, sy + trueH);
                ctx.lineTo(sx + trueW, sy);
                ctx.closePath();
                ctx.clip("evenodd");

                // Fill the overshoot area with a semi-transparent yellow wash
                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fillRect(0, 0, TW, TH);

                // Draw diagonal stripes
                ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = -TH; d < TW + TH; d += step) {
                    ctx.moveTo(d, 0);
                    ctx.lineTo(d + TH, TH);
                }
                ctx.stroke();

                // Draw text labels
                ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
                ctx.font = `bold ${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (sy > 0) {
                    const topY = sy / 2;
                    const botY = TH - (sy / 2);
                    ctx.fillText('OVERSHOOT', TW / 2, topY);
                    ctx.fillText('OVERSHOOT', TW / 2, botY);
                }
                if (sx > 0) {
                    ctx.save();
                    ctx.translate(sx / 2, TH / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                    
                    ctx.save();
                    ctx.translate(TW - (sx / 2), TH / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                }
                
                                ctx.restore();
            }
        }

        // 7. Overshoot Mask (Yellow)
        if (TW > trueW || TH > trueH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                // Outer rect (Projector Area)
                ctx.rect(0, 0, TW, TH);
                // Inner rect (True Wall - to be excluded)
                // Using counter-clockwise direction to create a hole
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + trueH);
                ctx.lineTo(sx + trueW, sy + trueH);
                ctx.lineTo(sx + trueW, sy);
                ctx.closePath();
                ctx.clip("evenodd");

                // Fill the overshoot area with a semi-transparent yellow wash
                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fillRect(0, 0, TW, TH);

                // Draw diagonal stripes
                ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = -TH; d < TW + TH; d += step) {
                    ctx.moveTo(d, 0);
                    ctx.lineTo(d + TH, TH);
                }
                ctx.stroke();

                // Draw text labels
                ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
                ctx.font = `bold ${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (sy > 0) {
                    const topY = sy / 2;
                    const botY = TH - (sy / 2);
                    ctx.fillText('OVERSHOOT', TW / 2, topY);
                    ctx.fillText('OVERSHOOT', TW / 2, botY);
                }
                if (sx > 0) {
                    ctx.save();
                    ctx.translate(sx / 2, TH / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                    
                    ctx.save();
                    ctx.translate(TW - (sx / 2), TH / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                }
                
                                ctx.restore();
            }
        }

        // 7. Overshoot Mask (Yellow)
        if (TW > trueW || TH > trueH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                // Outer rect (Projector Area)
                ctx.rect(0, 0, TW, TH);
                // Inner rect (True Wall - to be excluded)
                // Using counter-clockwise direction to create a hole
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + trueH);
                ctx.lineTo(sx + trueW, sy + trueH);
                ctx.lineTo(sx + trueW, sy);
                ctx.closePath();
                ctx.clip("evenodd");

                // Fill the overshoot area with a semi-transparent yellow wash
                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fillRect(0, 0, TW, TH);

                // Draw diagonal stripes
                ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = -TH; d < TW + TH; d += step) {
                    ctx.moveTo(d, 0);
                    ctx.lineTo(d + TH, TH);
                }
                ctx.stroke();

                // Draw text labels
                ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
                ctx.font = `bold ${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (sy > 0) {
                    const topY = sy / 2;
                    const botY = TH - (sy / 2);
                    ctx.fillText('OVERSHOOT', TW / 2, topY);
                    ctx.fillText('OVERSHOOT', TW / 2, botY);
                }
                if (sx > 0) {
                    ctx.save();
                    ctx.translate(sx / 2, TH / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                    
                    ctx.save();
                    ctx.translate(TW - (sx / 2), TH / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                }
                
                                ctx.restore();
            }
        }

        // 7. Overshoot Mask (Yellow)
        if (TW > trueW || TH > trueH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                // Outer rect (Projector Area)
                ctx.rect(0, 0, TW, TH);
                // Inner rect (True Wall - to be excluded)
                // Using counter-clockwise direction to create a hole
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + trueH);
                ctx.lineTo(sx + trueW, sy + trueH);
                ctx.lineTo(sx + trueW, sy);
                ctx.closePath();
                ctx.clip("evenodd");

                // Fill the overshoot area with a semi-transparent yellow wash
                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fillRect(0, 0, TW, TH);

                // Draw diagonal stripes
                ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = -TH; d < TW + TH; d += step) {
                    ctx.moveTo(d, 0);
                    ctx.lineTo(d + TH, TH);
                }
                ctx.stroke();

                // Draw text labels
                ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
                ctx.font = `bold ${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (sy > 0) {
                    const topY = sy / 2;
                    const botY = TH - (sy / 2);
                    ctx.fillText('OVERSHOOT', TW / 2, topY);
                    ctx.fillText('OVERSHOOT', TW / 2, botY);
                }
                if (sx > 0) {
                    ctx.save();
                    ctx.translate(sx / 2, TH / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                    
                    ctx.save();
                    ctx.translate(TW - (sx / 2), TH / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText('OVERSHOOT', 0, 0);
                    ctx.restore();
                }
                
                ctx.restore();
            }
        }
        
        ctx.restore();
    }
}

class Exporter {
    constructor(maxCanvasDimension) { this.maxCanvasDim = maxCanvasDimension || 16384; }
    
    async exportImage(sourceCanvas, cropW, cropH, format = 'image/png', quality = 1.0) {
        let exportCanvas = sourceCanvas;
        if (cropW && cropH && (cropW !== sourceCanvas.width || cropH !== sourceCanvas.height)) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropW;
            tempCanvas.height = cropH;
            const ctx = tempCanvas.getContext('2d');
            const cx = (sourceCanvas.width - cropW) / 2;
            const cy = (sourceCanvas.height - cropH) / 2;
            ctx.drawImage(sourceCanvas, cx, cy, cropW, cropH, 0, 0, cropW, cropH);
            exportCanvas = tempCanvas;
        }
        
        let tw = exportCanvas.width, th = exportCanvas.height;
        if (tw > this.maxCanvasDim || th > this.maxCanvasDim) {
            exportCanvas = this.getFallbackCanvas(exportCanvas, tw, th);
            format = 'image/jpeg';
            quality = 0.8;
            alert('Note: Resolution exceeded safe limits. Auto-scaled down, saved as JPEG.');
        }
        
        try {
            const dataUrl = exportCanvas.toDataURL(format, quality);
            this.downloadURI(dataUrl, `mapping_pattern_${tw}x${th}.png`);
        } catch (e) {
            alert("Export Failed: Browser memory limit exceeded.");
        }
    }

    getFallbackCanvas(src, w, h) {
        const scale = Math.min(this.maxCanvasDim / w, this.maxCanvasDim / h);
        const tc = document.createElement('canvas');
        tc.width = Math.floor(w * scale);
        tc.height = Math.floor(h * scale);
        const ctx = tc.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(src, 0, 0, tc.width, tc.height);
        return tc;
    }

    downloadURI(uri, name) {
        const l = document.createElement("a");
        l.download = name;
        l.href = uri;
        document.body.appendChild(l);
        l.click();
        document.body.removeChild(l);
    }
}

function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
