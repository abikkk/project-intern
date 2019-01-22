<template>
  <v-app>
    <v-content>
    <maincontainer/>
    </v-content>
  </v-app>
</template>

<script>
import maincontainer from './components/container/main.vue'
import SecondaryContainer from './components/container/secondary.vue'

export default {
  name: 'App',
  components: {
    SecondaryContainer,
    maincontainer
  },
  data () {
    return {
      //
    }
  }
}
</script>
