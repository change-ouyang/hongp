<template>
    <div id="index">
		<!-- 授权登录 -->
		<div class="container" v-if="canIUse">
        　　<div class='content'>
        　　　　<div>申请获取以下权限</div>
        　　　　<p>获得你的公开信息(昵称，头像等)</p>
        　　</div>
        　　<button 
            class="buttom"
            open-type="getUserInfo"
            lang="zh_CN" 
            @getuserinfo="bindGetUserInfo" 
            type="primary"
            >
                授权登录
            </button>
        </div>
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
			<div class="one" @click="toactivety()">
				<img src="../../../static/images/a1.png" alt="">
				<p>活动</p>
			</div>
			<div class="two" @click="tostart()">
				<img src="../../../static/images/a2.png" alt="">
				<p>问卷</p>
			</div>
			<div class="three" @click="tocamp()">
				<img src="../../../static/images/a3.png" alt="">
				<p>夏令营</p>
			</div>
			<div class="four" @click="toclass()">
				<img src="../../../static/images/a4.png" alt="">
				<p>课程</p>
			</div>
        </div>
    </div>
</template>
<script>
import fly from '../../api/hongp'
export default {
	data() {
		return {
			canIUse:true
		}
	},
    created() {
		this.setting()
    },
    methods: {
		//首页登录授权
		setting(){
			let that=this
			wx.getSetting({ //查看授权
				success(res) {
					if (res.errMsg) { //授权信息
						wx.getUserInfo({
							success: (res) => {
								that.canIUse=false
								wx.login({ 
									success(res) {
										that.$fly.post(fly.openid,{code:res.code})
										.then((res)=>{
											// console.log(res.data);
											// try {
											// 	wx.setStorageSync(res.data.data.session_key, 'value')
											// } catch (e) { }
											wx.setStorage({
												key:"key",
												data:res.data.data.openid
											})
										})
									}
								})
							}
						})
					}
				}
			}) 
		},
		//点击登录授权
		bindGetUserInfo(e){
			console.log(e.target.userInfo);
			// try {
			// 	wx.setStorageSync(e.target.userInfo, [])
			// } catch (e) { }
			let userInfo=e.target.userInfo
			wx.setStorage({
				key:"userInfo",
				data:userInfo
			})
            if (e.mp.detail.userInfo){
				console.log('用户按了允许授权按钮')
				wx.showLoading({
					title: '加载中',
				})
				setTimeout(() => {
					wx.hideLoading()
				}, 2000);
				setTimeout(() => {
					this.canIUse=false
				}, 2000);
            } else {
                //用户按了拒绝按钮
                console.log('用户按了拒绝按钮')
            }
		},
		//去列表页
		toactivety(){
			let url='../activety/main'
			wx.navigateTo({ url })
		},
		//去问卷页
		tostart(){
			let url='../quest/start/main'
			wx.navigateTo({ url })
		},
		//去夏令营页
		tocamp(){
			wx.showModal({
				title: '温馨提示',
				content: '正在努力开发中，尽情期待~',
				success (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},
		//去课程页
		toclass(){
			wx.showModal({
				title: '温馨提示',
				content: '正在努力开发中，尽情期待~',
				success (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
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