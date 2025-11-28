AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: { type: 'string' },    // id of AUDIO ENTITY, not <audio>
    mode:   { default: 'pause' },   // 'pause' or 'restart'
    iconPlay:  { default: 'icons/play.png' },
    iconPause: { default: 'icons/pause.png' },
    iconStop:  { default: 'icons/stop.png' }
  },

  init: function () {
    this.targetEl = document.querySelector(this.data.target);

    if (!this.targetEl) {
      console.error("audio-toggle: Target entity not found:", this.data.target);
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
    
    // Ensure sound component exists
    this.el.addEventListener('click', () => {
      const sound = this.targetEl.components.sound;
      if (!sound) return;

      // ==== PAUSE / RESUME ====
      if (this.data.mode === 'pause') {
        if (sound.isPlaying) {
          sound.pauseSound();
          this.icon.setAttribute('src', this.data.iconPlay);
        } else {
          sound.playSound();
          this.icon.setAttribute('src', this.data.iconPause);
        }
      }

      // ==== STOP + RESTART ====
      if (this.data.mode === 'restart') {
        if (sound.isPlaying) {
          sound.stopSound();
          this.icon.setAttribute('src', this.data.iconPlay);  // Now in "ready to start" state
        } else {
          sound.playSound();
          this.icon.setAttribute('src', this.data.iconStop);  // Show stop icon while playing
        }
      }
    });
  }
});
