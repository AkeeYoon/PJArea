const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let patches = 0;

// 1. Fix body scroll
html = html.replace(/<body[^>]*>/, match => {
    if (match.includes('style=')) {
        patches++;
        return match.replace('style="', 'style="height: 100dvh; ');
    } else {
        patches++;
        return match.replace('<body ', '<body style="height: 100dvh;" ');
    }
});

// 2. Fix modal layout
const targetModal = 'class="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 md:space-y-6"';
const replacementModal = 'class="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 md:space-y-6 flex-1 min-h-0"';
if (html.includes(targetModal)) {
    html = html.replace(targetModal, replacementModal);
    patches++;
}

// 3. Fix modal z-index
if (html.includes('backdrop-blur-sm z-[200]')) {
    html = html.replace('backdrop-blur-sm z-[200]', 'backdrop-blur-sm z-[300]');
    patches++;
}

// 4. Inject overshoot logic
const targetRegex = /ctx\.restore\(\);\s*\}\s*\}\s*ctx\.restore\(\);\s*\}\s*\}/;
const overshootCode = `                ctx.restore();
            }
        }

        // 7. Overshoot Mask (Yellow)
        if (TW > trueW || TH > trueH) {
            if (!data.drawQuickPattern) {
                const sx = (TW - trueW) / 2;
                const sy = (TH - trueH) / 2;

                ctx.save();
                ctx.beginPath();
                ctx.rect(0, 0, TW, TH);
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + trueH);
                ctx.lineTo(sx + trueW, sy + trueH);
                ctx.lineTo(sx + trueW, sy);
                ctx.closePath();
                ctx.clip("evenodd");

                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fillRect(0, 0, TW, TH);

                ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const step = 20;
                for (let d = -TH; d < TW + TH; d += step) {
                    ctx.moveTo(d, 0);
                    ctx.lineTo(d + TH, TH);
                }
                ctx.stroke();

                ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
                ctx.font = \`bold \${Math.max(16, Math.round(50 * tScale))}px 'Inter', sans-serif\`;
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
}`;

if (targetRegex.test(html)) {
    html = html.replace(targetRegex, overshootCode);
    patches++;
}

fs.writeFileSync('index.html', html);
console.log(`All patches applied to index.html successfully. Total patches: ${patches}`);
