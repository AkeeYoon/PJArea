const fs = require('fs');

function run() {
    let readme = fs.readFileSync('README.md', 'utf8');

    // Remove English AI lines
    readme = readme.replace(/> \*\*Vibe Coding\*\*: This project was developed using a Vibe Coding approach with AI assistance \(Claude 3\.5 Sonnet, Gemini 1\.5 Pro, Cursor, GitHub Copilot\)\.\n\n/g, '');
    readme = readme.replace(/- \*\*AI Integration\*\*: Integrated with the Gemini API for advanced capabilities and automated calculations\.\n/g, '');
    readme = readme.replace(/- \*\*Backend \/ AI\*\*: Google GenAI API \(`@google\/genai`\), Express\n/g, '');
    
    // Remove English AI Architecture section
    const engAiSection = /## ?¤– AI-Assisted Architecture \(Vibe Coding\)[\s\S]*?(?=## ??)/;
    readme = readme.replace(engAiSection, '');

    // Remove English Env Variables
    const engEnv = /### Environment Variables[\s\S]*?GEMINI_API_KEY=your_gemini_api_key_here\n```\n\n/;
    readme = readme.replace(engEnv, '');

    // Remove Korean AI lines
    readme = readme.replace(/> \*\*ë°”ì´ë¸?ì½”ë”©\(Vibe Coding\)\*\*: ???„ë¡œ?íŠ¸??AI\(Claude 3\.5 Sonnet, Gemini, Cursor ??)?€???ê·¹?ì¸ ?‘ì—…???µí•œ ë°”ì´ë¸?ì½”ë”© ë°©ì‹?¼ë¡œ ê°œë°œ?˜ì—ˆ?µë‹ˆ??.\n\n/g, '');
    readme = readme.replace(/- \*\*AI ?µí•©\*\*: Gemini API\(`@google\/genai`\) ?°ë™???µí•´ ê³ ë„?”ëœ ê³„ì‚° ë°??ë™??ê¸°ëŠ¥??ì§€?í•©?ˆë‹¤\.\n/g, '');
    readme = readme.replace(/- \*\*Backend \/ AI\*\*: Google GenAI API \(`@google\/genai`\), Express\n/g, '');

    // Remove Korean AI Architecture section
    const korAiSection = /## ?¤– AI ?‘ì—… ?„í‚¤?ì²˜ \(Vibe Coding\)[\s\S]*?(?=## ??)/;
    readme = readme.replace(korAiSection, '');

    // Remove Korean Env Variables
    const korEnv = /### ?˜ê²½ ë³€???¤ì •[\s\S]*?GEMINI_API_KEY=your_gemini_api_key_here\n```\n\n/;
    readme = readme.replace(korEnv, '');

    fs.writeFileSync('README.md', readme);
    console.log("README cleaned of AI references.");
}

run();
