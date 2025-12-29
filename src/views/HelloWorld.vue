<template>
  <section>
    <h2>Hello, World!</h2>
    <p>Welcome<span v-if="user?.name">, {{ user.name }}</span>!</p>
  </section>
  
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
const { user } = useAuth0()
</script>
