<template>
<transition enter-active-class="animated fadeInRight">
    <div class="suggest">
      <CityHeader></CityHeader>
      <div class="amap" v-show="isChoosed">
        <amap></amap>
      </div>  
      <CitySelect></CitySelect>
    </div>
</transition>
</template>
<script type="text/javascript">
  import {mapState} from 'vuex'
  import CitySelect from './CitySelect.vue'
  import CityHeader from './CityHeader.vue'
  import amap from './amap.vue'
  export default{
    computed:{
      ...mapState(['isChoosed'])
    },
    components:{
      CitySelect,
      CityHeader,
      amap

    }
  }
</script>
<style scoped>
	.suggest{
  position: relative;
  z-index: 999;
  height: 100%;
  animation-duration: .5s;
}
.amap{
  height: 500px;
  width: 100%;
  position: absolute;
  z-index: 800;
  /*background-color: green;*/
}
.mint-popup.mint-popup-right{
  width: 100%;
  height: 100%;
  background-color: #f3f4f5;
}
</style>