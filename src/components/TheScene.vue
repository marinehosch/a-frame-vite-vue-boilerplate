<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import TheMainRoom from './TheMainRoom.vue';
  import TheLifeCubeRoom from './TheLifeCubeRoom.vue';
  import ThePhysicRoom from './ThePhysicRoom.vue';
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
      <!-- <img id="room-physic-out-texture" :src="`assets/main-room-from-physic-room.png`"> -->
      <!-- <img id="room-gol-out-texture" :src="`assets/main-room-from-gol-room.png`"> -->
      <!-- <img id="room-physic-texture" :src="`assets/physicRoom.png`"> -->
      <a-asset-item id="scene1" src="assets/floating_island.glb"></a-asset-item>
      <a-asset-item id="troll1" src="assets/troll1.glb"></a-asset-item>
      <a-asset-item id="harp" src="assets/harp.ogg" preload="auto" response-type="arraybuffer"></a-asset-item>
      <a-asset-item id="grunts" src="assets/littlegrunts.ogg" preload="auto" response-type="arraybuffer"></a-asset-item>
      <a-asset-item id="axe-blue" src="assets/blue_axe.glb"> </a-asset-item>
      <a-asset-item id="rocks" src="assets/rocks.glb"> </a-asset-item>
      <a-asset-item id="crystal" src="assets/crystal.glb"> </a-asset-item>
      <a-asset-item id="basket" src="assets/basket.glb"> </a-asset-item>


    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- <TheMainRoom :scale="scale" /> -->
      <!-- <a-plane
        position="0 0 0"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="white"
        opacity="0.5"
      ></a-plane>
      <a-box
        position="0 1 -5"
        height="2"
        color="red"
      ></a-box> -->
      <TheOceanRoom />
    </template>

 <!-- mis pour arriver direct dans TheOceanRoom -->
    <TheCameraRig position="1 300 -1" rotation="0 90 0"/>

  </a-scene>
</template>