AFRAME.registerComponent("pnj-sound", {
  schema: {},
  init: function () {
    this.el.component.sound.play();
  },
});
