<template>
  <div class="error-screen">
    <div class="container bg-grey">
    <h1 :class="[isFormError ? '' : 'fz-5']">{{ isFormError ? 'Opps' : '404' }}</h1>
    <p>
      <span v-if="isFormError">
        Your age is over our accepted limit<br>
        We are sorry but we cannot insure you now
      </span>
      <span v-else>
        We can't seem to find the page youre looking for.
      </span>
    </p>
    <div class="action">
      <button @click="handleRedirect('GreetingScreen')">
        {{ isFormError ? 'Ok :(' : 'Go to Home Page' }}
      </button>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from "vue";
  import { handleRedirect } from "../router/redirect"
  import { removeItemStorage }  from "../utils/storage"
  import router from '../router'

  const isFormError = computed(() => {
    return (router.currentRoute.value.query && router.currentRoute.value.query.isFormError)
      ? true
      : false
  })

  onMounted(() => {
    removeItemStorage('_DETAILS_')
  })
</script>

<style lang="scss" scoped>
</style>

