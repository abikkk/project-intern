<template>
    <div id="error-page">
        <h1>404 Error:</h1>
        <h2>Page not found...</h2> <br>
        Go <a href="#" @click="back">back</a>?
    </div>
</template>

<script>
export default {
    name:'Error404',
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>
#error-page{
    margin: 2.5%
}
</style>
