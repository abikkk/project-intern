<template>
  <div class="main-container">
       <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import home from './Home.vue'
export default {
  name: 'main-container',
  components: {
    home
  },
};
</script>

<style>
html,body{
  height: 100%;
}
.main-container{
  font-family:sans-serif;
  font-size: 12px;
  /* background-color: #77a6f7; */
  background-color: #84ceeb;
  height: 100%; 
}
</style>
