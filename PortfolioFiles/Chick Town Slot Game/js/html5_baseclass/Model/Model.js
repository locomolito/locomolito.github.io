

define(["./WebService"], function(WebService) {
    var _webService;
    var _gameid;
    var _uid;
    var _userid;
    var _username;
    var _agentid;
    var _sessionid;
    var _balance;
    var _payout;
    var _maxLine;
    var _maxLineBet;
    var _line;
    var _lineBet;
    var _coin;
    var _coinList;
    var _betAmount;
    var _spinType = "RS";
    var _roundID;
    var _lineWins;
    var _bonusWins;
    var _bonusPrize;
    var _reelSymbols;
    var _freeSpin;
    var _freeCount;
    var _freeMultiplier;
    var _gambleResult;
    var _bonusCredit;
    var _gameProps;
    var _jackpot;
    var _jackpotWinning;
    var _awaitingResponse;
    var _errorMsg;
    
    //customs
    var _messageType;
    var _controller;
    var _dataResult;
    
    //functions
    var _webServiceResult;
    var _processWebResult;
    var _errorResponseHandler;
    var _connectSocket;
    
    //web socket
    var _socket;
    
    var _params = {};
    
    //variables
    Object.defineProperty(_params, "line", {
        set: function(_value) {
            _line = _value;
        },
		get: function() {
            return _line;
		}
    });
    Object.defineProperty(_params, "lineBet", {
        set: function(_value) {
            _lineBet = _value;
        },
		get: function() {
            return _lineBet;
		}
    });
    Object.defineProperty(_params, "coin", {
        set: function(_value) {
            _coin = _value;
        },
		get: function() {
            return _coin;
		}
    });
    Object.defineProperty(_params, "freeCount", {
        set: function(_value) {
            _freeCount = _value;
        },
		get: function() {
            return _freeCount;
		}
    });
    Object.defineProperty(_params, "freeMultiplier", {
        set: function(_value) {
            _freeMultiplier = _value;
        },
		get: function() {
            return _freeMultiplier;
		}
    });
    Object.defineProperty(_params, "bonusCredit", {
        set: function(_value) {
            _bonusCredit = _value;
        },
		get: function() {
            return _bonusCredit;
		}
    });
    
   Object.defineProperty(_params, "balance", {
        set: function(_value) {
            _balance = _value;
        },
		get: function() {
            return _balance;
		}
    });
    Object.defineProperty(_params, "jackpot", {
        set: function(_value) {
            _jackpot = _value;
        },
		get: function() {
            return _jackpot;
		}
    });
    Object.defineProperty(_params, "reelSymbols", {
        set: function(_value) {
            _reelSymbols = _value;
        },
		get: function() {
            return _reelSymbols;
		}
    });
	Object.defineProperty(_params, "lineWins", {
        set: function(_value) {
            _lineWins = _value;
        },
		get: function() {
            return _lineWins;
		}
    });
	Object.defineProperty(_params, "bonusWins", {
        set: function(_value) {
            _bonusWins = _value;
        },
		get: function() {
            return _bonusWins;
		}
    });
	Object.defineProperty(_params, "payout", {
        set: function(_value) {
            _payout = _value;
        },
		get: function() {
            return _payout;
		}
    });
	Object.defineProperty(_params, "jackpotWinning", {
        set: function(_value) {
            _jackpotWinning = _value;
        },
		get: function() {
            return _jackpotWinning;
		}
    });
	Object.defineProperty(_params, "spinType", {
        set: function(_value) {
            _spinType = _value;
        },
		get: function() {
            return _spinType;
		}
    });
	Object.defineProperty(_params, "freeSpin", {
        set: function(_value) {
            _freeSpin = _value;
        },
		get: function() {
            return _freeSpin;
		}
    });
    Object.defineProperty(_params, "bonusPrize", {
        set: function(_value) {
            _bonusPrize = _value;
        },
		get: function() {
            return _bonusPrize;
		}
    });
    Object.defineProperty(_params, "errorMsg", {
        set: function(_value) {
            _errorMsg = _value;
        },
		get: function() {
            return _errorMsg;
		}
    });
    
    
	
    var Model = Class.extend({
        init: function(){
            this.params = this.getParams();
            
            _webServiceResult = this.webServiceResult;
            _errorResponseHandler = this.errorResponseHandler;
            
            _webService = new WebService();
            _webService.setDefaults(_webServiceResult);
            
        },
        getParams: function(){
            return _params;
        }, 
        setWebServiceURL: function(_domain){
            _webService.setDomain(_domain);
        },
        setDefaults: function(_gamePropsValue,_controllerValue){
            _controller = _controllerValue;
            
            _gameid = _gamePropsValue.gameId;
            _uid = _gamePropsValue.UID;
            _maxLine = _gamePropsValue.maxLine;
            _maxLineBet = _gamePropsValue.maxLineBet;
            _coinList = _gamePropsValue.coinList;
            
            _coin = _coinList[0];
            _spinType = "RS";
            _line = _maxLine;
            _lineBet = _maxLineBet;
            _betAmount = _line * _lineBet * _coin;
            _freeCount = 0;
            _freeMultiplier = 0;
        },
        setBetSetting: function(_lineValue, _lineBetValue, _coinValue) {
			_line = _lineValue;
			_lineBet = _lineBetValue;
			_coin = _coinValue;
			_betAmount = _line * _lineBet * _coin;
		},
        webServiceResult: function(_dataResultValue){
            _dataResult = _dataResultValue;
            if(_processWebResult != undefined || _processWebResult != null){
                _processWebResult();
            }
        },
        errorResponseHandler: function(_msg){
            /*//console.log('+++++errorResponseHandler+++++');
            canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.ctx.font = 'italic 40pt Calibri';
            canvas.ctx.fillText('ERROR ON SERVER', 150, 100);
            canvas.flip();*/
            
            _controller.onError(_msg);
        },
        //AUTHENTICATION
        AuthenticatePlayer: function(){
            //console.log('AUTHENTICATE PLAYER:');
            _messageType = 'AuthPlayer';
            _processWebResult = this.AuthenticatePlayerResult;
            _data = 'GameID='+_gameid+'&MessageType='+_messageType+'&UID='+_uid;
            _webService.callPHP(_messageType,_data);
	    },
        
       AuthenticatePlayerResult: function() {
           if (_dataResult.ERRNO == 0) {
                if (_dataResult.PLAYER.PlayerID != undefined) {
                    _userid = _dataResult.PLAYER.PlayerID;
                }
                if (_dataResult.PLAYER.AgentID != undefined) {
                    _agentid = _dataResult.PLAYER.AgentID;
                }
                if (_dataResult.PLAYER.Username != undefined) {
                    _username = _dataResult.PLAYER.Username;
                }
                if (_dataResult.PLAYER.SessionID != undefined) {
                    _sessionid = _dataResult.PLAYER.SessionID;
                }
                if (_dataResult.PLAYER.Balance != undefined) {
                    _balance = _dataResult.PLAYER.Balance;
                }
                _controller.resultSuccess('AuthPlayer');
            } else {
                _errorResponseHandler(_dataResult.ERRMSG);
            }
        },
        
        //GAME INFO
        getPlayerInfo: function(){
            //console.log("Get Player Info");
            _processWebResult = this.getPlayerInfoResult;
            _connectSocket = this.connectSocket;
            _messageType = 'GameInfo';
            data = 'PlayerID='+_userid+'&SessionID='+_sessionid+'&GameID='+_gameid+'&AgentID='+_agentid+'&MessageType='+_messageType;
            _webService.callPHP(_messageType,data);
        },
        
        
        getPlayerInfoResult: function(){
            if (_dataResult.ERRNO == 0) {
                if (_dataResult.FREESPIN != undefined) {
                    var fs = _dataResult.FREESPIN;
                    if (fs.FSCount != undefined) {
                        _freeCount = fs.FSCount;
                    }
                    if (fs.Multiplier != undefined) {
                        _freeMultiplier = fs.Multiplier;
                    }
                    if (fs.CoinValue != undefined) {
                        _coin = fs.CoinValue;
                    }
                    if (fs.LineBet != undefined) {
                        _lineBet = parseInt(fs.LineBet);
                    }
                    if (fs.TotalLines != undefined) {
                        _line = parseInt(fs.TotalLines);
                    }
                    _betAmount = _line * _lineBet * _coin;
                    _spinType = "FS";
                } else {
                    _betAmount = _maxLine * _maxLineBet * _coin;
                }
                if (_dataResult.JACKPOT != undefined) {
                    //_jackpot = _dataResult.JACKPOT;
                    _jackpot = new Array(4);
                    var grandAmount;
                    var majorAmount;
                    var minorAmount;
                    var miniAmount;
                    
                    var jackpotData = _dataResult.JACKPOT;
                   
                    for(i = 0; i<jackpotData.length; i++ ){
                        switch(jackpotData[i].Type){
                            case 'GRAND':
                                _jackpot[0] = jackpotData[i].PotPrize;
                                break;
                            case 'MAJOR':
                                _jackpot[1] = jackpotData[i].PotPrize;
                                break;
                            case 'MINOR':
                                _jackpot[2] = jackpotData[i].PotPrize;
                                break;
                            case 'MINI':
                                _jackpot[3] = jackpotData[i].PotPrize;
                                break;
                        }
                    }
                }
                _controller.resultSuccess('GameInfo');
                
                //connect to socket after gameinfo
                _connectSocket();
                
            }else {
                _errorResponseHandler(_dataResult.ERRMSG);
            }
	   },
        
        
        
        //SPIN
        doSpin: function(){
            _roundID = null;
            _awaitingResponse = true;
            _reelSymbols = new Array();
            _lineWins = new Array();
            _bonusWins = new Array();
            _jackpotWinning = null;
            _freeSpin = null;
            if (_freeCount > 0) -- _freeCount;
            
            _processWebResult = this.getSpinResult;
            _messageType = 'SlotBet';
            data = '&PlayerID='+_userid+'&MessageType='+_messageType+'&AgentID='+_agentid+'&SessionID='+_sessionid+'&GameID='+_gameid+'&PlayType='+_spinType+'&CoinValue='+_coin+'&LineBet='+_lineBet+'&TotalLines='+_line+'&BetAmount='+_betAmount;
            _webService.callPHP(_messageType,data);
	    },
        
        
        getSpinResult: function(){
            if (_dataResult.ERRNO == 0) {
                if (_awaitingResponse == true) {
                    _awaitingResponse = false;
                    if (_dataResult.REELSYMBOLS != undefined) {
                        for (var _r = 0;_r < _dataResult.REELSYMBOLS.length; _r++) { 
                            _reelSymbols.push(_dataResult.REELSYMBOLS[_r]["@attributes"].symbols.split("|"));
                        }
                    }
                    if (_dataResult.WINNINGLINE != undefined) {
                        var lineData;
                        if(_dataResult.WINNINGLINE.length == undefined){
                            //cant detect length if object only contains 1 value.
                            lineData = _dataResult.WINNINGLINE["@attributes"];
                            _lineWins.push(lineData);
                            if(lineData.type == "M"){
                                _jackpotWinning = lineData;
                            }
                        }else {
                            for (var _l = 0;_l < _dataResult.WINNINGLINE.length; _l++) { 
                                lineData = _dataResult.WINNINGLINE[_l]["@attributes"];
                                _lineWins.push(lineData);
                                if(lineData.type == "M"){
                                    _jackpotWinning = lineData;
                                }
                            }
                        }
                    }

                    if (_dataResult.FREESPIN != undefined) {
                        var _newfs = Number(_dataResult.FREESPIN.FSCount);
                        var _newfm = Number(_dataResult.FREESPIN.Multiplier);
                        var _wonfs = _newfs - _freeCount;
                        var _wonfm = _newfm - _freeMultiplier
                        _freeCount = _newfs;
                        _freeMultiplier = _newfm;
                        _freeSpin = {count:_newfs, multiplier:_newfm, won:{wonfs:_wonfs, wonfm:_wonfm}};
                    } else {
                        _freeCount = 0;
                        _freeMultiplier = 0;
                        _freeSpin = {count:0, multiplier:0};
                    }

                    if (_dataResult.BONUS != undefined) {
                        if(_dataResult.BONUS.length == undefined){
                            //cant detect length if object only contains 1 value.
                            _bonusWins.push(_dataResult.BONUS["@attributes"]);
                        }else {
                            for (var _b = 0;_b < _dataResult.BONUS.length; _b++) { 
                                _bonusWins.push(_dataResult.BONUS[_b]["@attributes"]);
                            }
                        }
                        for(var q = 0; q<_bonusWins.length;q++){
                            //console.log(_bonusWins[q].position + '    ' + _bonusWins[q].type);
                        }
                    }
                    try {
                        _spinType = _dataResult.CREDITINFO.NextPlayType;
                    } catch(e) {}
                    _payout = Number(_dataResult.CREDITINFO.WonAmount);
                    _end_balance = _dataResult.CREDITINFO.AfterCredit;
                    _roundID = _dataResult.CREDITINFO.BetRefID;
                    
                    _controller.resultSuccess('SlotBet');
                }
            }else {
                _errorResponseHandler(_dataResult.ERRMSG);
            }
        },
        
        
        //EOS
        notifyEOS: function(){
            if (_roundID == null || _roundID == undefined) {
                return;
            }
            _processWebResult = this.notifyEOSResult;
            _messageType = 'EOS';
            data = '&PlayerID='+_userid+'&MessageType='+_messageType+'&AgentID='+_agentid+'&SessionID='+_sessionid+'&GameID='+_gameid+'&BetRefID='+_roundID;
            _webService.callPHP(_messageType,data);
	    },
        
        notifyEOSResult: function(){
            _balance = _dataResult.BALANCE;
            _controller.resultSuccess('EOS');
        },
        updateBalance: function(_value){
            _balance = _value;
            _controller.updateBalance();  
        },
        
        //BONUS
        getBonus: function(){
            _processWebResult = this.getBonusResult;
            _messageType = 'GetBonusBoxes';
            data = '&PlayerID='+_userid+'&MessageType='+_messageType+'&AgentID='+_agentid+'&SessionID='+_sessionid+'&GameID='+_gameid+'&RoundID='+_roundID;
            _webService.callPHP(_messageType,data);
	    },
        
        getBonusResult: function(){
            if (_dataResult.ERRNO == 0) {
                _bonusPrize = new Array();
                 if(_dataResult.PRIZELIST.length == undefined){
                    //cant detect length if object only contains 1 value.
                    _bonusPrize.push(_dataResult.PRIZELIST["@attributes"]);
                }else {
                    for (var _pl = 0;_pl < _dataResult.PRIZELIST.length; _pl++) { 
                        _bonusPrize.push(_dataResult.PRIZELIST[_pl]["@attributes"]);
                    }
                }
                _controller.resultSuccess('GetBonusBoxes');
            }else {
                _errorResponseHandler(_dataResult.ERRMSG);
            }
        },
        
        //END BONUS
        getEndBonus: function(_pickedList){
            var picked = '';
            for (var i = 0; i < _pickedList.length; i++) {
                picked += _pickedList[i] + "|";
            }
            picked = picked.substring(0, picked.length - 1);
            
            _processWebResult = this.getEndBonusResult;
            _messageType = 'CollectWinning';
            data = '&PlayerID='+_userid+'&MessageType='+_messageType+'&AgentID='+_agentid+'&SessionID='+_sessionid+'&GameID='+_gameid+'&BetRefID='+_roundID+'&PickedPrizes='+picked;
            _webService.callPHP(_messageType,data);
	    },
        
        getEndBonusResult: function(){
            if (_dataResult.ERRNO == 0) {
                 if(_dataResult.COLLECT != undefined){
                     if (_dataResult.BALANCE != undefined) {
                        _balance = _dataResult.BALANCE;
                    }
                 }
                //console.log('WAAAAAAAAAAAAAAAA');
                //console.log(_dataResult);
                if(_dataResult.COLLECT.length == undefined){
					//cant detect length if object only contains 1 value.
					var _t = String(_dataResult.COLLECT.PrizeType);
					switch(_t){
						case "FS":
							_spinType = "FS";
							_freeCount = _dataResult.COLLECT.PrizeValue;
						break;
						case "FM":
							_freeMultiplier = _dataResult.COLLECT.PrizeValue;
						break;
						case "CB":
						case "FC":
							_bonusCredit = _dataResult.COLLECT.PrizeValue;
							break;
						default:
						break;
					}
				}else {
					for (var _r = 0;_r < _dataResult.COLLECT.length; _r++) { 
						var _t = String(_dataResult.COLLECT[_r].PrizeType);
						switch(_t){
							case "FS":
								_spinType = "FS";
								_freeCount = _dataResult.COLLECT[_r].PrizeValue;
							break;
							case "FM":
								_freeMultiplier = _dataResult.COLLECT[_r].PrizeValue;
							break;
							case "CB":
							case "FC":
								_bonusCredit = _dataResult.COLLECT[_r].PrizeValue;
								break;
							default:
							break;
						}
					}
				}
                //console.log(_spinType + ' ' +_freeCount + ' ' + _freeMultiplier+ ' ' + _bonusCredit);
                _controller.resultSuccess('CollectWinning');
            }else {
                _errorResponseHandler(_dataResult.ERRMSG);
                
            }
        },
        
        onTimeout: function(){
            _awaitingResponse = false;
            _roundID = null;
        },
        
        
        ///// SOCKETS /////
        connectSocket: function(){
            return;
            //console.log('CONNECT SOCKET');
            var sHost = _webService.getDataHost();
            var sPort = _webService.getDataPort();
            //console.log(sHost);
            //console.log(sPort);
            _socket = new WebSocket('ws://'+sHost+':'+sPort);   
            _socket.onopen = this.onSocketOpen;
            _socket.onerror = this.onSocketError;
            _socket.onmessage = this.onSocketMessage;
        },
        onSocketMessage: function(e){
             //console.log('WebSocket Server: ' + e.data);
        },
        onSocketOpen: function(){
            //console.log('++++++SOCKET CONNECTED+++++');
            socket.send("PLAYERID|" + _userid + "|" + _agentid + "|" + _sessionid); 
        },
        onSocketError: function(_err){
             //console.log('WebSocket Error ' + _err);
        },
        
            
    });
	
    return Model;
});