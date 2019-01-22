<template>
    <div id="attendview-body">
        <h2>Attendance Report</h2>
            <v-data-table :headers="header" :items="attend_report" class="tables" >
                <template slot="items" slot-scope="prop">
                    <td>{{ prop.item.user.username }}</td>
                    <td>{{ prop.item.check_in }}</td>
                    <td>{{ prop.item.check_out }}</td>
                    <td>{{ prop.item.check_in_date }}</td>
                </template>
            </v-data-table>
    </div>
</template>

<script>
import { baseUrl } from '../utils/misc';
import Axios from 'axios';

export default {
    name:'Attendance-View',
    mounted(){
        this.getAttendReport()
    },
    data:()=>({
        attend_report:[],attend_report_temp:[],
        header:[
            {text:'Attendance Report', sortable: false, value: 'user'},
            {text:'Check in time',value:'check_in'},
            {text:'Check out time',value:'check_out'},
            {text:'Check in date',value:'check_in_date'},
        ]
    }),
    methods:{
        getAttendReport(){
            Axios({
                methods:'get',
                url: baseUrl + 'attend/v1/view-user-attendance/' + localStorage.getItem('user_id'),
                headers: {Authorization: localStorage.getItem('token')}
            })
                .then(respo=>{
                    this.attend_report_temp=respo.data
                    for(let index in this.attend_report_temp){
                        if(this.attend_report_temp[index].user.username===localStorage.getItem('username')){
                            this.attend_report.push(this.attend_report_temp[index])
                        }
                    }
                    console.log(this.attend_report)
                })
                .catch(function (error){
                    console.log('error: error in getAttendReport module' + error)
                })
            }
        }
}
</script>

<style lang="scss">
#attendview-body{
    // margin-top: 2.5%;
}
</style>
