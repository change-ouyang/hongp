<template>
    <div id="index">
        <!-- 轮播图 -->
        <swiper indicator-dots="true" indicator-color="white" indicator-active-color="#007AFF" autoplay="true" interval="2000" circular="true">
            <swiper-item>
                <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190724/412964cfea2249e48e87ea3c13799e24.jpg" alt="">
            </swiper-item>
            <swiper-item>
                <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190724/985033c163b74545939ff62819f6abfe.jpg" alt="">
            </swiper-item>
            <swiper-item>
                <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190716/d48cf407afb1481eabd4401c6185e5ac.png" alt="">
            </swiper-item>
        </swiper>
        <!-- 首页模块 -->
        <div class="box">
          <div class="one" @click="toactivety">
            <img src="../../../static/images/a1.png" alt="">
            <p>活动</p>
          </div>
          <div class="two">
            <img src="../../../static/images/a2.png" alt="">
            <p>问卷</p>
          </div>
          <div class="three">
            <img src="../../../static/images/a3.png" alt="">
            <p>夏令营</p>
          </div>
          <div class="four">
            <img src="../../../static/images/a4.png" alt="">
            <p>课程</p>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    onLoad(){

    },
    methods: {
      toactivety(){
          let url='../activety/main'
          wx.navigateTo({ url })
      }
    },
}
</script>
<style>
    #index{
        width: 100%;
        background: #EEEEEE;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    swiper{
        width: 100%;
        height:350rpx;
    }
    img{
        width: 100%;
        height:100%;
    }
    .box{
      width: 100%;
      background: #EEEEEE;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 30rpx;
      box-sizing: border-box;
    }
    .box>div{
      width: 48%;
      height: 360rpx;
      background: #F6FFFF;
      margin-top: 30rpx;
      display: flex;
      flex-direction: column;
      padding: 15rpx;
      box-sizing: border-box;
      padding-bottom: 10px;
    }
    .box div img{
      flex: 8;
    }
    .box div p{
      flex:2;
      text-align: center;
      margin-top: 10rpx;
    }
</style>