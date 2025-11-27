AFRAME.registerComponent('portal-label', {
  schema: {
    text: {default: ''},
    offset: {default: '0 1 0'},
    width: {default: 1.5},    // width of textbox
    height: {default: 0.4},    // height of textbox
    backgroundColor: {default: 'black'},
    backgroundOpacity: {default: 0.6},
    textColor: {default: '#ffffff'},
    textScale: {default: 1}    //textScale in index.html: 1-Normal, 2-Double Size 4-Very Large
  },

  init: function () {
    const data = this.data;
    const offset = data.offset.split(' ').map(Number);

    const wrapper = document.createElement('a-entity');
    wrapper.object3D.position.set(offset[0], offset[1], offset[2]);

    // --- Background box ---
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', data.width);
    bg.setAttribute('height', data.height);
    bg.setAttribute('color', data.backgroundColor);
    bg.setAttribute('opacity', data.backgroundOpacity);
    bg.setAttribute('side', 'double');
    bg.setAttribute('position', '0 0 0');

    // --- Text label ---
    const label = document.createElement('a-text');
    label.setAttribute('value', data.text);
    label.setAttribute('align', 'center');
    label.setAttribute('color', data.textColor);
    label.setAttribute('side', 'double');
    // Added A-text scaling *important
    label.setAttribute('scale', `${data.textScale} ${data.textScale} ${data.textScale}`);
    label.setAttribute('width', data.width * 1.2 * data.textScale);  // auto-fit
    label.setAttribute('position', '0 0 0.01');     // slight forward

    wrapper.appendChild(bg);
    wrapper.appendChild(label);
    this.el.appendChild(wrapper);

    this.wrapper = wrapper;
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
