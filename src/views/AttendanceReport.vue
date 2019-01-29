<template>
  <div id="attendreport-body">
    <h2>Overall Attendance Report:</h2>
    <v-tabs v-model="form">
      <!-- overall attendance report -->
      <v-tab>
        OverAll Attendance
      </v-tab>
      <v-tab-item>
        <v-data-table class="tables" :headers="headers" :items="attendreport">
          <template slot="items" slot-scope="prop">
            <td> {{ prop.item.user.username }} </td>
            <td> {{ prop.item.check_in }} </td>
            <td> {{ prop.item.check_out }} </td>
            <td> {{ prop.item.check_in_date }} </td>
          </template>
        </v-data-table>

        <!--calender from -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderfrom"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_1"
                :rules="[rules.required]"
                label="Pick your Start Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_1" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <!--calender to -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderto"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_2"
                :rules="[rules.required]"
                label="Pick your End Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_2" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <v-btn @click="get_selected_report()">Change</v-btn>
      </v-tab-item>

      <v-tab>
        Individual Attendance
      </v-tab>
      <v-tab-item>
        <!--calender from -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderfrom"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_1"
                :rules="[rules.required]"
                label="Pick your Start Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_1" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <!--calender to -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderto"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_2"
                :rules="[rules.required]"
                label="Pick your End Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_2" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <v-select v-model="select_username" :rules="[rules.required]" :items="usernames" required=""/>

        <v-btn :disabled="!form" @click="get_attend_report()">Show Report</v-btn>
        <v-divider/>

        <v-data-table class="tables" :headers="headers" :items="selected_attendreport">
          <template slot="items" slot-scope="prop">
            <td> {{ prop.item.user.username }} </td>
            <td> {{ prop.item.check_in }} </td>
            <td> {{ prop.item.check_out }} </td>
            <td> {{ prop.item.check_in_date }} </td>
          </template>
        </v-data-table>

      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
  name:'Attendance-Report',
  data:()=>({
    form:false,
    attendreport:[],
    selected_attendreport:[],
    headers:[
      {text:'Username',value:'user.username'},
      {text:'In time(hr.min.sec)',value:'check_in'},
      {text:'Out time(hr.min.sec)',value:'check_out'},
      {text:'Check in date(yyyy-mm-dd)',value:'check_in_date'},
    ],
    usernames:[],
    select_username:'',
    date_1: new Date().toISOString().substr(0, 10),
    date_2: new Date().toISOString().substr(0, 10),
    calenderview: false,
    calenderto: '',
    calenderfrom: '',
    rules:{
      required: v=>!!v || 'Cannot be left empty!',
    }
  }),
  mounted(){
    this.getAttendReports()
    this.getUserProfiles()
  },
  methods:{
    //SELECTED TIME PERIOD ATTEND VIEW
    get_selected_report(){
      Axios({
        methods:'post',
        url: baseUrl + 'attend/v1/attendance-date-wise/',
        data:{
          'date_from':this.date_1,
          'date_to':this.date_2
        },
        headers: {Authorization: localStorage.getItem('token')}
    })
        .then(respo=>{
          console.log(respo)
            // for(let index in respo.data){
            //   this.selected_attendreport.push(respo.data[index])
            // }
        })
        .catch(function (error){
            console.log('error: error in get_attend_report module' + error)
        })
    },

    //GETTING ATTENDANCE REPORT FOR SELECTED USER
    get_attend_report(){
      Axios({
        methods:'post',
        url: baseUrl + 'attend/v1/user-attendance-date-wise/',
        data:{
          'username':[this.select_username],
          'date_from':this.date_1,
          'date_to':this.date_2
        },
        headers: {Authorization: localStorage.getItem('token')}
    })
        .then(respo=>{
          console.log(respo)
            // for(let index in respo.data){
            //   this.selected_attendreport.push(respo.data[index])
            // }
        })
        .catch(function (error){
            console.log('error: error in get_attend_report module' + error)
        })
    },

    //GETTING USER PROFILES
    getUserProfiles(){
        Axios({
            method:'get',
            url: baseUrl + 'users/v1/userlist/',
            headers: {Authorization: localStorage.getItem('token')}
        })
        .then(response=>{    
            console.log(response.data)   
            this.setUserNames(response.data)  
        })
        .catch(function(error){
            console.log('error: error in getUserProfiles.' + error)
        })
    },
    
    //SETTING USER NAMES FOR V-SELECT
    setUserNames(userprofiles){
        for(let index in userprofiles){
          let profiles_read={}
          profiles_read.value=userprofiles[index].id
          profiles_read.text=userprofiles[index].username
          this.usernames.push(profiles_read)
        }
    },

    //GETTING OVERALL ATTENDANCE REPORT
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
