// Test script to verify animations are working
console.log('Animation test script loaded');

// Check if IntersectionObserver is available
if ('IntersectionObserver' in window) {
  console.log('IntersectionObserver is available');
} else {
  console.log('IntersectionObserver is NOT available');
}

// Check if reveal elements exist
const revealElements = document.querySelectorAll('[data-reveal]');
console.log(`Found ${revealElements.length} reveal elements`);

// Check if main.js is loaded
if (typeof window.intersectionObserver !== 'undefined') {
  console.log('Main.js intersection observer is loaded');
} else {
  console.log('Main.js intersection observer is NOT loaded');
}

// Force add 'in' class to all reveal elements for testing
setTimeout(() => {
  revealElements.forEach(el => {
    el.classList.add('in');
  });
  console.log('Forced all reveal elements to be visible');
}, 1000);
