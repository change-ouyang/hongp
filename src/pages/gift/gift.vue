<template>
    <div>
        <div class="body">
            <!-- 头像 -->
            <div class="user-photo">
                <img :src="avatar" alt="">
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
            <!-- 票数 -->
            <div class="ticket">
                <p>送礼物加票数</p>
            </div>
            <!-- 礼物 -->
            <div class="gifts">
                <div class="'box" v-for="(item, index) in giftdata" :key="index" @click="dobox(item.id)">
                    <div :class="{boxbg:item.id==nowindex}">
                        <p class="name">{{item.name}}</p>
                        <img class="image" mode="aspectFit" :src="item.icon" alt="">
                    </div>
                    <div class="count">
                        +{{item.ticket}}票
                    </div>
                </div>
            </div>
            <!-- 数量 -->
            <div class="num">
                <div class="price">
                    <span>￥{{price}}</span>
                    <span>+{{count}}票</span>
                </div>
                <div class="btn">
                    <p class="sub" @click="dosub">-</p>
                    <p class="count">{{num}}</p>
                    <p class="add" @click="doadd">+</p>
                </div>
            </div>
            <!-- 送出 -->
            <div class="send" @click="dosend">
                立即送出
            </div>
        </div>
    </div>
</template>
<script>
import fly from '../../api/hongp'
export default {
    data() {
        return {
            giftdata:[],
            playerdata:[],
            num:'0',
            price:'',
            count:'',
            show:false,
            typeid:'', //判断当前id
            nowindex:'',
            id:'',
            i:'', //排名
            avatar:'', //头像
            name:'', //姓名
            ticket:'', //票数
            gift:'', //礼物
            browse:'', //浏览量
        }
    },
    created() {
        this.$fly.post(fly.getgift,{activityId:1,id:1})
        .then((res)=>{
            // console.log(res);
            this.giftdata=res.data.data.hdGift
        })
    },
    onLoad(options){
        this.id=options.id
        this.$fly.post(fly.getplayerdetail,{activityId:1,id:this.id})
        .then((res)=>{
            // console.log(res.data.data);
            let {i,ticket,gift,browse,name,coverImg}=res.data.data.player
            this.i=i
            this.avatar=coverImg
            this.name=name
            this.ticket=ticket
            this.gift=gift
            this.browse=browse
        })
    },
    methods: {
        // 点击当前块
        dobox(id){
            let list=this.giftdata.filter((item)=>{
                return item.id==id
            })
            this.price=list[0].price
            this.count=list[0].ticket
            this.num=1
            this.typeid=id //判断当前数量id
            this.nowindex=id //点击当前选中的id
            // console.log(this.nowindex);
        },
        // 点击--
        dosub(){
            this.num--;
            if(this.num<1){
                wx.showModal({
                    title: '提示',
                    content: '送礼数量不能小于1',
                    success (res) {
                        if (res.confirm) {
                        console.log('用户点击确定')
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
                })
                this.num=1
            }
            let list=this.giftdata.filter((item)=>{
                return item.id==this.typeid
            })
            // console.log(list);
            this.count=this.num * list[0].ticket
            this.price=this.num * list[0].price
        },
        // 点击++
        doadd(){
            this.num++;
            if(this.num>10){
                wx.showModal({
                    title: '提示',
                    content: '送礼数量不能大于10',
                    success (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                this.num=10
            }
            let list=this.giftdata.filter((item)=>{
                return item.id==this.typeid
            })
            // console.log(list);
            this.count=this.num * list[0].ticket
            this.price=this.num * list[0].price
        },
        // 点击提交
        dosend(){
            let that=this;
            let total=that.price*100;
            wx.login({
                success (res) {
                    // console.log(res);
                    that.$fly.post(fly.getpayment,{
                        js_code:res.code,
                        total_fee:total
                    })
                    .then((res)=>{
                        // console.log(res.data);
                        if (res.data.code==0) {
                            //发起微信支付
                            wx.requestPayment({
                                timeStamp: res.data.data.timeStamp,
                                nonceStr: res.data.data.nonceStr,
                                package: res.data.data.package,
                                signType: res.data.data.signType,
                                paySign: res.data.data.paySign,
                                success (response) {
                                    console.log('111');
                                    var values=wx.getStorageSync('key')
                                    var user=wx.getStorageSync('userInfo')
                                    // console.log(values);
                                    // console.log(user);
                                    that.$fly.post(fly.getgiftVote,{
                                        extend1:values,
                                        extend2:user.nickName,
                                        extend3:user.avatarUrl,
                                        playerId:that.id,
                                        giftId:that.nowindex,
                                        quantity:that.num,
                                        amount:that.price,
                                        ticket:that.count,
                                        activityId:1,
                                    })
                                    .then((res)=>{
                                        console.log(res);
                                    })
                                    that.$fly.post(fly.getorder,{
                                        orderId:res.data.data.orderId
                                    })
                                    .then((res)=>{
                                        // this.dosend()
                                        console.log(res);
                                    })
                                },
                                fail (res) {
                                    console.log('222');
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    })
                }
            })
            // wx.showModal({
            //     title: '提示',
            //     content: '是否支付',
            //     success (res) {
            //         if (res.confirm) {
            //             wx.showLoading({
            //                 title: '支付中',
            //             })
            //             setTimeout(function () {
            //                 wx.hideLoading()
            //             }, 2500)
            //             setTimeout(function () {
            //                 wx.showToast({
            //                     title: '支付成功',
            //                     icon: 'success',
            //                     duration: 2000
            //                 })
            //             }, 2500)
            //         }else if(res.cancel) {
            //             wx.showLoading({
            //                 title: '取消中',
            //             })
            //             setTimeout(function () {
            //                 wx.hideLoading()
            //             }, 2500)
            //             setTimeout(function () {
            //                 wx.showToast({
            //                     title: '取消支付',
            //                     icon: 'none',
            //                     duration: 2000
            //                 })
            //             }, 2500)
                        
            //         }
            //     }
            // })
        }
    },
}
</script>
<style>
    .body{
        background:#F7F7F7;
        padding-bottom: 70px;
    }
    .user-photo{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
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
    .ticket{
        width: 95%;
        margin: 0 auto;
        background: white;
        margin-top: 10px;
        margin-bottom: 5px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 15px;
        color: gray;
        text-indent: 0.5em;
    }
    .gifts{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .gifts .boxbg{
        opacity:0.5;
        outline: 1px solid green;
    }
    .gifts .box{
        width: 31%;
        background: white;
        box-shadow: 0px 0px 2px gray;
        margin-bottom: 15px;
    }
    .gifts .box .name{
        font-size: 16px;
        color: gray;
        text-align: center;
    }
    .gifts .box .image{
        width: 100%;
        height: 70px;
    }
    .gifts .box .count{
        width: 100%;
        background: #B3E757;
        border-bottom: 2px gray solid;
        font-size: 16px;
        color: gray;
        text-align: center;
        padding: 3px;
        box-sizing: border-box;
    }
    .num{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid gray;
    }
    .num .price{
        width: 100%;
        color: gray;
    }
    .num .btn{
        display: flex;
        color: gray;
        line-height: 25px;
        text-align: center;
    }
    .num .btn .sub,.add{
        width: 25px;
        height: 25px;
        border: 1px solid gray;
    }
    .num .btn .count{
        width: 55px;
        height: 25px;
        border: 1px solid gray;
    }
    .send{
        width: 100%;
        background: #1ABA0E;
        padding: 12px;
        box-sizing: border-box;
        color: white;
        text-align: center;
        margin-top: 10px;
        position: fixed;
        bottom: 0;
    }
</style>