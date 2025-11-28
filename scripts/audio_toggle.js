AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: { type: 'string' },    // audio id
    mode:   { default: 'pause' }   // 'pause' or 'restart'
  },

  init: function () {
    const audioEl = document.querySelector(this.data.target);
    const sound = audioEl.components.sound;

    this.el.addEventListener('click', () => {
      if (!sound) return;

      // --- TOGGLE TYPE 1: Pause / Resume ---
      if (this.data.mode === 'pause') {
        if (sound.isPlaying) {
          sound.pauseSound();
        } else {
          sound.playSound();
        }
      }

      // --- TOGGLE TYPE 2: Stop / Restart from Beginning ---
      if (this.data.mode === 'restart') {
        sound.stopSound();
        sound.playSound();
      }
    });
  }
});
