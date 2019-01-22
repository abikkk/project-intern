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
      <tr><td id="nav-td"><router-link id="nav-item" to="/Users-Delete">Delete Users </router-link></td>
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
      <tr><td id="nav-td"><router-link id="nav-item" to="/Users-Delete">Delete User</router-link></td>
      </tr>
    </table>
  </div>
</div>
<!-- main body -->
  <div id="main-container-body">
    <router-view/>
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
  width: 95%;
  transition: .3s;
  height: 100%;
  border-left-style: solid;
  border-left-width: 1px;
#dailog-box{
  width: 60%;
}
}
/*OM navigation bar(menu) section*/
header{
  z-index: 1;
  background-color: #5ab9ea;
  border-width: 1px;  
  position: relative;
  box-shadow: 0px 2px 2px #265077;
  width: 100%;
  font-size: 20px; 
  transition:.3s;
  #nav{
    width: 100%;
    text-align: center;
  }
}
header:hover{
  box-shadow: 0px 5px 3px #265077;
}
#nav-td{
  border-radius: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
  transition: .3s;
}
#nav-td:hover{
    background-color: white;
  }

#nav-item{
  text-decoration: none;
  color: inherit;
}

#om-nav{
  height: 85vh;
} 

#admin-nav{
  height: 85vh;
}

#nav-bars{
  display: block;
  margin-top: .5%;
  height: 100%;
  margin-left:  0.3%;
  float: left;
  background-color: #def2f1 ;
  box-shadow: 2px 2px 1px #265077;
  font-size: 18px;
  border-radius: 1%;
  transition: .3s;
}

.tables{
  background-color: #def2f1;
  padding: .5%;
}

.cards{
  padding: 1%;
  background-color: #def2f1;
}

footer{
  position: absolute;;
  bottom: 0%;
  right:0;
  transition: .3s;
  border-radius: 5%;
  cursor:pointer;
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
  transition: .3s;
}
footer:hover{
  z-index: 1;
  background-color: #def2f1;
}
</style>