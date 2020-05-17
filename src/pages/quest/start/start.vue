<template>
    <div>
        <div class="image">
            <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190724/412964cfea2249e48e87ea3c13799e24.jpg" alt="">
        </div>
        <div class="title">
            <p>您好!</p>
            <p>感谢您对武汉宏鹏教育的支持与信任，我们秉承教育改变生活的理念,在我校全体教职.员工的努力下，已经帮助数万学生,实现了自己的人生理想和学习目标。您的宝贵意见将指导我们在今后的工作中不断努力改进,请务必认真填写!</p>
        </div>
        <div class="start" @click="toone()">
            开始问卷调查
        </div>
    </div>
</template>
<script>
import fly from '../../../api/hongp'
export default {
    created() {
        this.$fly.post(fly.getquest,{
            questionnaireId:2
        })
        .then((res)=>{
            // console.log(res.data);
        })
    },
    methods: {
        toone(){
            let url='../one/main'
            wx.navigateTo({ url })
        }
    },
}
</script>
<style>
    .image{
        width: 100%;
        height: 200px;
    }
    .image img{
        width: 100%;
        height: 200px;
    }
    .title{
        width: 90%;
        margin: 0 auto;
        box-shadow: 0px 0px 10px gray;
        border-radius: 8px;
        padding: 20px;
        box-sizing: border-box;
        margin-top: 20px;
        font-size: 16px;
        color: gray;
    }
    .title p:nth-child(2){
        text-indent: 1em;
    }
    .start{
        width: 50%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 20px;
        background: #1AAC19;
        color: white;
        border-radius: 5px;
        text-align: center;
    }
</style>