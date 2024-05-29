<script setup>
import Barra from '@/components/Barra.vue'
import diamond from '@/components/icons/Diamond.vue'
import star from '@/components/icons/Star.vue'
import gold from '@/components/icons/Gold.vue'
import silver from '@/components/icons/Silver.vue'
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
    star,
    silver,
    gold
  },
  data() {
    return {
      pontos: 0,
      items: [],
      fields: [
        { key: 'nome', label: 'Nome' },
        { key: 'pontos', label: 'Pontos', sortable: true },
        { key: 'nivel', label: 'Nivel' }
      ],
      sortBy: 'pontos',
      sortDesc: true
    }
  },
  methods: {
    async fetchdados() {
      fetch('http://localhost:1337/api/utilizadors/', {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((user) => {
            if (user.attributes.email == sessionStorage.getItem('email')) {
              const dados = {
                createdAt: user.attributes.createdAt,
                email: user.attributes.email,
                nivel: user.attributes.nivel,
                nome: user.attributes.nome,
                pontos: Number(user.attributes.pontos),
                publishedAt: user.attributes.publishedAt,
                updatedAt: user.attributes.updatedAt,
                _rowVariant: 'danger'
              }
              this.pontos = user.attributes.pontos
              this.items.push(dados)
            } else {
              const dados = {
                createdAt: user.attributes.createdAt,
                email: user.attributes.email,
                nivel: user.attributes.nivel,
                nome: user.attributes.nome,
                pontos: Number(user.attributes.pontos),
                publishedAt: user.attributes.publishedAt,
                updatedAt: user.attributes.updatedAt
              }
              this.items.push(dados)
            }
          })
        })
        .catch((error) => console.error('Error:', error))
    }
  },
  mounted() {
    this.fetchdados()
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
            <silver v-show="pontos <= 2500"></silver>
            <gold v-show="pontos > 2500 && pontos <= 5000"></gold>
            <diamond v-show="pontos <= 75000 && pontos > 5000"></diamond>
            <star v-show="pontos > 7500"></star>
          </div>
        </div>
        <h5>{{ email }}</h5>
      </div>
    </div>
    <div class="bg-white rounded text-right p-3 mt-4">
      <h2 class="text-center">Status</h2>
      <h3>Total: {{ pontos }}</h3>
      <h3>Maximo atingido: {{ maxpontos }}</h3>
      <h3>Premios: {{ premiosrecolhidos }}</h3>
    </div>
    <div class="bg-white mt-3 rounded text-center" id="table">
      <h5 class="text-center mt-1">World Podium</h5>
      <b-table
        sticky-header="144"
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        head-variant="light"
        striped
      ></b-table>
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
  height: 6rem;
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
  max-height: 11rem;
  overflow-y: auto;
}
#ranking {
  margin-right: 1rem;
}
</style>
