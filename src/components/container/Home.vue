<template>
  <div id="base">
  <!-- header -->
    <header>
      <table id="nav">
        <td id="nav-td"><router-link id="nav-item" to="/Home">Home</router-link></td>
        <td id="nav-td"><router-link id="nav-item" to="/Request-Leave">Request Leave</router-link></td>
        <td id="nav-td"><router-link id="nav-item" to="/Account-Update">Account</router-link></td>
        <td id="nav-td"><router-link id="nav-item" to="/Leave-Requests">Leave Requests</router-link></td>
        <td id="nav-td"><a id="nav-item" class="logout" href="#" @click.stop.prevent="dialog = true">Logout</a></td>
      </table>
    </header>

  <!--OM navbar-->
  <div id="nav-bars" hidden>
    <div id="nav_om" hidden>
      <!-- <h3>OM Nav-Bar</h3> -->
      <table id="om-nav">
        <tr><td id="nav-td"><router-link id="nav-item" to="/Attendance-Report">Attendance Report</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Leave-Reports">Leave Reports</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/New-User">Create New User</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Group-Branch">Group/Branch</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Leave-Types">Leave Types</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Users">View/Edit Users </router-link></td>
        </tr>
      </table>
    </div>
  <!-- admin navbar -->
    <div id="nav_admin" hidden>
      <!-- <h3>Admin Nav-Bar</h3> -->
      <table id="admin-nav">
        <tr><td id="nav-td"><router-link id="nav-item" to="/Attendance-Report">Attendance Report</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Leave-Reports">Leave Reports</router-link></td>
        </tr>
        <tr><td id="nav-td"><router-link id="nav-item" to="/Users">View/Edit Users</router-link></td>
        </tr>
      </table>
    </div>
  </div>

  <!-- main body -->
    <div id="main-container-body">
      <v-card class="cards">
        <router-view/>
      </v-card>
    </div>

  <!-- profile view -->
  <div id="profile_view">
    <h4>Profile:<p id="p_group" class="pv-text"/></h4>
    UserName: <p id="p_username" class="pv-text"/>
    First Name: <p id="p_fname" class="pv-text"/>
    Contact: <p id="p_contact" class="pv-text"/>
    Current Branch: <p id="p_branch" class="pv-text"/>
    Email: <p id="p_email" class="pv-text"/>
    For detailed view, click <router-link to="/Account-Update">here.</router-link>
    <v-divider/>

    <!-- attend stat -->
    <div id="attend-stat">
      <h4>Attendance Status:</h4>
      <p id="check_status"></p>
        Check in time: <router-link to="/Attendance-View"><p id="attend-pv"/></router-link>
    </div>
  </div>

  <!--Logout Module -->
    <v-dialog width="fit-content" v-model="dialog" absolute id="dailog-box" persistent>
      <v-card id="dailog-card">
        <v-card-title>Logging Out...</v-card-title>
        <v-card-text>
          <h3>Log Out or Checkout?</h3>
          <p>
            Do you want to just logout? <br>
            Or would you like to checkout as well?
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat @click="logout(),dialog = false">Logout Only</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog=false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkout(),dialog = false">
            Checkout as well.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- footer -->
    <footer>
      <p @click="open_about()">Utsaha Advert | 2018</p>
    </footer>
  </div>
</template>

<script>
  import Index from '../../views/Index.vue'
  import axios from 'axios';
  import {baseUrl} from '../../utils/misc.js'

  export default {
    mounted(){

    },
    data:()=>({
      user_check:{},
      token:'',
      dialog:false,
      navom:false,
      date: new Date().toISOString().substr(0, 10),
    }),
    components: {
      Index
    },
    methods:{
      open_about(){
        this.$router.push('/About')
      },
      logout(){
        axios({
            method: 'post',
            url: baseUrl + "auth/token/logout",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log(response)
            this.$router.push('/Login')
        })
        .catch(function (error){
          console.log('Error Occured while logging out:')
          console.log(error)
        })
      },
      checkout(){
        axios(
        {
            method: 'post',
            url: baseUrl + "users/v1/logout/",
            headers: {Authorization: localStorage.getItem('token')}
          })
          .then(response => {
            console.log(response)
            this.$router.push('/Login')
        })
        .catch(function (error){
          console.log('Error occured while checking out:')
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
#main-container-body{
  margin: 1.5%;
  padding: .5%;
  color:initial;
  float: left;
  width: 80%;
  transition: .3s;
  height: fit-content ;
  border-left-style: solid;
  border-left-width: 1px;
#dailog-box{
  width: 60%;
}
}
/*OM navigation bar(menu) section*/
header{
  z-index: 1;
  border-width: 1px;  
  position: relative;
  box-shadow: 0px 1px 1px grey;
  align-content: center;
  text-align: center;
  font-size: 25px; 
  transition:.3s;
  #nav{
    width: 100%;
  }
}
#nav-td{
  border-radius: 3%;
  transition: .3s;
}
#nav-td:hover{
    background-color: white;
  }

#nav-item{
  padding: 1%;
  text-decoration: none;
  color: inherit;
}

#nav-bars{
  display: block;
  margin-top: .5%;
  height: 100%;
  margin-left:  0.3%;
  float: left;
  font-size: 15px;
  background-color: whitesmoke ;
  box-shadow: 1px 1px 1px gray;
  border-radius: 1%;
  transition: .3s;
}

.tables{
  background-color: #def2f1;
  padding: 1%;
  width: 100%;
}

.cards{
  padding: 1%;
  background-color: #def2f1;
  height: fit-content;
}

footer{
  position: absolute;;
  bottom: 0;
  right:0;
  height: fit-content;
  transition: .3s;
  border-radius: 5%;
  cursor:pointer;
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
p{
  float: right;
  transition: .3s;
}
p:hover{
  z-index: 1;
  font-size: 15px;
}
}

</style>