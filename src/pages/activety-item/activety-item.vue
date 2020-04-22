<template>
    <div>
        <div class="body-bg">
        <!-- 轮播图 -->
        <swiper indicator-dots="true" indicator-color="white" indicator-active-color="#007AFF" autoplay="true" interval="2000" circular="true">
            <swiper-item>
                <img src="../../../static/images/c.png" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../../static/images/c.png" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../../static/images/c.png" alt="">
            </swiper-item>
        </swiper>
        <!-- 数据 -->
        <div class="data">
            <div>
                <p>60</p>
                <p>已报名</p>
            </div>
            <div>
                <p>1552</p>
                <p>总投票</p>
            </div>
            <div>
                <p>6761</p>
                <p>浏览量</p>
            </div>
        </div>
        <!-- 报名 -->
        <div class="sign" @click="tosignup">
            <p>我要报名</p>
        </div>
        <!-- 倒计时 -->
        <div class="countdown">
            <p>距离活动结束：{{day}}天{{hr}}小时{{min}}分{{sec}}秒</p>
        </div>
        <!-- 搜索用户 -->
        <div class="user">
            <input type="text" placeholder="姓名">
            <p>搜索</p>
        </div>
        <!-- 选择分组 -->
        <div class="menu">
            <picker class="ipt" @change="bindPickerChange" :value="index" :range="array">
                <div>
                    {{array[index]}}
                </div>
            </picker>
            <span class="btn"></span>
        </div>
        <!-- 用户详情 -->
        <div class="detail">
            <div class="one" @click="toplayer(item.id)" v-for="(item, index) in activetydata" :key="index">
                <div class="image">
                    <img :src="item.img" alt="">
                </div>
                <div class="bottom">
                    <p class="num">编号:{{item.id}}</p>
                    <p class="name">{{item.name}}</p>
                    <p class="ticket">{{item.ticket}}票</p>
                    <div class="vote">投票</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <p>已经到底部了~</p>
        </div>
        <!-- 左侧fixed -->
        <div class="fixed">
            <p @click="toacvivety">列表</p>
            <p>关注</p>
            <p>客服</p>
        </div>
        </div>
    </div>
</template>
<script>
// import axios from '../../api/axios'
export default {
    data() {
        return {
            day:0,hr:0,min:0,sec:0,
            list:[],
            array: ['选择分组','北大青鸟鲁广校区', '北大青鸟光谷校区', '北大青鸟光谷学院', '课工场华中直营总校','课工场徐东校区','课工场光谷校区','课工场郑州兰德校区','北大青鸟徐东校区'],
            index: 0,
            activetydata:[
                {"id":"0","name":"杨幂","rank":"1","ticket":"246","img":"https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=481823748,3803020137&fm=58&app=83&f=JPEG?w=250&h=250&s=B9166094023B4794C78571F803008034"},
                {"id":"1","name":"刘诗诗","rank":"2","ticket":"235","price":"18","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3301421587,374458331&fm=58&app=83&f=JPEG?w=250&h=250&s=DA88AF476E23768C991018B303008060"},
                {"id":"2","name":"赵丽颖","rank":"3","ticket":"211","img":"https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1833321872,1873644000&fm=58&app=83&f=JPEG?w=250&h=250&s=54F813D7523B5394D7AF02A003007029"},
                {"id":"3","name":"杨紫","rank":"4","ticket":"190","img":"https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2750998680,3202774404&fm=58&app=83&f=JPEG?w=250&h=250&s=50251F704B234A191C4C31D30300C0A2"},
                {"id":"4","name":"唐嫣","rank":"5","ticket":"182","img":"https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3725561364,1533965488&fm=58&app=83&f=JPEG?w=250&h=250&s=BEA3F3077E236E152080197D0300D038"},
                {"id":"5","name":"范冰冰","rank":"6","ticket":"170","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4147546222,1928275276&fm=58&app=83&f=JPEG?w=250&h=250&s=4DECA844EC3A6294D40834D80300D090"},
                {"id":"6","name":"江疏影","rank":"7","ticket":"159","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1791842419,2459555808&fm=58&app=83&f=JPEG?w=250&h=250&s=AB02CF0038BB7294C49C60DE0300E0B0"},
                {"id":"7","name":"佟丽娅","rank":"8","ticket":"142","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1959205732,3947920150&fm=58&app=83&f=JPEG?w=250&h=250&s=7D2BBF578A335784329870E90300A068"},
                {"id":"8","name":"刘涛","rank":"9","ticket":"135","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3015639301,787232821&fm=58&app=83&f=JPEG?w=250&h=250&s=1A21716CD432059C95E872980300C09C"},
                {"id":"9","name":"林心如","rank":"10","ticket":"123","img":"https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2591412328,489739705&fm=58&app=83&f=JPG?w=250&h=250&s=A5FA7397162366B4043070E20300E022"},
            ],
        }
    },
    created() {
        this.countdown();//调用倒计时

        // axios.get('../../../static/json/user.json').then((res)=>{
        //     console.log(res);
        // })
        // this.getdata();
    },
    onLoad(options) {
        this.getdata();
    },
    methods: {
        //选择分组
        bindPickerChange(e){
            console.log(e);
            this.index = e.mp.detail.value
        },
        //去列表页
        toacvivety(){
            let url="../activety/main"
            wx.navigateTo({url})
        },
        //去报名页
        tosignup(){
            let url="../signup/main"
            wx.navigateTo({url})
        },
        //去选手信息页
        toplayer(id){
            let url="../player/main?id="+id
            wx.navigateTo({url})
        },
        getdata(){
            wx.request({
                url: '../../../static/json/user.json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success (res) {
                    res=JSON.parse(res)
                    console.log(res.data)
                }
            })
        },
        //倒计时
        countdown () {
            // 定义结束时间戳
            const end = Date.parse(new Date('2020-5-31 00:00:00'))
            // 定义当前时间戳
            const now = Date.parse(new Date())
            // 做判断当倒计时结束时都为0
            if (now >= end) {
                this.day = 0
                this.hr = 0
                this.min = 0
                this.sec = 0
                return
            }
            // 用结束时间减去当前时间获得倒计时时间戳
            const msec = end - now
            let day = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
            let hr = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
            let min = parseInt(msec / 1000 / 60 % 60)//算出分钟数
            let sec = parseInt(msec / 1000 % 60)//算出秒数
            //给数据赋值
            this.day = day
            this.hr = hr > 9 ? hr : '0' + hr
            this.min = min > 9 ? min : '0' + min
            this.sec = sec > 9 ? sec : '0' + sec
            //定义this指向
            const that = this
            // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
            setTimeout(function () {
                that.countdown()
            }, 1000)
        },
    },
}
</script>
<style>
    #index{
        width: 100%;
        height:350rpx;
    }
    swiper{
        width: 100%;
        height:350rpx;
    }
    img{
        width: 100%;
        height:100%;
    }
    .body-bg{
        background: #EEEEEE;
    }
    .data{
        width: 95%;
        margin: 0 auto;
        margin-top: 10px;
        padding: 8px;
        box-sizing: border-box;
        background: #31C9B1;
        border-radius: 5px;
        color: white;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }
    .data>div{
        flex: 1;
    }
    .sign{
        width: 70%;
        padding: 10px;
        margin: 0 auto;
        margin-top: 10px;
        box-sizing: border-box;
        background: #31C9B1;
        color: white;
        border-radius: 12px;
        text-align: center;
    }
    .countdown{
        width: 95%;
        padding: 10px;
        margin: 0 auto;
        margin-top: 8px;
        box-sizing: border-box;
        background: #F6FFFF;
        color: gray;
        border-radius: 8px;
        text-align: center;
        font-size: 16px;
    }
    .user{
        width: 100%;
        padding: 10px;
        margin: 0 auto;
        margin-top: 7px;
        box-sizing: border-box;
        display: flex;
    }
    .user input{
        flex: 7;
        height: 40px;
        background: white;
        padding: 10px;
        box-sizing: border-box;
    }
    .user p{
        flex: 3;
        background: #31C9B1;
        padding: 8px;
        box-sizing: border-box;
        border-radius: 5px;
        color: white;
        text-align: center;
    }
    .menu{
        width: 185px;
        background: #31C9B1;
        color: white;
        padding: 5px;
        box-sizing: border-box;
        margin-left: 10px;
        text-align: center;
        position: relative;
        font-size: 16px;
    }
    .menu .btn{
        width: 8px;
        height: 8px;
        position: absolute;
        right: 12px;
        bottom: 13px;
        border-left: 3px solid white;
        border-top: 3px solid white;
        transform: rotate(-135deg);
    }
    .detail{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .detail>div{
        width: 48%;
        height: 250px;
        background: white;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .detail>div .image{
        flex: 6;
    }
    .detail>div .image img{
        width: 100%;
    }
    .detail>div .bottom{
        flex: 4;
        padding: 10px;
        box-sizing: border-box;
    }
    .detail>div .num{
        position: absolute;
        top: 0;
        font-size: 14px;
    }
    .detail>div .name{
        color: gray;
        margin-bottom: 8px;
    }
    .detail>div .ticket{
        color: #31C9B1;
        margin-bottom: 8px;
    }
    .detail>div .vote{
        background: #31C9B1;
        color: white;
        padding: 8px;
        box-sizing: border-box;
        text-align: center;
    }
    .footer{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #EEEEEE;
        color: gray;
    }
    .fixed{
        position: fixed;
        left: 0;
        bottom: 10px;
        z-index: 10;
    }
    .fixed p{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #F6FFFF;
        margin-top: 3px;
        font-size: 14px;
        color: gray;
        border-radius: 5px;
        box-shadow: 0px 0px 2px gray;
    }
</style>