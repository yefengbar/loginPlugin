# loginPlugin
login plugin of company
# 可配置参数： 
> autokk: 0 //是否自动分配kk号0：不分配，1分配  
> qqLogId:11715896 //qq登录id  
> qqlogType: qqlogin //qq登录请求地址  
> qqlogCallback:encodeURIComponent\(location.href\) //qq登录回调地址  
> logAction: 0, //0刷新，1跳转，2回调  
> logedCallUrl: location.href //登录成功后跳转地址  
> regAction: 0 //0刷新，1跳转，2回调（显示保存面板）  
> saveInfo: /api/savetxt.php //保存账号请求地址  
> refer: 3841 //注册的参数 

# 使用方法： 
* 1·自定义配置登陆： 
> `Union.config\(\{logAction:2,regAction:2\}\)`
* 2·打开登陆框： 
> `Union.open\(\)`

# 新增加配置： 
> showSave:1 //是否显示保存账号面板

# 新增加回调方法： 
> Union.open\(callback\) //回调动作函数