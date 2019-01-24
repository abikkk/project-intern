<template>
<div id="password_reset">
  <h4>Reset Password</h4>
  <v-text-field v-model="reset_email" required/>
  <p id="p_error"/>
  <v-btn :disabled=!reset_email @click="sendemail()">Send Confirmation Email</v-btn>
</div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
    name:'Password-Reset',
    data:()=>({
      
    }),
    methods:{
      sendemail(){
        Axios({
          method:'post',
          data:{
            'email':this.reset_email
          },
          url: baseUrl + 'auth/password/reset'
        })
        .then(respo=>{
          console.log(respo.data)
        })
        .catch(function(error){
          console.log('error: error in sendemail.' + error)
          document.getElementById('p_error').innerHTML=error
        })
      }
    }
}
</script>

<style>
#password_reset{
  /* margin-top: 2.5% */
}
</style>
