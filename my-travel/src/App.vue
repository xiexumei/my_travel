<template>
  <div id="app">
   
    <router-view/>
    <Footer v-if="$route.meta.showFooter"></Footer>
    
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  components:{
  	Footer
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
