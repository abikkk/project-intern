<template>
  <div id="attendreport-body">
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
      {text:'Username',value:'user'},
      {text:'In time',value:'check_in'},
      {text:'Out time',value:'check_out'},
      {text:'Check in date',value:'check_in_date'},
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
        headers: {Authentication: localStorage.getItem('token')}
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
#attendreport-body{
  // margin-top: 2.5%;
}
</style>
