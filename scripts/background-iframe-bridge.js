/**
 * Background Iframe Bridge
 * 
 * This script creates a transparent overlay that captures mouse events
 * and forwards them to the background iframe. This is necessary because
 * iframes with z-index: -1 cannot receive native mouse events.
 * 
 * This approach combines:
 * - A transparent overlay at high z-index to capture events
 * - PostMessage forwarding to the iframe
 * - Pointer-events management to keep interactive elements working
 */

class BackgroundIframeBridge {
  constructor() {
    this.iframe = document.getElementById('dynamic-background');
    this.overlay = null;
    this.messageCount = 0;
    
    if (this.iframe) {
      this.init();
    }
  }

  init() {
    // Wait for iframe to load before setting up the bridge
    this.iframe.addEventListener('load', () => {
      console.log('🌉 Background iframe loaded, setting up mouse bridge');
      this.createOverlay();
      this.setupEventForwarding();
    });

    // If iframe is already loaded
    if (this.iframe.contentWindow) {
      console.log('🌉 Background iframe already loaded, setting up mouse bridge');
      this.createOverlay();
      this.setupEventForwarding();
    }
  }

  createOverlay() {
    // Create a transparent overlay that sits on top of everything
    // but allows pointer events to pass through to interactive elements
    this.overlay = document.createElement('div');
    this.overlay.id = 'background-mouse-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: auto;
      background: transparent;
    `;
    
    // Insert overlay right after the iframe
    this.iframe.parentNode.insertBefore(this.overlay, this.iframe.nextSibling);
    
    console.log('✅ Mouse capture overlay created');
  }

  setupEventForwarding() {
    if (!this.overlay) return;

    // Forward mouse move events from the overlay to the iframe
    this.overlay.addEventListener('mousemove', (e) => {
      this.forwardMouseEvent(e);
    });

    // Also forward from document as backup
    document.addEventListener('mousemove', (e) => {
      this.forwardMouseEvent(e);
    });

    console.log('🖱️ Mouse event forwarding active');
  }

  forwardMouseEvent(e) {
    if (!this.iframe?.contentWindow) return;

    try {
      this.iframe.contentWindow.postMessage({
        type: 'mousemove',
        x: e.clientX,
        y: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY
      }, '*');

      this.messageCount++;
      
      if (this.messageCount === 1) {
        console.log('✅ First mouse event sent to background iframe');
      }
      
      if (this.messageCount % 100 === 0) {
        console.log(`📤 Sent ${this.messageCount} mouse events to background`);
      }
    } catch (error) {
      if (this.messageCount === 0) {
        console.error('❌ Failed to send mouse events to background:', error);
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new BackgroundIframeBridge());
} else {
  new BackgroundIframeBridge();
}
