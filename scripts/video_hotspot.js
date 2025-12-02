AFRAME.registerComponent('video-hotspot', {
    schema: {
      src: { type: 'string', default: '' },
      title: { type: 'string', default: '' }
    },

    init: function () {
      const el = this.el;
      const data = this.data;

      // Guard: must provide a video src
      if (!data.src) {
        console.warn('video-hotspot: missing "src" attribute');
        return;
      }

      // Add hover scale animations (optional but nice)
      el.setAttribute('animation__hover', {
        property: 'scale',
        startEvents: 'mouseenter',
        to: '1.6 1.6 1.6',
        dur: 150
      });
      el.setAttribute('animation__leave', {
        property: 'scale',
        startEvents: 'mouseleave',
        to: '1 1 1',
        dur: 150
      });

      // Handle click
      el.addEventListener('click', () => {
        // Reuse or create overlay
        VideoOverlay.show(data.src, data.title);
      });
    }
  });

  // Singleton Video Overlay Manager
  const VideoOverlay = {
    overlay: null,
    video: null,
    titleEl: null,
    closeBtn: null,

    init: function () {
      if (this.overlay) return; // already initialized

      // Create overlay container
      this.overlay = document.createElement('div');
      this.overlay.id = 'video-overlay';
      this.overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.92);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        font-family: Arial, sans-serif;
      `;

      // Title
      this.titleEl = document.createElement('h2');
      this.titleEl.style.cssText = `
        margin-bottom: 15px;
        text-align: center;
        max-width: 80%;
        word-wrap: break-word;
      `;

      // Close button
      this.closeBtn = document.createElement('button');
      this.closeBtn.innerHTML = '×';
      this.closeBtn.style.cssText = `
        position: absolute;
        top: 20px; right: 20px;
        background: #fff;
        color: #000;
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
      `;

      // Video element
      this.video = document.createElement('video');
      this.video.controls = true;
      this.video.playsInline = true;
      this.video.style.cssText = `
        max-width: 90vw;
        max-height: 70vh;
        width: auto;
        height: auto;
        outline: none;
      `;

      // Assemble DOM
      this.overlay.appendChild(this.closeBtn);
      this.overlay.appendChild(this.titleEl);
      this.overlay.appendChild(this.video);
      document.body.appendChild(this.overlay);

      // Close on button click or background click
      this.closeBtn.addEventListener('click', () => this.hide());
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.hide();
      });
    },

    show: function (src, title = '') {
      this.init(); // ensure DOM is ready

      // Update content
      this.titleEl.textContent = title;
      this.video.innerHTML = `<source src="${src}" type="video/mp4">`;

      // Reset & play
      this.video.load();
      this.overlay.style.display = 'flex';

      // Play after a tiny delay (some browsers need it)
      setTimeout(() => {
        this.video.play().catch(e => console.log('Autoplay blocked:', e));
      }, 100);
    },

    hide: function () {
      if (this.video) {
        this.video.pause();
        this.video.currentTime = 0;
      }
      this.overlay.style.display = 'none';
    }
  };
