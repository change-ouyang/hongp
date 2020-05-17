<template>
    <div>
        <div class="image">
            <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190724/412964cfea2249e48e87ea3c13799e24.jpg" alt="">
        </div>
        <div class="title">
            <p><span style="color:red">*</span>请留下你的联系方式，您提交完问卷后可参与抽奖，中奖后工作人员会第一时间联系您!</p>
        </div>
        <!-- 类型 -->
        <div class="menu">
            <div class="one">
                <h3>姓名：</h3>
                <input class="ipt" type="text" v-model="name">
            </div>
            <div class="one">
                <h3>电话：</h3>
                <input class="ipt" type="text" v-model="phone">
            </div>
            <div class="one">
                <h3>性别：</h3>
                <radio-group class="ipt" style="border:none">
                    <radio class="radio">
                        <text>男</text>
                    </radio>
                    <radio class="radio">
                        <text>女</text>
                    </radio>
                </radio-group>
            </div>
            <div class="one">
                <h3>出生日期：</h3>
                <picker class="ipt" style="border:none" mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
                    <view class="picker">
                        {{date}}
                    </view>
                </picker>
                <span class="btn"></span>
            </div>
        </div>
        <div class="start" @click="toone()">
            提交
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index: 0,
            name:'',
            phone:'',
            detail:'',
            imagefile:[],
            down:true,
            date: '----年--月--日',
        }
    },
    methods: {
        toone(){
            let reg1=/^[\u4E00-\u9FA5]{2,4}$/
            let reg2=/^1[34578]\d{9}$/
            if(this.name==''){ 
                wx.showToast({
                    title: '姓名不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }else if(!reg1.test(this.name)){
                wx.showToast({
                    title: '请输入2-4位汉字',
                    icon: 'none',
                    duration: 2000
                })
            }else if(this.phone==''){ 
                wx.showToast({
                    title: '手机号不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }else if(!reg2.test(this.phone)){
                wx.showToast({
                    title: '请输入11位数手机号',
                    icon: 'none',
                    duration: 2000
                })
            }else{
                wx.showLoading({
                    title: '提交中',
                })
                setTimeout(function () {
                    wx.hideLoading()
                }, 2500)
                setTimeout(function () {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                    })
                }, 2000)
                setTimeout(function () {
                    let url='../lottery/main'
                    wx.navigateTo({ url })
                }, 2500)               
            }  
        },
        //点击分组
        bindDateChange: function(e) {
            console.log(e);
            this.date=e.mp.detail.value
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
        padding: 10px;
        box-sizing: border-box;
        text-indent: 1em;
        font-size: 16px;
    }
    .menu{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        position: relative;
    }
    .menu>div{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    .menu>div h3{
        flex: 3;
        color: gray;
    }
    .menu>div .ipt{
        flex: 7;
        height: 40px;
        background: #FAFBFD;
        border: 1px solid gray;
        color: gray;
    }
    .menu>div .textarea{
        height: 80px !important;
        background: #FAFBFD;
        border: 1px solid gray;
        color: gray;
    }
    .menu .btn{
        position: absolute;
        right: 40px;
        width: 10px;
        height: 10px;
        margin-top: 10px;
        border-left: 3px solid gray;
        border-top: 3px solid gray;
        transform: rotate(-135deg);
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