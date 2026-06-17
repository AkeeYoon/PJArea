import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// The bottom panel starts at <div id="bottom-spec-panel" ... >
let startIdx = html.indexOf('<div id="bottom-spec-panel"');
if (startIdx !== -1) {
    let endIdx = html.indexOf('</main>', startIdx);
    
    // We want the inner HTML of the bottom panel.
    // It actually closes at line 760: </main> is at 762. So <div id="bottom-spec-panel" ... > ... </div> </div> </main> (Wait, why two </div>?)
    // One </div> is the panel. Another is <section>? "621:             </section>" 
    // No, <div id="bottom-spec-panel"> is a child of <main>.
    
    // Let's just find the exact block and replace it using string split.
    const block = html.substring(startIdx, endIdx);
    
    // It looks like: `<div id="bottom-spec-panel" ... > ... </div> </div>` 
    // Let's replace bottom-spec-panel class list to remove its physical placement on bottom,
    // actually, let's just leave it there conceptually, but hide it completely, and we copy its innards.
    // However, JS logic relies on IDs! We MUST move it, not copy.
    
    html = html.substring(0, startIdx) + '\n\n' + html.substring(endIdx);
    
    // `block` contains the bottom spec panel HTML + potentially an extra `</div>` that closes <main>.
    // Wait, <main> is closed at endIdx.
    // Let's extract everything inside `<div id="bottom-spec-panel" [^>]*>` and the last `</div>`.
    
    let innerContent = block.replace(/<div id="bottom-spec-panel"[^>]*>/, '').replace(/<\/div>\s*<\/div>\s*$/, '</div>'); // Remove the bottom panel container opening and just keep the inside. Wait, the `</div>` before `</main>` belongs to what?
    // Let's look at the structure earlier:
    // 175: <main>
    // 178: <aside>
    // 614: </aside> Wait, no. <section class="flex-1...">
    // 615: ...
    // 621: </section>
    // 624: <div id="bottom-spec-panel"> 
    // 760: </div>
    // 761: </div>
    // 762: </main>
    // Ah, there's an extra `</div>` at 761? Probably the mobile container or an unclosed div?
    // Let's just grab the whole thing and drop it into panel-settings.
    
    const panelInner = block.replace(/<div id="bottom-spec-panel"[^>]*>/, '<div id="bottom-spec-moved" class="flex flex-col gap-6 hide-scrollbar mb-10 pb-10">').replace(/<\/div>\s*<\/div>\s*$/, '</div>');

    html = html.replace('<!-- We will migrate the projector specs here -->', panelInner);
}

// Ensure the mobile nav doesn't have duplicates
html = html.replace(/<!-- Mobile Bottom Navigation -->\s*<!-- Mobile Bottom Navigation -->/g, '<!-- Mobile Bottom Navigation -->');

fs.writeFileSync('index.html', html);
console.log('Moved the details panel');
