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
@import url('https://fonts.googleapis.com/css?family=Baloo+Thambi|Barlow+Semi+Condensed|Didact+Gothic|Indie+Flower|KoHo|Kosugi+Maru|Krub|Luckiest+Guy|Marck+Script|Merienda|Nanum+Gothic|Nunito|Pontano+Sans|Quattrocento+Sans|Questrial');

html,body{
  height: 100%;
  transition: .3s
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-in-out;
}
.fade-enter-active{
  opacity: 1;
} 
.fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

h1,h2,h3,h4{
  font-family: 'Questrial', sans-serif;
  /* font-family: 'Indie Flower', cursive; */
}

.main-container{
  font-family: 'Nunito', sans-serif;
  background-color: whitesmoke;
  height: 100%; 
}
</style>
