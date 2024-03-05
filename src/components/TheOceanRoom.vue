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

//logique du jeu : drop 2items pour changer le texte du troll
//length tableau items
//si tableau items.length = 2 alors changer le texte du troll
//si tableau items.length = 0 alors remettre le texte initial
//si tableau items.length = 1 alors remettre le texte initial
// récupérer l'emi du drop des items
//si drop alors push dans le tableau items
//si drop alors changer le texte du troll

let text = ref();
let text2 = ref("Congratulations, you have completed your mission, here your sword! Take it and be brave!");

const droppedItems = new Set();

document
  .addEventListener("ITEM_DROPPED_EVENT", function (event) {
    const pnj = document.getElementById("pnj");
    const droppedItemId = event.detail;
    droppedItems.add(droppedItemId);
    console.log("Item dropped:", droppedItemId);
    //changement de la valeur text en fonction des items droppés
    if (droppedItems.has("crystal") && droppedItems.has("rock")) {
      pnj.setAttribute("spawn-text", "value", "Good job! You have dropped two items! Here is your reward! Take the axe and go give to my friend up there!");
      document.getElementById("axe-blue").setAttribute("visible", "true");
    }
    else if (droppedItems.has("crystal") || droppedItems.has("rock")) {
      text.value = "Good job! You have dropped an item! Let's find the second one!";
    }
    else if (droppedItems.size === 0) {
      text.value = "Hello, I'm a troll! Drop me two items to get a reward!";
    }
  });

</script>

<template>
    <!-- Physic room navigation mesh -->
      <!-- <a-entity
        geometry="primitive: plane; height: 7; width: 7"
        position="0 300.01 0"
        rotation="-90 0 0"
        data-role="nav-mesh"
        material="color: green"
        visible="false"
        ></a-entity> -->
        <!-- <a-ocean id="ocean" color="green" position="0 300 0"  width="100" depth="100" density="30" speed="2" opacity="0.8"> -->
        
    <a-entity gltf-model="#scene1" position="-3 298.5 -1" scale="0.4 0.4 0.4" rotation="180 180 180" poolSize="2">
        <a-entity sound="src: #harp; volume:1; loop: true; autoplay: true; positional: false"></a-entity>      

      <a-entity
        id="pnj"
        position="-0.31192 5.60267 2.60866" 
        emit-when-near="distance: 3"
        :spawn-text="`value: ${text}`"
        sound="src: #grunts; volume: 3; loop: true; on: click; poolSize: 3"
        look-at
        >      
          <a-entity
            gltf-model="#troll1"
            animation-mixer
            scale="0.8 0.8 0.8"
            rotation="0 0 0"
          ></a-entity>
      </a-entity>


      <a-entity id="axe-blue"
        gltf-model="#axe-blue"
        position="0.5 6.5 2.5"
        scale="1 1 1"
        rotation="0 90 0"
        visible="false"
        clickable
        simple-grab
      ></a-entity>

      <a-entity id="crystal"
          gltf-model="#crystal"
          position="3 4 4"
          scale="0.005 0.005 0.005"
          rotation="0 90 0"
          visible="true"
          clickable
          simple-grab
        ></a-entity>

        <a-entity id="rock"
            gltf-model="#rocks"
            position="4 4 4"
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
          ></a-entity>

      <a-entity id="sword"
          gltf-model="#sword"
          position="21 12 8.5"
          scale="1 1 1"
          rotation="0 90 0"
          visible="false"
          clickable
          simple-grab
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
        label=""
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
          sound="src: #grunts; volume: 2; loop: true; on: click; poolSize: 2"
          :spawn-text="`value: ${{text}}`"
          
          look-at
          > 
      <a-entity
        id="troll2"
        animation-mixer
        gltf-model="#troll2"
        position=""
        scale="60 60 60"
        rotation="-0.83 0 5.9"
        visible="true"
        ></a-entity>
   </a-entity>

    </a-entity>  

</template>