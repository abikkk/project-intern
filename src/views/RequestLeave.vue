<template>
   <div id="leavereq-body">
     <h1>Leave Requests</h1>
     <v-card class="cards" id="card-main">
       <v-form ref="form" v-model="valid" >
         <h2>Form:</h2>
         <v-select
            v-model="select_leave_type"
            :items="leave_type"
            :rules="[rules.required]"
            label="Select leave type"
            required/>

        <!--calender from -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderfrom"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_1"
                :rules="[rules.required]"
                label="Pick your Start Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_1" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <!--calender to -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              :close-on-content-click="false"
              v-model="calenderto"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date_2"
                :rules="[rules.required]"
                label="Pick your End Date."
                prepend-icon="event" required
                readonly/>
              <v-date-picker v-model="date_2" @input="calenderview = false"/>
            </v-menu>   
          </v-flex>
        </v-layout>

        <v-text-field v-model="Description" :rules="[rules.required,rules.exceed,rules.notenough]" 
        :counter="150" label="Description  for your leave" required/>
        <v-btn @click="cancel()" color="primary">Cancel</v-btn>
        <v-btn @click="clear()">Reset</v-btn>
        <v-btn :disabled="!valid" :loading="isLoading" color="success" @click="request()">Request</v-btn>
       </v-form>
    </v-card>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '../utils/misc'

  export default {
      name: 'requestleave',
      data () {
        return {
          title: 'Title',
          isLoading:false,
          calenderto: '',
          calenderfrom: '',
          valid:true,
          select_leave_type:'',
          Description:'',
          date_1: new Date().toISOString().substr(0, 10),
          date_2: new Date().toISOString().substr(0, 10),
          calenderview: false,
          rules:{
          required: v=>!!v || 'Cannot be left empty!',
          exceed: v=>v.length<150 || 'Character limit exceeded',
          notenough: v=>v.length>20 || 'Atleast 20 characters required'
          },
          leave_type:[]
        }
      },

      mounted () {
        this.getLeave()//calling getleave module
      },

      methods:{
        getLeave() {//getting list of leave types
        axios({
            method: 'get',
            url: baseUrl + "attend/v1/types-of-leave/",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log(response)
          this.setLeaveType(response.data)
        })
        .catch(function(error){
          console.log('error: error in getLeave.' + error)
        })
        },
        setLeaveType(leaves) {
          for (let index in leaves) {
            let leave = {}
            leave.text = leaves[index].leave_type
            leave.value = leaves[index].leave_type_id
            this.leave_type.push(leave)
          }
        },
        clear () {
          this.$refs.form.reset()
        },
        request () {
          axios({
            method: 'post',
            data: {
              'date_from':this.date_1,
              'date_to':this.date_2,
              'description':this.Description,
              'types_of_leave': this.select_leave_type,
            },
            url: baseUrl + "attend/v1/leaveRequest/",
            headers: {Authorization: localStorage.getItem('token')}
          })
          .then(response => {
            console.log('success: leave request posted.' + response)
            this.$router.push('/Leave-Requests')
          })
          .catch(function (error) {
            console.log('error: error in request.' + error)
          })
        },
        cancel(){
          this.$router.go(-1)//going back to previous page
        }
      }
  }
</script>

<style>
#leavereq-body{
  /* margin-top: 2.5%; */
}

#card-main{
  padding: 2%
}
</style>
