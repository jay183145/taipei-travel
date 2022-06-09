<script setup>

import getAttractions from '../composables/getAttractions'
import Spinner from '../components/Spinner.vue'
import { reactive, ref } from 'vue'

const { organizers, attractionWithOrganizer, attractions, error, load } = getAttractions()

load()

console.log(organizers)
console.log(JSON.stringify(organizers, null, 4))

</script>

<template>
  <h1>台北旅遊網</h1>
  <div class="collapse">
    <div v-if="error">{{ error }}</div>
    <div v-if="attractionWithOrganizer!==null" class="el-collapse">
      <div  v-for="organizer in attractionWithOrganizer" :key="organizer" class="attractions">
        <el-collapse>
          <el-collapse-item :title="organizer.organizer" >
            <a :href="organizer.url">{{ organizer.title }}</a>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>  
    <p v-else>
      <Spinner />
    </p>
  </div>
  <!-- <div v-for="organizer in organizers" :key="organizer">
    <div>
      {{ organizer }}
    </div>
  </div> -->
</template>

<style>
.collapse {
  margin: 5rem;
  max-width: 30rem;
  text-align: right;
}
</style>