<script setup>
import Barra from '@/components/Barra.vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

if (sessionStorage.getItem('nome') == null) {
  router.push('/').then(() => location.reload())
}

const center = { lat: 41.39317618375037, lng: -8.523206607943806 }
</script>

<template>
  <GoogleMap
    api-key="AIzaSyBT4aiYouCYXgaCGTOSNBDIzxt3TUWmbeE"
    style="width: 100%; height: 91vh"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">IoTech</h1>
          <div id="bodyContent">
            <p>
              <b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large sandstone rock
              formation in the southern part of the Northern Territory, central Australia. It lies
              335&#160;km (208&#160;mi) south west of the nearest large town, Alice Springs;
              450&#160;km (280&#160;mi) by road. Kata Tjuta and Uluru are the two major features of
              the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and
              Yankunytjatjara, the Aboriginal people of the area. It has many springs, waterholes,
              rock caves and ancient paintings. Uluru is listed as a World Heritage Site.
            </p>
            <p>
              Attribution: Uluru,
              <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
                https://en.wikipedia.org/w/index.php?title=Uluru</a
              >
              (last visited June 22, 2009).
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
  <Barra></Barra>
</template>
