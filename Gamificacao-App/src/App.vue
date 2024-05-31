<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
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
