<template>
  <div class="summary-screen">
    <div class="container">
      <h1>Summary</h1>
      <p><span>Name:</span> {{ details.name }}</p>
      <p><span>Age:</span> {{ details.age }}</p>
      <p><span>Where do you live:</span> {{ details.country }}</p>
      <p><span>Package:</span> {{ details.package }}</p>
      <p><span>Premium:</span> {{ details.premium + details.currency }}</p>
      <div class="action">
        <button @click="handleRedirect('FormScreen')">Back</button>
        <button @click="handleBuy">Buy</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from "vue"
  import { handleRedirect } from "../router/redirect"
  import { getItemStorage, removeItemStorage }  from "../utils/storage"
  import { User } from "../models"

  const details = ref({
    name: '',
    age: '',
    country: '',
    currency: '',
    package: '',
    premium: 0
  })

  const storedDetails = getItemStorage('_DETAILS_')

  const handleUpdateDetails = () => {
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails) as User
      details.value.name = parsedDetails.name
      details.value.age = parsedDetails.age
      details.value.country = parsedDetails.country
      details.value.currency = parsedDetails.currency
      details.value.package = parsedDetails.package
      details.value.premium = parsedDetails.premium
    }
  }

  const handleBuy = () => {
    // TODO Api call before redirect
    handleRedirect('GreetingScreen')
    removeItemStorage('_DETAILS_')
  }

  onMounted(() => handleUpdateDetails())

  onBeforeMount(() => {
    if (!storedDetails) handleRedirect('GreetingScreen')
  })
</script>

<style lang="scss" scoped>
@import '../assets/scss/summaryScreen';
</style>