<template>
  <div id="update-user">
      <h3>More comming soon!</h3>      
  </div>
</template>

<script>
import { baseUrl } from '../utils/misc';
import Axios from 'axios';
export default {
    name:'Update-User',
    data:()=>({
    }),
    mounted(){
        // this.update()
    },
    methods:{
        update(){
            Axios({
                method:'get',
                // data:{
                //     'group':[this.new_group]
                // },
                url: baseUrl + 'users/update-group/31',
                headers: {Authorization: localStorage.getItem('token')}
            })
            .then(respo=>{
                console.log(respo)
            })
            .catch(function(error){
                console.log('error: error in update()' + error)
            })
        },
    }
}
</script>

<style>

</style>
