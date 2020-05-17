<template>
    <div>
        <div class="body-bg">
        <!-- 轮播图 -->
        <swiper indicator-dots="true" indicator-color="white" indicator-active-color="#007AFF" autoplay="true" interval="2000" circular="true">
            <swiper-item>
                <img :src="urlimg" alt="">
            </swiper-item>
            <swiper-item>
                <img :src="urlimg" alt="">
            </swiper-item>
            <swiper-item>
                <img :src="urlimg" alt="">
            </swiper-item>
        </swiper>
        <!-- 音乐 -->
        <div class="music" @click="domusic">
            <img class="start" v-show="ismusic" src="../../../static/images/start.png" alt="">
            <img v-show="!ismusic" src="../../../static/images/stop.png" alt="">
            <audio :src="src" id="myAudio"></audio>
        </div>
        <!-- 数据 -->
        <div class="data">
            <div>
                <p>{{enroll}}</p>
                <p>已报名</p>
            </div>
            <div>
                <p>{{sumVote}}</p>
                <p>总投票</p>
            </div>
            <div>
                <p>{{browse}}</p>
                <p>浏览量</p>
            </div>
        </div>
        <!-- 报名 -->
        <div class="sign" @click="tosignup">
            <p>我要报名</p>
        </div>
        <!-- 倒计时 -->
        <div class="countdown">
            <p v-show="!timeshow">距离活动结束：{{day}}天{{hr}}小时{{min}}分{{sec}}秒</p>
            <p v-show="timeshow">距离活动结束：活动已结束</p>
        </div>
        <!-- 搜索用户 -->
        <div class="user">
            <input type="text" placeholder="姓名" v-model="username">
            <p @click="dosearch(username)">搜索</p>
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
            <div class="one" @click="toplayer(item.id)" v-for="(item, index) in list" :key="index">
                <div class="image">
                    <img :src="item.coverImg" alt="" lazy-load="true">
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
        <div class="footer" v-show="nomore">
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
import fly from '../../api/hongp'
export default {
    data() {
        return {
            day:0,hr:0,min:0,sec:0, //时间
            array: ['选择分组','北大青鸟鲁广校区', '北大青鸟光谷校区', '北大青鸟光谷学院', '课工场华中直营总校','课工场徐东校区','课工场光谷校区','课工场郑州兰德校区','北大青鸟徐东校区'],
            groupname:'', //当前所属区
            listnum:[], //区分组
            index: 0, //分组索引
            activetydata:[], //总数据
            timeshow:false, //结束时间
            src:'', //音乐路径
            ismusic:true, //音乐是否播放
            urlimg:'', //轮播图
            endtime:'', //结束时间
            music:'', //音乐地址
            enroll:'', //已报名
            sumVote:'', //总投票
            browse:'', //浏览量
            username:'', //搜索用户
            nomore:false, //暂无更多
            list:[], //上拉列表数据
            start:1, //页码
            commit:8 //条数
        }
    },
    onReady (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
        // this.audioCtx.setSrc(this.music)
        this.audioCtx.play()
    },
    created() {
        this.countdown();//调用倒计时
        this.$fly.post(fly.getindex,{activityId:1})
		.then((res)=>{
            // console.log(res.data.data.hdActivity);
			res.data.data.coverList.map((item)=>{
                return this.urlimg=item.url
            })
            let {end,music,enroll,sumVote,browse}=res.data.data.hdActivity
            this.endtime=end
            this.music=music
            this.enroll=enroll
            this.sumVote=sumVote
            this.browse=browse
        })
        this.$fly.post(fly.getplayer,{
            activityId:1,
            groupId:'',
            name:''
        })
        .then((res)=>{
            // console.log(res.data);
            let num=this.array[1]
            this.activetydata=res.data.rows
            // this.listnum=this.activetydata.filter((item)=>item.groupName==num)
            this.listnum=this.activetydata.slice(0,this.start*this.commit)
            // console.log(this.listnum);
            this.list=this.listnum
        })
    },
    // 下拉刷新页面数据
    onPullDownRefresh() {
        this.$fly.post(fly.getindex,{activityId:1})
		.then((res)=>{
            let {end,music,enroll,sumVote,browse}=res.data.data.hdActivity
            this.endtime=end
            this.music=music
            this.enroll=enroll
            this.sumVote=sumVote
            this.browse=browse
        })
        setTimeout(() => {
            wx.stopPullDownRefresh();            
        }, 1500);
    },
    // 上拉加载更多
    onReachBottom () {
        // console.log('触底了')
        if(!this.nomore){
            this.loadMore();
        }
    },
    methods: {
        //选择分组
        bindPickerChange(e){
            // console.log(e)
            this.index = e.mp.detail.value
            let num=this.array[this.index]
            this.$fly.post(fly.getplayer,{activityId:1})
            .then((res)=>{
                // console.log(res.data.rows);
                this.activetydata=res.data.rows
                this.listnum=this.activetydata.filter((item)=>item.groupName==num)
                // console.log(this.listnum);
                this.list=this.listnum
                // console.log(this.list);
                if(this.list.length==this.listnum.length){
                    this.nomore=true
                }
            })
        },
        //加载更多
        loadMore(){
            let that=this
            this.start++;
            wx.showLoading({
                title: '加载中',
            })
            setTimeout(function () {
                if(that.index==0){
                    wx.hideLoading()
                    that.list=that.activetydata.slice(0,that.start*that.commit)
                    // console.log(that.list);
                }
            }, 1000)
            if(this.list.length==this.activetydata.length){
                wx.hideLoading()
                that.nomore=true;
            }
        },
        //搜索
        dosearch(username){
            if(username!=''){
                this.list=this.list.filter((item)=>item.name==this.username)
                this.nomore=true
            }else{
                return  false
            }
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
        //音乐
        domusic(){
            this.ismusic=!this.ismusic
            if(this.ismusic){
                this.audioPlay()
            }else{
                this.audioPause()
            }
        },
        //开始音乐
        audioPlay () {
            this.audioCtx.play()
        },
        //暂停音乐
        audioPause () {
            this.audioCtx.pause()
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
                this.timeshow=true
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
        position: relative;
    }
    .music{
        width: 40px;
        height: 40px;
        position: absolute;
        right: 10px;
        top: 20px;
    }
    @keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    .music .start{
        -webkit-transform: rotate(360deg);
        animation: rotation 3s linear infinite;
        -moz-animation: rotation 3s linear infinite;
        -webkit-animation: rotation 3s linear infinite;
        -o-animation: rotation 3s linear infinite;
    }
    .music img{
        width: 100%;
        border-radius: 50%;
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
        /* margin-top: 20px; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .detail>div{
        width: 48%;
        height: 350px;
        background: white;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .detail>div .image{
        flex: 7;
    }
    .detail>div .image img{
        width: 100%;
    }
    .detail>div .bottom{
        flex: 3;
        padding: 10px;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .detail>div .num{
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        color: white;
        background: rgba(0, 0, 0, .5);
        padding: 5px;
        box-sizing: border-box;
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