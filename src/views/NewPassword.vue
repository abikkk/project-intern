<template>
    <div>
        <p id="p_uid"></p>
        <p id="p_token"></p>
        <v-card>
            <v-card-title>
                <h2>New Password:</h2>
            </v-card-title>
            <v-card-text>
                Enter your new password:
                <v-text-field type="password" v-model="new_password" label="New Password" :rules="[rules.password,rules.required]" required/>
                    <v-card-actions>
                        <v-btn :disabled=!new_password @click="submit(new_password)">Submit</v-btn>
                    </v-card-actions>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
    name:'New-Password',
    data:()=>({
        new_password:'',
      rules:{
        required: v => !!v || 'Cannot be left empty',
        password:v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
      }
    }),
    mounted(){
        this.getQueryUID("uid")
        this.getQueryTOKEN("token")
    },
    methods:{
        getQueryUID(variable)
            {
                var query = window.location.href.substring(43);
                console.log('query url')
                console.log(query)
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split(":");
                        if(pair[0] == variable){
                            // document.getElementById('p_uid').innerHTML= pair[1]
                            localStorage.setItem('uid',pair[1])
                        };
                }
            },
            getQueryTOKEN(variable)
            {
                var query = window.location.href.substring(43);
                console.log('query url')
                console.log(query)
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split(":");
                        if(pair[0] == variable){
                            // document.getElementById('p_token').innerHTML= pair[1]
                            localStorage.setItem('token',pair[1])
                        };
                }
            },
            submit(newpass){
                Axios({
                    method:'post',
                    data:{
                        'uid':localStorage.getItem('uid'),
                        'token':localStorage.getItem('token'),
                        'new_password':newpass
                },
                    url: baseUrl + 'auth/password/reset/confirm'
                })
                .then(response=>{
                    console.log('success: ' + newpass)
                    this.$router.push('/Login')
                })
                .catch(function(error){
                    console.log('error: error in submit()' + error)
                })
            }
            
    }
}
    
</script>

<style>

</style>
