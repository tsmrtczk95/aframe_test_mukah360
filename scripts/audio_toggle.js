AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: { type: 'string' },    // audio ID
    mode:   { default: 'pause' }   // 'pause' | 'restart'
  },

  init: function () {
    const audioEl = document.querySelector(this.data.target);

    if (!audioEl) {
      console.warn('[audio-toggle] Target audio element not found:', this.data.target);
      return;
    }

    // Ensure the audio component exists
    audioEl.addEventListener('loaded', () => {
      this.sound = audioEl.components.sound;
    });

    // Click handler
    this.el.addEventListener('click', () => {
      if (!this.sound) return;  // Prevents runtime error loop

      if (this.data.mode === 'pause') {
        if (this.sound.isPlaying) {
          this.sound.pauseSound();
        } else {
          this.sound.playSound();
        }
      }

      if (this.data.mode === 'restart') {
        this.sound.stopSound();
        this.sound.playSound();
      }
    });
  }
});
