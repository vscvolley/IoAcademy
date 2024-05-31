<script>
import Barra from '@/components/Barra.vue'
import { push } from 'notivue'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Qrcode',
  data() {
    return {
      value: '',
      size: 300,
      id: 0,
      pontuacao: 0,
      premios: 0,
      nivel: '',
      maxpontos: 0
    }
  },
  components: {
    QrcodeVue,
    Barra
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
              this.value = user.attributes.email
              this.pontuacao = Number(user.attributes.pontos)
              this.nivel = user.attributes.nivel
              this.premios = user.attributes.premios
              this.id = user.id
              this.maxpontos = Number(user.attributes.maxpontos)
            }
          })
        })
        .catch((error) => console.error('Error:', error))
    },
    async pontos() {
      if (this.nivel == 'silver') {
        this.pontuacao += 1000
        this.maxpontos += 1000
      } else if (this.nivel == 'gold') {
        this.pontuacao += 2000
        this.maxpontos += 2000
      } else if (this.nivel == 'dimond') {
        this.pontuacao += 3000
        this.maxpontos += 3000
        console.log(this.pontuacao)
      } else if (this.nivel == 'star') {
        this.pontuacao += 4000
        this.maxpontos += 4000
      }
      if (this.maxpontos >= 5000 && this.maxpontos < 10000) {
        this.nivel = 'gold'
      } else if (this.maxpontos >= 10000 && this.maxpontos < 15000) {
        this.nivel = 'dimond'
      } else if (this.maxpontos >= 15000) {
        this.nivel = 'star'
      } else {
        this.nivel = 'silver'
      }
      let dados = {
        data: {
          nome: sessionStorage.getItem('nome'),
          email: sessionStorage.getItem('email'),
          pontos: this.pontuacao.toString(),
          nivel: this.nivel,
          premios: this.premios,
          maxpontos: this.maxpontos
        }
      }
      fetch(`http://localhost:1337/api/utilizadors/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          push.success('Pontos adicionados! Novo total:' + this.pontuacao)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  },
  created() {
    this.fetchdados()
  }
}
</script>

<template>
  <div class="container d-grid justify-content-center">
    <div class="m-2 justify-content-center align-items-center rounded" id="qrcode">
      <div class="row mt-5">
        <h2>QrCode</h2>
      </div>
      <div class="row">
        <div class="shadow">
          <qrcode-vue :value="value" :size="size" level="H" @click="pontos" />
        </div>
      </div>
      <div class="row">
        <h2>Lê-me e ganha pontos</h2>
      </div>
    </div>
  </div>
  <Barra></Barra>
</template>
<style scoped>
.container {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#qrcode {
  display: grid;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  width: 21.5rem;
  height: 30rem;
  text-align: center;
  background: #f5f5f5;
  color: black;
}
.rounded {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: center;
}
.shadow {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
