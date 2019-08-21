<template>
  <div class="mood">
    <HeaderTop class="app-header2" :title="'写日记'">
      <i class="iconfont iconfanhui left" slot="left" @click="goback()"></i>
    </HeaderTop>
     <div class="upload">
      <div>
        <!--图片上传-->
        <div class="weui-gallery" id="gallery">
          <span class="weui-gallery__img" id="galleryImg"></span>
          <div class="weui-gallery__opr">
            <a href="javascript:" class="weui-gallery__del">
              <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
          </div>
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="contents" placeholder="此刻心情..." rows="3"></textarea>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="weui-uploader">
                <div class="weui-uploader__bd">
                  <ul class="weui-uploader__files" id="uploaderFiles">
                    <li ref="files" class="weui-uploader__file" 
                      v-for="(image, index) in images" :style="'backgroundImage:url(' + image +' )'" @click="deleteimg(index)"><span class="x">&times;</span></li>
                  </ul>
                  <div class="weui-uploader__input-box">
                    <input ref="fileAdd" id="uploaderInput" class="weui-uploader__input zjxfjs_file" type="file"
                    @change="changeImg($event)"       accept="image/*" >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="weui-btn weui-btn_primary btn-put" style="margin: 20px " @click.prevent="
recordMood()">发送</a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import HeaderTop from '../Header/HeaderTop.vue'
  import {Toast, Indicator} from 'mint-ui'
  import {mapState} from 'vuex'
  /*思路：
  1.加号监听change()事件
  2.将图片绘制到界面上
  3.点击发表按钮，将图片提交给后台处理并发表
  */
  export default{
    components:{
      HeaderTop
    },
    data(){
      return{
        contents:'',
        maxSize: 10240000/2,
        maxCount: 9,//允许的最大张数
        images:[],//存放图片
        filesArr:[]

      }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    methods:{
      //返回
      goback() {
        this.$router.go(-1);
      },
      //点击加号选择图片
      changeImg(e){
        let files = e.target.files
        console.log(files)
        //如果没有选中
        if(files.length===0){
          return 
        }
        //已经选中的图片数 + 当前的图片数
        if(this.images.length + files.length >= this.maxCount){
           Toast('最多只能传'+this.maxCount+'张图片')
           //并且将当前的加号隐藏
           
        }

        //接下来将选中的图片加载到缓冲区
        let reader;
        let file
        let images = this.images //存放当前加到页面上的图片数组
        for(let i = 0, length=files.length; i< length; i++){
          file = files[i]//遍历当前选中的图片
          this.filesArr.push(file) //将当前选中的图片存到一个数组
          reader = new FileReader()//对象允许Web应用程序异步读取存储在用户计算机上的文件
          if(file.size > this.maxSize){
            Toast('图片太大了，换一张试试')
            continue;//下面不执行了，进行下一个循环
          }

          reader.onload = (e)=>{
            let img = new Image()
            img.onload = function(){
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              let width = img.width
              let height = img.height

              //设置canvas的宽度和高度
              canvas.width = width
              canvas.height = height
              ctx.drawImage(img, 0, 0, width, height)
              let newImg = canvas.toDataURL('image/png')
              images.push(newImg)
            }
            console.log(e)
            img.src= e.target.result
          }
          reader.readAsDataURL(file)
        }
      },

      //删除图片
        deleteimg(index) {
        this.filesArr.splice(index, 1);
        this.images.splice(index, 1);
      },

      recordMood(){
          console.log(this.contents)
        if(!this.contents && this.filesArr.length===0){
          Toast('内容不能为空！')
          return 
        }
        Indicator.open('心情正在发布哦...')
        let self = this
        let content = this.contents
        console.log(content)
        let params = new FormData()
        params.append('content', content)
        params.append('username',this.userInfo._id)
       // console.log(params)
      //  console.log(params.getAll('content'));
        this.filesArr.forEach((file)=>{
          params.append('file',file)
        })

        for (var value of params.values()) {
            console.log(value);//查看formData中，发现都append进去了
         }

         self.$axios.post('/api/upload/uploadFile', params, {
          headers: {
            /*'Content-Type': 'multipart/form-data'*/
            "Content-Type": "application/x-www-form-urlencoded"
          }
          /*"Content-Type":"application/x-www-form-urlencoded"*/
        }).then(function (result) {
          //console.log(result.data);
          self.$router.push('/found');
          Indicator.close();
          Toast(result.data.msg)
        })
      }

    }

  }
</script>
<style type="text/css" scoped>
    .header-make{
     
    background-color: #1fab89;
  
    }
    .mood{
      height: 665px;
      background: url(./xq.jpg) no-repeat;
    }
    .upload {
    position: fixed;
    top: 50px;
    bottom: 60px;
    width: 100%;
    opacity: 0.5;

    
  }


  .weui-cells {
      margin-top: 0;
    }
  .weui-uploader__file {
      position: relative;
      margin-top: 6px;
      
    }
    .x {
        text-align: center;
        background-color: black;
        font-size: 20px;
        line-height: 23px;
        color: white;
        position: absolute;
        right: -0.3rem;
        top: -0.3rem;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        opacity: 0.8;
      }
    .weui-uploader__input-box {
      margin-top: 6px;
    }
    .p-tip {
      margin: 20px 0 10px 0;
     
      
    }
    .p-tipimg {
        width: 100%;
        padding-bottom: 20px;
      }
      .text {
        color: grey;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
      }

    .btn-put{
      background-color: #262525;
      opacity: 0.6;
    }
</style>

