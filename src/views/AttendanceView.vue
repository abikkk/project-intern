<template>
    <div id="attendview-body">
        <h1>Attendance Report for current user:</h1>
            <v-data-table :headers="header" :items="attend_report" class="tables" >
                <template slot="items" slot-scope="prop">
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
            {text:'Check in time (hr.min.sec)',value:'check_in'},
            {text:'Check out time (hr.min.sec)',value:'check_out'},
            {text:'Check in date (yyyy-mm-dd)',value:'check_in_date'},
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
                        this.attend_report.push(this.attend_report_temp[index])
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

</style>
