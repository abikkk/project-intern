<template>
  <div id="deleteusers-body">
      <v-data-table class="tables" :headers="header" :items="user_profiles">
          <template slot="items" slot-scope="prop">
                <td>{{prop.item.user_id}}</td>
                <td> {{prop.item.user}} </td>
                <td> {{prop.item.fname}} </td>
                <td>{{prop.item.group}} </td>
                <td>{{prop.item.branch}}</td>
                <v-btn @click="delete_user(prop.item.user_id)">Delete</v-btn>
          </template>
      </v-data-table>
  </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
  name:'Users-Delete',
  data:()=>({
      user_profiles:[],
      group_name:[],
      branch_name:[],
      select_group:'',
      header:[
          {text:'ID',value:'user_id'},
          {text:'Username',value:'user'},
          {text:'First Name',value:'fname'},
          {text:'Group',value:'group'},
          {text:'Branch',value:'branch'},
          {text:'Options',sortable:false}
      ]
  }),
  mounted(){
      this.getUserProfiles()
      this.getGroups()
      this.getBranches()
  },
  methods:{
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
                // let group_id=userprofiles[index].groups
                profiles_read.group=userprofiles[index].groups
                profiles_read.branch=userprofiles[index].branch
                this.user_profiles.push(profiles_read)
            }
            console.log('success: user profiles import success.')
        },
        getGroups (){
          Axios({
            method: 'get',
            url: baseUrl + "users/v1/groupsList",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log('success: group import success.' + response)
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
            group.value = groups[index].permissions
            this.group_name.push(group)
          }
        },
      getBranches (){
          Axios({
            method: 'get',
            url: baseUrl + "users/v1/branch",
            headers: {Authorization: localStorage.getItem('token')}
          }).then(response => {
            console.log('success: branch import success.' + response)
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
#deleteusers-body{
//     margin-top: 2.5%;
}
</style>
