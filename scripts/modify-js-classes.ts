import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

js = js.replace(/btnMap.className = "[^"]*";/g, 'btnMap.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary/5";');
js = js.replace(/btnOpt.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all";/g, 'btnOpt.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-slate-500 hover:text-slate-300 transition-all border-transparent border-b-2 border-b-tertiary border-transparent";');

js = js.replace(/btnOpt.className = "[^"]*text-cyan-400[^"]*";/g, 'btnOpt.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary/5";');
js = js.replace(/btnMap.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all";/g, 'btnMap.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-slate-500 hover:text-slate-300 transition-all border-transparent border-b-2 border-b-tertiary border-transparent";');

js = js.replace(/btnView2D.className = "[^"]*bg-cyan-500[^"]*";/g, 'btnView2D.className = "px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-normal font-display transition-all bg-primary text-on-primary text-black shadow-none";');
js = js.replace(/btnView3D.className = "px-4 py-1.5 rounded-md text-\[10px\] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all";/g, 'btnView3D.className = "px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-normal font-display text-slate-500 hover:text-slate-300 transition-all";');

js = js.replace(/btnView3D.className = "[^"]*bg-cyan-500[^"]*";/g, 'btnView3D.className = "px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-normal font-display transition-all bg-primary text-on-primary text-black shadow-none";');
js = js.replace(/btnView2D.className = "px-4 py-1.5 rounded-md text-\[10px\] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all";/g, 'btnView2D.className = "px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-normal font-display text-slate-500 hover:text-slate-300 transition-all";');

js = js.replace(/text-cyan-400/g, 'text-primary');

fs.writeFileSync('public/js/main.js', js);
console.log('Fixed js classes');
