import axios from 'axios'
import { ref } from 'vue';

const getAttractions = ()=> {

  let attractions = ref(null)
  let error = ref(null)

  //set header
  const config = {
      headers: {
        header1: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
      }
    }
    // // use cors-anywhere to fetch api data
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'https://www.travel.taipei/open-api/zh-tw/Events/Activity?begin=2022-06-02&end=2022-06-02&page=1'
    // Make a request for a user with a given ID
    
    const load = async () => {
      try {
          axios.get(`${corsURL}${apiURL}`, config)
            .then(function (response) {
            console.log(response.data.data)
            attractions.value = response.data.data
            })
            // .catch(function (error) {
            //   console.log(error);
            // })
            // .then(function () {
            //   // always executed
            // });
      }
      catch (err) {
        error.value = err.message
      }
    }

    return { attractions, error, load }
}
export default getAttractions