<template>
  <div id="attendreport-body">
    <h2>Overall Attendance Report:</h2>
    <v-data-table class="tables" :headers="headers" :items="attendreport">
      <template slot="items" slot-scope="prop">
        <td> {{ prop.item.user.username }} </td>
        <td> {{ prop.item.check_in }} </td>
        <td> {{ prop.item.check_out }} </td>
        <td> {{ prop.item.check_in_date }} </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
  name:'Attendance-Report',
  data:()=>({
    attendreport:[],
    headers:[
      {text:'Username',value:'user.username'},
      {text:'In time(hr.min.sec)',value:'check_in'},
      {text:'Out time(hr.min.sec)',value:'check_out'},
      {text:'Check in date(yyyy-mm-dd)',value:'check_in_date'},
    ]
  }),
  mounted(){
    this.getAttendReports()
  },
  methods:{
    getAttendReports(){
      Axios({
        methods:'get',
        url: baseUrl + 'attend/v1/view-attendance',
        headers: {Authorization: localStorage.getItem('token')}
      })
        .then(resp=>{
          this.attendreport=resp.data
          console.log('success: Attend Report Import Success')
        })
        .catch(function (error){
          console.log('error: error in getAttendReport.' + error)
        })
    },
  }
}
</script>

<style lang="scss">

</style>
