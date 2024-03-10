AFRAME.registerComponent("dragon-event", {
  init: function () {
    const el = this.el;

    // Écoutez l'événement de clic sur le dragon.
    el.addEventListener("click", function () {
      // Déclenchez l'animation de couchage du dragon.
      el.setAttribute(
        "animation",
        "property: rotation; to: 0 0 85; easing: linear; dur: 8000"
      );
      // Déclenchez l'animation de disparition du dragon.
      el.setAttribute(
        "animation__2",
        "property: visible; to: false; easing: linear; dur: 8000; delay: 8000"
      );
      // Déclenchez l'apparition d'un texte de victoire après la disparition du dragon, avec un délai de 8 secondes.
      el.sceneEl.querySelector("#victory-text").setAttribute("visible", true);

      //déclencher la musique
      el.sceneEl.querySelector("#epicmusic").components.sound.playSound();
      //stop la harp
      el.sceneEl.querySelector("#harp").components.sound.stopSound();
    });
  },
});
