<template>
    <div>
        <div class="body">
            <!-- 头像 -->
            <div class="user-photo">
                <img mode='scaleToFill' :src="avatar" alt="">
                <p style="margin-top:5px">{{name}}</p>
            </div>
            <!-- 数据 -->
            <div class="data">
                <div>
                    <p>{{i}}</p>
                    <p>排名</p>
                </div>
                <div>
                    <p>{{ticket}}</p>
                    <p>票数</p>
                </div>
                <div>
                    <p>{{gift}}</p>
                    <p>礼物</p>
                </div>
                <div>
                    <p>{{browse}}</p>
                    <p>浏览量</p>
                </div>
            </div>
            <!-- 选手描述 -->
            <div class="des">
                <p>选手描述</p>
                <div>
                    <span v-if="describesshow">这人很懒，什么都没有留下~</span>
                    <span v-if="!describesshow">{{describes}}</span>
                </div>
            </div>
            <!-- 选手照片 -->
            <div class="player-photo">
                <p>选手照片</p>
                <div class="image" v-for="(item, index) in photo" :key="index" @click="bigphoto(item.url)">
                    <img mode='widthFix' :src="item.url" alt="">
                </div>
            </div>
            <!-- 贡献 -->
            <div class="contri">
                <div class="one">
                    <p>票数贡献榜</p>
                </div>
                <div class="giftuser">
                    <div v-show="giftshow">
                        <div class="two">
                            <img src="../../../static/images/xin.png" alt="">
                            <p>喜欢我的人，在这里驻留</p>
                        </div>
                        <div class="three" @click="togift">
                            送ta礼物加票
                        </div>
                    </div>
                    <div class="giftlist scrollcolor" v-show="!giftshow" v-for="(item, index) in Giftlist" :key="index">
                        <div>
                            <img :src="item.extend3" alt="">
                        </div>
                        <div>
                            <p>{{item.extend2}}</p>
                        </div>
                        <div>
                            <p>{{item.zps}}票</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 投票记录 -->
            <div class="record">
                <p class="title">投票记录</p>
                <div class="detail" v-for="(item, index) in ticketlist" :key="index">
                    <div>
                        <p style="margin-bottom:5px">{{item.extend2}}</p>
                        <p>{{item.createTime}}</p>
                    </div>
                    <div class="count">
                        +{{item.extend3}}
                    </div>
                </div>
            </div>
            <!-- 查看更多 -->
            <div class="more" @click="domore()">
                <h3>查看跟多</h3>
            </div>
            <!-- footer -->
            <div class="footer">
                <div class="one" @click="toactivety">
                    <img src="../../../static/images/home.png" alt="">
                    <span>首页</span>
                </div>
                <div class="two" @click="dovote">
                    <img src="../../../static/images/toupiao.png" alt="">
                    <span>投票</span>
                </div>
                <div class="one" @click="togift">
                    <img src="../../../static/images/liwu.png" alt="">
                    <span>礼物</span>
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
            Giftlist:[],
            id:'',
            i:'', //排名
            avatar:'', //头像
            name:'', //姓名
            photo:[], //图片
            ticket:'', //票数
            gift:'', //礼物
            browse:'', //浏览量
            giftshow:true , //礼物的显示和隐藏
            describes:'',
            describesshow:false, //描述的显示和隐藏
            ticketdata:[], //投票总数组
            ticketlist:[], //投票小数组
            pageSize:5, //一页的数量
            pageNum:1, //页码
        }
    },
    onLoad(options){
        this.id=options.id
        this.player() //调用所有页面数据
    },
    // 下拉刷新页面数据
    onPullDownRefresh() {
        this.player() //调用所有页面数据
        setTimeout(() => {
            wx.stopPullDownRefresh();            
        }, 1500);
    },
    methods: {
        //页面所有数据
        player(){
            //选手信息
            this.$fly.post(fly.getplayerdetail,{activityId:1,id:this.id})
            .then((res)=>{
                // console.log(res.data.data);
                let {i,ticket,gift,browse,name,coverImg,describes}=res.data.data.player
                this.i=i
                this.avatar=coverImg
                this.name=name
                this.ticket=ticket
                this.gift=gift
                this.browse=browse
                //描述
                this.describes=describes
                // console.log(this.describes);
                if(this.describes==null){
                    this.describesshow=true
                }else{
                    this.describesshow=false
                }
                //图片
                this.photo=res.data.data.playerImg
                // console.log(this.photo);
                //礼物
                this.Giftlist=res.data.data.hdPlayerGiftlist
                // console.log(this.Giftlist);
                if(this.Giftlist.length==0){
                    this.giftshow=true
                }else{
                    this.giftshow=false
                }
            })
            //投票记录
            this.pageNum=1 //初始化页码
            this.$fly.post(fly.getplayerticket,{playerId:this.id,pageSize:'',pageNum:''})
            .then((res)=>{
                // console.log(res.data.rows);
                this.ticketdata=res.data.rows
                this.ticketlist=this.ticketdata.slice(0,5)
            })
        },
        //投票查看更多
        domore(){
            this.pageNum++;
            this.$fly.post(fly.getplayerticket,{playerId:this.id,pageSize:'',pageNum:''})
            .then((res)=>{
                this.ticketdata=res.data.rows
                this.ticketlist=this.ticketdata.slice(0,this.pageSize*this.pageNum)
            })
            if(this.ticketlist.length==this.ticketdata.length){
                wx.showToast({
                    title: '已无更多',
                    icon: 'none',
                    duration: 2000
                })
            }
            console.log(this.pageNum);
        },
        //投票
        dovote(){
            let that=this
            var values=wx.getStorageSync('key')
            var user=wx.getStorageSync('userInfo')
            this.$fly.post(fly.getvote,{
                extend1:values,
                extend2:user.nickName,
                extend3:1,
                playerId:this.id
            })
            .then((res)=>{
                // console.log(res.data);
                if(res.data.success==false){
                    wx.showModal({
                    title: '提示',
                    content: '一个微信号每天只能投3票',
                    success (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                }
            })
            
        },
        //去首页
        toactivety(){
            let url='../activety-item/main'
            wx.switchTab({url})
        },
        //查看图片
        bigphoto(url){
            // console.log(url);
            wx.previewImage({
                current: 'url', // 当前显示图片的http链接
                urls: [url] // 需要预览的图片http链接列表
            })
        },
        //去礼物
        togift(){
            let id=this.id
            console.log(id);
            let url='../gift/main?id='+id
            wx.navigateTo({url})
        },
    },
}
</script>
<style>
    .body{
        background:#FAF8F8;
        padding-bottom: 50px;
    }
    .user-photo{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        background: white;
    }
    .user-photo img{
        width: 90px;
        height: 90px;
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
    .des{
        width: 95%;
        margin: 0 auto;
        margin-top: 15px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: gray;
        background: white;
        box-shadow: 0px 0px 2px gray;
        border-radius: 8px;
    }
    .des p{
        width: 100%;
        text-align: center;
        border-bottom: 1px gray solid;
        padding-bottom: 5px;
    }
    .des div{
        width: 100%;
        height: 50px;
        margin-top: 10px;
    }
    .player-photo{
        width: 95%;
        margin: 0 auto;
        margin-top: 15px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: gray;
        background: white;
        box-shadow: 0px 0px 2px gray;
        border-radius: 8px;
    }
    .player-photo p{
        width: 100%;
        text-align: center;
        border-bottom: 1px gray solid;
        padding-bottom: 5px;
    }
    .player-photo div{
        width: 100%;
        margin-top: 5px;
        padding: 5px;
        padding-bottom: 5px;
        box-sizing: border-box;
    }
    .player-photo .image{
        width: 100%;
    }
    .player-photo .image img{
        width:100%;
    }
    .contri{
        width: 100%;
        margin-top: 15px;
        background: #F2F4F7;
    }
    .contri .one{
        width: 100%;
        background: #9DF848;
        color: gray;
        font-size: 15px;
        padding: 5px;
        box-sizing: border-box;
        text-align: center;
    }
    .contri .two{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .contri .two img{
        width: 110px;
        height: 100px;
    }
    .contri .two p{
        color: gray;
        font-size: 15px;
        padding: 5px;
        box-sizing: border-box;
    }
    .contri .three{
        width: 70%;
        margin: 0 auto;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px;
        background: #31C9B1;
        color: white;
    }
    .giftuser{
        width: 100%;
        height: 240px;
        overflow: scroll;
    }
    .scrollcolor{
        scrollbar-face-color: #3388FF; 
        scrollbar-shadow-color: #3388FF; 
        scrollbar-highlight-color: #3388FF; 
        scrollbar-3dlight-color: #3388FF; 
        scrollbar-darkshadow-color: #3388FF; 
        scrollbar-track-color: #3388FF; 
        scrollbar-arrow-color: #3388FF; 
    }
    .giftlist{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 2px gray;
    }
    .giftlist div:nth-child(1){
        flex: 2;
    }
    .giftlist div:nth-child(1) img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 10px;
    }
    .giftlist div:nth-child(2){
        flex: 6;
        color: gray;
        text-indent: 1.5em;
    }
    .giftlist div:nth-child(3){
        flex: 2;
        color: #31C9B1;
    }
    .record{
        width: 100%;
        background: white;
    }
    .record .title{
        width: 100%;
        background: white;
        padding: 15px;
        box-sizing: border-box;
        text-align: center;
        color: gray;
        border-bottom: 1px #C3C3C3 solid;
    }
    .record .detail{
        width: 100%;
        background: white;
        margin-top: 15px;
        padding: 15px;
        box-sizing: border-box;
        color: gray;
        border-bottom: 1px #C3C3C3 solid;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
    }
    .record .detail .count{
        margin-right: 20px;
        color: #31C9B1;
    }
    .more{
        width: 95%;
        margin: 0 auto;
        background: #31C9B1;
        color: white;
        padding: 8px;
        box-sizing: border-box;
        margin-top: 15px;
        text-align: center;
        border-radius: 8px;
        margin-bottom: 50px;
    }
    .footer{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        background: #9EE786;
        display: flex;
        flex-wrap: wrap;
        position: fixed;
        bottom: 0;
    }
    .footer .one{
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer .one img{
        width: 30px;
        height: 30px;
    }
    .footer .two{
        width: 30%;
        border-left: 2px white solid;
        border-right: 2px white solid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .footer .two img{
        margin-top: -30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>