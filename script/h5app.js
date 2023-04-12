function Share(title, content, img, linkUrl,config,shaer_confing)
{
	
if(!title)
   {
	  alert('缺失分享标题');
	  return '';
   }
    if(!content)
   {
	   
	 content=  title;
	  //alert('缺失分享内容');
	  //return '';
   }
    if(!img)
   {
	  alert('缺失分享图片');
	  return '';
   }
   
    if(!linkUrl)
   {
	  alert('缺失分享链接');
	  return '';
   }
	
var type='';
var apptype='';
var  dialogBox = api.require('dialogBox');
	//console.log('' )

 //api.alert(JSON.stringify(shaer_confing));
 
 console.log(JSON.stringify(config))
//console.log(JSON.stringify(shaer_confing))

    dialogBox.share(shaer_confing, function(ret) {
		
var index=ret.index;
switch(index)
{
case 0:
  var type='session';
  var apptype='wx';
  break;
case 1:
   var type='timeline';
  
  var apptype='wx';
  
  break;
case 2:

var type='shareAction';
  var apptype='shareAction'
/*  var type='QFriend';
  var apptype='qq';
*/ 
  break; 
  
 

case 3:
 var type='copy';
  var apptype='copy';
  
 /*var type='QZone';
  var apptype='qq';*/
  
  break;  
  
 case 4:
  
  /*var type='qq';
  var apptype='qq';*/

  var type='copy';
  var apptype='copy';
  
  break; 
 
  case 5:
  
  var type='share';
  var apptype='share';
  
  break;  
  
default:
  var type='timeline';
  var apptype='wx';
}



//wxshare(type,title,content,linkUrl,apptype,img);

    var imgname=title+'.jpg';
	
    api.download({
    url: img,
	savePath: 'fs://'+imgname,
    report: true,
    cache: true,
    allowResume: true
   }, function(ret, err) {
    if (ret.state == 1) 
	{
	
		if(1)
		{
			
		wxshare(type,title,content,linkUrl,apptype,img,config);
		}
	}
	});

});
}


function wxshare(type,title,content,linkUrl,apptype,img,config)
{
	
var imageCachePath = "fs://mida/";	
 imageFilter = api.require('imageFilter');
imageFilter.compress({
    img: 'fs://'+title+'.jpg',
    quality: 0.1,
	size:{
	 w: 100,
     h: 100,
	},
	save: {
                    album: false,
                    imgPath: imageCachePath,
                    imgName: title+'.jpg'
                }
	
},function( ret, err ){        
    if( ret.status ){

    if(apptype=='wx')
	{
		
	var wx = api.require('wx');
   wx.shareWebpage({
	  apiKey:config.apiKey,
     scene: type,
    title: title,
    description: content,
    thumb: imageCachePath+title+'.jpg',
    contentUrl:linkUrl
}, function(ret, err) {
	
	
	
	var  dialogBox = api.require('dialogBox');	
		dialogBox.close({
          dialogName: 'share'
          });

});
	}	
	//endwx
	
	 if(apptype=='shareAction')
	{
	
	var sharedModule = api.require('shareAction');
sharedModule.share({
    text: title+' '+linkUrl,
    type: 'text'
});
	
	var  dialogBox = api.require('dialogBox');	
		dialogBox.close({
          dialogName: 'share'
          });
		
	}
	
	 if(apptype=='copy')
	{
	
	var clipBoard = api.require('clipBoard');
clipBoard.set({
    value: title+' '+linkUrl,
}, function(ret, err) {
    if (ret) {
		var  dialogBox = api.require('dialogBox');	
		dialogBox.close({
          dialogName: 'share'
          });
		
       toast('复制成功');
	    //alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});
	
		
	}
	
	 if(apptype=='qq')
	{
	 	if(type=='QZone')
	{
	imgUrl=img;
	}else
	{
		imgUrl= imageCachePath+title+'.jpg';
	} 
	
	
var qq = api.require('qq');
qq.shareNews({
	type:type,
    url: linkUrl,
    title: title,
    description: content,
    imgUrl:imgUrl,
}, function(ret, err) {
    if (ret.status) {
     // FoxUI.toast.show("分享成功");
		toast('分享成功');
    } else {
		toast('分享失败');
     //  api.alert({msg:JSON.stringify(err)});
    }
});
   
	
	}
	
		
    }else{
		
        alert( JSON.stringify( err ) );
    }
});	


}



function SetWxpayInfo(ProductName, Desicript, Price, OuttradeNo, attach,config)
{
 var wxPay = api.require('wxPay');

if(config.apiKey)
{
	
wxPay.config({
    apiKey: config.apiKey,
    mchId: config.mchId,
    partnerKey: config.partnerKey,
	notifyUrl:config.notifyUrl,
}, function(ret, err) {
    if (ret.status) {
		
		wxpay(ProductName, Desicript, Price, OuttradeNo, attach);
		
	}

});	


}else
{
	
wxpay(ProductName, Desicript, Price, OuttradeNo, attach);

}	
}



function wxpay(ProductName, Desicript, Price, OuttradeNo, attach)
{
	

var wxPay = api.require('wxPay');
	 wxPay.pay({
     description : "订单支付" + OuttradeNo,
     totalFee : Price,
	 attach:attach,
     tradeNo : OuttradeNo
    }, function(ret, err) {
	if (ret.status) {
	 toast('支付成功');	
	 } else {
	     toast('支付失败');	
    }
    });

}

function ExitApp()
{
api.confirm({
		    title: '提示',
		    msg: '确定要退出？',
		    buttons:['确定', '取消']
		},function(ret,err){
		    if(ret.buttonIndex == 1){
		        api.closeWidget({
         silent : true
        });
		    }
		});
}

function ClearCache()
{
api.confirm({
		    title: '提示',
		    msg: '确定要清除缓存的图片和文件？',
		    buttons:['确定', '取消']
		},function(ret,err){
		    if(ret.buttonIndex == 1){
		        api.clearCache();
				api.toast({
				    msg: '清理完成',
				    duration:2000,
				    location: 'middle'
				});
		    }
		});

}

function alipay(ProductName, Desicript, Price, OuttradeNo)
{

var aliPay = api.require('aliPay');
aliPay.pay({
subject: ProductName,
    body: Desicript,
    amount: Price,
    tradeNO: OuttradeNo
	}, function(ret, err) {
   if(ret.code=='9000')
   {
	
  toast('支付成功');	

    
   }else
   {
	     toast('支付失败');	

	  // FoxUI.toast.show("支付失败");
   } 	
   
   });

}


function payOrder(config)
{

var aliPay = api.require('aliPay');
aliPay.payOrder({
    orderInfo: config.pid
}, function(ret, err) {
   
  if(ret.code=='9000')
   {
	
  toast('支付成功');	

    
   }else
   {
	     toast('支付失败');	

	  // FoxUI.toast.show("支付失败");
   } 	 
   
});

}


function SetAlipayInfo(ProductName, Desicript, Price, OuttradeNo,config)
{
var aliPay = api.require('aliPay');
console.log(JSON.stringify(config))

if(config.partner)
{
	
aliPay.config({
    partner:config.partner,
	seller:config.seller,
    rsaPriKey:config.rsaPriKey,
    rsaPubKey:config.rsaPubKey,
    notifyURL: config.notifyURL
}, function(ret, err) {
   if(ret.status)
   {
	 alipay(ProductName, Desicript, Price, OuttradeNo)  
   }
   });
   


}else
{

alipay(ProductName, Desicript, Price, OuttradeNo)

}	
	




}

function WXLogin(returnDataType, accessUrl,config)
{

var wx = api.require('wx');
wx.auth({
}, function(ret, err) {
    if (ret.status) {
       
	  wx.getToken({
  			
     code:ret.code
  }, function(ret, err) {
    if (ret.status) {
     //   alert(JSON.stringify(ret));
	 var url=accessUrl+'&token='+ret.accessToken+'&openid='+ret.openId;	
	
	url=url.replace(/account/, "appaccount")
	
	 homes(url);
	 
    } else {
    toast('登录失败');

	 //   FoxUI.toast.show("登录失败");
    }
});	
	   
    } else {
         
		 toast('授权失败');
		 // FoxUI.toast.show("登录失败");
    }
});


}

function QQLogin(accessUrl)
{

var qq = api.require('qq');
qq.login({apiKey:config.apiKey},function(ret, err) {
	
qq.getUserInfo(function(ret2, err) {
    if (ret.status) {
	
	var url=accessUrl+'&token='+ret.accessToken+'&openid='+ret.openId+'&userinfo='+JSON.stringify(ret2.info) ;	
	 url=url.replace(/account/, "appaccount")

homes(url);
	
		
      // api.alert({msg:JSON.stringify(ret)});
    } else {
		toast('登录失败')
     //   api.alert({ msg: err.msg });
    }
});
	
	
 
});

}



	function homes(url)
{

 	var script = 'location.href = \''+url+'\'';
                api.execScript({
				 
				  frameName:'main',
                  script:script
                });
				
				
				
					

}

function toast(msg)
{
api.toast({
			    msg: msg,
			    duration:2000,
			    location: 'middle'
			});
}


function countProperties (obj) {
    
	 var arr = Object.keys(obj);
	
	return arr.length;

	}
	
	
function reloadMe(url)
{
   var script = 'location.href = \''+url+'\'';
   
                api.execScript({
					frameName:'main',
                    script:script
                });

}	

function appback()
{

     var js = 'api.historyBack(function(ret, err){if(!ret.status){api.closeWidget();}});';
            api.execScript({
                frameName: 'main',
                script: js
            });
}


function aoubt()
{

  var script = 'location.reload()';
                api.execScript({
                    frameName:'main',
                    script:script
                });
}
