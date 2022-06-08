import axios from 'axios';
import { ref } from 'vue';
import _ from 'lodash'

const getAttractions = () => {

  const attractions = ref(null)
  const attractionWithOrganizer = ref(null)
  const error = ref(null)
  const organizerAfterFilterCopy = ref(null)

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
          // --------------------------filter without organizer parameter ---------------
          attractionWithOrganizer.value = response.data.data.filter((hasOrg) => hasOrg.organizer)
          // -----> log data
          // console.log(attractionWithOrganizer)
          // console.log(Object.values(attractionWithOrganizer._rawValue))
          // -----> object deepcopy
          organizerAfterFilterCopy.value = _.cloneDeep(attractionWithOrganizer.value)
          //-----------xxxxxxxxx---------------- get the data ------------------xxxxxxxxxxxx----------------// 

          //-----------------------------------  filter data  ----------------------------------------//
          // split("、") organizer array organizer data array
          let organizerDataArray = []
          //iter through Array of Object
          organizerAfterFilterCopy.value.forEach(element => {
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
            organizerDataArray.push(organizerArray)
          })
          //----> log  split("、") array length array
          // console.log(organizerLengthArray)

          for (let i = 0; i <= organizerDataArray.length-1; i++ ) {
            if ( organizerDataArray[i].length === 0  ) {
            } else {
              // console.log(organizerSplit[i]) 
              // console.log(organizerLengthArray[i].length)

              //copy object into array
              let copyObject = Array(organizerDataArray[i].length).fill(organizerAfterFilterCopy.value[i])
              copyObject.forEach((obj, index) => {           
                // console.log(index)
                // console.log(organizerDataArray[i][index])
                // console.log(obj.organizer)
                // deepclone or all copy data will be the same 
                obj = _.cloneDeep(obj)
                obj["organizer"] = organizerDataArray[i][index]
                organizerAfterFilterCopy.value.push(obj)
              })
              delete organizerAfterFilterCopy.value[i]
            }
          }
          // text the value after all function
          // console.log(organizerAfterFilterCopy.value)

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
  // test wether value pass successfully
  // console.log(organizerAfterFilterCopy)
  return { organizerAfterFilterCopy, attractionWithOrganizer, attractions, error, load }
}

export default getAttractions