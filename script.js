const fromLanguage = document.getElementById('fromLanguage');
const toLanguage = document.getElementById('toLanguage');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapBtn');

// Swap languages
swapBtn.addEventListener('click', () => {
    const tempLang = fromLanguage.value;
    fromLanguage.value = toLanguage.value;
    toLanguage.value = tempLang;
    
    // Also swap the text
    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
});

// Translate function using MyMemory API (free, no API key required)
async function translateText() {
    const text = inputText.value.trim();
    
    if (!text) {
        outputText.value = '';
        return;
    }

    const sourceLang = fromLanguage.value;
    const targetLang = toLanguage.value;

    // Prevent translation when source and target languages are the same
    if (sourceLang === targetLang) {
        outputText.value = text;
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );
        
        const data = await response.json();
        
        if (Number(data.responseStatus) === 200) {
            outputText.value = data.responseData.translatedText;
        } else {
            outputText.value = 'Translation failed. Please try again.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        outputText.value = 'Translation service unavailable. Please try again later.';
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }
}

// Event listeners
translateBtn.addEventListener('click', translateText);

// Optional: Translate on Enter key (Ctrl+Enter for multiline)
inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        translateText();
    }
});
