<template>
  <div v-if="isAuthenticated && user" style="display:flex;align-items:center;gap:8px">
    <img :src="user.picture" :alt="user.name" style="width:28px;height:28px;border-radius:50%" />
    <span>{{ user.name }}</span>
  </div>
  
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, user } = useAuth0()
</script>
