<script setup>
import Barra from '@/components/Barra.vue'
import diamond from '@/components/icons/Diamond.vue'
import star from '@/components/icons/Star.vue'
import { onUpdated } from 'vue'
import { ref } from 'vue'

if (sessionStorage.getItem('nome') == null) {
  router.push('/').then(() => location.reload())
}

let nome = sessionStorage.getItem('nome')
let email = sessionStorage.getItem('email')
let foto = sessionStorage.getItem('foto')
let maxpontos = 0
let premiosrecolhidos = 0
</script>
<script>
export default {
  components: {
    diamond,
    star
  },
  data() {
    return {
      pontos: 0,
      items: [
        { Points: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { Points: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { Points: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { Points: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<template>
  <div class="d-grid justify-content-center mt-3" id="page">
    <div class="bg-white rounded text-center p-3">
      <img :src="foto" alt="foto" id="foto" />
      <div id="info" class="m-2 mt-3">
        <h5 class="mt-2">
          {{ nome }}
        </h5>
        <div class="d-flex justify-content-left align-items-center mt-1 mb-1">
          <h5 id="ranking">Ranking:</h5>
          <div id="categoria" class="d-flex text-center align-items-center">
            <diamond v-show="pontos <= 1000"></diamond>
            <star v-show="pontos > 1000"></star>
          </div>
        </div>
        <h5>{{ email }}</h5>
      </div>
    </div>
    <div class="bg-white rounded text-right p-3 mt-3">
      <h2 class="text-center">Status</h2>
      <h3>Total: {{ pontos }}</h3>
      <h3>Maximo atingido: {{ maxpontos }}</h3>
      <h3>Premios: {{ premiosrecolhidos }}</h3>
    </div>
    <div class="bg-white mt-3 rounded text-center" id="table">
      <h5 class="text-center mt-1">World Podium</h5>
      <b-table sticky-header="144" :items="items" head-variant="light" striped></b-table>
    </div>
  </div>
  <Barra></Barra>
</template>

<style scoped>
#page {
  width: 100vw;
}
#foto {
  border-radius: 5rem;
  margin-top: 0.5rem;
}
#categoria {
  border: 0.2rem solid #e6ca2e;
  border-radius: 5rem;
  width: 3.5rem;
  height: 3.5rem;
}
#info {
  text-align: left;
}
.bg-white {
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.25);
}

#table {
  max-height: 9rem;
  overflow-y: auto;
}
#ranking {
  margin-right: 1rem;
}
</style>
