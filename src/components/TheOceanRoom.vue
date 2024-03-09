<script setup>
import '../aframe/spawn-text.js';
import PortalTeleporter from './PortalTeleporter.vue';
import '../aframe/emit-when-near.js';
import '../aframe/look-at.js';
import { copyPosition, copyRotation } from '../utils/aframe.js';
import '../aframe/bind-rotation.js';
import '../aframe/bind-position.js';
import '../aframe/simple-grab.js';
import { ref } from 'vue';

let text = ref("Hello, I'm a troll! Drop me two items to get a reward!");
let text2 = ref("Hello my friend! Have you something for me?");

const droppedItems = new Set();

document
  .addEventListener("ITEM_DROPPED_EVENT", function (event) {
    const pnj = document.getElementById("pnj");
    const droppedItemId = event.detail;
    droppedItems.add(droppedItemId);
    console.log("Item dropped:", droppedItemId);
    //changement de la valeur text en fonction des items droppés
  if (droppedItems.has("crystal") && droppedItems.has("rock")) {
      pnj.setAttribute("spawn-text", "value", "Good job! You have dropped two items! Here is your reward! Take the axe and go give it to my friend up there!");
    document.getElementById("axeblue").setAttribute("visible", "true");
    document.getElementById("rock").setAttribute("visible", "false");
    console.log(document.getElementById("crystal"));
    document.getElementById("crystal").remove();
    document.getElementById("dropzone").setAttribute("visible", "false");
    document.getElementById("pnj2").setAttribute("visible", "true");
    document.getElementById("dropzone2").setAttribute("visible", "true");

    }
  else if (droppedItems.has("crystal") || droppedItems.has("rock")) {
    text.value = "Good job! You have dropped an item! Let's find the second one!";
    }
    
  });

  document
  .addEventListener("ITEM_DROPPED_EVENT", function (event) {
    const pnj2 = document.getElementById("pnj2");
    const pnj1 = document.getElementById("pnj");
    const droppedItemId2 = event.detail;
    console.log("Item dropped 2:", droppedItemId2);
    if (droppedItems.has("axeblue")) {
      pnj2.setAttribute("spawn-text", "value", "Congratulations, you have completed your mission, here is your sword! Take it and be brave!");
      console.log(pnj2);
      console.log(pnj2.getAttribute("spawn-text"));
      document.getElementById("sword-el").setAttribute("visible", "true");
      console.log(document.getElementById("sword-el"));
      console.log(text2.value);
      pnj1.setAttribute("spawn-text", "value", "Have you got your sword yet? no? Go quickly see my friend up there! He's a bit ugly but he's a nice one");
    }
  });
</script>

<template>
  <a-entity gltf-model="#scene1" position="-3 298.5 -1" scale="0.4 0.4 0.4" rotation="180 180 180" poolSize="2">
    <a-entity sound="src: #harp; volume:1.5; loop: true; autoplay: true; positional: false"></a-entity>      
    <a-entity
        id="pnj"
        position="-0.31192 5.60267 2.60866" 
        emit-when-near="distance: 3"
        :spawn-text="`value: ${text}`"
        sound="src: #grunts; volume: 3; loop: true; on: click; poolSize: 3"
        look-at = "constrainVertically : true"
      >      
      <a-entity
        gltf-model="#troll1"
        animation-mixer
        scale="0.8 0.8 0.8"
        rotation="0 0 0"
      ></a-entity>
    </a-entity>

    <a-entity id="axeblue"
      gltf-model="#axe-blue"
      position="0.5 6.5 2.5"
      scale="1 1 1"
      rotation="0 90 0"
      visible="false"
      clickable 
      simple-grab
      sound="src: #get; volume: 1; on: GRAB; poolSize: 3"
    ></a-entity>

    <a-entity id="crystal"
      gltf-model="#crystal"
      position="2.340 4 -3.3"          
      scale="0.005 0.005 0.005"
      rotation="0 90 0"
      clickable
      simple-grab
    ></a-entity>

    <a-entity id="rock"
      gltf-model="#rocks"
      position="1.463 4 2"
      scale="0.05 0.05 0.05"
      rotation="0 90 0"
      visible="true"
      clickable
      simple-grab
    ></a-entity> 

    <a-entity
      id="dropzone"
      geometry="primitive: sphere; phiLength: 180; radius: 0.5; thetaLength: 90;"
      material="color: grey; side: double"
      position="0.67 5.7 1.8"
      rotation="90 0 45"
      visible="true"
      clickable
      simple-grab-drop-zone
      sound="src: #drop; volume: 2; on: ITEM_DROPPED_EVENT; poolSize: 3"
    ></a-entity>

    <a-entity
      id="dropzone2"
      geometry="primitive: sphere; phiLength: 180; radius: 0.5; thetaLength: 90;"
      material="color: black; side: double"
      position="22 12 8.5"
      rotation="90 0 45"
      visible="false"
      clickable
      simple-grab-drop-zone
      sound="src: #drop; volume: 2; on: ITEM_DROPPED_EVENT; poolSize: 3"
    ></a-entity>

      <a-entity id="sword-el"
      position="20.851 12.44621 10.543"
      rotation="25 -29.152092616256287 42.16453710147242"
      scale="0.5 0.5 0.5"
      gltf-model="#red-sword"
      clickable
      simple-grab
      visible="false"
      sound="src: #get; volume: 1; on: GRAB; poolSize: 3"
      ></a-entity>

    <PortalTeleporter id="portal-1"
      label="go"
      life-like-automaton="resolution: 256;"
      position="10.591 7 3.474"
      rotation="0 -110 0"
      :rot="145"
      :y="302.5"
      :x="7"
      :z="1"
    />

    <PortalTeleporter id="portal-2"
      label="go back"
      life-like-automaton="resolution: 256;"
      position="19.873 13.196 8"
      rotation="0 70 0"
      :rot="90"
      :y="300"
    />

    <a-entity
      id="pnj2"
      position="21.96 12.5 11.622" 
      emit-when-near="distance: 3"
      :spawn-text="`value: ${text2}`"
      sound="src: #trollheh; volume: 2; loop: false; on: click; poolSize: 3"
      look-at = "constrainVertically : true"
      visible="false"
    > 
      <a-entity
        id="troll2"
        gltf-model="#troll2"
        animation-mixer
        position=""
        scale="60 60 60"
        rotation="-0.83 0 5.9"
      ></a-entity>    
    </a-entity>

    <a-entity
      id="island2"
      gltf-model="#second-island"
      position="-6.803 -6.280 -48.569"
      rotation="180 180 180"
      scale="0.4 0.4 0.4"
    ></a-entity>

    <a-entity
        id="dragon"
        gltf-model="#skeleton_dragon"
        animation-mixer
        position="0 0.203 -48.646"
        scale="50 50 50"
        rotation="0.208 -0.742 -2.188"
        visible="true"
      ></a-entity>

      <PortalTeleporter id="portal-3"
      life-like-automaton="resolution: 256;"
      position="1.071 6.5181 -9.755"
      rotation="0 -9.845 0"
      :rot="90"
      :y="298"
      :z="-7"

    />

    <PortalTeleporter id="portal-4"
      life-like-automaton="resolution: 256;"
      position="-2.752 3.50 -33.719"
      rotation="0 180 0"
      :rot="90"
      :y="300"
    />
  </a-entity>  

</template>