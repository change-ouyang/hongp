//hongp接口
const urls='https://mp.zymcloud.com/hp-hd/'

//openid
const openid=urls+'applet/activity/getAppid'
//index
const getindex=urls+'applet/activity/list'
//热门活动
const getactive=urls+'applet/activity/getActivityList'
//搜索player
const getplayer=urls+'applet/activity/activityPlayer'
//排行榜
const getleader=urls+'applet/activity/playerRank'
//选手详情
const getplayerdetail=urls+'applet/activity/player'
//投票记录
const getplayerticket=urls+'applet/activity/playerTicket'
//我要报名
const getadd=urls+'applet/activity/add'
//报名判断
const getgroupList=urls+'applet/activity/groupList'
//问卷调查
const getquest=urls+'applet/activity/addHdInfogiftlog'
//礼物接口
const getgift=urls+'applet/activity/giftList'
//点击投票
const getvote=urls+'applet/activity/vote'
//支付接口
const getpayment=urls+'applet/pay/wxMiniProgramPay'
//送礼成功接口
const getgiftVote=urls+'applet/activity/giftVote'
//确认订单是否成功
const getorder=urls+'applet/pay/orderConfirm'

export default {
    openid,
    getindex,
    getactive,
    getplayer,
    getleader,
    getplayerdetail,
    getplayerticket,
    getadd,
    getgroupList,
    getquest,
    getgift,
    getvote,
    getpayment,
    getgiftVote,
    getorder
}