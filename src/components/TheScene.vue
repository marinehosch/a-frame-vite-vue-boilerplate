<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import TheMainRoom from './TheMainRoom.vue';
  import TheLifeCubeRoom from './TheLifeCubeRoom.vue';
  import TheOceanRoom from './TheOceanRoom.vue';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: black;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
    xr-mode-ui="XRMode: xr"
    physx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
    "
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: VR Gallery
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <a-asset-item id="room" src="assets/vr_gallery.glb"></a-asset-item>
      <!--
        Title: 3D Gallery for VR projects
        Model source: https://sketchfab.com/3d-models/3d-gallery-for-vr-projects-68f77ed8558c4bd59e0a13e2cc9d1fd1
        Model author: https://sketchfab.com/tekuto1s (tekuto1s)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <!-- <a-asset-item id="physic-room" src="assets/3d_gallery_for_vr_projects.glb"></a-asset-item> -->
      <a-asset-item id="sound-1" response-type="arraybuffer" src="assets/sound1.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="scene1" src="assets/floating_island.glb"></a-asset-item>
      <!-- Floating_island.glb  : 
        Title: "Floating island  [low poly] [VR]" 
        Model Source: (https://skfb.ly/6WzW9) by 
        Model author: pacoco  
        Model Licence: licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/) -->

      <a-asset-item id="troll1" src="assets/troll1.glb"></a-asset-item>
      <!-- "Trolls" (https://skfb.ly/orFVX) by adeshwalke is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->

      <a-asset-item id="harp" src="assets/harp.ogg" preload="auto" response-type="arraybuffer"></a-asset-item>
      <!-- Sound Effect from VWolfdog <a href="https://opengameart.org/content/soft-mysterious-harp-loop">OpenGameArt</a> -->

      <a-asset-item id="grunts" src="assets/littlegrunts.ogg" preload="auto" response-type="arraybuffer"></a-asset-item>
      <!-- Sound Effect from crueltyinc <a href="https://opengameart.org/content/little-grunts">OpenGameArt</a> -->

      <a-asset-item id="axe-blue" src="assets/blue_axe.glb"> </a-asset-item>
      <!-- "Dungeon Master's Axe" (https://skfb.ly/oOSSH) by Akilihin is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->

      <a-asset-item id="rocks" src="assets/rocks.glb"> </a-asset-item>
      <!-- "Simple Rocks - Low Poly" (https://skfb.ly/oKqSG) by Márcio Meireles is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->

      <a-asset-item id="crystal" src="assets/crystal.glb"> </a-asset-item>
      <!-- "Low poly Crystal (game ready asset)" (https://skfb.ly/oMQNt) by Pixel Life is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->
      
      <a-asset-item id="troll2" src="assets/troll2.glb"> </a-asset-item>
      <!-- "Troll" (https://skfb.ly/oOPZO) by AlexTripiana is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->

      <a-asset-item id="drop" src="assets/enchant.ogg" preload="auto" response-type="arraybuffer"> </a-asset-item>
      <!-- Sound Effect from P0ss <a href="https://opengameart.org/content/spell-sounds-starter-pack">OpenGameArt</a> -->
      
      <a-asset-item id="trollheh" src="assets/troll-heh.mp3" preload="auto" response-type="arraybuffer"> </a-asset-item>
      <!-- Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82650">Pixabay</a> -->

      <a-asset-item id="get" src="assets/blessing.ogg" preload="auto" response-type="arraybuffer"> </a-asset-item>
      <!-- Sound Effect from P0ss <a href="https://opengameart.org/content/spell-sounds-starter-pack">OpenGameArt</a> -->

      <a-asset-item id="red-sword" src="assets/red-sword.glb"> </a-asset-item>
      <!-- "Shattered crystal sword" (https://skfb.ly/ovwDV) by Julien Schoots is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). CC licence -->
      
      <a-asset-item id="skeleton_dragon" src="assets/skeleton_dragon.glb"> </a-asset-item>
      <!-- "Skeleton Dragon" (https://skfb.ly/oQz6n) by LivindorCreation is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->
     
      <a-asset-item id="second-island" src="assets/second_island.glb"> </a-asset-item>
      <!-- "Floating island" (https://skfb.ly/ouEVX) by Una.K.Carlstrøm is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). -->

      <a-asset-item id="epic-music" src="assets/epic-music.mp3"> </a-asset-item>
      <!-- Music by <a href="https://pixabay.com/fr/users/paulyudin-27739282/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=157062">Pavel Bekirov</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=157062">Pixabay</a> -->
    </a-assets>

    <template v-if="allAssetsLoaded">
      <TheOceanRoom />
    </template>

 <!-- mis pour arriver direct dans TheOceanRoom -->
    <TheCameraRig position="-0.5 300 -1" rotation="0 90 0"/>

  </a-scene>
</template>