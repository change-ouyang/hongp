<template>
    <div>
        <div class="body">
            <!-- 头像 -->
            <div class="user-photo">
                <img :src="photo" alt="">
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
            <!-- 票数 -->
            <div class="ticket">
                <p>送礼物加票数</p>
            </div>
            <!-- 礼物 -->
            <div class="gifts">
                <div class="'box" v-for="(item, index) in giftdata" :key="index" @click="dobox(item.id)">
                    <div :class="{boxbg:index==nowindex}">
                        <p class="name">{{item.name}}</p>
                        <img class="image" :src="item.img" alt="">
                    </div>
                    <div class="count">
                        +{{item.count}}票
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
export default {
    data() {
        return {
            giftdata:[
                {"id":"0","name":"棒棒糖","count":"20","price":"0.01","img":"/static/images/gift/g1.png"},
                {"id":"1","name":"花花","count":"65","price":"18","img":"/static/images/gift/g2.png"},
                {"id":"2","name":"么么哒","count":"99","price":"25","img":"/static/images/gift/g3.png"},
                {"id":"3","name":"666","count":"240","price":"50","img":"/static/images/gift/g4.png"},
                {"id":"4","name":"告白气球","count":"550","price":"98","img":"/static/images/gift/g5.png"},
                {"id":"5","name":"小心心","count":"1000","price":"168","img":"/static/images/gift/g6.png"},
                {"id":"6","name":"神灯","count":"2188","price":"258","img":"/static/images/gift/g7.png"},
                {"id":"7","name":"皇冠","count":"2888","price":"328","img":"/static/images/gift/g8.png"},
                {"id":"8","name":"宝箱","count":"6888","price":"648","img":"/static/images/gift/g9.png"},
            ],
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
            num:'1',
            price:'0.01',
            count:'20',
            show:false,
            typeid:'', //判断当前id
            nowindex:0,
            name:'',
            photo:''
        }
    },
    onLoad(options){
        let list=this.playerdata.filter((item)=>item.id==options.id)
        this.name=list[0].name
        this.photo=list[0].img
    },
    methods: {
        // 点击当前块
        dobox(id){
            let list=this.giftdata.filter((item)=>{
                return item.id==id
            })
            this.price=list[0].price
            this.count=list[0].count
            this.num=1
            this.typeid=id //判断当前id
            this.nowindex=id //点击当前的id
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
            this.count=this.num * list[0].count
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
            this.count=this.num * list[0].count
            this.price=this.num * list[0].price
        },
        // 点击提交
        dosend(){
            wx.showModal({
                title: '提示',
                content: '是否支付',
                success (res) {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '支付中',
                        })
                        setTimeout(function () {
                            wx.hideLoading()
                        }, 2500)
                        setTimeout(function () {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 2000
                            })
                        }, 2500)
                    }else if(res.cancel) {
                        wx.showLoading({
                            title: '取消中',
                        })
                        setTimeout(function () {
                            wx.hideLoading()
                        }, 2500)
                        setTimeout(function () {
                            wx.showToast({
                                title: '取消支付',
                                icon: 'none',
                                duration: 2000
                            })
                        }, 2500)
                        
                    }
                }
            })
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