<template>
    <div id="leaverequests-body">
            <h1>Submitted Leave Requests</h1>
            <v-data-table :headers="header" :items="reports" class="tables">
                <template slot="items" slot-scope="prop">
                    <td> {{prop.item.leave_id}} </td>
                    <td>{{ prop.item.submission }}</td>
                    <td>{{ prop.item.description }}</td>
                    <td>{{ prop.item.datefrom }}</td>
                    <td>{{ prop.item.dateto }}</td>
                    <td>{{ prop.item.status }}</td>
                    <td>{{ prop.item.leavetype.leave_type }}</td>
                </template>
            </v-data-table>
    </div>
</template>

<script>
import Axios from 'axios';
import {baseUrl} from '../utils/misc.js'

export default {
    name:'Leave-Requests',
    data:()=>({
        reports:[],
        header:[
            {text:'User',value:'leave_id'},
            {text:'Sub. Date',value:'submission'},
            {text:'Description',value:'description'},
            {text:'From',value:'datefrom'},
            {text:'To',value:'dateto'},
            {text:'Status',value:'status'},
            {text:'Leave Type',value:'leavetype'},
        ]
    }),
    mounted(){
        Axios({
            methods:'get',
            url: baseUrl + 'attend/v1/leaveRequestList/' + localStorage.getItem('user_id'),
            headers: {Authorization: localStorage.getItem('token')}
        })
        .then(resp=>{
        console.log(resp.data)
        this.getReports(resp.data)
        })
        .catch(function (error){
            console.log('error: error in mounted.' + error)
        })
    },
    methods:{
        getReports(report){
            for (let index in report) {
                let report_read = {}
                report_read.leave_id=report[index].leave_id
                // report_read.username=report[index].user.username
                // report_read.userid=report[index].user.id
                report_read.submission=report[index].date_submission
                report_read.description=report[index].description
                report_read.datefrom=report[index].date_from
                report_read.dateto=report[index].date_to
                report_read.status=report[index].status
                report_read.leavetype=report[index].types_of_leave
                this.reports.push(report_read)
            }
                console.log(this.reports)
            
        }
    }
}
</script>

<style>

</style>
