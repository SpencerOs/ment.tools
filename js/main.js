document.addEventListener("DOMContentLoaded", () => {
    const typedElement = document.getElementById("typed");
    if (!typedElement) return;
  
    const phrases = [
      "run large language models locally",
      "your data, your power",
      "offline; private; customizable;"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentPhrase = phrases[currentPhraseIndex];
      if (!isDeleting) {
        // Typing forward
        typedElement.textContent = "> " + currentPhrase.slice(0, currentCharIndex + 1);
        currentCharIndex++;
        if (currentCharIndex === currentPhrase.length) {
          // Pause then start deleting
          setTimeout(() => {
            isDeleting = true;
          }, 1000);
        }
      } else {
        // Deleting backward
        typedElement.textContent = "> " + currentPhrase.slice(0, currentCharIndex - 1);
        currentCharIndex--;
        if (currentCharIndex === 0) {
          isDeleting = false;
          // Move to next phrase
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
      }
      // Adjust typing speed
      const typingSpeed = isDeleting ? 50 : 80;
      setTimeout(type, typingSpeed);
    }
  
    type();
  });