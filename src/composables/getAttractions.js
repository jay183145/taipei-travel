import axios from 'axios';
import { ref } from 'vue';
import _ from 'lodash'

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
  const apiURL = '/api/zh-tw/Events/Activity?begin=2022-06-02&end=2022-06-02&page=1'
  // Make a request for a user with a given ID
  
  const load = async () => {
    try {
      await axios.get(apiURL, config)
        .then((response) => {
          //----------------------------------- get the origin data ----------------------------------------// 
          //get all datas in the setting time
          // attractions.value = response.data
          // console.log(attractions)

          // --------------------------get the datas which has organizer---------------
          attractionWithOrganizer.value = response.data.data.filter((hasOrg) => hasOrg.organizer)
          // -----> log data
          // console.log(attractionWithOrganizer)
          // console.log(Object.values(attractionWithOrganizer._rawValue))
          //object split and deepcopy
          let organizerSplit = _.cloneDeep(attractionWithOrganizer.value)
          //---------xxxxxxxxx---------------- get the data ------------------xxxxxxxxxxxx---------// 

          //-----------------------------------  filter data  ----------------------------------------//
          // split("、") array length array
          let organizerLengthArray = []
          //iter through Array of Object
          organizerSplit.forEach(element => {
            // split("、") array
            let organizerArray = []    
            Object.entries(element).forEach(([key, value]) => {
              // console.log(`${key}: ${value}`)
              if ( key === "organizer" && value.includes("、")) {
                organizerArray = value.split("、")
                
              } 
            }) 
            //------->  log each object         
            // console.log(element)
            // console.log(organizerArray)
            // push split("、") array  to an array 
            organizerLengthArray.push(organizerArray)
          })
        //----> log  split("、") array length array
        // console.log(organizerLengthArray)

        for (let i = 0; i <= organizerLengthArray.length-1; i++ ) {
          if ( organizerLengthArray[i].length === 0  ) {
          } else {
            // console.log(organizerSplit[i]) 
            // console.log(organizerLengthArray[i].length)

            //copy object into array
            let copyObject = Array(organizerLengthArray[i].length).fill(organizerSplit[i])
            copyObject.forEach((obj) => {           
              delete organizerSplit[i]
              return organizerSplit.push(obj)
            })   
          }
        }
        console.log(organizerSplit)
        //------------xxxxxxxxxxx---------------  filter data  ------------xxxxxxxx--------------//
        })
        .catch((err) => {
          error.value = err.message
        })
    }
    catch (err) {
      error.value = err.message
    }
  }

  return { attractionWithOrganizer, attractions, error, load }
}
export default getAttractions