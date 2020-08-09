

define(["./Model"], function(Model) {
    var onWebComplete;
    var webDomain;
    var dataHost;
    var dataPort;
    var messageType;
    
    var WebService = Class.extend({
        init: function(){
            //webDomain = 'http://172.17.10.114:8080/webstartup/servlet/WebInit';
            //"<?php echo($domain); ?>";
            /*$.ajax({
                type: "POST",
                url: 'index.php',
                success: function(data)
                {
                   //alert("success! X:" + data);
                    var dummy = data.split('~|~');
                    var obj = JSON.parse(dummy[1]);
                    webDomain = obj.domain;
                    //console.log('webDomainINIT:'+webDomain);
                }
            });*/
        },
        getParameters: function(){
              
        },
        setDefaults: function(_onComplete){
            onWebComplete = _onComplete;
        },
        setDomain: function(_domain){
            webDomain = _domain;
        },
        callPHP: function(_messageType,data,_onComplete) {
            validateData = this.validateData;
            messageType = _messageType;
            $.ajax({
                type      : 'POST', 
                url       : 'Connect.php', 
                data      : data+'&WebDomain='+webDomain, 
                success   : function(_data) {
                                validateData(_data);
                            }
            });
        },
        
        validateData: function(data){
            var respObj = JSON.parse(data);
            
            if(messageType == "EOS"){
                newData = { ERRNO:0, BALANCE:respObj.Balance};
                onWebComplete(newData);
                return;
            }
           
            if (respObj.RespHeader.RespCode == 0) {
                var newData;
                switch(messageType){
                    case "AuthPlayer":
                        newData = {ERRNO:respObj.RespHeader.RespCode, PLAYER:respObj.PlayerInfo, CONNECTION:respObj.ConnSetting};
                        webDomain = respObj.ConnSetting.WConn;
                        dataHost = respObj.ConnSetting.SConn;
                        dataPort = respObj.ConnSetting.SPort;
                    break;
                    case "GameInfo":
                        newData = { ERRNO:respObj.RespHeader.RespCode, JACKPOT:respObj.JackpotInfo.Jackpot, FREESPIN:respObj.FreeSpin };
                    break;
                    case "SlotBet":
                        newData = { ERRNO:respObj.RespHeader.RespCode, CREDITINFO:respObj.SlotBet.GameCredit, REELSYMBOLS:respObj.SlotBet.ReelSymbols.Reel, WINNINGLINE:undefined, FREESPIN:undefined, BONUS:undefined};
                        //, WINNINGLINE:respObj.SlotBet.SpinResult.Line, FREESPIN:respObj.SlotBet.FreeSpin, BONUS:respObj.SlotBet.BonusWin.Bonus 
                        if(respObj.SlotBet.SpinResult != undefined){
                            if(respObj.SlotBet.SpinResult.Line != undefined){
                                newData.WINNINGLINE = respObj.SlotBet.SpinResult.Line;
                            }
                        }
                        if(respObj.SlotBet.FreeSpin != undefined){
                            newData.FREESPIN = respObj.SlotBet.FreeSpin;
                        }
                        if(respObj.SlotBet.BonusWin != undefined){
                            if(respObj.SlotBet.BonusWin.Bonus != undefined){
                                newData.BONUS = respObj.SlotBet.BonusWin.Bonus;
                            }
                        }
                    break;
                    case "GetBonusBoxes":
                        newData = { ERRNO:respObj.RespHeader.RespCode, PRIZELIST:respObj.BonusGame.PrizeList.Prize};
                    break;
                    case "CollectWinning":
                        if(respObj.PlayerInfo != undefined && respObj.PlayerInfo.Balance != undefined){
                            newData = { ERRNO:respObj.RespHeader.RespCode, COLLECT:respObj.CollectWinning, BALANCE:respObj.PlayerInfo.Balance};
                        }else{
                            newData = { ERRNO:respObj.RespHeader.RespCode, COLLECT:respObj.CollectWinning};
                        }
                    break;
                }
            }else {
                //console.log('WEBSERVICE ERROR');
                newData = {ERRNO:respObj.RespHeader.RespCode, ERRMSG:respObj.RespHeader.RespMessage};
            }
            onWebComplete(newData);
        },
        getDataHost: function(){
            return dataHost;
        },
        getDataPort: function(){
            return dataPort;
        },
    });
	
    return WebService;
});