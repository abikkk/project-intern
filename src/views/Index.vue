<template>
  <div id="index">
    <h1 id="title">Home</h1>

    <!-- div for admin or OM -->
    <div id="admin_om" hidden>
      <v-tabs v-model="active">
      <!-- all users -->
        <v-tab>
          Current Users
        </v-tab>
        <v-tab-item>
          <!-- profile cards -->
          <div id="profile_cards">
            <v-data-iterator 
                content-tag="v-layout"
                :items="user_profiles"
                :rows-per-page-items="pages"
                no-data-text="No Staffs registered, please add new accounts" wrap>
                <v-flex slot="item" slot-scope="props">
                  <v-card>
                    <v-card-title @click="search_user(props.item.user)">
                      <h4>Username: {{ props.item.user }}</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content>ID:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ props.item.user_id }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Email:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Current Branch:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ props.item.branch }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Current Group:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ props.item.group }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>First name:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ props.item.fname }}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-data-iterator>
          </div>
        </v-tab-item>
      
      <!-- today view -->
        <v-tab>
          Today
        </v-tab>
        <v-tab-item>
          <v-data-table class="tables" :headers="headers_all_attend" :items="today_attend">
              <template slot="items" slot-scope="prop">
                  <td> {{ prop.item.user.username }} </td>
                  <td> {{ prop.item.check_in }} </td>
                  <td> {{ prop.item.check_out }} </td>
                  <td> {{ prop.item.check_in_date }} </td>
              </template>
          </v-data-table>
        </v-tab-item>

      <!-- user view -->
        <v-tab>
          User
        </v-tab>
        <v-tab-item>
          <v-form ref="form" v-model="form">
            <v-text-field v-model="username" label="UserName" readonly/>
            <v-text-field v-model="gender" label="Gender" readonly/>
            <v-text-field v-model="fname" label="First Name" readonly/>
            <v-text-field v-model="lname" label="Last Name" readonly/>
            <v-text-field v-model="address" label="Address" readonly/>
            <v-text-field v-model="contact" label="Contact" readonly/>
            <v-text-field v-model="email" label="E-mail" readonly/>
            <v-text-field v-model="current_group" label="Current Group" readonly/>
        </v-form>
        <div id="attendview-body">
        <h1>Attendance Report for current user:</h1>
          <v-data-table :headers="headers" :items="attend_report" class="tables" >
              <template slot="items" slot-scope="prop">
                  <td>{{ prop.item.check_in }}</td>
                  <td>{{ prop.item.check_out }}</td>
                  <td>{{ prop.item.check_in_date }}</td>
              </template>
          </v-data-table>
        </div>
        </v-tab-item>
      </v-tabs>
    </div>

    <!-- div for normal staff -->
    <div id="non_adminORom" hidden>
      (staff)
    </div>
  </div>
</template>

<script>
import { baseUrl } from '../utils/misc';
import Axios from 'axios';

// @ is an alias to /src
export default {
  name: 'index',
  mounted(){
    this.getProfile() 
    this.getUserProfiles() 
    this.getAttendToday(localStorage.getItem('user_id'))
  },
  data:()=>({
    pages:[3,6,12],
    pagination:{rows:3},
    active:null,
    form:true,
    fname:'',lname:'',contact:'',username:'',gender:'',uid:'',address:'',email:'',branch_name:'',current_group:'',
    selected_user:[],
    profile_view:{},
    user_profiles:[],
    profiles:{},
    today_attend:[],
    attend_report:[],attend_report_temp:[],
    attendance_card:{}, attendance_card_temp:{},
    headers_all_attend:[
      {text:'User',value:'user.username'},{text:'Check-in time (hr.min.sec)',value:'check_in'},{text:'Check-out time (hr.min.sec)',value:'check_out'},{text:'Check-in date',value:'check_in_date'}
    ],
    headers_user_attend:[
      {text:'User',value:'user.username'},{text:'Check-in time (hr.min.sec)',value:'check_in'},{text:'Check-out time (hr.min.sec)',value:'check_out'},{text:'Check-in date',value:'check_in_date'}
    ],
    headers:[
      {text:'In time(hr.min.sec)',value:'check_in'},
      {text:'Out time(hr.min.sec)',value:'check_out'},
      {text:'Check in date(yyyy-mm-dd)',value:'check_in_date'},
    ],
  }),
  methods:{
    //SEARCH USER
    search_user(user_name){
      Axios({
        methods:'get',
        url: baseUrl + 'users/' + user_name,
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(resp=>{
        this.selected_user = resp.data
        console.log('success: succes for individual attendance for selected user.')
        this.fname=this.selected_user.first_name
        this.lname=this.selected_user.last_name
        this.contact=this.selected_user.contact
        this.username=this.selected_user.username
        this.gender=this.selected_user.gender
        this.uid=this.selected_user.id
        this.address=this.selected_user.address
        this.email=this.selected_user.email
        this.branch_name=this.selected_user.branch.branch_name
        this.current_group=this.selected_user.groups[0].name
        this.getUserAttendReport(this.uid)
      })
    },

    //TAB CHANGE
    tab_change(tabnum){
      const active=parseInt(this.active)
      this.active=(tabnum)
    },

    //GETTING TODAYS ATTEND REPORT FOR THE USERS
    getTodayUserAttend(user){
      Axios({
        methods:'get',
        url: baseUrl + 'attend/v1/view-attendance',
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(respo=>{
        // console.log(respo.data)
        for (let index in respo.data) {
          if(respo.data[index].user.username===user)
          {
            if(respo.data[index].check_in_date===new Date().toISOString().substr(0, 10)){
              this.today_attend.push(respo.data[index])
              break
            }
          }
        }
      })
      .catch(function(error){
        console.log('error: error in getAttendToday' + error)
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
            this.setUserProfiles(response.data)
            this.getTodayUserAttend(response.data)   
        })
        .catch(function(error){
            console.log('error: error in getUserProfiles.' + error)
        })
    },
    setUserProfiles(userprofiles){
        for(let index in userprofiles){
            let profiles_read={}
            if(userprofiles[index].groups[0].name.toLowerCase()!=='operational manager')
            {
              profiles_read.user_id=userprofiles[index].id
              profiles_read.user=userprofiles[index].username
              profiles_read.fname=userprofiles[index].first_name
              profiles_read.group=userprofiles[index].groups[0].name
              profiles_read.branch=userprofiles[index].branch.branch_name
              profiles_read.email=userprofiles[index].email
              profiles_read.todayattendstat=this.getTodayUserAttend(profiles_read.user)  
              this.user_profiles.push(profiles_read)
            }
        }
        console.log('success: user profiles import success.')
        console.log(this.today_attend)
    },

    //GETTING CURRENT USER PROFILE
    getProfile(){
      Axios({
        methods:'get',
        url: baseUrl + 'users/' + localStorage.getItem('username'),
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(resp=>{
        console.log(resp)
        this.profile_view = resp.data
        localStorage.setItem('user_id',this.profile_view.id)
        document.getElementById("p_username").innerHTML=this.profile_view.username
        document.getElementById("p_fname").innerHTML=this.profile_view.first_name
        document.getElementById("p_contact").innerHTML=this.profile_view.contact
        document.getElementById("p_group").innerHTML='(' + this.profile_view.groups[0].name + ')'
        localStorage.setItem('user_group',this.profile_view.groups[0].name)
        document.getElementById("p_branch").innerHTML=this.profile_view.branch.branch_name
        document.getElementById("p_email").innerHTML=this.profile_view.email
        if(this.profile_view.groups[0].name.toLowerCase()==='operational manager'){
          document.getElementById('nav-bars').hidden=false
          document.getElementById('nav_om').hidden=false
          document.getElementById('admin_om').hidden=false
          //BODY WIDTH FOR THE MAIN-CONTAINER
          document.getElementById('main-container-body').style.width='70%'
          //storing manager or admin for the current user
          localStorage.setItem('manageroradmin',this.profile_view.groups[0].name.toLowerCase())
          console.log('group: ' + this.profile_view.groups[0].name.toLowerCase())
        }
        else if(this.profile_view.groups[0].name.toLowerCase()==='admin'){
          document.getElementById('nav-bars').hidden=false
          document.getElementById('nav_admin').hidden=false
          document.getElementById('admin_om').hidden=false
          //BODY WIDTH FOR THE MAIN-CONTAINER
          document.getElementById('main-container-body').style.width='70%'
          //storing manager or admin for the current user
          localStorage.setItem('manageroradmin',this.profile_view.groups[0].name.toLowerCase())
        }
        else{
          document.getElementById('non_adminORom').hidden=false
          // document.getElementById('main-container-body').style.width='78%'
        }
      })
      .catch(function (error){
        console.log('error: error in getProfile.' + error)
      })
    },

    //GETTING INDIVIDUAL ATTENDANCE REPORT FOR USERS
    getUserAttendReport(userid){
      Axios({
          methods:'get',
          url: baseUrl + 'attend/v1/view-user-attendance/' + userid,
          headers: {Authorization: localStorage.getItem('token')}
      })
          .then(respo=>{
              this.attend_report_temp=respo.data
              for(let index in this.attend_report_temp){
                  this.attend_report.push(this.attend_report_temp[index])
              }
              console.log(this.attend_report)
            this.tab_change(2)
          })
          .catch(function (error){
              console.log('error: error in getUserAttendReport module' + error)
          })
      },

    //GETTING CURRENT USER ATTEND STAT FOR TODAY
    getAttendToday(userid){
      Axios({
        methods:'get',
        url: baseUrl + 'attend/v1/view-user-attendance/' + userid,
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(respo=>{
        console.log(respo.data)
        for (let index in respo.data) {
          if(respo.data[index].check_in_date===new Date().toISOString().substr(0, 10)){
            this.attendance_card= respo.data[index]
            document.getElementById("attend-pv").innerHTML=this.attendance_card.check_in
            console.log('success: check in time: ' + respo.data[index].check_in)
            // console.log(this.attendance_card.check_out)
            if(this.attendance_card.check_out===null){
              document.getElementById('check_status').innerHTML='IN'
            }
            else{
              document.getElementById('check_status').innerHTML='OUT(' + respo.data[index].check_out + ')'
            }
            break
          }
        }
      })
      .catch(function(error){
        console.log('error: error in getAttendToday' + error)
      })
    }
  }
};
</script>

<style>
#pv-text{
  width: fit-content;
}

/* attendance time display */
#attend-stat{
  padding: .2%;
  width: fit-content;
}

/* current user profile preview */
#profile_view{
  position: absolute;
  right: 1%;
  padding: 1%;
  margin: 2%;
  border-radius: 2%;
  border-width: .5px;
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px grey;
  transition:.3s
}
#profile_view:hover{
  background-color: #feffff;
}
</style>
