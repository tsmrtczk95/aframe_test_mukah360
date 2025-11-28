AFRAME.registerComponent('music-toggle', {
  init: function () {
    const el = this.el;
    const music = document.querySelector('#bg-music');
    let playing = false;

    // Ensure A-Frame sound component is attached
    el.setAttribute('sound', {
      src: '#bg-music',
      autoplay: false,
      loop: true
    });

    // Create label
    const label = document.createElement('a-text');
    label.setAttribute('value', 'Music Off');
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
        playing = true;
      } else {
        el.components.sound.pauseSound();
        label.setAttribute('value', 'Music Off');
        playing = false;
      }
    });
  }
});
