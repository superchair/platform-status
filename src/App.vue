<template>
  <nav class="navbar navbar-light bg-light border-bottom">
    <div
      class="container d-flex align-items-center justify-content-between py-2"
    >
      <span class="navbar-brand mb-0 h1">Platform Service Status Radiator</span>
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
</template>

<script setup>
import LoginButton from "./components/LoginButton.vue";
import LogoutButton from "./components/LogoutButton.vue";
import Profile from "./components/Profile.vue";
</script>
