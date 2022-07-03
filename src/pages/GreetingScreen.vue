<template>
  <div class="greeting-screen">
    <div class="container bg-grey">
      <h1>Hello There!</h1>
      <p>Let's buy some insurance. It is going to take only a few steps</p>
      <div class="action">
        <button @click="handleRedirect('FormScreen')">Start</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { handleRedirect } from "../router/redirect";
</script>

<style lang="scss" scoped>
</style>