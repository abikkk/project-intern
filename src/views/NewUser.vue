<template>
  <div id="newuser-body">
    <h1>Create New Account</h1>
    <br>
    <v-card class="cards" id="card-form">
    <h3>Fill up the form with your correct and valid informations:</h3> <br>
      <v-form ref="form" v-model="form">
        <v-text-field v-model="fname" :rules="nameRules" label="First Name" required/>
        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" required/>
        <v-text-field v-model="address" :rules="[rules.nullnotallowed,rules.required]" label="Address" required/>
        <v-text-field v-model="contact" :rules="[rules.nullnotallowed,rules.required]" label="Contact" required/>
        
        <v-radio-group v-model="gencheck" :rules="[rules.genrequired]" label="Select your gender:" required>
          <v-radio label="Male" value="0" required/>
          <v-radio label="Female" value="1" required/>
          <v-radio label="Non-binary" value="2" required/>
        </v-radio-group>
        
<!--calender -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderview"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date"
                label="Pick your Birth Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required/>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="UserName"
          required/>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required/>
        <v-select
          v-model="select_group"
          :items="group_name"
          :rules="[rules.required]"
          label="Assign Group"
          required/>
        <v-select
          v-model="select_branch"
          :items="branch_name"
          :rules="[rules.required]"
          label="Select Branch"
          required/>
        <v-checkbox
          v-model="agreement"
          :rules="[rules.agreerequired]">
          <template slot="label" id="lbl-checkAgreement">
            I agree to all the&nbsp;<a href="#" @click.stop.prevent="dialog = true">
              Terms of Service and Privacy Policy
            </a>&nbsp;of Utsaha Advert and thereby promise to abide by the laws of the state.
          </template>
        </v-checkbox>
      </v-form>

<!--Terms and policies dailog box -->
      <v-dialog v-model="dialog" absolute id="dailog-box" persistent>
        <v-card id="dailog-card">
          <v-card-title>Legal</v-card-title>
          <v-card-text>
            <h3>Terms and agreements/Policies of Utsaha Advert</h3>
            <p>
              Intern Period: 1 Month
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat @click="agreement = false, dialog = false">No</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="agreement = true, dialog = false">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <br>
      <v-btn color="primary" @click="back()">Home</v-btn>
      <v-btn flat @click="$refs.form.reset()">Clear</v-btn>
      <v-btn :disabled="!form" :loading="isLoading" color="primary" @click="submit()">Submit</v-btn>
  </v-card>

  <router-view/>
</div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../utils/misc'

  export default {
    name:'NewUser',
    mounted(){
        this.getGroups();
        this.getBranches();
      },
    methods:{
      back(){
        this.$router.go(-1)
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
          console.log('error: error in getGroups.' + error)
        })
        },
        setGroups(groups) {
          for (let index in groups) {
            let group = {}
            group.text = groups[index].name
            group.value = groups[index].id
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
        .catch(function(error){
          console.log('error: error in getBranches.' + error)
        })
        },
        setBranches(branches) {
          for (let index in branches) {
            let branch = {}
            branch.text = branches[index].branch_name
            branch.value = branches[index].branch_id
            this.branch_name.push(branch)
          }
        },
        submitt(){
          console.log(this.select_group)
        },
      submit(){
        axios({
          method: 'post',
          data: {
            'username':this.username,
            'password':this.password,
            'first_name':this.fname,
            'last_name':this.lname,
            'address':this.address,
            'contact':this.contact,
            'email':this.email,
            'date_of_birth':this.date,
            'branch':this.select_branch,
            'groups':[this.select_group]
          },
          url: baseUrl + "users/v1/create/",
          headers: {Authorization: localStorage.getItem('token')}
        })
        .then(response => {
          console.log(this.group_name.value)
          console.log('success: new user created.' + response)
          location.reload()
        })
        .catch(function (error) {
          console.log('error: error in submit.' + error);
        })
      },
    },
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      calenderview: false,
      form:true,/*for validating all fields in Submit button*/
      isLoading:false,/*Submit button initialization */
      dialog:false,/*agreement dailogbox initialization */
      agreement:false,/*agreement checkbox initialization */
      gencheck:false,/*gencheck radio box initialization*/
      fname: '',
      lname: '',
      username:'',
      password:'',
      address:'',
      contact:'',
      email:'',
      name: '',
      select_branch:'',
      select_group:'',
      group_name:[],
      branch_name:[],
      nameRules: [
        v => !!v || 'Your name cannot be empty?'
      ],
      emailRules: [
        v => !!v || 'Must have an Email Address. Google? Yahoo? Something?',
        v => /.+@.+/.test(v) || 'E-mail not valid, try again.'
      ],
      usernameRules:[
        v => !!v || 'Must provide a username to login.'
        //v => v.length<=10 || 'Username too long, try something shorter.'
      ],
      passwordRules: [
        v => !!v || 'Please provide a password for you account',
        //v => 0< v.length && v.length <7 || 'A 6-DIGIT PIN CODE, why is that so hard?',
        v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
      ],
      rules:{
        required: v => !!v || 'Cannot be left empty',
        agreerequired: v=> !!v || 'Must agree to terms and policies before signing up.',
        genrequired:v=> !!v || 'Select any one.',
        //fnamerule: v => v.length <= 10 || 'Thats a long fist name bruh...',
        //lnamerule: v => v.length <= 15 || 'Thats a long last name bruh...',
        nullnotallowed: v => !!v || 'Must provide something...'
      }
    })
  }
</script>

<style>
#radio-gen-lbl{
  font-size: 15px;
  /* margin: .8%; */
}

#card-form{
  padding: 2%
}

#dailog-box{
  max-width: 300px;
}

#lbl-checkAgreement{
  color:black;
}
</style>