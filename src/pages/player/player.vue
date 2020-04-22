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
                    <p>6</p>
                    <p>排名</p>
                </div>
                <div>
                    <p>32</p>
                    <p>票数</p>
                </div>
                <div>
                    <p>0</p>
                    <p>礼物</p>
                </div>
                <div>
                    <p>1064</p>
                    <p>浏览量</p>
                </div>
            </div>
            <!-- 选手描述 -->
            <div class="des">
                <p>选手描述</p>
                <div>
                    这人很懒，什么都没有留下~
                </div>
            </div>
            <!-- 选手照片 -->
            <div class="player-photo">
                <p>选手照片</p>
                <div>
                    <img :src="photo" alt="">
                </div>
            </div>
            <!-- 贡献 -->
            <div class="contri">
                <div class="one">
                    <p>票数贡献榜</p>
                </div>
                <div class="two">
                    <img src="../../../static/images/xin.png" alt="">
                    <p>喜欢我的人，在这里驻留</p>
                </div>
                <div class="three" @click="togift">
                    送ta礼物加票
                </div>
            </div>
            <!-- 投票记录 -->
            <div class="record">
                <p class="title">投票记录</p>
                <div class="detail">
                    <div>
                        <p style="margin-bottom:5px">胡歌</p>
                        <p>2020-04-21 11:11</p>
                    </div>
                    <div class="count">
                        +1
                    </div>
                </div>
                <div class="detail">
                    <div>
                        <p style="margin-bottom:5px">胡歌</p>
                        <p>2020-04-21 11:11</p>
                    </div>
                    <div class="count">
                        +1
                    </div>
                </div>
                <div class="detail">
                    <div>
                        <p style="margin-bottom:5px">胡歌</p>
                        <p>2020-04-21 11:11</p>
                    </div>
                    <div class="count">
                        +1
                    </div>
                </div>
                <div class="detail">
                    <div>
                        <p style="margin-bottom:5px">胡歌</p>
                        <p>2020-04-21 11:11</p>
                    </div>
                    <div class="count">
                        +1
                    </div>
                </div>
            </div>
            <!-- 查看更多 -->
            <div class="more">
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
export default {
    data() {
        return {
            playerdata:[
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
            id:'',
            avatar:'',
            name:'',
            photo:'',
        }
    },
    onLoad(options){
        let list=this.playerdata.filter((item)=>item.id==options.id)
        console.log(list[0].name);
        this.id=list[0].id
        this.avatar=list[0].img
        this.name=list[0].name
        this.photo=list[0].img
    },
    methods: {
        //去首页
        toactivety(){
            let url='../activety-item/main'
            wx.switchTab({url})
        },
        //投票
        dovote(){
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
        height: 40px;
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
        margin-top: 10px;
        padding: 10px;
        padding-bottom: 15px;
        box-sizing: border-box;
    }
    .player-photo div img{
        width: 100%;
    }
    .contri{
        width: 100%;
        margin-top: 15px;
        padding-bottom: 50px;
        background: #F2F4F7;
        overflow: scroll;
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
    .record{
        width: 100%;
        margin-top: 10px;
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