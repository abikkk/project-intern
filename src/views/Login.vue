<template>
  <div class="body-login">
    <img id="logo" alt="Utsaha Advert" src="../assets/logo.jpg">
    <div id="form">
      <h1>Utsaha Advert</h1>
      <h2><u>Login</u></h2>
      <br>
      <div id="login-form">
        <v-text-field v-model="name" label="Username" required/>
        <br>
        <v-text-field v-model="password" type="password" label="Password" required/>
      </div>
      <br>
      <div name="options" id="password_options">
        <p id="p_error"/>
        <router-link to="/Password-Reset">Reset your password?</router-link>
      </div>
      <br>
      <button id="btn" @click="cancel()">Cancel</button>
      <button class="submit-btn" id="btn" @click="login()" type="submit"><span>Login</span></button>
    </div>      
  </div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../utils/misc'

export default {
  name: 'login',
  data: () => ({
      name: '',
      password: ''
  }),
  methods:{
    submit () {
        this.$validator.validateAll();
      },
      login () {
        axios({
          method: 'post',
          data: {
            'username':this.name,
            'password':this.password
          },
          url: baseUrl + "users/v1/login/",
        })
        .then(response => {
          const token=response.data.token
          console.log('login response')
          localStorage.setItem('token','token '+token)//creating token for user login
          localStorage.setItem('username',this.name)//storing current username
          console.log('Logged User: '+ this.name)
          localStorage.setItem('manageroradmin','')//creating locastorage for user check
          this.$router.push('/Home')
        })
        .catch(function (error) {
          if(error==='Network Error'){
            console.log('error: error in login.' + error)
            document.getElementById('p_error').innerHTML='Network Error'
          }
          else{
            console.log('error: error in login.' + error)
            document.getElementById('p_error').innerHTML='Your username and password did not match. Try again.'
          }
        })
      },
      /*
      loginn () {
        this.$router.push('/Home')
      },
      */
      cancel() {
        close()
      }
  }
};
</script>

<style scoped lang="scss">
.body-login{
  margin-top: 6%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#form{
  float: right;
  width: 40%;
  text-align: center;
  background-color: #def2f1 ;
  box-shadow: 2px 2px 1px grey;
  padding:3%;
  padding-top: .5%;
  border-radius: 8%;
  transition: 1s;
}

#logo{
  width: 45%;
  height: 350px;
  padding-left: 15%;
  float: left;
  border-radius: 50%;
  animation: fadeIn 5s ease;
  box-shadow: 5px 0px 2px grey;
}

.form-item{
  font-size: 20px;
  text-align: center;
  margin: .5%;
  border-style:groove;
}

#btn{
  position: relative;
  border-bottom-style: solid;
  border-right-style:solid;
  border-radius: 6%;
  border-color: rgb(83, 83, 83);
  font-size: 20px;
  padding: 15px;
  margin: .5%;
  width: fit-content;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
#btn:after {
  content: "";
  background: red;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -60px !important;
  margin-top: -120px;
  opacity: 0;
  transition: all 0.8s
}
#btn:active:after{
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
#btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
#btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
#btn:hover span {
  padding-right: 25px;
}
#btn:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
