<script setup>
import router from '@/router'
import { onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import profile from '@/components/icons/Profile.vue'
import award from '@/components/icons/Award.vue'
import maps from '@/components/icons/Maps.vue'

const route = useRoute()

const select0 = () => {
  let routeName = route.name
  document.getElementById('icon-1').style.opacity = 0.5
  document.getElementById('icon-2').style.opacity = 0.5
  document.getElementById('icon-3').style.opacity = 0.5

  if (routeName == 'homepage') {
    document.getElementById('icon-2').style.opacity = 1
  } else if (routeName == 'user') {
    document.getElementById('icon-1').style.opacity = 1
  } else if (routeName == 'location') {
    document.getElementById('icon-3').style.opacity = 1
  }
}
onMounted(select0)
onUpdated(select0)

router.afterEach(() => {
  setTimeout(select0, 300)
})

function select() {
  router.push('/user')
}

function select1() {
  router.push('/homepage')
}
function select2() {
  router.push('/location')
}
</script>

<script>
export default {
  name: 'Barra',
  components: {
    profile,
    award,
    maps
  }
}
</script>

<template>
  <ul class="nav justify-content-center" id="barra">
    <li class="nav-item">
      <profile id="icon-1" class="icon my-2" @click="select" />
    </li>
    <li class="nav-item">
      <award id="icon-2" class="icon my-2" @click="select1" />
    </li>
    <li class="nav-item">
      <maps id="icon-3" class="icon my-2" @click="select2" />
    </li>
  </ul>
</template>

<style scoped>
#barra {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 5.5rem;
  gap: 4rem;
}
ul {
  background: #f5f5f5;
  box-shadow:
    0 6px 8px 0 rgba(0, 0, 0, 0.662),
    0 6px 20px 0 rgba(0, 0, 0, 0.662);
  height: 6.5rem;
}

.icon {
  height: 2.8rem;
  opacity: 0.6;
  filter: drop-shadow(0px 9px 9px rgba(0, 0, 0, 0.45));
}
</style>
