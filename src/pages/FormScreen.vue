<template>
  <div class="form-screen">
    <div class="container bg-grey">
      <h1>Tell us about yourself</h1>
      <RegisterForm />
    </div>
  </div>
</template>
<script setup lang="ts">
  import RegisterForm from '../components/RegisterForm.vue'
</script>

<style lang="scss" scoped>
@import '../assets/scss/formScreen';
</style>