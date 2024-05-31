<script setup>
import Barra from '@/components/Barra.vue'
import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map'

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
              A <b>IOTech</b>, fundada em <b>2018</b>, é uma empresa portuguesa de pesquisa,
              desenvolvimento e inovação que se destaca na vanguarda da tecnologia. Com um forte
              enfoque em Data Science, Inteligência Artificial e Internet of Things, a IOTech está a
              revolucionar a digitalização e automação de processos de negócios. A sua academia de
              formação e pesquisa, a ioAcademy, demonstra o seu compromisso com a educação e
              retenção de talentos. Reconhecida pela ANI e membro do TICE.pt, a IOTech é uma força a
              ser reconhecida no campo das TIC. Com uma patente na área de Data Science e várias
              obras científicas, a IOTech é verdadeiramente uma joia da inovação tecnológica em
              Portugal.
            </p>
            <p>
              <a href="https://iotech.pt/aboutus"> Visita-nos!</a>
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
  <Barra></Barra>
</template>
