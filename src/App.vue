<template>
  <nav class="navbar navbar-light bg-light border-bottom">
    <div
      class="container d-flex align-items-center justify-content-between py-2"
    >
      <span class="navbar-brand mb-0 h1">Vibe + Auth0</span>
      <div class="d-flex align-items-center gap-2">
        <LoginButton />
        <LogoutButton />
        <Profile />
      </div>
    </div>
  </nav>
  <main class="container my-3">
    <router-view />
  </main>
  <footer class="border-top py-3">
    <div class="container text-muted small">
      Local dev on http://localhost:5173
    </div>
  </footer>
</template>

<script setup>
import LoginButton from "./components/LoginButton.vue";
import LogoutButton from "./components/LogoutButton.vue";
import Profile from "./components/Profile.vue";
</script>
