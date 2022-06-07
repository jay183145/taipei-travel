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

          //get all datas in the setting time
          // attractions.value = response.data
          // console.log(attractions)

          //get the datas which has organizer in the setting time
          attractionWithOrganizer.value = response.data.data.filter((hasOrg) => hasOrg.organizer)
          console.log(attractionWithOrganizer)
          console.log(Object.values(attractionWithOrganizer._rawValue))
          //object split and deepcopy
          let organizerSplit = _.cloneDeep(attractionWithOrganizer.value)
          // all organizer in to array

          let afterSplit = []
          
          let doSplit = organizerSplit.forEach(element => {
            // load every element
            for (let key in element) {
              if (!element[key] == "" && !element[key] == []) {
                // console.log(`${key}: ${element[key]}`)

                let tempObj = { [key]: element[key] }
                
                console.log(tempObj)
                // afterSplit.push(tempObj)
              }
            }

            // Object.entries(element).forEach(([key, value]) => {
            //   console.log(`${key}: ${value}`)

            // });
          })

          
          // let doSplit = () => {for (let obj in organizerSplit) {
          //   let tempObj = {}
          //   tempObj["begin"] = obj.begin
          //   tempObj["id"] = obj
          //   // if (obj["organizer"].include("、") ){
          //   //   // afterSplit.push(i)
          //   // } else {
          //   //   afterSplit.push(i)
          //   //   console.log(i)
          //   // }
          //   afterSplit.push(tempObj)
          //   console.log(tempObj)
          //   }
            
          // }
          doSplit()

          console.log(afterSplit)
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