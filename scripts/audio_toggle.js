AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: { type: 'string' },    // id of AUDIO ENTITY, not <audio>
    mode:   { default: 'pause' }   // 'pause' or 'restart'
  },

  init: function () {
    this.targetEl = document.querySelector(this.data.target);

    if (!this.targetEl) {
      console.error("audio-toggle: Target entity not found:", this.data.target);
      return;
    }

    // Ensure sound component exists
    this.el.addEventListener('click', () => {
      const sound = this.targetEl.components.sound;
      if (!sound) return;

      // ==== PAUSE / RESUME ====
      if (this.data.mode === 'pause') {
        if (sound.isPlaying) {
          sound.pauseSound();
        } else {
          sound.playSound();
        }
      }

      // ==== STOP + RESTART ====
      if (this.data.mode === 'restart') {
        if (sound.isPlaying) {
          sound.stopSound();
        } else {
          sound.playSound();
        }
      }
    });
  }
});
