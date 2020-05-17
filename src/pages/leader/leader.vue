<template>
    <div class="body-bg">
        <!-- 倒计时 -->
        <div class="header">
            <p class="time" style="margin-bottom:5px">2020-05-31 00:00:00 结束</p>
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
                        <img mode='scaleToFill' :src="item.coverImg" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                    <div class="one two" v-for="(item, index) in twolist" :key="index" @click="toplayer(item.id)">
                        <img class="img1" src="../../../static/images/huangguan.png" alt="">
                        <img class="img2" mode='scaleToFill'  :src="item.coverImg" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                    <div class="one" v-for="(item, index) in threelist" :key="index" @click="toplayer(item.id)">
                        <h3>NO.3</h3>
                        <img mode='scaleToFill' :src="item.coverImg" alt="">
                        <p class="name">{{item.name}}</p>
                        <p class="count">{{item.ticket}}票</p>
                    </div>
                </div>
                <div class="bottom" v-for="(item, index) in fourlist" :key="index">
                    <div class="person" @click="toplayer(item.id)">
                        <div class="user-photo">
                            <img mode='scaleToFill' :src="item.coverImg" alt="">
                        </div>
                        <div class="user-detail">
                            <p class="name">{{item.name}}</p>
                            <p class="ticket">{{item.ticket}}票</p>
                        </div>
                        <div class="user-rank">
                            <p class="rank">{{index+4}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fly from '../../api/hongp'
export default {
    data() {
        return {
            day:0,hr:0,min:0,sec:0,
            leaderdata:[],
            list:[],
            onelist:[],
            twolist:[],
            threelist:[],
            fourlist:[],
            endtime:''
        }
    },
    created() {
        this.countdown(); //调用倒计时
        this.leader(); //调用排行榜数据
    },
    // 下拉刷新页面数据
    onPullDownRefresh() {
        this.leader(); //调用排行榜数据
        setTimeout(() => {
            wx.stopPullDownRefresh();            
        }, 1500);
    },
    methods: {
        //排行榜数据
        leader(){
            this.$fly.post(fly.getleader,{activityId:1})
            .then((res)=>{
                let { end }=res.data.data.hdActivity
                this.endtime=end
            })
            this.$fly.post(fly.getleader,{activityId:1})
            .then((res)=>{
                // console.log(res.data.data.playerList);
                // console.log(res.data.data.playerList1);
                this.leaderdata=res.data.data.playerList
                this.list=res.data.data.playerList
                this.onelist=this.list.slice(1,2)
                this.twolist=this.list.slice(0,1)
                this.threelist=this.list.slice(2,3)
                this.fourlist=res.data.data.playerList1
            })
        },
        //去选手页
        toplayer(id){
            let url="../player/main?id="+id
            wx.navigateTo({url})
        },
        //倒计时
        countdown () {
            // 定义结束时间戳
            const end = Date.parse(new Date(this.endtime))
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
        flex: 4;
    }
    .box .user .bottom .user-detail p{
        font-size: 16px;
        color: gray;
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .box .user .bottom .user-rank{
        flex: 4;
        text-align: right;
    }
    .box .user .bottom .user-rank p{
        font-size: 16px;
        color: gray;
        margin-right: 10px;
    }
</style>