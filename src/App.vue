<template>
  <header
    style="
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
    "
  >
    <h1 style="margin: 0; font-size: 18px">Vibe + Auth0</h1>
    <nav style="display: flex; gap: 8px; align-items: center">
      <LoginButton />
      <LogoutButton />
      <Profile />
    </nav>
  </header>
  <main style="padding: 16px">
    <router-view />
  </main>
  <footer
    style="
      padding: 16px;
      color: #666;
      border-top: 1px solid #eee;
      font-size: 12px;
    "
  >
    Local dev on http://localhost:5173
  </footer>
</template>

<script setup>
import LoginButton from "./components/LoginButton.vue";
import LogoutButton from "./components/LogoutButton.vue";
import Profile from "./components/Profile.vue";
</script>
