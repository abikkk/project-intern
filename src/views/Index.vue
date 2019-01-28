<template>
  <div id="index">
    <h1 id="title">Home</h1>
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
              no-data-text="No Staffs registered, please add new accounts">
              <v-flex slot="item" slot-scope="props">
                <v-card>
                  <v-card-title @click="tab_change(props.item.user)">
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
        work on progress
      </v-tab-item>
    <!-- user view -->
      <v-tab>
        Users
      </v-tab>
      <v-tab-item>
        work on progress
      </v-tab-item>
    </v-tabs>
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
    this.getAttendToday()
  },
  data:()=>({
    active:null,
    profile_view:{},
    user_profiles:[],
    attendance_card:{}, attendance_card_temp:{}
  }),
  methods:{
    //TAB CHANGE
    tab_change(username){
      const active=parseInt(this.active)
      this.active=(2)
    },
    //GETTING TODAYS ATTEND REPORT FOR THE USERS
    getTodayUserAttend(){
      
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
        })
        .catch(function(error){
            console.log('error: error in getUserProfiles.' + error)
        })
    },
    setUserProfiles(userprofiles){
        for(let index in userprofiles){
            let profiles_read={}
            profiles_read.user_id=userprofiles[index].id
            profiles_read.user=userprofiles[index].username
            profiles_read.fname=userprofiles[index].first_name
            profiles_read.group=userprofiles[index].groups[0].name
            profiles_read.branch=userprofiles[index].branch.branch_name
            profiles_read.email=userprofiles[index].email
            if(profiles_read.user.toLowerCase()==='admin' && profiles_read.user===localStorage.getItem('username')){
                //do nothing
            }
            else{
            this.user_profiles.push(profiles_read)
            }
        }
        console.log('success: user profiles import success.')
    },
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
          document.getElementById('main-container-body').style.width='70%'
          //storing manager or admin for the current user
          localStorage.setItem('manageroradmin',this.profile_view.groups[0].name.toLowerCase())
          console.log('group: ' + this.profile_view.groups[0].name.toLowerCase())
        }
        else if(this.profile_view.groups[0].name.toLowerCase()==='admin'){
          document.getElementById('nav-bars').hidden=false
          document.getElementById('nav_admin').hidden=false
          document.getElementById('main-container-body').style.width='70%'
          //storing manager or admin for the current user
          localStorage.setItem('manageroradmin',this.profile_view.groups[0].name.toLowerCase())
        }
        else{
          document.getElementById('main-container-body').style.width='95%'
        }
      })
      .catch(function (error){
        console.log('error: error in getProfile.' + error)
      })
    },
    getAttendToday(){
      Axios({
        methods:'get',
        url: baseUrl + 'attend/v1/view-user-attendance/' + localStorage.getItem('user_id'),
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
  background-color: #def2f1;
  box-shadow: 3px 3px 2px #5da2d5;
  transition:.3s
}
#profile_view:hover{
  background-color: #feffff;
  box-shadow: 5px 5px 3px #265077;
}
</style>
