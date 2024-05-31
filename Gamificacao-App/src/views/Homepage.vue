<script setup>
import Barra from '@/components/Barra.vue'
import pontos from '@/components/icons/Pontos.vue'
import router from '@/router'
import { getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage'

if (sessionStorage.getItem('nome') == null) {
  router.push('/').then(() => location.reload())
}

let saudacao
const date = new Date()
let hour = date.getUTCHours() + 1

if (hour <= 12) {
  saudacao = 'Bom dia'
} else if (12 > hour || hour < 20) {
  saudacao = 'Boa tarde'
} else if (hour >= 20) {
  saudacao = 'Boa noite'
}

function size(item, index) {
  let elements = document.getElementsByClassName('item')
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.height = '6.6rem'
    let dadosDiv = elements[i].querySelector('#dados')
    elements[i].querySelector('.info').style.display = 'block'
    if (dadosDiv) {
      elements[i].removeChild(dadosDiv)
    }
  }
  let images = document.getElementsByTagName('img')
  for (let i = 0; i < images.length; i++) {
    if (images[i].id != 'premio') images[i].style.display = 'none'
  }
  document.getElementById(index).style.display = 'block'
  document.getElementById(item.pontos).style.display = 'none'
  document.getElementById(item.nome).style.height = '22.5rem'
  let div = document.createElement('div')
  div.id = 'dados'
  div.className = 'd-inline w-90'
  div.innerHTML =
    '<br>' + item.descrição + '<br>' + '<h5 class="mt-1">' + 'Pontos:' + item.pontos + '</h5>'
  document.getElementById(item.nome).appendChild(div)
}
</script>
<script>
export default {
  components: {
    pontos
  },
  data() {
    return {
      items: [],
      pontuacao: 0,
      id: 0,
      premios: 0,
      url: [],
      urlid: 0,
      index: 0,
      nivel: '',
      showpopup: false,
      item: {},
      nome: '',
      nome1: ''
    }
  },
  methods: {
    async fetchPremios() {
      fetch('http://localhost:1337/uploads/Premios_f4fddbbaec.json', {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) =>
          data.premios.forEach((premio) => {
            this.items.push(premio)
          })
        )
        .then(() => {
          sessionStorage.setItem('lista', JSON.stringify(this.items))
        })
        .catch((error) => console.error('Error:', error))
    },
    pergunta(item) {
      this.showpopup = true
      this.item = item
    },
    async redimir() {
      this.pontuacao -= this.item.pontos
      let dados = {
        data: {
          nome: sessionStorage.getItem('nome'),
          email: sessionStorage.getItem('email'),
          pontos: this.pontuacao.toString(),
          nivel: this.nivel,
          premios: this.premios + 1
        }
      }
      this.premios += 1
      fetch(`http://localhost:1337/api/utilizadors/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error('Error:', error)
        })
      this.showpopup = false
      this.progressbar()
    },
    async fetchpontos() {
      fetch('http://localhost:1337/api/utilizadors/', {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((user) => {
            if (user.attributes.email == sessionStorage.getItem('email')) {
              this.pontuacao = user.attributes.pontos
              this.id = user.id
              this.premios = user.attributes.premios
              this.nivel = user.attributes.nivel
              this.nomev = user.attributes.nome
              this.nome1 = user.attributes.nome.split(' ')
            }
          })
        })
        .catch((error) => console.error('Error:', error))
    },
    progressbar() {
      let array = []
      let array1 = JSON.parse(sessionStorage.getItem('lista'))
      let pontos = this.pontuacao
      array1.forEach((item) => {
        let conta = pontos - item.pontos
        array.push(conta)
      })
      let numero = 0
      for (let i = 0; i < array.length; i++) {
        if (0 > array[i] && numero == 0) {
          numero = array[i]
        }
      }
      if (numero == 0) {
        document.getElementById('progress-bar').style.display = 'none'
        document.getElementById('progress').style.display = 'none'
        document.getElementById('proximo').style.display = 'none'
      } else {
        document.getElementById('progress-bar').style.display = 'block'
        document.getElementById('progress').style.display = 'block'
        document.getElementById('proximo').style.display = 'block'
        let progress = (pontos / array1[array.indexOf(numero)].pontos) * 100
        document.getElementById('progress-bar').style.width = progress + '%'
        document.getElementById('premio').src = this.url[array.indexOf(numero)].url
        document.getElementById('premio').style.display = 'block'
      }
    },
    async geturl() {
      let storage = getStorage()
      let dadosRef = ref(storage, 'IOAcademy')

      try {
        const resposta = await listAll(dadosRef)
        const urlPromises = resposta.items.map((item) => {
          return getDownloadURL(item).then((url) => {
            return {
              nome: item.name,
              url: url
            }
          })
        })
        this.url = await Promise.all(urlPromises)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchPremios()
    this.fetchpontos()
    this.geturl().then(() => this.progressbar())
  }
}
</script>

<template>
  <div class="p-2 pt-2 sticky-top" id="cabecalho">
    <h1 class="m-3 mt-4">{{ saudacao }}, {{ nome1[0] }}</h1>
    <div class="pontos mt-4">
      <h3>Pontos de oferta</h3>
      <div class="d-flex gap-2 align-items-center" id="pontos">
        <h4>{{ pontuacao }}</h4>
        <pontos class="pontos"></pontos>
        <div class="d-flex align-items-center text-center justify-content-center">
          <h6 id="proximo">
            Proxima recompensa
            <img src="" alt="" id="premio" />
          </h6>
        </div>
      </div>
    </div>
    <div
      class="progress mb-2"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      id="progress"
    >
      <div class="progress-bar bg-warning h-75" id="progress-bar"></div>
    </div>
  </div>
  <div class="container lista-premios">
    <div
      class="container d-grid item justify-content-left mb-4 m-3 bg-white"
      v-for="(item, index) in items"
      :id="item.nome"
      :key="index"
      @click="size(item, index)"
    >
      <h5 class="mt-2 mb-3">
        {{ item.nome }}
      </h5>
      <h5 :id="item.pontos" class="info mb-1">+info</h5>
      <img :src="url[index].url" :id="index" alt="img" />

      <button class="btn botoes" v-if="pontuacao >= item.pontos" @click="pergunta(item)">
        Redimir
      </button>
    </div>
  </div>
  <div v-if="showpopup" class="back">
    <div class="popup rounded container">
      <p>Pretende resgatar o item?</p>
      <div class="d-flex" id="pergunta">
        <button class="btn btn-warning" @click="redimir()">Sim</button>

        <button class="btn btn-warning" @click="showpopup = false">Nao</button>
      </div>
    </div>
  </div>
  <Barra></Barra>
</template>

<style scoped>
#cabecalho {
  border-radius: 0 0 2.6rem 2.6rem;
  height: 11.5em;
  top: 0;
  background-image: url('../assets/shower_5609813.png');
  background-size: 44%;
  background-repeat: no-repeat;
  background-position: right top;
  background-color: #000000;
  backdrop-filter: blur(400px);
}

#pontos {
  height: 2rem;
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
  margin-left: 74%;
  margin-right: 8%;
  height: 0.5em;
  max-width: 20%;
}
.item {
  border-bottom: 0.2rem solid rgba(0, 0, 0, 0.35);
  min-height: 6.6rem;
  width: 90%;
  border-radius: 0.5rem;
  grid-template-rows: auto auto;
  box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.164);
  position: relative;
  grid-template-rows: 0fr 0fr 0fr;
}
.info {
  margin-right: 90%;
  font-size: small;
}
.lista-premios {
  margin-top: 0;
  padding-top: 0.7rem;
  margin-bottom: 6rem;
  overflow-y: auto;
  height: 32.5em;
}
h6 {
  position: fixed;
  left: 69%;
  margin-bottom: 16%;
  font-size: 0.65rem;
  color: aliceblue;
  font-weight: 600;
}

.botoes {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0.4rem;
  background: #e6ca2e;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.35) inset;
  border: none;
  font-weight: bold;
  height: 1.9rem;
  align-items: center;
  justify-content: center;
}
img {
  height: 5rem;
  width: 5rem;
  object-fit: contain;
  display: none;
  margin: 5%;
}

#premio {
  margin-left: 12%;
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
  background-color: rgba(0, 0, 0, 0.361);
}
.popup {
  display: d-flex;
  background-color: #f5f5f5;
  margin: auto;
  padding: 0.9em;
  border: 1px solid #888;
  width: 55%;
  justify-content: center;
  align-items: center;
}
#pergunta {
  margin-top: 2rem;
  gap: 40%;
}

.btn:hover,
.btn:focus {
  color: #000;
  text-decoration: none;
}
.btn-warning {
  width: 4em;
}
</style>
