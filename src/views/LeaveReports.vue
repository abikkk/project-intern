<template>
    <div id="leavereports-body">
        <h2>Leave Reports</h2>
        <div id="leavereports">
            <v-tabs v-model="active" color="tabs" slider-color="blue">
                    <v-tab ripple>Pending</v-tab>
                    <v-tab-item>
                        <v-card-text>
                            <h4>Pending reports</h4>
                            <v-data-table :headers="header" :items="pendReports" class="tables">
                                    <template slot="items" slot-scope="prop">
                                        <!-- <v-checkbox :input-value="prop.selected"  primary hide-details/> -->
                                        <td>{{ prop.item.username.username }}</td>
                                        <td>{{ prop.item.submission }}</td>
                                        <td>{{ prop.item.description }}</td>
                                        <td>{{ prop.item.datefrom }}</td>
                                        <td>{{ prop.item.dateto }}</td>
                                        <!-- <td>{{ prop.item.status }}</td> -->
                                        <td>{{ prop.item.leavetype }}</td>
                                        <td><v-btn flat color="orange" @click="denied_response(prop.item.leave_id)">Reject</v-btn></td>
                                        <td><v-btn flat color="primary" @click="approved_response(prop.item.leave_id)">Approve</v-btn></td>
                                    </template>
                            </v-data-table>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab ripple>Accepted</v-tab>
                    <v-tab-item>
                        <v-card-text>
                            <h4>Approved reports</h4>
                            <v-data-table :headers="header" :items="appReports" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td>{{ prop.item.username.username }}</td>
                                    <td>{{ prop.item.submission }}</td>
                                    <td>{{ prop.item.description }}</td>
                                    <td>{{ prop.item.datefrom }}</td>
                                    <td>{{ prop.item.dateto }}</td>
                                    <!-- <td>{{ prop.item.status }}</td> -->
                                    <td>{{ prop.item.leavetype }}</td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab ripple>Rejected</v-tab>
                    <v-tab-item>
                        <v-card-text>
                            <h4>Rejected reports</h4>
                            <v-data-table :headers="header" :items="rejReports" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td>{{ prop.item.username.username }}</td>
                                    <td>{{ prop.item.submission }}</td>
                                    <td>{{ prop.item.description }}</td>
                                    <td>{{ prop.item.datefrom }}</td>
                                    <td>{{ prop.item.dateto }}</td>
                                    <!-- <td>{{ prop.item.status }}</td> -->
                                    <td>{{ prop.item.leavetype }}</td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-tab-item>
                    
                    <v-tab ripple>All</v-tab>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>
                                <h4>All reports</h4>
                                <v-data-table :headers="header_all" :items="reports" class="tables">
                                        <template slot="items" slot-scope="prop">
                                            <td>{{ prop.item.username.username }}</td>
                                            <td>{{ prop.item.submission }}</td>
                                            <td>{{ prop.item.description }}</td>
                                            <td>{{ prop.item.datefrom }}</td>
                                            <td>{{ prop.item.dateto }}</td>
                                            <td>{{ prop.item.status }}</td>
                                            <td>{{ prop.item.leavetype }}</td>
                                        </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '../utils/misc';
import Axios from 'axios';

export default {
    name:'Leave-Reports',
    data:()=>({
        reports:[],
        header_all:[
            {text:'Username',value:'username'},
            {text:'Sub. Date',value:'submission'},
            {text:'Description',value:'description'},            
            {text:'From',value:'datefrom'},
            {text:'To',value:'dateto'},
            {text:'Status',value:'status'},
            {text:'L. Type',value:'leavetype'},
        ],
        header:[
            {text:'Username',value:'username'},
            {text:'Sub. Date',value:'submission'},
            {text:'Description',value:'description'},            
            {text:'From',value:'datefrom'},
            {text:'To',value:'dateto'},
            {text:'L. Type',value:'leavetype'},
        ],
        pendReports:[],
        appReports:[],
        rejReports:[],
        active:'',
    }),
    mounted(){
        Axios({
            methods:'get',
            url: baseUrl + 'attend/v1/leaveRequestList',
            headers: {Authorization: localStorage.getItem('token')}
        })
            .then(resp=>{
                this.getReports(resp.data)
                this.getPendReports(resp.data)
                this.getAppReports(resp.data)
                this.getRejReports(resp.data)
                console.log('Retrieve Success')
            })
            .catch(function (error){
                console.log('error: error in mounted.' + error)
            })
    },
    methods:{
        toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.pendReports.slice()
      },
      approved_response(leavereport_id){
          Axios({
          method: 'put',
          data: {
            'status':'approved'
          },
          url: baseUrl + "attend/v1/acceptRequest/" + leavereport_id + '/accept',
          headers: {Authorization: localStorage.getItem('token')}
        })
        .then(response => {
          console.log('success: request approved success')
          // console.log(response) 
          location.reload()
        })
        .catch(function (error) {
          console.log('error: error in approved_response' + error);
        })
      },
      denied_response(leavereport_id){
          Axios({
          method: 'get',
          url: baseUrl + "attend/v1/acceptRequest/" + leavereport_id + '/reject',
          headers: {Authorization: localStorage.getItem('token')}
        })
        .then(response => {
          console.log('success: request denied success')
          // console.log(response) 
          location.reload()
        })
        .catch(function (error) {
          console.log('error: error in denied_response.' + error);
        })
      },
        getReports(report){
            for (let index in report) {
                let report_read = {}
                report_read.username=report[index].user
                report_read.submission=report[index].date_submission
                report_read.leave_id=report[index].leave_id
                report_read.description=report[index].description
                report_read.datefrom=report[index].date_from
                report_read.dateto=report[index].date_to
                report_read.status=report[index].status
                report_read.leavetype=report[index].types_of_leave.leave_type
                console.log('success: all report imported')
                this.reports.push(report_read)
            }
        },
        getPendReports(pendReport){
            for (let index in pendReport) {
                let report_read = {}
                report_read.username=pendReport[index].user
                report_read.submission=pendReport[index].date_submission
                report_read.leave_id=pendReport[index].leave_id
                report_read.description=pendReport[index].description
                report_read.datefrom=pendReport[index].date_from
                report_read.dateto=pendReport[index].date_to
                report_read.status=pendReport[index].status
                report_read.leavetype=pendReport[index].types_of_leave.leave_type
                if (report_read.status.toLowerCase()==='pending') {
                    console.log('success: pending report imported')
                    console.log(pendReport)
                    this.pendReports.push(report_read)
                }
            }
        },getAppReports(appReport){
            for (let index in appReport) {
                let report_read = {}
                report_read.username=appReport[index].user
                report_read.submission=appReport[index].date_submission
                report_read.leave_id=appReport[index].leave_id
                report_read.description=appReport[index].description
                report_read.datefrom=appReport[index].date_from
                report_read.dateto=appReport[index].date_to
                report_read.status=appReport[index].status
                report_read.leavetype=appReport[index].types_of_leave.leave_type
                if (report_read.status.toLowerCase()==='approved') {
                    console.log('success: approved report imported')
                    this.appReports.push(report_read)
                }
            }
        }
        ,getRejReports(rejReport){
            for (let index in rejReport) {
                let report_read = {}
                report_read.username=rejReport[index].user
                report_read.submission=rejReport[index].date_submission
                report_read.leave_id=rejReport[index].leave_id
                report_read.description=rejReport[index].description
                report_read.datefrom=rejReport[index].date_from
                report_read.dateto=rejReport[index].date_to
                report_read.status=rejReport[index].status
                report_read.leavetype=rejReport[index].types_of_leave.leave_type
                if (report_read.status.toLowerCase()==='rejected') {
                    console.log('success: rejected report imported')
                    this.rejReports.push(report_read)
                }
            }
        }

    }
}
</script>

<style lang="scss">

</style>
