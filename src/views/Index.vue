<template>
  <div id="index">
    <h1 id="title">Utsaha Advert</h1>
    <h2>Home</h2>

    <div id="attend-stat">
      <h4>Attendance Status:</h4>
        Check in time: <router-link to="/Attendance-View"><p id="attend-pv"/></router-link>
    </div>

    <div id="profile_view">
      <h4>Profile:<p id="p_group" class="pv-text"/></h4>
      UserName: <p id="p_username" class="pv-text"/>
      First Name: <p id="p_fname" class="pv-text"/>
      Contact: <p id="p_contact" class="pv-text"/>
      Current Branch: <p id="p_branch" class="pv-text"/>
      Email: <p id="p_email" class="pv-text"/>
      For detailed view, click <router-link to="/Account-Update">here.</router-link>
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
    this.getAttendToday()
  },
  data:()=>({
    profile_view:{},
    attendance_card:{}, attendance_card_temp:{}
  }),
  methods:{
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
            document.getElementById("p_branch").innerHTML=this.profile_view.branch.branch_name
            document.getElementById("p_email").innerHTML=this.profile_view.email
            if(this.profile_view.groups[0].name.toLowerCase()==='operational manager'){
              document.getElementById('nav-bars').hidden=false
              document.getElementById('nav_om').hidden=false
              document.getElementById('main-container-body').style.width='84%'
              //storing manager or admin for the current user
              localStorage.setItem('manageroradmin',this.profile_view.groups[0].name.toLowerCase())
              console.log('group: ' + this.profile_view.groups[0].name.toLowerCase())
            }
            else if(this.profile_view.groups[0].name.toLowerCase()==='admin'){
              document.getElementById('nav-bars').hidden=false
              document.getElementById('nav_admin').hidden=false
              document.getElementById('main-container-body').style.width='84%'
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
            console.log('log: your check in time: ' + respo.data[index].check_in)
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
#index{
  
}

#pv-text{
  width: fit-content;
}

/* attendance time display */
#attend-stat{
  position: absolute;
  padding: .2%;
  bottom: 6%;
  right:3%;
  width: fit-content;
  background-color: #def2f1;
  box-shadow: 3px 3px 2px #5da2d5;
  border-radius: 3%;
  transition: .3s
}
#attend-stat:hover{
  background-color: #feffff;
  box-shadow: 5px 5px 3px #265077;
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
