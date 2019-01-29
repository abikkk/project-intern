<template>
<div id="password_reset">
  <h1>Send Reset Password Email</h1>
    <v-text-field v-model="reset_email" :rules="[rules.required,rules.email]" label="Enter your email ID" required/>
    <p id="p_error"/>
    <v-card-actions>
      <v-btn @click="cancel()">Cancel</v-btn>
      <v-divider/>
      <v-btn :disabled="!reset_email" @click="sendemail()" color="primary">Send Confirmation Email</v-btn>
    </v-card-actions>
</div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
    name:'Password-Reset',
    data:()=>({
      reset_email:'',
      reset:true,
      rules: {
        required:v => !!v || 'Must have an Email Address. Google? Yahoo? Something?',
        email:v => /.+@.+/.test(v) || 'E-mail not valid, try again.'
      }
    }),
    methods:{
      cancel(){
        this.$router.push('/Login')
      },
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
          this.$router.push('/Login')
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

</style>
