<template>
    <div id="editgroupbranch-body">
        <h1>Groups and Branches</h1>
        <v-tabs v-model="active" color="tabs" slider-color="blue">
            <v-tab ripple>Groups</v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <h4>All Groups:</h4>
                        <v-data-table :items="all_groups" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td>Group Name:</td>
                                    <td @click="editbranch=true"> {{prop.item.name}} </td>
                                </template>
                        </v-data-table>
                    </v-card-text>
                    <br>
                    <v-form v-model="group_add">
                        <h2>Add new group:</h2>
                        <v-text-field v-model="new_groupname" :rules="[rules.required]" label="New Group name" required/>
                        <h3>Available Groups</h3>
                        <v-data-table title="Available Permissions" :headers="header_permission" :items="all_permissions" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td> {{prop.item.id}} </td>
                                    <td> {{prop.item.name}} </td>
                                    <td> <v-btn @click="addpermission(prop.item.id)">Add</v-btn></td>
                                </template>
                        </v-data-table>
                        <h3>Added Groups:</h3>
                        <p id="added_groups"></p>
                        <v-btn @click="reset_groups()">Clear Added Groups</v-btn>
                        <v-btn :disabled="!group_add" @click="addGroup()" primary>Add Group</v-btn>
                    </v-form>

                    <v-dialog v-model="editbranch" width="fit-content" absolute id="dailog-box" persistent>
                        <v-card>
                            <v-data-table title="Previous Permissions" :headers="header_permission" :items="all_permissions" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td> {{prop.item.id}} </td>
                                    <td> {{prop.item.name}} </td>
                                    <td> <v-btn @click="updatepermissions(prop.item.id)">Add</v-btn></td>
                                </template>
                        </v-data-table>
                            <v-btn @click="editbranch=false">close</v-btn>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-tab-item>

            <v-tab ripple>Branch</v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <h4>All Branches:</h4>
                        <v-data-table :headers="header" :items="all_branches" class="tables">
                                <template slot="items" slot-scope="prop">
                                    <td> {{prop.item.branch_id}} </td>
                                    <td> {{prop.item.branch_name}} </td>
                                </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
                <v-divider/>
                <v-form v-model="branch_add">
                    <v-text-field v-model="new_branchname" label="New Branch name" required/>
                    <v-btn :disabled="!new_branchname" @click="addBranch" primary>Add Branch</v-btn>
                </v-form>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../utils/misc'

export default {
    name:'Edit-GroupBranch',
    data:()=>({
        header:[
            {text:'ID',value:'branch_id'},{text:'Name',value:'branch_name'}
        ],
        header_permission:[
            {text:'ID',value:'id'},{text:'Permissions',value:'name'}
        ],
        all_branches:[],
        all_groups:[],
        all_permissions:[],
        added_permissions:[],
        counter:1,
        propitemid:[],
        branch_add:false,
        group_add:false,
        active:'',
        new_branchname:'',
        new_groupname:'',
        editbranch:false,
        rules:{
            required: v => !!v || 'Cannot be left empty',
        }
    }),
    mounted(){
        this.getGroups()
        this.getBranches()
        this.getPermissions()
    },
    methods:{
        addGroup(){
            axios({
                method:'post',
                data:{
                    'name':this.new_groupname,
                    'permissions':this.added_permissions
                },
                url: baseUrl + 'users/v1/groups',
                headers:{Authorization: localStorage.getItem('token')}
            })
            .then(respo=>{
                console.log('success: success adding new group.' + respo)
                location.reload()
            })
            .catch(function(error){
                console.log('error: error in addGroup.' + error)
            })
        },
        addBranch(){
            axios({
                method:'post',
                url: baseUrl + 'users/v1/branch',
                data:{
                    'name':this.new_branchname
                },
                headers:{Authorization: localStorage.getItem('token')}
            })
            .then(respo=>{
                console.log('success: success adding new group.' + respo)
                location.reload()
            })
            .catch(function(error){
                console.log('error: error in addBranch.' + error)
            })
        },
        addpermission(id){
            if(this.counter===1){
                    document.getElementById('added_groups').innerHTML=document.getElementById('added_groups').innerHTML + id +", "
                    this.added_permissions.push(id)
                    // console.log(this.added_permissions)
                    this.counter=2
            }
            else{
                for(let index in this.added_permissions){
                    if(this.added_permissions[index]===id){
                        this.counter=3
                        break
                    }
                }
                if(this.counter===2){
                    document.getElementById('added_groups').innerHTML=document.getElementById('added_groups').innerHTML + id +", "
                    this.added_permissions.push(id)
                    // console.log(this.added_permissions)
                }
                this.counter=2
            }
            console.log('success: permission added. ' + this.counter)
        },
        reset_groups(){
            document.getElementById('added_groups').innerHTML=''
            this.counter=1
            this.added_permissions=[]
            console.log('counter reset to 1')
        },
        getPermissions(){
            axios({
                method:'get',
                url: baseUrl + 'users/v1/permission',
                headers: {Authorization: localStorage.getItem('token')}
            })
            .then(response=>{
                this.all_permissions=response.data
                console.log(response.data)
            })
            .catch(function(error){
                console.log('error: error in getPermissions.' + error)
            })
        },
        getGroups (){
          axios({
            method: 'get',
            url: baseUrl + "users/v1/groupsList",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            this.all_groups=response.data
            console.log(this.all_groups)
            // this.setGroups(response.data)
            })
            .catch(function(error){
            console.log('error: error in getGroups.' + error)
            })
        },
        getBranches (){
            axios({
                method: 'get',
                url: baseUrl + "users/v1/branch",
                headers: {Authorization: localStorage.getItem('token')}
            }).then(response => {
                    this.all_branches=response.data
                    console.log(this.all_branches)
            //   this.setBranches(response.data)
            })
            .catch(function(error){
            console.log('error: error in getBranches.' + error)
            })
        },
    }
}
</script>

<style>

</style>
