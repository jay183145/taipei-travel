<template>
  <div class="home">
    <h1>home</h1>
    <p>{{ attractions }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue';
//set header
const config = {
  headers: {
    header1: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
  }
}
let attractions = ref({})
// // use cors-anywhere to fetch api data
const corsURL = 'https://cors-anywhere.herokuapp.com/';
const apiURL = 'https://www.travel.taipei/open-api/zh-tw/Events/Activity?begin=2022-06-02&end=2022-06-02&page=1'
// Make a request for a user with a given ID
axios.get(`${corsURL}${apiURL}`, config)
  .then(function (response) {
    // handle success
    console.log(response)
    attractions = response.data
  })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

  
</script>