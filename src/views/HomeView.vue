<template>
  <div class="home">
    <h1>台北旅遊網</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="attractionWithOrganizer!==null" v-for="attraction in attractions" :key="attraction.id" class="attractions">
      {{ attraction.title }} =============> {{ attraction.organizer }}
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



// onMounted(() =>{
//   attractions.map(x => organizerList.push(x.organizer))
//   console.log(organizerList)
// })

//---------------------------------organizerList---------------------------------------//
</script>