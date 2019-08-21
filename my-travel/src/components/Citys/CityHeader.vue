<template>
	<div class="city-header">
		<div class="city-wrapper">
			<div class="city-content border-right-1px">
				<div class="city-select" v-show="isChoosed" @click="switch_input_city">
					<span class="text" >{{position.city||localCity.substring(0,2)}}</span>
					<span class="icon">
						<span name="sort-desc"></span>
					</span>
				</div>
				<div class="city-input-wrapper" v-show="!isChoosed">
					<span>去哪儿呀</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapActions, mapState} from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapState([
				'position',
				'isChoosed',
                'localCity'
				])
		},
		
        methods:{
            //
            ...mapActions([
                 'switch_input_city'
                ])
        }

	}
</script>
<style scoped>

.city-header {
    position: relative;
    z-index: 10;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 44px;
    white-space: nowrap;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .12);
}

.city-header .city-wrapper {
    padding: 13px 0;
}

.city-header .city-wrapper .city-content {
    height: 18px;
}

.border-bottom-1px,
.border-left-1px,
.border-right-1px,
.border-top-1px {
    position: relative;
}

.city-header .city-wrapper .city-content .city-select {
    line-height: 18px;
    padding: 0 16px;
    font-size: 0;
}

.city-header .city-wrapper .city-content .city-select .text {
    margin-right: 4px;
}

.city-header .city-wrapper .city-content .city-select .text {
    display: inline-block;
    vertical-align: top;
    color: #666;
    font-size: 14px;
}

.city-header .address-wrapper {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 10px;
}
.city-input-wrapper{
    text-align: center;
}

</style>

