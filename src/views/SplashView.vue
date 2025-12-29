<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="h5">Welcome</h2>
            <p class="text-muted">
              Please log in to view the service status dashboard.
            </p>
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import LoginButton from "../components/LoginButton.vue";

const { isAuthenticated } = useAuth0();
const router = useRouter();

onMounted(() => {
  if (isAuthenticated.value) {
    router.replace("/status");
  }
});

watch(isAuthenticated, (val) => {
  if (val) {
    router.replace("/status");
  }
});
</script>

<style scoped></style>
