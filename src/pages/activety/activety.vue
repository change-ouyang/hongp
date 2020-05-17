<template>
    <div id="index">
        <!-- 轮播图 -->
        <swiper indicator-dots="true" indicator-color="white" indicator-active-color="#007AFF" autoplay="true" interval="2000" circular="true">
            <swiper-item>
                <img src="../../../static/images/b.png" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../../static/images/b.png" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../../static/images/b.png" alt="">
            </swiper-item>
        </swiper>
        <!-- 活动区 -->
        <div class="box" @click="toactivety">
            <h3 class="title">热门活动</h3>
            <div class="menu">
                <h3 class="ID">{{id}}</h3>
                <h3 class="name">{{name}}</h3>
                <p class="num">{{browse}}</p>
                <div class="image">
                    <img src="../../../static/images/fire.png" alt="">
                </div>
            </div>
        </div>
        <!-- 首页圈圈 -->
        <div class="tohome" @click="toindex">
            首页
        </div>
    </div>
</template>
<script>
import fly from '../../api/hongp'
export default {
    data() {
        return {
            activedata:{},
            id:'',
            name:'' ,
            browse:''
        }
    },
    filters:{ //字段过长显示小数点
        ellipsis(val){
            let len=val.length
            if(!val){return ''}
            if(val.len>6){
                return val.slice(0,7)+'...'
            }
            return val;
        }
    },
    created() {
        this.$fly.post(fly.getactive)
		.then((res)=>{
            // console.log(res.data.data);
            let {id}=res.data.data[0]
            let {name}=res.data.data[0]
            let {browse}=res.data.data[0]
            this.id=id
            this.name=name
            this.browse=browse
        })
    },
    methods: {
        toactivety(){
            let url='../activety-item/main'
            wx.switchTab({ url })
        },
        toindex(){
            let url='../index/main'
            wx.navigateTo({ url })
        }
    },
}
</script>
<style>
    #index{
        width: 100%;
        height:400rpx;
    }
    swiper{
        width: 100%;
        height:400rpx;
    }
    img{
        width: 100%;
        height:100%;
    }
    .box .title{
        width: 100%;
        padding: 20rpx;
        box-sizing: border-box;
    }
    .menu{
        width: 100%;
        line-height: 40px;
        padding: 20rpx;
        box-sizing: border-box;
        box-shadow: 0px 0px 3px gray;
        display: flex;
    }
    .menu .ID{
        color: red;
    }
    .menu .name{
        font-weight: bold;
        margin-left: 30px;
        display:block ;
        white-space:nowrap;
        overflow:hidden;

        text-overflow:ellipsis;
    }
    .menu .num{
        color: gray;
        margin-left: 20px;
        font-size: 16px;
    }
    .menu .image{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        margin-left: 40px;
    }
    .menu .image img{
        width: 100%;
    }
    .tohome{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background: #F6FFFF;
        font-size: 14px;
        color: gray;
        border: 1px solid #608DFA;
        position: fixed;
        right: 5px;
        bottom: 50px;
    }
</style>