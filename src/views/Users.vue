<template>
  <div id="deleteusers-body">
      <h1>Users:</h1>
    <v-tabs v-model="active">
        <v-tab>All Users</v-tab>
        <v-tab-item>
            <v-card class="cards">
            <h4>View All Users:</h4>
                <v-data-table class="tables" :headers="header_all" :items="user_profiles">
                    <template slot="items" slot-scope="prop">
                        <td> {{ prop.item.user_id }} </td>
                        <td @click="search_tab(prop.item.user)"> {{ prop.item.user }} </td>
                        <td> {{ prop.item.fname }} </td>
                        <td> {{ prop.item.group }} </td>
                        <td> {{prop.item.branch}} </td>
                        <td> {{ prop.item.email }} </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-tab-item>

        <v-tab>Delete Users</v-tab>
        <v-tab-item>
            <v-card style="padding:1%">
            <h4>Delete Users:</h4>
                <v-data-table class="tables" :headers="header" :items="user_profiles">
                    <template slot="items" slot-scope="prop">
                        <td> {{prop.item.user_id}} </td>
                        <td> {{ prop.item.user}} </td>
                        <td> {{prop.item.fname}} </td>
                        <td> {{prop.item.group}} </td>
                        <td> {{prop.item.branch}} </td>
                        <td> {{prop.item.email}} </td>
                        <v-btn @click="delete_user(prop.item.user_id)">Delete</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-tab-item>

        <v-tab v-model="update_user_tab" v-show="checkOM()">Update Users</v-tab>
        <v-tab-item>
            <v-card class="cards">
            <h4>Change User's group or branch:</h4>
                <v-text-field style="width:50%" v-model="search_username" label="Type username here..." required/>
                <v-btn @click="searchProfile(search_username)" color="primary">Search</v-btn> 
                <table class="tables">
                    <td style="padding:1%">
                        <v-form ref="form" v-model="form">
                            <v-text-field v-model="username" label="UserName" readonly/>
                            <v-text-field v-model="gender" label="Gender" readonly/>
                            <v-text-field v-model="fname" label="First Name" readonly/>
                            <v-text-field v-model="lname" label="Last Name" readonly/>
                            <v-text-field v-model="address" label="Address" readonly/>
                            <v-text-field v-model="contact" label="Contact" readonly/>
                            <v-text-field v-model="email" label="E-mail" readonly/>
                            <v-text-field v-model="current_group" label="Current Group" readonly/>
                        </v-form>
                    </td>
                    <td style="padding:1%">
                        <h3>Change the group:</h3> <br>
                        Select a new group to assign the user to the new group.
                        <v-select v-model="new_group" :items="group_name" 
                        :rules="[rules.required]" label="Assign New Group" required/>
                        <v-btn color="primary" @click="back()">Cancel</v-btn>
                        <v-divider/>
                        <v-btn :disabled="!new_group" :loading="isLoading" color="primary" @click="update()">Update</v-btn>
                    </td>
                </table>
            </v-card>
        </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
    name:'Users',
    data:()=>({
        form:true,/*for validating all fields in Submit button*/
        isLoading:false,/*Submit button initialization */
        active:null,
        fname: '',
        lname: '',
        username:'',
        password:'',
        address:'',
        contact:'',
        email:'',
        name: '',
        gender:'',

        uid:'',
        update_user_tab:false,
        search_username:'',
        user_profiles:[],
        group_name:[],
        new_group:'',
        current_group:'',
        branch_name:[],
        select_group:'',
        header:[
            {text:'ID',value:'user_id'},
            {text:'Username',value:'user'},
            {text:'First Name',value:'fname'},
            {text:'Group',value:'group'},
            {text:'Branch',value:'branch'},
            {text:'Email',value:'email'},
            {text:'Options',sortable:false}
        ],
        header_all:[
            {text:'ID',value:'user_id'},
            {text:'Username',value:'user'},
            {text:'First Name',value:'fname'},
            {text:'Group',value:'group'},
            {text:'Branch',value:'branch'},
            {text:'Email',value:'email'},
        ],
        rules:{
            required: v => !!v || 'Cannot be Empty... Seriously?',
        }
    }),
    mounted(){
        // this.checkOM()
        this.getUserProfiles()
        this.getGroups();;
        this.getBranches();
    },
    methods:{
        //CHECK FOR OM
        checkOM(){
            if(localStorage.getItem('user_group').toLowerCase()==='operational manager'){
                return true;
                console.log('check');
            }
            else{
                return false;
            }
        },

        //UPDATE USER'S GROUP
        update(){
            Axios({
                method:'put',
                data:{
                    'groups':[this.new_group]
                },
                url: baseUrl + 'users/update-group/' + this.uid + '/',
                headers: {Authorization: localStorage.getItem('token')}
            })
            .then(respo=>{
                // console.log('success: group for user ' + this.username + ' is updated.' + respo)
                location.reload()
                // console.log(this.uid)
            })
            .catch(function(error){
                console.log('error: error in update()' + error)
            })
        },

        //SWITCHING TABS
        search_tab(passusername){
            const active = parseInt(this.active)
            this.active=2
            this.searchProfile(passusername)
        },

        //SEARCH USERS
        searchProfile(currentusername){
        Axios({
            methods:'get',
            url: baseUrl + 'users/' + currentusername,
            headers: {Authorization: localStorage.getItem('token')}
        })
        .then(resp=>{
            console.log(resp)
            this.profile_view = resp.data
                this.fname=this.profile_view.first_name
                this.lname=this.profile_view.last_name
                this.contact=this.profile_view.contact
                this.username=this.profile_view.username
                this.gender=this.profile_view.gender
                this.uid=this.profile_view.id
                this.address=this.profile_view.address
                this.email=this.profile_view.email
                this.branch_name=this.profile_view.branch.branch_name
                this.current_group=this.profile_view.groups[0].name
        })
        .catch(function (error){
            console.log('error: error in getProfile' + error)
        })
        },

        //GETTING USER PROFILES
        getUserProfiles(){
            Axios({
                method:'get',
                url: baseUrl + 'users/v1/userlist/',
                headers: {Authorization: localStorage.getItem('token')}
            })
            .then(response=>{    
                console.log(response.data)   
                this.setUserProfiles(response.data)     
            })
            .catch(function(error){
                console.log('error: error in getUserProfiles.' + error)
            })
        },
        setUserProfiles(userprofiles){
            for(let index in userprofiles){
                let profiles_read={}
                profiles_read.user_id=userprofiles[index].id
                profiles_read.user=userprofiles[index].username
                profiles_read.fname=userprofiles[index].first_name
                profiles_read.group=userprofiles[index].groups[0].name
                // profiles_read.gender=userprofiles[index].gender
                profiles_read.branch=userprofiles[index].branch.branch_name
                profiles_read.email=userprofiles[index].email
                if(profiles_read.user===localStorage.getItem('username')){
                    //do nothing
                }
                else{
                    this.user_profiles.push(profiles_read)
                }
            }
            console.log('success: user profiles import success.')
        },

        //GETTING GROUPS
        getGroups (){
            Axios({
            method: 'get',
            url: baseUrl + "users/v1/groupsList",
            headers: {Authorization: localStorage.getItem('token')}
            }).then(response => {
            console.log('success: group import success.')
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

        //GETTING BRANCHES
        getBranches (){
        Axios({
            method: 'get',
            url: baseUrl + "users/v1/branch",
            headers: {Authorization: localStorage.getItem('token')}
            }).then(response => {
            console.log('success: branch import success.')
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

        //DELETE USER
        delete_user(userid){
            Axios({
                method:'delete',
                url:baseUrl + 'users/delete/' + userid,
                headers: {Authorization: localStorage.getItem('token')}
            })
            .then(resp=>{
                console.log('success: deletion of user complete.' + resp)
                location.reload()
            })
            .catch(function(error){
                console.log('error: error in delete_user.' + error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
