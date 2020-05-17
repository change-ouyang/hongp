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
                <input class="ipt" type="text" placeholder=" 请输入选手名称" placeholder-style="font-size:12px" v-model="name">
            </div>
            <div class="one">
                <h3>手机号</h3>
                <input class="ipt" type="text" placeholder=" 请输入手机号" placeholder-style="font-size:12px" v-model="phone">
            </div>
            <div class="one">
                <h3>分组</h3>
                <picker class="ipt" @change="bindPickerChange" :value="index" :range="array">
                    <div style="text-indent:0.3em">
                        {{array[index]}}
                    </div>
                </picker>
                <span class="btn"></span>
            </div>
            <div class="one">
                <h3>选手描述</h3>
                <textarea class="ipt textarea" bindblur="bindTextAreaBlur" auto-height placeholder=" 请输入选手描述（20字）" placeholder-style="font-size:12px" v-model="detail" />
            </div>
        </div>
        <!-- 图片 -->
        <div class="photo">
            <h3>上传选手图片（1-3张）</h3>
            <div class="photo-box">
                <div class="image" v-for="(item, index) in imagefile" :key="index" @click="dophoto(item.path,index)">
                    <img mode="aspectFill" :src="item.path" alt="">
                </div>
                <div class="down" @click="dodown" v-show="down">
                    +
                </div>
            </div>
        </div>
        <!-- 提交 -->
        <div class="submit" @click="process">
            提交
        </div>
    </div>
</template>
<script>
import fly from '../../api/hongp'
export default {
    data() {
        return {
            array: ['全部','北大青鸟鲁广校区', '北大青鸟光谷校区', '北大青鸟光谷学院', '课工场华中直营总校','课工场徐东校区','课工场光谷校区','课工场郑州兰德校区','北大青鸟徐东校区'],
            index: 0,
            name:'', //姓名
            phone:'', //电话
            detail:'', //描述
            imagefile:[], //图片数组
            //后台传至bs64流
            base64: [],
            down:true, //添加图片
            groupList:[], //校区数组
            userinfo:'',
            newBase64:'',
            groupId:''
        }
    },
    created() {
        this.$fly.post(fly.getgroupList,{
            activityId:1,
        })
        .then((res)=>{
            let that=this
            // console.log(res.data.data);
            this.userinfo=res.data.data.hdActivity.audit
            // console.log(this.userinfo);
            this.groupList=res.data.data.groupList
            this.groupList.map((item)=>{
                // console.log(item.id);
                this.groupId=item.id
            })
        })
    },
    methods: {
        //点击分组
        bindPickerChange(e){
            // console.log(e);
            this.index = e.mp.detail.value
        },
        //提交
        dosubmit(){
            let that=this
            let reg1=/^[\u4E00-\u9FA5]{2,4}$/
            let reg2=/^1[34578]\d{9}$/
            if(this.name==''){ 
                wx.showToast({
                    title: '选手名称不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }else if(!reg1.test(this.name)){
                wx.showToast({
                    title: '请输入2-4位汉字',
                    icon: 'none',
                    duration: 2000
                })
            }else if(this.phone==''){ 
                wx.showToast({
                    title: '手机号不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }else if(!reg2.test(this.phone)){
                wx.showToast({
                    title: '请输入11位数手机号',
                    icon: 'none',
                    duration: 2000
                })
            }else if(this.detail.length>20){
                wx.showToast({
                    title: '描述请勿超于20字',
                    icon: 'none',
                    duration: 2000
                })
            }else if(this.imagefile==''){
                wx.showToast({
                    title: '请上传图片',
                    icon: 'none',
                    duration: 2000
                })
            }else{
                wx.showLoading({
                    title: '提交中',
                })
                setTimeout(function () {
                    wx.hideLoading()
                }, 2500)
                setTimeout(function () {
                    that.process()
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                    })
                }, 2000)
            }  
        },
        //数据处理
        process(){
            let that=this
            let extend1='';
            console.log('111');
            console.log(this.groupId);
            console.log(this.newBase64);
            if(this.userinfo==1){
                extend1=0;
                let newBase64 = JSON.stringify(that.base64);
                this.$fly.post(fly.getadd,{
                    activityId: 1,
                    name: that.name,
                    tel: that.phone,
                    describes: that.detail,
                    pics: newBase64,
                    extend1: extend1,
                    groupId: this.groupId
                })
                .then((res)=>{
                    console.log(res);
                    if(res.data.code==0){
                        wx.showModal({
                            title: '提交成功',
                            content: '本活动报名须进行资料审核，请您耐心等待',
                            success (res) {
                                if (res.confirm) {
                                    let url='../activety-item/main'
                                    wx.switchTab({ url })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })
            }else{
                extend1=1
                console.log('error');
            }
            
        },
        //上传图片
        dodown(){
            let that=this
            wx.chooseImage({
                count: 3,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success (res) {
                    console.log(res);
                    let tempFilePaths = res.tempFilePaths
                    // console.log(tempFilePaths);
                    let tempFiles = res.tempFiles;
                    let base64 = wx
                    .getFileSystemManager()
                    .readFileSync(res.tempFilePaths[0], "base64");
                    that.base64.push({ img: "data:image/png;base64," + base64 });
                    console.log(that.imagefile);
                    that.imagefile=tempFiles
                    if(that.imagefile.length==3){
                        that.down=false
                    }
                }
            })
        },
        //图片处理
        dophoto(path,index){
            var that=this;
            var arr=['预览', '删除']
            wx.showActionSheet({
                itemList: arr,
                success (res) {
                    let id=res.tapIndex
                    if(id==0){
                        console.log('预览');
                        wx.previewImage({
                            current: 'path', // 当前显示图片的http链接
                            urls: [path] // 需要预览的图片http链接列表
                        })
                    }
                    if(id==1){
                        that.imagefile.splice(index,1)
                        that.down=true
                    }
                    
                },
            })
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
        background: #FAFBFD;
        border: 1px solid gray;
        color: gray;
    }
    .menu>div .textarea{
        height: 80px !important;
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
        display: flex;
        flex-direction: column;
    }
    .photo .photo-box{
        display: flex;
    }
    .photo .photo-box>div{
        width: 70px;
        height: 70px;
        margin-top: 15px;
        margin-right: 10px;
        overflow: hidden;
    }
    .photo .photo-box img{
        width: 100%;
        height: 70px;
        overflow: hidden;
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