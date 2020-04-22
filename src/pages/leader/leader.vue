<template>
    <div class="body-bg">
        <!-- 倒计时 -->
        <div class="header">
            <p class="time" style="margin-bottom:5px">2020-11-30 00:00:00 结束</p>
            <p class="countdown">
                剩余{{day}}天{{hr}}时{{min}}分{{sec}}秒剩余
            </p>
        </div>
        <!-- 排行榜 -->
        <div class="box">
            <div class="paihang">票数排行榜</div>
            <div class="user">
                <div class="top">
                    <div class="one" v-for="(item, index) in onelist" :key="index" @click="toplayer(item.id)">
                        <h3>NO.2</h3>
                        <img :src="item.img" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                    <div class="one two" v-for="(item, index) in twolist" :key="index" @click="toplayer(item.id)">
                        <img class="img1" src="../../../static/images/huangguan.png" alt="">
                        <img class="img2" :src="item.img" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                    <div class="one" v-for="(item, index) in threelist" :key="index" @click="toplayer(item.id)">
                        <h3>NO.3</h3>
                        <img :src="item.img" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                </div>
                <div class="bottom" v-for="(item, index) in fourlist" :key="index">
                    <div class="person" @click="toplayer(item.id)">
                        <div class="user-photo">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="user-detail">
                            <p class="name">{{item.name}}</p>
                            <p class="ticket">{{item.ticket}}票</p>
                        </div>
                        <div class="user-rank">
                            <p class="rank">{{item.rank}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            day:0,hr:0,min:0,sec:0,
            leaderdata:[
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
            onelist:[],
            twolist:[],
            threelist:[],
            fourlist:[],
        }
    },
    created() {
        this.onelist=this.leaderdata.filter((item)=>item.id==0)
        this.twolist=this.leaderdata.filter((item)=>item.id==1)
        this.threelist=this.leaderdata.filter((item)=>item.id==2)
        this.fourlist=this.leaderdata.splice(3,9)
        this.countdown();//调用倒计时
    },
    methods: {
        //倒计时
        countdown () {
            // 定义结束时间戳
            const end = Date.parse(new Date('2020-11-30 00:00:00'))
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
        //去选手页
        toplayer(id){
            let url="../player/main?id="+id
            wx.navigateTo({url})
        },
    },
}
</script>
<style>
    .body-bg{
        background: #EEEEEE;
    }
    .header{
        width: 100%;
        height: 80px;
        font-size: 15px;
        color: gray;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .box{
        width: 95%;
        margin: 0 auto;
    }
    .box .paihang{
        width: 100%;
        background: #31C9B2;
        color: white;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
        font-size: 16px;
    }
    .box .user{
        width: 100%;
        background: white;
        padding: 10px;
        box-sizing: border-box;
    }
    .box .user .top{
        width: 100%;
        background: white;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .box .user .top .one{
        width: 32%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .box .user .top .two{
        width: 32%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .box .user .top .three{
        width: 32%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .box .user .top .one h3{
        color: #FDC73A;
        text-align: center;
    }
    .box .user .top .one img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    .box .user .top .one .name{
        font-size: 16px;
        color: gray;
        text-align: center;
        margin-bottom: 5px;
    }
    .box .user .top .one .count{
        color: #31C9B2;
        text-align: center;
    }
    .box .user .top .two .img1{
        width: 60px;
        height: 60px;
        margin-bottom: -5px;
        overflow: hidden;
    }
    .box .user .top .two .img2{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-top: -5px;
        margin-bottom: 5px;
        overflow: hidden;
    }
    .box .user .top .two .name{
        font-size: 18px;
        color: gray;
        text-align: center;
        margin-bottom: 5px;
    }
    .box .user .top .two .count{
        color: #31C9B2;
        text-align: center;
    }
    .box .user .bottom .person{
        width: 100%;
        background: white;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-top:1px #D9DADF solid;
    }
    .box .user .bottom .user-photo{
        flex: 2;
    }
    .box .user .bottom .user-photo img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .box .user .bottom .user-detail{
        flex: 2;
    }
    .box .user .bottom .user-detail p{
        font-size: 16px;
        color: gray;
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .box .user .bottom .user-rank{
        flex: 6;
        text-align: right;
    }
    .box .user .bottom .user-rank p{
        font-size: 16px;
        color: gray;
        margin-right: 10px;
    }
</style>