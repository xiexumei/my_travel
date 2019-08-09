<template>
    <el-dialog title="定位设置" :visible.sync="mapVisible" :fullscreen=true  id="mapDialog" :close-on-click-modal="false">
        <baidu-map  class="map" :center="center" :zoom="zoom" @ready="handler"
                   :scroll-wheel-zoom="true"
                   @click="clickEvent"
                   ak="33B192o1jPaqOHASGGAIkoMuwi8W76j3">
            
            
            <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
           
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"  :showAddressBar="true" :autoLocation="true" @locationSuccess="getLoctionSuccess" ></bm-geolocation>
           
            <bm-view :style="{width:'100%',height: this.clientHeight+'px',flex: 1,marginBottom:'-30px'}"></bm-view>
        </baidu-map>
        <div class="demo-input-suffix" >
            <el-link type="info">lng：</el-link><el-input  class="lineinput"  style="width:200px" size="mini" v-model.number="locData.longitude"></el-input>
            <el-link type="info">lat：</el-link><el-input  class="lineinput"  style="width:200px" size="mini" v-model.number="locData.latitude"></el-input>
            <el-link type="info">address：</el-link><el-input  class="lineinput"  style="width:200px" size="mini" v-model="locData.address"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="warning"  size="small" icon="el-icon-close" @click.native="mapVisible = false">取消</el-button>
            <el-button type="primary" size="small" icon="el-icon-check" @click.native="findlocation">保存</el-button>
        </div>
    </el-dialog>

 </template>
<script>
	
	import {BaiduMap,BmNavigation,BmView,BmGeolocation,BmCityList} from 'vue-baidu-map'
    export default {
        name: "mapDialog",
        components: {
            BaiduMap,
            BmNavigation,
            BmView,
            BmGeolocation,
            BmCityList
        },
        data () {
            return {
                center: {lng: 121.833138, lat: 39.081725},
                zoom: 12,
                mapVisible:false,
                locData:{
                    longitude:'',
                    latitude:'',
                    address:'',
                },
                clientHeight:document.documentElement.clientHeight-90, // 屏幕高度
                iconUrl:'icon/map_marker_check.png',
            }
        },
        methods: {
            handler ({BMap, map}) {
                let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    console.log(r);
                    _this.center = {lng: r.longitude, lat: r.latitude};		// 设置center属性值
                    _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};		// 自定义覆盖物
                    _this.initLocation = true;
                },{enableHighAccuracy: true})
 
                window.map = map;
            },
            //点击地图监听
            clickEvent(e){
                map.clearOverlays();
                let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
                var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                //用所定位的经纬度查找所在地省市街道等信息
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var gc = new BMap.Geocoder();
                let _this = this;
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    //console.log(rs.address);//地址信息
                    _this.locData.address = rs.address;
 
                });
                this.locData.longitude = e.point.lng;
                this.locData.latitude = e.point.lat;
            },
            //定位成功回调
            getLoctionSuccess(point, AddressComponent, marker){
                map.clearOverlays();
                let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
                var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                this.locData.longitude = point.point.lng;
                this.locData.latitude = point.point.lat;
            },
            findlocation(){
                this.$emit("findlocdata",this.locData)
                this.mapVisible = false
            },
            mapShow(){
                this.mapVisible = true
            },
        },
        mounted() {
 
        }
 
    }
</script>

<style>
/* The container of BaiduMap must be set width & height. */
.map {
  width: 100%;
  height: 300px;
}
</style>