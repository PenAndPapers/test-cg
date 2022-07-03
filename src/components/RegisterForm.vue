<template>
  <form @submit.prevent>
    <div class="field">
      <label for="name">Name<sup>*</sup></label>
      <input
        type="text"
        id="name"
        autofocus
        :class="[error.name ? 'error' : '']"
        v-model="form.name"
      />
      <span class="error" v-if="error.name">{{ error.name }}</span>
    </div>
    <div class="field">
      <label for="age">Age<sup>*</sup></label>
      <input
        type="text"
        id="age"
        :class="[error.age ? 'error' : '']"
        @keydown="handleAge"
        @input="handlePremiumPrice"
        v-model="form.age"
      />
      <span class="error" v-if="error.age">{{ error.age }}</span>
    </div>
    <div class="field">
      <label for="country">Where do you live<sup>*</sup></label>
      <select
        id="country" :class="[error.country ? 'error' : '']"
        @change="handleChangeCountry"
        v-model="form.country">
        <option value="Hong Kong">Hong Kong</option>
        <option value="USA">USA</option>
        <option value="Australia">Australia</option>
      </select>
      <span class="error" v-if="error.country">{{ error.country }}</span>
    </div>
    <div class="package">
      <div class="field">
        <input
          type="radio"
          value="Standard"
          id="standard"
          @change="handlePremiumPrice"
          v-model="form.package"
        /> 
        <label for="standard">Standard</label>
      </div>
      <div class="field">
        <input
          type="radio"
          value="Safe"
          id="safe"
          @change="handlePremiumPrice"
          v-model="form.package"
        /> 
        <label for="safe">Safe (+{{packagePrice.safe}}{{form.currency}}, 50%)</label>
      </div>
      <div class="field">
        <input
          type="radio"
          value="Super Safe"
          id="supersafe"
          @change="handlePremiumPrice"
          v-model="form.package"
        /> 
        <label for="supersafe">Super safe (+{{packagePrice.superSafe}}{{form.currency}}, 75%)</label>
        <span class="error" v-if="error.package">{{ error.package }}</span>
      </div>
      <h2 v-if="form.age"><span>Your premium is:</span> {{ form.premium }}{{ form.currency }}</h2>
      <div class="action">
        <button @click="handleRedirect('GreetingScreen')">Back</button>
        <button @click="handleValidateForm">Next</button>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { onMounted, reactive } from "vue";
  import { handleRedirect } from "../router/redirect"
  import { getItemStorage, setItemStorage }  from "../utils/storage"
  import { User } from "../models"

  const storedDetails = getItemStorage('_DETAILS_')
  const form = reactive({
    name: '',
    age: '',
    country: 'Hong Kong',
    currency: 'HKD',
    package: 'Standard',
    premium: 0
  })
  const packagePrice = reactive({
    standard: 0,
    safe: 0,
    superSafe: 0,
    rate: 0
  })
  const error = reactive({
    name: '',
    age: '',
    country: '',
    package: ''
  })

  const handleAge = (event: KeyboardEvent) => {
    const key = event.which || event.keyCode;

    // prevent age input to enter non numeric characters
    if ((key > 31 && (key < 48 || key > 57)) && key !== 46) event.preventDefault()
    else return true
  }

  const handlePremiumPrice = () => {
    // update package standard price and rate based on selected country
    if (form.country === 'Australia') {
      packagePrice.standard = 300
      packagePrice.rate = 3
    } else if (form.country === 'USA') {
      packagePrice.standard = 200
      packagePrice.rate = 2
    } else {
      packagePrice.standard = 100
      packagePrice.rate = 1
    }

    // Calculate premium price
    const age = form.age ? parseInt(form.age) : 0
    const premium = 10 * age * packagePrice.rate
    const premiumPercentage = (percent: number) => packagePrice.standard * (percent / 100)

    // update safe and super safe price
    packagePrice.safe = premiumPercentage(50) 
    packagePrice.superSafe = premiumPercentage(75)

    // set premium price
    if (form.package === 'Standard') return form.premium = premium + packagePrice.standard
    if (form.package === 'Safe') return form.premium = premium + packagePrice.safe + packagePrice.standard
    if (form.package === 'Super Safe') return form.premium = premium + packagePrice.superSafe + packagePrice.standard
  }

  const handleChangeCountry = () => {
    if (form.country === 'Australia') form.currency = 'AUD'
    else if (form.country === 'USA') form.currency = 'USD'
    else form.currency = 'HKD'
    handlePremiumPrice()
  }

  const handleAutoFillForm = () => {
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails) as User
      form.name = parsedDetails.name
      form.age = parsedDetails.age
      form.country = parsedDetails.country
      form.package = parsedDetails.package
      handleChangeCountry()
    }
  }

  const handleFormSubmit = () => {
    if (parseInt(form.age) > 100) {
      handleRedirect('ErrorScreen', {isFormError: 1})
    } else {
      setItemStorage('_DETAILS_', form)
      handleRedirect('SummaryScreen')
    }
  }

  const handleValidateForm = () => {
    error.name = !form.name ? 'Name is required' : ''
    error.age = !form.age ? 'Age is required' : ''
    error.country = !form.country ? 'Country is required' : ''
    error.package = !form.package ? 'Select a package' : ''

    if (!error.name && !error.age && !error.country && !error.package) handleFormSubmit()
  }

  onMounted(() => {
    handleAutoFillForm()
    handlePremiumPrice()
  })
</script>

<style lang="scss" scoped>
@import '../assets/scss/formScreen';
</style>