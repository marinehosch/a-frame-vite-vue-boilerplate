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

let text = ref("Toto");

//logique du jeu : drop 2items pour changer le texte du troll
//length tableau items
//si tableau items.length = 2 alors changer le texte du troll
//si tableau items.length = 0 alors remettre le texte initial
//si tableau items.length = 1 alors remettre le texte initial
// récupérer l'emi du drop des items
//si drop alors push dans le tableau items
//si drop alors changer le texte du troll

const dropzoneEl = document.getElementById('dropzone');
window.addEventListener('DOMContentLoaded', (event) => {
  dropzoneEl.addEventListener('dropped', this.handleDropped);
})
function handleDropped(e) {
  console.log('dropped', e.detail)
  if (e.detail.length === 2) {
    console.log('2 items dropped')
    text.value = "Merci"
  }
}
let itemsDropped = 0
const dropZone = document.getElementById('dropzone');
window.addEventListener('DOMContentLoaded', (event) => {
dropZone.addEventListener('dropped', (e) => {
  if (itemsDropped === 2) {
    console.log('itemsDropped', itemsDropped)
    text.value = "Merci"
    const axe = document.getElementById('axe-blue')
    axe.setAttribute('visible', 'true')
  }
})
})

//si text.value = "Merci" alors afficher l'axe

// const axe = document.getElementById('axe-blue')
// axe.setAttribute('visible', 'true')

//fonction pour vérifier si 2éléments dropped dans la zone de drop

// const dropZone = document.getElementById('dropzone');
// dropZone.addEventListener('dropped', (e) => {
//   console.log('dropped', e.detail)
// si 2 éléments dropped :
//   if (e.detail.length === 2) {
//     console.log('2 items dropped')
//     text.value = "Merci"
// rendre la hache visible
//     const axe = document.getElementById('axe-blue')
//     axe.setAttribute('visible', 'true')
//   }
// })

//   }

// })


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
        
    <a-entity gltf-model="#scene1" position="-3 298.5 -1" scale="0.4 0.4 0.4" rotation="180 180 180" poolSize="">
        <a-entity sound="src: #harp; volume:1; loop: true; autoplay: true; positional: false"></a-entity>      

      <a-entity
        id="pnj"
        position="-0.31192 5.60267 2.60866" 
        emit-when-near="distance: 3"
        :spawn-text="`value: ${text}`"
        sound="src: #grunts; volume: 2; loop: true; on: click"
        look-at
        >      
          <a-entity
            gltf-model="#troll1"
            animation-mixer
            scale="0.8 0.8 0.8"
            rotation="0 0 0"
          ></a-entity>
      </a-entity>


      <a-entity
        gltf-model="#axe-blue"
        position="0.5 6.5 2.5"
        scale="1 1 1"
        rotation="0 90 0"
        visible="false"
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

          <a-entity id="basket"
            gltf-model="#basket"
            bind-position="target: #dummy-hand-right"
            bind-rotation="target: #dummy-hand-right; convertToLocal: true"
            scale="0.6 0.6 0.6"
            position="0.3 -0.4 -0.5"  
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
          visible="true"
          clickable
          simple-grab
          ></a-entity>

      
      <PortalTeleporter id="portal-1"
        label="go"
        life-like-automaton="resolution: 256;"
        position="10.591 7 3.474"
        rotation="0 -110 0"
        :rot="90"
        :y="302.5"
        :x="7"
        :z="1"
      />
      <PortalTeleporter id="portal-2"
        label=""
        life-like-automaton="resolution: 256;"
        position="19.873 13.196 8"
        rotation="0 70 0"
        :rot="45"
        :y="300"
      />
    </a-entity>  

</template>