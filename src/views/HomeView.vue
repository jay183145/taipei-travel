<template>
  <div class="home">
    <h1>台北旅遊網</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="attractionWithOrganizer!==null" v-for="organizer in attractionWithOrganizer" :key="attractionWithOrganizer.id" class="attractions">
      {{ organizer.organizer }}
      <a :href="organizer.url">{{ organizer.title }}</a>
    </div>
    <p v-else>
      <Spinner />
    </p>
  </div>
</template>

<script setup>
import getAttractions from '../composables/getAttractions'
import Spinner from '../components/Spinner.vue'
import { ref } from 'vue'

const { attractionWithOrganizer, attractions, error, load } = getAttractions()

load()


</script>