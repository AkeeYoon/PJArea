const fs = require('fs');

function run() {
    let html = fs.readFileSync('PJArea_V2.1_Portable.html', 'utf8');

    // Find the end of CanvasEngine.render method
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
        fs.writeFileSync('PJArea_V2.1_Portable.html', html);
        console.log("Successfully injected the Overshoot Mask logic.");
    } else {
        if (html.includes('// 7. Overshoot Mask (Yellow)')) {
            console.log("Overshoot mask is already present.");
        } else {
            console.log("Target regex not found. Make sure the structure matches.");
        }
    }
}

run();
