AFRAME.registerComponent('music-toggle', {
  init: function () {
    const el = this.el;
    const music = document.querySelector('#bg-music');
    let playing = false;

    // Ensure A-Frame sound component is attached
    el.setAttribute('sound', {
      src: '#bg-music',
      autoplay: true,
      loop: true
    });

    // --- Background box ---
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', '1.5');
    bg.setAttribute('height', '0.4');
    bg.setAttribute('color', 'black');
    bg.setAttribute('opacity', '0.6');
    bg.setAttribute('side', 'double');
    bg.setAttribute('position', '0 0 0');

    // Create label
    const label = document.createElement('a-text');
    label.setAttribute('value', 'Music On');
    label.setAttribute('align', 'center');
    label.setAttribute('position', '0 1 0');
    label.setAttribute('color', '#fff');
    label.setAttribute('side', 'double');
    label.setAttribute('scale', '1.5 1.5 1.5');
    el.appendChild(label);

    this.label = label;

    // Toggle on click
    el.addEventListener('click', () => {
      if (!playing) {
        el.components.sound.playSound();
        label.setAttribute('value', 'Music On');
        playing = true; } 
      else {
        el.components.sound.pauseSound();
        label.setAttribute('value', 'Music Off');
        playing = false; }
    });
  },
  /*
  tick: function () {
    const camera = this.el.sceneEl.camera; // Billboard effect: always face camera
    if (!camera) return;

    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);

    this.wrapper.object3D.lookAt(camPos);
  }*/
});
