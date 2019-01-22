<template>
    <div id="leavetypes-body">
        <v-data-table :headers="header" :items="leaves" class="tables">
            <template slot="items" slot-scope="prop">
                <td> {{ prop.item.leave_type_id }} </td>
                <td> {{ prop.item.leave_type }} </td>
                <td> {{ prop.item.total_days }} </td>
            </template>
        </v-data-table>

        <v-card class="cards">
            <v-card-title>
               <h2> New Leave Type form: </h2></v-card-title>
            <v-card-text v-model="form">
                <v-text-field v-model="leave_type_name" :rules="[rules.required]" label="New Leave Type" required/>
                <v-select v-model="select" :items="options" required/>
                <v-text-field v-model="select" :rules="[rules.required]" label="Initial Days for new leave type" readonly required/>
                <v-card-actions>
                    <v-btn @click="refresh()" color="orange">Reset</v-btn>
                    <v-divider/>
                    <v-btn :disabled="!form" @click="submit()" color="primary">Submit</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { baseUrl } from '../utils/misc';
import Axios from 'axios';

export default {
    name:'Leave-Types',
    data:()=>({
        leaves:[],
        leave_type_name:'',
        form:false,
        header:[
            {text:'ID',value:'leave_type_id'},
            {text:'Leave Type',value:'leave_type'},
            {text:'Days',value:'total_days'}
        ],
        leave_totaldays:'',
        select:null,
        options: [
        { value: null, text: 'Please select number of days' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
        { value: '9', text: '9' },
        { value: '10', text: '1' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
        { value: '21', text: '21' },
        { value: '22', text: '22' },
        { value: '23', text: '23' },
        { value: '24', text: '24' },
        { value: '25', text: '25' },
        { value: '26', text: '26' },
        { value: '27', text: '27' },
        { value: '28', text: '28' }
      ],
      rules:{
        required: v => !!v || 'Cannot be Empty... Seriously?'
      }
    }),
    mounted(){
        this.getLeave()
    },
    methods:{
        getLeave() {//getting list of leave types
        Axios({
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
            leave.leave_type = leaves[index].leave_type
            leave.total_days = leaves[index].total_days
            leave.leave_type_id = leaves[index].leave_type_id
            this.leaves.push(leave)
          }
        },
        submit() {//getting list of leave types
        Axios({
            method: 'post',
            data:{
                'leave_type':this.leave_type_name,
                'total_days':this.leave_totaldays
                },
            url: baseUrl + "attend/v1/types-of-leave/",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log(response)
            this.mounted()
        })
        .catch(function(error){
          console.log('error: error in getLeave.' + error)
        })
        }
    }
}
</script>

<style>
#leavetypes-body{
    /* margin-top: 2.5% */
}
</style>
