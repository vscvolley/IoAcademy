<script setup>
import Barra from '@/components/Barra.vue'
import diamond from '@/components/icons/Diamond.vue'
import gold from '@/components/icons/Gold.vue'
import marca from '@/components/icons/Marca.vue'
import silver from '@/components/icons/Silver.vue'
import star from '@/components/icons/Star.vue'

if (sessionStorage.getItem('nome') == null) {
  router.push('/').then(() => location.reload())
}

let foto = sessionStorage.getItem('foto')
</script>
<script>
export default {
  components: {
    diamond,
    star,
    silver,
    gold,
    marca
  },
  data() {
    return {
      pontos: 0,
      premios: 0,
      items: [],
      fields: [
        { key: 'nome', label: 'Nome' },
        { key: 'pontos', label: 'Pontos', sortable: true },
        { key: 'nivel', label: 'Nivel' }
      ],
      sortBy: 'pontos',
      sortDesc: true,
      maxpontos: 0,
      email: 'nivel@gmail.com',
      nivel: 'oi',
      nome: 'oi',
      showpopup: false,
      parabens: false,
      progress: 0,
      lista: [],
      showpremios: false,
      lista1: []
    }
  },
  methods: {
    async fetchdados() {
      fetch('https://powerful-bubble-482d624615.strapiapp.com/api/utilizadors/', {
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
              this.maxpontos = user.attributes.maxpontos
              this.nome = user.attributes.nome
              this.email = user.attributes.email
              this.nivel = user.attributes.nivel
              this.premios = user.attributes.premios
              this.lista = user.attributes.lista.split(';')
              this.items.push(dados)
              this.lista.forEach((elemento1) => {
                const elemento = {
                  nome: elemento1
                }
                this.lista1.push(elemento)
              })
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
    },
    progressbar() {
      if (this.maxpontos < 5000) {
        this.progress = (this.maxpontos / 5000) * 100
      } else if (this.maxpontos >= 5000 && this.maxpontos < 10000) {
        this.progress = (this.maxpontos / 10000) * 100
      } else if (this.maxpontos >= 10000 && this.maxpontos < 15000) {
        this.progress = (this.maxpontos / 15000) * 100
      } else if (this.maxpontos >= 15000) {
        this.progress = 100
        this.parabens = true
      }
    },
    show() {
      this.progressbar()
      this.showpopup = true
    }
  },
  mounted() {
    this.fetchdados()
  }
}
</script>

<template>
  <div v-if="showpopup" class="back">
    <div class="popup rounded">
      <span class="close" @click="showpopup = false">&times;</span>
      <p>Soma pontos e ganha ofertas!</p>
      <p>Quanto mais pontos tiveres adequirido no total, maior é o teu ranking.</p>
      <p>Quanto maior o teu ranking mais facil é de ganhar pontos!</p>
      <p class="mt-2">Ranking (pontos por scan):</p>
      <div id="classificacao">
        <silver></silver>
        <h4>1000 pontos</h4>
        <gold class="mt-1"></gold>
        <h4>2000 pontos</h4>
        <diamond class="mt-1"></diamond>
        <h4>3000 pontos</h4>
        <star class="mt-1"></star>
        <h4>4000 pontos</h4>
      </div>
      <p class="mt-5" v-if="parabens == false">
        Próximo Ranking:<gold v-show="nivel == 'silver'"></gold>
        <diamond v-show="nivel == 'gold'"></diamond>
        <star v-show="nivel == 'diamond'"></star>
      </p>
      <div
        v-if="parabens == false"
        class="progress mb-2"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        id="progress"
      >
        <div
          v-if="parabens == false"
          class="progress-bar bg-warning"
          id="progress-bar"
          v-bind:style="{ width: this.progress + '%' }"
        ></div>
      </div>
      <p id="parabens" class="mt-3" v-if="parabens == true">Estas no topo da montanha, PARABÉNS!</p>
    </div>
  </div>
  <div id="listapremios" v-if="showpremios == true" class="back">
    <div class="popup rounded container">
      <span class="close" @click="showpremios = false">&times;</span>
      <h4 class="mt-3 mb-1">Lista de premios redimidos</h4>
      <div class="bg-white mt-3 rounded text-center" id="table1">
        <b-table :items="lista1" striped> </b-table>
      </div>
    </div>
  </div>
  <div class="d-grid justify-content-center mt-3" id="page">
    <div class="bg-white rounded text-center p-3">
      <img :src="foto" alt="foto" id="foto" />
      <div id="info" class="m-2 mt-3">
        <h5 class="mt-2">
          {{ nome }}
        </h5>
        <div class="d-flex justify-content-left align-items-center mt-1 mb-1">
          <h5 id="ranking" class="m-1">Ranking:</h5>
          <div id="categoria" class="d-flex text-center align-items-center" @click="show">
            <silver v-show="nivel == 'silver'"></silver>
            <gold v-show="nivel == 'gold'"></gold>
            <diamond v-show="nivel == 'diamond'"></diamond>
            <star v-show="nivel == 'star'"></star>
          </div>
          <div id="interrogacao" @click="show"><marca></marca></div>
        </div>
        <h5>{{ email }}</h5>
      </div>
    </div>
    <div class="bg-white rounded text-right p-3 mt-4">
      <h2 class="text-center">Status</h2>
      <h3>Pontos: {{ pontos }}</h3>
      <h3>Total Pontos: {{ maxpontos }}</h3>
      <h3 @click="showpremios = true">Nº Premios <marca /> : {{ premios }}</h3>
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
  min-width: 100vw;
  max-width: 100vw;
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
  width: 100%;
}

#table {
  max-height: 11rem;
  overflow-y: auto;
}
#table1 {
  max-height: 13rem;
  overflow-y: auto;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.15);
}
#ranking {
  margin-right: 1rem;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup {
  background-color: #f5f5f5;
  margin: auto;
  padding: 0.8em;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  margin-left: 90%;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
}
#classificacao {
  text-align: center;
}
#progress {
  height: 0.8em;
  width: 90%;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.164);
}
#interrogacao {
  margin-left: 0.35em;
}
.sticky-top {
  background: #ffffff;
  padding: 0.2rem;
}
</style>
