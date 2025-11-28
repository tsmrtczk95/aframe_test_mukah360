AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: { type: 'string' },     // audio entity
    mode:   { default: 'pause' },   // 'pause' or 'restart'
    iconPlay:  { default: 'assets/icons/play.png' },
    iconPause: { default: 'assets/icons/pause.png' },
    iconStop:  { default: 'assets/icons/stop.png' }
  },

  init: function () {
    this.targetEl = document.querySelector(this.data.target);

    if (!this.targetEl) {
      console.error("audio-toggle: target not found:", this.data.target);
      return;
    }

    // Create icon element
    this.icon = document.createElement('a-image');
    this.icon.setAttribute('position', '0 0 0.6'); 
    this.icon.setAttribute('scale', '0.4 0.4 0.4');
    this.el.appendChild(this.icon);

    // Set initial icon
    if (this.data.mode === 'pause') {
      this.icon.setAttribute('src', this.data.iconPlay);
    } else {
      this.icon.setAttribute('src', this.data.iconStop);
    }

    this.el.addEventListener('click', () => this.handleClick());
  },

  handleClick: function () {
    const sound = this.targetEl.components.sound;
    if (!sound) return;

    // ========== PAUSE / RESUME MODE ==========
    if (this.data.mode === 'pause') {
      if (sound.isPlaying) {
        sound.pauseSound();
        this.icon.setAttribute('src', this.data.iconPlay);
      } else {
        sound.playSound();
        this.icon.setAttribute('src', this.data.iconPause);
      }
    }

    // ========== STOP / START (RESTART) MODE ==========
    if (this.data.mode === 'restart') {
      if (sound.isPlaying) {
        // Stop only
        sound.stopSound();
        this.icon.setAttribute('src', this.data.iconPlay);  // Now in "ready to start" state
      } else {
        // Play from start
        sound.playSound();
        this.icon.setAttribute('src', this.data.iconStop);  // Show stop icon while playing
      }
    }

  }
});
