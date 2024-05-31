<script setup>
import { Notification, Notivue, NotivueSwipe } from 'notivue'
import { RouterView } from 'vue-router'
</script>

<script>
export default {
  components: {
    Notivue,
    Notification,
    NotivueSwipe
  }
}
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
    <Notivue v-slot="Component">
      <NotivueSwipe :item="Component">
        <Notification :item="Component" />
      </NotivueSwipe>
    </Notivue>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
