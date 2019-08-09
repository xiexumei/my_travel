<template>
	<div class="recommend_content">
		<div class="recommend_content_spots">
			<div class="nav_header_parent">
				<div class="nav_header">景点推荐</div>
			</div>
			
	    	<div class="nav_content">
			  <div class="nav_item">1</div>
		      <div class="nav_item">2</div>
		      <div class="nav_item">3</div>
		    </div>
		</div>
		<div class="recommend_content_house">
			<div class="nav_header_parent">
				<div class="nav_header">美食推荐</div>
			</div>
	    	<div class="nav_content">
			  <div class="nav_item">1</div>
		      <div class="nav_item">2</div>
		      <div class="nav_item">3</div>
		    </div>
		</div>
		<div class="recommend_content_foods">
			<div class="nav_header_parent">
				<div class="nav_header">
					<span>民宿推荐</span>
					<span>更多<i></i></span>
				</div>
			</div>
	    	<div class="nav_content">
			  <div class="nav_item">1</div>
		      <div class="nav_item">2</div>
		      <div class="nav_item">3</div>
		    </div>
		</div>
	</div>
</template>

<script>
</script>

<style>
.recommend_content{
	position: relative;
}
.nav_header_parent{
	height: 24px;
}
.nav_header{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width:95%;
	height: 24px;
	background: #62d2a2;

}	
.recommend_content{
	margin-top: 8px;
    clear: both;

}
.recommend_content_spots, .recommend_content_house, .recommend_content_foods{
	
	height: 200px;
	margin-bottom: 10px;
	border: 1px solid #ccc;

}

.nav_content{
	display: flex;
	height: 170px;
}

.nav_item{
 	  display: flex;
      flex: 1;
      text-align: center;
      flex-direction: column;
      align-items: center;
      margin: 4px;
      margin-top: 10px;
      color: #999999;
      border: 1px solid #ccc;
 }

</style>