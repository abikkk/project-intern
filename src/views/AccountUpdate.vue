<template>
  <div id="account-body">
    <h1>Account</h1>
    <br>
    <v-card class="cards" id="card-form">
    <h3>Change your informations:</h3> <br>
      <v-form ref="form" v-model="form">
        <v-text-field v-model="fname" :rules="nameRules" label="First Name" required/>
        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" required/>
        <v-text-field v-model="address" :rules="[rules.nullnotallowed,rules.required]" label="Address" required/>
        <v-text-field v-model="contact" :rules="[rules.nullnotallowed,rules.required]" label="Contact" required/>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required/>
        <v-text-field v-model="username" :rules="usernameRules" label="UserName" required/>
      </v-form>
      <br>
      <v-card-actions>
        <v-btn color="primary" @click="back()">Cancel</v-btn>
        <v-spacer/>
        <v-btn :disabled="!form" :loading="isLoading" color="primary" @click="submit()">Update</v-btn>
      </v-card-actions>
  </v-card>

  <router-view/>
</div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../utils/misc'

  export default {
    name:'Account-Update',
    mounted(){
        this.getProfile();
        this.getGroups();
        this.getBranches();
      },
    methods:{
      back(){
        this.$router.go(-1)
      },
      getProfile(){
      axios({
        methods:'get',
        url: baseUrl + 'users/' + localStorage.getItem('username'),
        headers: {Authorization: localStorage.getItem('token')}
      })
      .then(resp=>{
        console.log(resp)
        this.profile_view = resp.data
            this.fname=this.profile_view.first_name
            this.lname=this.profile_view.last_name
            this.contact=this.profile_view.contact
            this.username=this.profile_view.username
            this.current_user_id=this.profile_view.id
            this.address=this.profile_view.address
            this.email=this.profile_view.email
      })
      .catch(function (error){
        console.log('error: error in getProfile' + error)
      })
    },
      getGroups (){
          axios({
            method: 'get',
            url: baseUrl + "users/v1/groupsList",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log(response)
          this.setGroups(response.data)
        })
        .catch(function(error){
          console.log('error: error in getGroups' + error)
        })
        },
        setGroups(groups) {
          for (let index in groups) {
            let group = {}
            group.text = groups[index].name
            group.value = groups[index].permissions
            this.group_name.push(group)
          }
        },
      getBranches (){
          axios({
            method: 'get',
            url: baseUrl + "users/v1/branch",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log(response)
          this.setBranches(response.data)
        })
        .catch(function (error){
          console.log('error: error in getBranches.' + error)
        })
        },
        setBranches(branches) {
          for (let index in branches) {
            let branch = {}
            branch.text = branches[index].branch_id
            branch.value = branches[index].branch_name
            this.branch_name.push(branch)
          }
        },
      submit(){
        axios({
          method: 'put',
          data: {
            'username':this.username,
            'first_name':this.fname,
            'last_name':this.lname,
            'address':this.address,
            'contact':this.contact,
            'email':this.email,
          },
          url: baseUrl + "users/update/" + this.current_user_id + '/',
          headers: {Authorization: localStorage.getItem('token')}
        })
        .then(response => {
          if(localStorage.getItem('username')===this.username){
            console.log('success: account update success')
            this.mounted()
          }
          else{
            console.log('success: account update success')
            this.$router.push('/Login')
          }
        })
        .catch(function (error) {
          console.log('error: error in submit.' + error);
        })
      },
    },
    data: () => ({
      calenderview: false,
      form:true,/*for validating all fields in Submit button*/
      isLoading:false,/*Submit button initialization */
      fname: '',
      lname: '',
      username:'',
      password:'',
      address:'',
      contact:'',
      email:'',
      name: '',
      group_name:[],
      branch_name:[],
      profile_view:{},
      current_user_id:'',
      nameRules: [
        v => !!v || 'Your names cannot be Empty... Seriously?'
      ],
      emailRules: [
        v => !!v || 'Must have an Email Address...Google? Yahoo? Something?',
        v => /.+@.+/.test(v) || 'E-mail not valid, try again.'
      ],
      usernameRules:[
        v => !!v || 'Must provide a username to login.'
        //v => v.length<=10 || 'Username too long, try something shorter.'
      ],
      rules:{
        required: v => !!v || 'Cannot be Empty... Seriously?',
        agreerequired: v=> !!v || 'Must agree to terms and policies before signing up.',
        genrequired:v=> !!v || 'Select any one.',
        //fnamerule: v => v.length <= 10 || 'Thats a long fist name bruh...',
        //lnamerule: v => v.length <= 15 || 'Thats a long last name bruh...',
        nullnotallowed: v => !!v || 'Must provide something...'
      }
    })
  }
</script>

<style lang="scss">
#account-body{
  // margin-top:2.5%
}
</style>
