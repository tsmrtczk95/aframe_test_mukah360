AFRAME.registerComponent('portal-glow', {
  schema: {
    color: {default: '#00e5ff'},
    intensity: {default: 1.5}
  },
  init: function () {
    this.pulse = 0;
  },
  tick: function (t, dt) {
    this.pulse += dt / 1000;
    const scale = 1 + Math.sin(this.pulse * 2) * 0.1;
    this.el.setAttribute('scale', `${scale} ${scale} ${scale}`);

    // Glow animation via material emissive
    const glow = (Math.sin(this.pulse * 3) * 0.5 + 0.5) * this.data.intensity;
    this.el.setAttribute('material', 'emissive', this.data.color);
    this.el.setAttribute('material', 'emissiveIntensity', glow);
  }
});
