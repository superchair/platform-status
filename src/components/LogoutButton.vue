<template>
  <button v-if="isAuthenticated" :disabled="isLoading" @click="logoutNow">
    Log Out
  </button>
  
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { logout, isAuthenticated, isLoading } = useAuth0()

const logoutNow = () => logout({ logoutParams: { returnTo: window.location.origin } })
</script>
