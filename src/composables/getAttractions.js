import axios from 'axios'
import { ref } from 'vue';

const getAttractions = ()=> {

  const attractions = ref(null)
  const attractionWithOrganizer = ref(null)
  const error = ref(null)

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
            .then((response) => {
              attractions.value = response.data.data
              console.log(response.data.data)

              attractionWithOrganizer.value = response.data.data.filter((hasOrg) => hasOrg.organizer)
              console.log(attractionWithOrganizer)
            })
            .catch((error) => {
              console.log(error);
            })
      }
      catch (err) {
        error.value = err.message
      }
    }

    return { attractions, error, load }
}
export default getAttractions