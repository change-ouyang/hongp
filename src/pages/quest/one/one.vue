<template>
    <div>
        <div class="image">
            <img src="http://whhp.oss-cn-hangzhou.aliyuncs.com/image/head/20190724/412964cfea2249e48e87ea3c13799e24.jpg" alt="">
        </div>
        <div>
            <div class="topic-num">
                <p>当前第{{count}}题/共8题</p>
            </div>
            <div class="topic-h3">
                <h3>{{title}}</h3>
            </div>
            <div class="text" v-if="istextarea">
                <textarea  bindblur="bindTextAreaBlur" auto-height placeholder=" 请提出您宝贵的意见" v-model="istext" />
            </div>
            <div class="menu">
                <radio-group @change="radioChange" >
                    <div class="group" v-for="(item, index) in list" :key="index">
                        <radio :value="item.value">
                            {{item.value}}
                        </radio>
                    </div>
                </radio-group>
            </div>
        </div>
        <div class="start" @click="totwo()">
            下一题
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            grouplist:[
                {
                    type:1,
                    title:'1.你选择学习的课程是？（单选）',
                    list:[
                        {id:1,value:'A.软件工程师',checked:false},
                        {id:2,value:'B. ACCP'},
                        {id:3,value:'C.北美大数据工程师'},
                        {id:4,value:'D. JAVA中级程序员'},
                        {id:5,value:'E.互联网架构师'},
                        {id:6,value:'F. Web前端工程师'},
                        {id:7,value:'G. UI设计师'},
                        {id:8,value:'H. Python工程师'},
                        {id:9,value:'I.云计算工程师'},
                    ]
                },
                {
                    type:2,
                    title:'2.你选择学校最看重哪些方面? (多选)',
                    list:[
                        {id:1,value:'A.教学质量',checked:'false'},
                        {id:2,value:'B.就业保障'},
                        {id:3,value:'C.品牌知名度'},
                        {id:4,value:'D.课程设置'},
                        {id:5,value:'E.口碑美誉度'},
                        {id:6,value:'F.办学规模'},
                        {id:7,value:'G.校园环境'},
                        {id:8,value:'H.住宿条件'},
                        {id:9,value:'I.性价比'},
                        {id:10,value:'Q.其他'},
                    ]
                },
                {
                    type:3,
                    title:'3.你通过哪种渠道找到我们学校的? (单选)',
                    list:[
                        {id:1,value:'A.在读生推荐',checked:'false'},
                        {id:2,value:'B.毕业生推荐'},
                        {id:3,value:'C.老师介绍'},
                        {id:4,value:'D.百度'},
                        {id:5,value:'E.360'},
                        {id:6,value:'F.抖音'},
                        {id:7,value:'G.头条'},
                        {id:8,value:'H.其他网络搜索'},
                        {id:9,value:'l.公交车站广 告牌'},
                        {id:10,value:'J.地铁广告'},
                        {id:11,value:'K.校园宣讲'},
                        {id:12,value:'L.招聘会'},
                        {id:13,value:'M.户外单页'},
                        {id:14,value:'N.其他'},
                    ]
                },
                {
                    type:4,
                    title:'4.你选择我们学校的原因主要是?(多选)',
                    list:[
                        {id:1,value:'A.课程体系优',checked:'false'},
                        {id:2,value:'B.口碑好'},
                        {id:3,value:'C.品牌知名度'},
                        {id:4,value:'C.就业前景好'},
                        {id:5,value:'D.教学质量佳'},
                        {id:6,value:'E.校区规模大'},
                        {id:7,value:'F.性价比高'},
                        {id:8,value:'G.校园环境好'},
                        {id:9,value:'H.试听效果好'},
                        {id:10,value:'1.品牌知名度'},
                        {id:11,value:'J.师资力量'},
                        {id:12,value:'K.课程模式'},
                        {id:13,value:'L.父母决定'},
                        {id:14,value:'M.亲友的决定'},
                        {id:15,value:'N.专业兴趣'},
                        {id:16,value:'Q.其他'},
                    ]
                },
                {
                    type:4,
                    title:'4.你选择我们学校的原因主要是?(多选)',
                    list:[
                        {id:1,value:'A.课程体系优',checked:'false'},
                        {id:2,value:'B.口碑好'},
                        {id:3,value:'C.品牌知名度'},
                        {id:4,value:'C.就业前景好'},
                        {id:5,value:'D.教学质量佳'},
                        {id:6,value:'E.校区规模大'},
                        {id:7,value:'F.性价比高'},
                        {id:8,value:'G.校园环境好'},
                        {id:9,value:'H.试听效果好'},
                        {id:10,value:'1.品牌知名度'},
                        {id:11,value:'J.师资力量'},
                        {id:12,value:'K.课程模式'},
                        {id:13,value:'L.父母决定'},
                        {id:14,value:'M.亲友的决定'},
                        {id:15,value:'N.专业兴趣'},
                        {id:16,value:'Q.其他'},
                    ]
                },
                {
                    type:5,
                    title:'5.希望通过我们的学习获得哪些方面的改变? (必填)(填空题)',
                    list:[]
                },
                {
                    type:6,
                    title:'6.你对咨询接待流程是否满意?(单选题)',
                    list:[
                        {id:1,value:'A.非常满意',checked:'false'},
                        {id:2,value:'B.满意'},
                        {id:3,value:'C.一般'},
                        {id:4,value:'D.不满意(原因必填)'},
                    ]
                },
                {
                    type:7,
                    title:'7.你是应届生/非应届?(单选题)',
                    list:[
                        {id:1,value:'A.应届',checked:'false'},
                        {id:2,value:'B.非应届'},
                    ]
                },
                {
                    type:8,
                    title:'8.你的学历是?(单选题)',
                    list:[
                        {id:1,value:'A.初中',checked:'false'},
                        {id:2,value:'B.中专'},
                        {id:3,value:'C.高中'},
                        {id:4,value:'D.大专'},
                        {id:5,value:'E.本科'},
                        {id:6,value:'F.硕士'},
                        {id:7,value:'G.博士'},
                    ]
                },
            ],
            checked:'', //选中
            count:1, //当前第几页
            title:'1.你选择学习的课程是？（单选）',
            list:[],
            istextarea:false,
            istext:''
        }
    },
    created() {
        if(this.count==1){
            let onelist=this.grouplist.filter((item)=>{
                return item.type==this.count
            })
            onelist.map((item)=>{
                this.title=item.title
                this.list=item.list
            })
        }
    },
    onLoad(options){
        console.log(options);
        if(options.id==8){
            let url='../end/main'
            wx.redirectTo({ url })
        }
    },
    methods: {
        radioChange (e) {
            this.checked=e.mp.detail.value
        },
        totwo(){
            var id=this.count
            if(!this.checked && this.istext==''){
                wx.showToast({
                    title: '请选择一个答案',
                    icon: 'none',
                    duration: 2000
                })
            }else{
                let url='../one/main?id='+id
                wx.redirectTo({ url })
                this.checked=false
                this.count++;
            }
            switch(this.count) {
                case 2:
                    let twolist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=twolist[0].title
                    this.list=twolist[0].list
                    break;
                case 3:
                    let threelist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=threelist[0].title
                    this.list=threelist[0].list
                    break;
                case 4:
                    let fourlist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=fourlist[0].title
                    this.list=fourlist[0].list
                    break;
                case 5:
                    let fivelist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=fivelist[0].title
                    this.list=fivelist[0].list
                    this.istextarea=true
                    break;
                case 6:
                    let sixlist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=sixlist[0].title
                    this.list=sixlist[0].list
                    this.istextarea=false
                    break;
                case 7:
                    let sevenlist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=sevenlist[0].title
                    this.list=sevenlist[0].list
                    this.istextarea=false
                    break;
                case 8:
                    let eightlist=this.grouplist.filter((item)=>{
                        // console.log(item);
                        return item.type==this.count
                    })
                    this.title=eightlist[0].title
                    this.list=eightlist[0].list
                    this.istextarea=false
                    break;
            }
        },
    },
}
</script>
<style>
    .image{
        width: 100%;
        height: 200px;
    }
    .image img{
        width: 100%;
        height: 200px;
    }
    .topic-num{
        font-size: 15px;
        padding: 15px;
        box-sizing: border-box;
    }
    .topic-h3{
        font-size: 17px;
        font-weight: bold;
        padding: 10px;
        box-sizing: border-box;
    }
    .text{
        width: 90%;
        height: 150px;
        margin: 0 auto;
        box-shadow: 0px 0px 5px gray;
        border-radius: 5px;
        margin-top: 10px;
    }
    .menu{
        width: 90%;
        margin: 0 auto;
        padding: 8px;
        box-sizing: border-box;
    }
    .menu .group{
        width: 100%;
        border: 1px solid #D9DADF;
        padding: 10px;
        box-sizing: border-box;
        font-size: 15px;
    }
    .start{
        width: 50%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 20px;
        background: #1AAC19;
        color: white;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 50px;
    }
</style>