<template>
    <div>        
        <div id="gift-box">
            <ul>
                <li :class="[index==0?'active':'']">电脑</li>
                <li :class="[index==1?'active':'']">音响</li>
                <li :class="[index==2?'active':'']">背包</li>
                <li :class="[index==3?'active':'']">平板</li>
                <a :class="{cur:curshow}" @click="startRoll(1)">开始</a>
                <li :class="[index==4?'active':'']">笔记本</li>
                <li :class="[index==5?'active':'']">台灯</li>
                <li :class="[index==6?'active':'']">电动牙刷</li>
                <li :class="[index==7?'active':'']">行李箱</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            index: -1,// 当前转动到哪个位置，起点位置
            count: 8,//总共有多少位置
            timer: 0,//每次转动定时器
            speed: 200,//初始转动速度
            times: 0,// 转动次数
            cycle: 3,//转动基数：至少需要转动多少次再进入抽奖环节
            prize: '',//中奖位置
            start:''
        }
    },
    methods:{
        // 开始抽奖
        startRoll(id){
            this.times+=1//转动次数
            this.prize=Math.floor(Math.random()*10);
            this.oneRoll()// 转动过程调用的每一次转动方法，这里是第一次调用初始化
            this.usePrize()
            return false;
        },
        // 转动的方法
        oneRoll(){
            let index = this.index //当前转动到的位置
            const count = 8 //总共的位置
            index += 1
            if(index >count - 1){
                index = 0
            }
            this.index = index
        },
        //判断是否转到中奖位置，如果是，停止，如果不是，继续转动
        usePrize(){
            // 判断是否达到转动次数要求且转到的位置是中奖位置
            if(this.times > this.cycle + 10 && this.prize === this.index) {
                clearTimeout(this.timer) //清除定时器，转动停止
                this.times = 0
                this.giftopen = true //显示开奖界面
                setTimeout(() => {
                    wx.showToast({
                        title: '恭喜您中奖了',
                        icon: 'none',
                        duration: 2000
                    })
                }, 2000);
                setTimeout(function () {
                    let url='../../index/main'
                    wx.reLaunch({ url })
                }, 1000)
            }else {
                //否则继续转动
                if(this.times<this.cycle){
                    this.speed-=5
                }
                this.timer = setTimeout(this.startRoll, this.speed)
            }
        }
    }
}
</script>
<style>
    *{margin:0;padding:0;}
#gift-box{width:310px;height:310px;margin:30px auto;}
ul{width:310px;height:310px;list-style:none;}
ul li,ul a{width:100px;height:100px;border:1px solid #565656;float:left;text-align:center;line-height:100px;}
ul a:hover{cursor:pointer;color:orange;font-size:18px;}
ul .active{background:red;color:#fff;}
.cur {background-color: #ccc;}
</style>