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
import { useRouter } from "vue-router";

const router = useRouter();
const { loginWithPopup, loginWithRedirect, isAuthenticated, isLoading } =
  useAuth0();

async function login() {
  try {
    await loginWithPopup();
  } catch (e) {
    console.error("Login popup failed, falling back to redirect:", e);
    await loginWithRedirect({
      appState: { target: router.currentRoute.value.fullPath },
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
      },
    });
  }
}
</script>
