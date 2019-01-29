<template>
    <div id="newpassword-body">
            <v-card-title>
                <h1>New Password:</h1>
            </v-card-title>
            <v-card-text>
                Enter your new password:
                <v-text-field type="password" v-model="new_password" label="Enter a 8-character password" :rules="[rules.password,rules.required]" required/>
                    <v-card-actions>
                        <v-btn @click="cancel()">Cancel</v-btn>
                        <v-btn :disabled=!new_password @click="submit(new_password)">Submit</v-btn>
                    </v-card-actions>
                    <p id="p_error"/>
                    <v-dialog width="fit-content" v-model="success">
                        <v-card class="cards">
                            New password updated, you will be re-directed to login screen now.
                            You can now login to the system with your new password.
                            <v-card-actions>
                                <v-btn @click="done()" color="primary">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-card-text>
    </div>
</template>

<script>
import Axios from 'axios';
import { baseUrl } from '../utils/misc';

export default {
    name:'New-Password',
    data:()=>({
        new_password:'',
        success:false,
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
        cancel(){
            this.$router.push('/Login')
        },
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
                    this.success=true
                })
                .catch(function(error){
                    console.log('error: error in submit()' + error)
                    document.getElementById('p_error').innerHTML='Something is not right, please try again with a different password.'
                })
            },
            done(){
                this.$router.push('/Login')
            }
    }
}
    
</script>

<style>

</style>
