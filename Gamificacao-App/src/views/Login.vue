<script setup>
import router from '@/router'

let callback = async (response) => {
  if (response.credential) {
    // Decode the JWT
    const base64Url = response.credential.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))

    sessionStorage.setItem('nome', payload.name)
    sessionStorage.setItem('email', payload.email)

    router.push('/about')
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
