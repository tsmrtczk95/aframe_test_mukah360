AFRAME.registerComponent('page-portal', {
  schema: {
    page: {type: 'string'}
  },
  init: function () {
    this.el.addEventListener('click', () => {
      window.location.href = this.data.page;
    });
  }
});
