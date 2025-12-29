<template>
  <button
    v-if="!isAuthenticated"
    :disabled="isLoading"
    class="btn btn-primary"
    @click="login"
  >
    Log In
  </button>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithPopup, isAuthenticated, isLoading } = useAuth0();

async function login() {
  try {
    await loginWithPopup();
  } catch (e) {
    console.error("Login popup failed:", e);
  }
}
</script>
