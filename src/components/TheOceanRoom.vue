<script setup>
import '../aframe/spawn-text.js';
import PortalTeleporter from './PortalTeleporter.vue';
import '../aframe/emit-when-near.js';
import '../aframe/look-at.js';
import { copyPosition, copyRotation } from '../utils/aframe.js';
import '../aframe/bind-rotation.js';
import '../aframe/bind-position.js';

const text = "toto"
//logique du jeu : grab un item pour changer le texte du troll
//si tel item grab alors le texte evolue

//grab component
function grabTheThing(evt) {
  // if something already grabbed, switch it
  const el = evt.target;
  const grabbedEl = document.querySelector('[data-grabbed]');
  if (grabbedEl) {
    grabbedEl.removeAttribute('bind-position');
    grabbedEl.removeAttribute('bind-rotation');
    copyPosition(el, grabbedEl);
    copyRotation(el, grabbedEl);
    delete grabbedEl.dataset.grabbed;
    delete grabbedEl.dataset.dropped;
    if (el.dataset.dropped) {
      grabbedEl.dataset.dropped = el.dataset.dropped;
    }
  }

  if (el.sceneEl.is('vr-mode')) {
    el.setAttribute('bind-position', 'target: #hand-right');
    el.setAttribute('bind-rotation', 'target: #hand-right; convertToLocal: true');
  } else {
    el.setAttribute('bind-position', 'target: #dummy-hand-right');
    el.setAttribute('bind-rotation', 'target: #dummy-hand-right; convertToLocal: true');
  }
  el.dataset.grabbed = true;
  delete el.dataset.dropped;
}

function dropTheThing(evt) {
  const grabbedEl = document.querySelector('[data-grabbed]');
  // if nothing grabbed, return
  if (!grabbedEl) return;

  //drop it
  grabbedEl.removeAttribute('bind-position');
  grabbedEl.removeAttribute('bind-rotation');
  copyPosition(evt.target, grabbedEl);
  copyRotation(evt.target, grabbedEl);
  delete grabbedEl.dataset.grabbed;

  const dropZoneId = evt.target.id;
  // if something was in the drop zone, grab it
  const elInDropZone = document.querySelector(`[data-dropped="${dropZoneId}"]`);
  if (elInDropZone) {
    grabTheThing({ target: elInDropZone });
  };

  grabbedEl.dataset.dropped = dropZoneId;
}


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

      <!-- <a-entity 
        gtlf-model="#crystal"
        position="0.5 6.5 2.5"
        scale="0.1 0.1 0.1"
        rotation="0 90 0">
      </a-entity> -->


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
          @click="evt => grabTheThing(evt)"
        ></a-entity>

        <a-entity id="rock"
            gltf-model="#rocks"
            position="4 4 4"
            scale="0.05 0.05 0.05"
            rotation="0 90 0"
            visible="true"
            clickable
            @click="evt => grabTheThing(evt)"
          ></a-entity>

          <a-entity id="basket"
            gltf-model="#basket"
            bind-position="target: #dummy-hand-right"
            bind-rotation="target: #dummy-hand-right; convertToLocal: true"
            scale="0.6 0.6 0.6"
            position="0.3 -0.4 -0.5"  
         ></a-entity>  

         <a-entity
        id="drop-zone-right"
        geometry="primitive: sphere; phiLength: 180; radius: 0.5; thetaLength: 90;"
        material="color: grey; side: double"
        position="0.67 5.7 1.8"
        rotation="90 0 45"
        visible="true"
        clickable
        @click="evt => dropTheThing(evt)"
    ></a-entity>
    <a-entity
        id="drop-zone-left"
          geometry="primitive: sphere; phiLength: 180; radius: 0.5; thetaLength: 90;"
          material="color: green; side: double"
          position="0.8 5.9 1.8"
          rotation="90 0 45"
          visible="true"
          clickable
          @click="evt => dropTheThing(evt)"
      ></a-entity>

      <a-entity id="sword"
          gltf-model="#sword"
          position="21 12 8.5"
          scale="1 1 1"
          rotation="0 90 0"
          visible="true"
          clickable
          @click="evt => grabTheThing(evt)"
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

        <!-- </a-ocean> -->
            <!-- <PortalTeleporter
          label="Back to main room"
          material="src: #room-physic-out-texture"
          position="0 2.1 4.12"
          rotation="0 180 0"
          :rot="90"/> -->

</template>