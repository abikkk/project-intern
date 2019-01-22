<template>
  <v-container class="secondary-container">
    <router-view/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import login from '../../views/Login.vue';

export default {
  name: 'secondary-container',
  components: {
    login,
  },
};
</script>

<style>
.secondary-container{
  font-family: 'Times New Roman', Times, serif;
  font-size: 15px;
}

</style>
