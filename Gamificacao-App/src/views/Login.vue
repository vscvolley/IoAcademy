<script setup>
import router from '@/router'

let auth = false
let callback = async (response) => {
  if (response.credential) {
    // Decode the JWT
    const base64Url = response.credential.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))

    sessionStorage.setItem('nome', payload.name)
    sessionStorage.setItem('email', payload.email)
    sessionStorage.setItem('foto', payload.picture)

    async function fetchpontos() {
      fetch('https://powerful-bubble-482d624615.strapiapp.com/api/utilizadors/', {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((user) => {
            if (user.attributes.email == payload.email) {
              router.push('/homepage')
              auth = true
            }
          })
        })
        .then(() => {
          if (auth == false) {
            let dados = {
              data: {
                nome: payload.name,
                email: payload.email,
                pontos: '0',
                nivel: 'silver',
                premios: 0,
                maxpontos: 0,
                lista: ''
              }
            }
            console.log(dados)
            async function postData() {
              fetch(`https://powerful-bubble-482d624615.strapiapp.com/api/utilizadors`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  router.push('/homepage')
                })
                .catch((error) => {
                  console.error('Error:', error)
                })
            }
            postData()
          }
        })
    }
    fetchpontos()
  } else {
    // The login was not successful
    console.error('Google Sign-In error:', response)
  }
}
</script>

<template>
  <div class="text-center align-items-center" id="contentor">
    <img src="../assets/pngwing.com.png" />
    <h1 class="mb-4">Gamificação</h1>
    <GoogleLogin :callback="callback" class="google-sign-in" />
  </div>
</template>

<style scope>
#contentor {
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
img {
  height: 9rem;
}
</style>
