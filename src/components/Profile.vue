<template>
  <div v-if="isAuthenticated && user" class="d-flex align-items-center gap-2">
    <img
      :src="user.picture"
      :alt="user.name"
      class="rounded-circle"
      style="width: 28px; height: 28px"
    />
    <span class="d-none d-md-inline">{{ user.name }}</span>
  </div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated, user } = useAuth0();
</script>
