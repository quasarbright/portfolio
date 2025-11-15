/**
 * Background Mouse Listener
 * This script should be included in dynamic background pages (p5.js sketches, etc.)
 * to receive forwarded mouse events when used as a background iframe.
 * 
 * Usage: Add this script to your background HTML:
 * <script src="path/to/background-mouse-listener.js"></script>
 * 
 * Or copy this code directly into your background page.
 */

(function() {
  // Check if we're running as a background (has ?background=true parameter)
  const urlParams = new URLSearchParams(window.location.search);
  const isBackground = urlParams.get('background') === 'true';
  
  if (!isBackground) {
    console.log('Not running as background, using native mouse events');
    return;
  }
  
  console.log('🎨 Background mouse listener initialized');
  
  // Store the last received mouse position
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  // Listen for mouse events from parent window
  window.addEventListener('message', function(event) {
    // Accept messages from any origin (you can restrict this if needed)
    // if (event.origin !== 'expected-origin') return;
    
    const data = event.data;
    
    if (data.type === 'mousemove') {
      lastMouseX = data.x;
      lastMouseY = data.y;
      
      // Dispatch a synthetic mousemove event
      const syntheticEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: data.x,
        clientY: data.y,
        screenX: data.x,
        screenY: data.y,
        pageX: data.pageX || data.x,
        pageY: data.pageY || data.y
      });
      
      document.dispatchEvent(syntheticEvent);
      
      // Also update global mouseX/mouseY for p5.js compatibility
      if (typeof window.mouseX !== 'undefined') {
        window.mouseX = data.x;
        window.mouseY = data.y;
      }
    } else if (data.type === 'test') {
      console.log('🧪 Received test message:', data.message);
    }
  });
  
  // Provide a way for sketches to access the last mouse position
  window.getBackgroundMousePosition = function() {
    return { x: lastMouseX, y: lastMouseY };
  };
  
  console.log('✅ Background mouse listener ready');
})();
