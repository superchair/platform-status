<template>
  <button v-if="!isAuthenticated" :disabled="isLoading" @click="login">
    Log In
  </button>
  
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { useRoute } from 'vue-router'

const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
const route = useRoute()

const login = () => loginWithRedirect({ appState: { target: route.fullPath } })
</script>
