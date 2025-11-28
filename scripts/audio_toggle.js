AFRAME.registerComponent('audio-toggle', {
  schema: {
    target: {type: 'selector'},      // <audio> element
    mode: {default: 'pause'},        // pause or stop
    label: {default: ''},
    textOffset: {default: '0 0.8 0'},
    textScale: {default: 1}
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // ---------- LABEL ----------
    const label = document.createElement('a-text');
    const off = data.textOffset.split(' ').map(Number);

    label.setAttribute('value', data.label);
    label.setAttribute('align', 'center');
    label.setAttribute('color', '#fff');
    label.setAttribute('side', 'double');
    label.setAttribute('scale', `${data.textScale} ${data.textScale} ${data.textScale}`);
    label.setAttribute('shader', 'msdf');            // better sharp text
    label.setAttribute('outline-color', '#000');     // custom outline shader
    label.setAttribute('outline-width', 0.4);  

    label.object3D.position.set(off[0], off[1], off[2]);

    // Add billboarding (always face camera)
    label.setAttribute('look-at', '[camera]');

    el.appendChild(label);

    // ---------- INTERACTION ----------
    el.addEventListener('click', () => {
      const audio = data.target.components.sound;

      if (!audio) return;

      if (data.mode === 'pause') {
        // ---------- PAUSE / RESUME ----------
        if (audio.isPlaying) {
          audio.pauseSound();
        } else {
          audio.playSound();
        }
      }

      if (data.mode === 'stop') {
        // ---------- STOP / RESTART ----------
        audio.stopSound();
        audio.playSound();
      }
    });
  },
  
  tick: function () {
    // Billboard effect: always face camera
    const camera = this.el.sceneEl.camera;
    if (!camera) return;

    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);

    this.wrapper.object3D.lookAt(camPos);
  }
});
