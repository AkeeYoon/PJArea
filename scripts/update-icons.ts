import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// Replace the generic icons with precise ones
html = html.replace(
  '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>'
);

html = html.replace(
  '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2"/></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>'
);

html = html.replace(
  '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-8 8h16zM4 16h16v4H4z"/></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>'
);

html = html.replace(
  '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M5 4h14v2H5zm0 4h14v8H5z"/></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="14"></line><line x1="4" x2="20" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="10"></line><line x1="8" x2="8" y1="14" y2="3"></line><line x1="16" x2="16" y1="21" y2="14"></line><line x1="20" x2="20" y1="10" y2="3"></line></svg>'
);

// We need an exact cast icon for output
html = html.replace(
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" x2="2.01" y1="20" y2="20"></line></svg>'
);

html = html.replace(
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="14"></line><line x1="4" x2="20" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="10"></line><line x1="8" x2="8" y1="14" y2="3"></line><line x1="16" x2="16" y1="21" y2="14"></line><line x1="20" x2="20" y1="10" y2="3"></line></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="14"></line><line x1="4" x2="20" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="10"></line><line x1="8" x2="8" y1="14" y2="3"></line></svg>' // Simplified to look like preset sliders
);

// Better preset sliders
html = html.replace(
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="14"></line><line x1="4" x2="20" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="10"></line><line x1="8" x2="8" y1="14" y2="3"></line></svg>',
  '<svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="14"></line><line x1="4" x2="20" y1="10" y2="3"></line><circle cx="12" cy="14" r="2"></circle><circle cx="12" cy="3" r="2"></circle></svg>'
); // Close enough for now

// Change standard output header mode text style
html = html.replace(
  '<span id="opt-header-mode" class="text-primary font-normal normal-case tracking-normal italic text-[9px]">Standard Front</span>',
  '<span id="opt-header-mode" class="text-primary font-bold uppercase tracking-widest text-[9px]">STANDARD FRONT</span>'
);

fs.writeFileSync('index.html', html);
console.log('Icons updated.');
