<template>
  <h1>台北旅遊網</h1>
  <!-- <div class="collapse">
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
  </div> -->
  <div v-for="organizer in organizerAfterFilterCopy" :key="organizer">
    {{ organizer }}
  </div>
</template>

<script setup>

import getAttractions from '../composables/getAttractions'
import Spinner from '../components/Spinner.vue'
import { ref } from 'vue'

const { organizerAfterFilterCopy, attractionWithOrganizer, attractions, error, load } = getAttractions()

load()

</script>

<style>
.collapse {
  margin: 5rem;
  max-width: 30rem;
  text-align: right;
}
</style>