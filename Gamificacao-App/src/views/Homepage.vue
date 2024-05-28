<script setup>
import Barra from '@/components/Barra.vue'
import pontos from '@/components/icons/Pontos.vue'
import router from '@/router'

if (sessionStorage.getItem('nome') == null) {
  router.push('/').then(() => location.reload())
}

const nome = sessionStorage.getItem('nome').split(' ')

let saudacao
const date = new Date()
let hour = date.getUTCHours() + 1
let pontuacao = 22
let items = []

fetch('http://localhost:1337/uploads/Premios_eaac173cae.json', {
  method: 'GET'
})
  .then((response) => response.json())
  .then((data) => items.push(data.premios))
  .catch((error) => console.error('Error:', error))
console.log(items)

if (hour <= 12) {
  saudacao = 'Bom dia'
} else if (12 > hour || hour < 20) {
  saudacao = 'Boa tarde'
} else if (hour >= 20) {
  saudacao = 'Boa noite'
}

function size(item) {
  let elements = document.getElementsByClassName('item')
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.height = '2rem'
  }
  document.getElementById(item.first_name).style.height = '4rem'
}
</script>
<script>
export default {
  components: {
    pontos
  }
}
</script>

<template>
  <div class="p-2 mb-5 sticky-top" id="cabecalho">
    <h1 class="m-3 mt-4">{{ saudacao }}, {{ nome[0] }}</h1>
    <div class="pontos mt-4">
      <h3>Pontos de oferta</h3>
      <div class="d-flex mt-2 gap-2 align-items-center">
        <h4>{{ pontuacao }}</h4>
        <pontos class="pontos"></pontos>
        <h6>Proxima recompensa</h6>
      </div>
    </div>
    <div
      class="progress mb-2"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar w-75 bg-warning"></div>
    </div>
  </div>
  <div class="container lista-premios">
    <div
      class="d-flex item justify-content-left mb-4 m-3"
      v-for="item in items"
      :id="item.first_name"
      @click="size(item)"
    >
      {{ item.first_name }} {{ item.last_name }}
      <button class="btn" v-if="pontuacao > item.Points">Redeme</button>
    </div>
  </div>
  <Barra></Barra>
</template>

<style scoped>
#cabecalho {
  border-radius: 0 0 3rem 3rem;
  height: 30%;
  width: 100%;
  top: 0;
  background-image: url('../assets/shower_5609813.png');
  background-size: 55%;
  background-repeat: no-repeat;
  background-position: right top;
  background-color: rgba(0, 0, 0, 0.96); /* Make it darker */
  backdrop-filter: blur(100px); /* Add blur */
}

h1 {
  color: aliceblue;
}
h3 {
  margin-left: 1rem;
  color: #e6ca2e;
}
h4 {
  margin-left: 1rem;
  color: rgb(230, 202, 46);
  font-size: 2rem;
}
.progress {
  margin-left: 17rem;
  margin-right: 1.5rem;
}
.item {
  border-bottom: 0.2rem solid rgba(0, 0, 0, 0.119);
  height: 2rem;
}
.lista-premios {
  margin-bottom: 6rem;
}
h6 {
  margin-left: 51%;
  margin-bottom: 13%;
  font-size: 0.6rem;
  color: aliceblue;
}
.item {
  position: relative;
}

.btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 0.2rem;
  background: #e6ca2e;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.35) inset;
  border: none;
  font-weight: bold;
}
</style>
