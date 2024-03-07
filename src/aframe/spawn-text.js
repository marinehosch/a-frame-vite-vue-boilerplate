AFRAME.registerComponent("spawn-text", {
  schema: {
    value: { type: "string" },
  },

  init: function () {
    console.log("spawn-text init");
    let text = document.createElement("a-text");
    let el = this.el;
    let sound = this.data.sound;
    text.setAttribute("value", this.data.value);
    text.setAttribute("position", "0 2.6 0");
    text.setAttribute("visible", false);
    text.setAttribute("geometry", "primitive: plane; width: 7; height: 0.8");
    text.setAttribute(
      "material",
      "color: black; opacity: 0.7; side: double; transparent: true;"
    );
    text.setAttribute("align", "center");
    el.appendChild(text);

    el.addEventListener("click", function () {
      text.setAttribute("visible", "true");
    });

    el.addEventListener("unclick", function () {
      text.setAttribute("visible", "false");
      el.emit("stop-sound");
    });
    this.text = text;
  },

  update: function () {
    this.text.setAttribute("value", this.data.value);
  },
});
