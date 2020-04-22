<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <h3>我要报名</h3>
        </div>
        <!-- 类型 -->
        <div class="menu">
            <div class="one">
                <h3>选手名称</h3>
                <input class="ipt" type="text" placeholder="请输入选手名称">
            </div>
            <div class="one">
                <h3>手机号</h3>
                <input class="ipt" type="text" placeholder="请输入手机号">
            </div>
            <div class="one">
                <h3>分组</h3>
                <picker class="ipt" @change="bindPickerChange" :value="index" :range="array">
                    <div>
                        {{array[index]}}
                    </div>
                </picker>
                <span class="btn"></span>
            </div>
            <div class="one">
                <h3>选手描述</h3>
                <textarea class="ipt textarea" bindblur="bindTextAreaBlur" auto-height placeholder="请输入选手描述" />
            </div>
        </div>
        <!-- 图片 -->
        <div class="photo">
            <h3>上传选手图片（1-3张）</h3>
            <div class="down">
                +
            </div>
        </div>
        <!-- 提交 -->
        <div class="submit">
            提交
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                array: ['全部','北大青鸟鲁广校区', '北大青鸟光谷校区', '北大青鸟光谷学院', '课工场华中直营总校','课工场徐东校区','课工场光谷校区','课工场郑州兰德校区','北大青鸟徐东校区'],
                index: 0,
            }
        },
        methods: {
            bindPickerChange(e){
                console.log(e);
                this.index = e.mp.detail.value
            },
        },
    }
</script>
<style>
    .header{
        width: 95%;
        margin: 0 auto;
        color: #738A77;
        font-weight: bold;
        text-align: center;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px gray solid;
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
        text-indent: 0.3em;
        background: #FAFBFD;
        border: 1px solid gray;
        color: gray;
    }
    .menu>div .textarea{
        height: 80px !important;
        text-indent: 0.3em;
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
    .photo{
        width: 100%;
        margin-top: 30px;
        padding: 15px;
        box-sizing: border-box;
        color: gray;
    }
    .photo .down{
        width: 70px;
        height: 70px;
        line-height: 35px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        padding: 15px;
        box-sizing: border-box;
        margin-top: 15px;
        color: gray;
        border: 1px gray dashed;
    }
    .submit{
        width: 95%;
        margin: 0 auto;
        position: fixed;
        left: 10px;
        bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #1AAD19;
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }
</style>