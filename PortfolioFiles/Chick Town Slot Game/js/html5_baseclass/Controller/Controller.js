

define(["../Utils/AppUtils"], function(AppUtils){
    var _gameProps;
    var _model;
    var _view;
    var _slotTheme;
    
    var _jackpotValues;
    
    var _params = {};
    
    //CLASS
    Object.defineProperty(_params, "model", {
        set: function(_value) {
            _model = _value;
        },
		get: function() {
            return _model;
		}
    });
    Object.defineProperty(_params, "view", {
        set: function(_value) {
            _view = _value;
        },
		get: function() {
            return _view;
		}
    });
    Object.defineProperty(_params, "slotTheme", {
        set: function(_value) {
            _slotTheme = _value;
        },
		get: function() {
            return _slotTheme;
		}
    });
    
    
    var Controller = Class.extend({
        init: function(){
            this.params = this.getParams();
        },
        getParams: function(){
            return _params;
        },
        setDefaults: function(_modelValue,_viewValue,_gamePropsValue){
            _model = _modelValue;
            _view = _viewValue;
            _gameProps = _gamePropsValue;
            //this.onAuthenticatePlayer();
            
            //this.loadXml();
        },
        loadXMLDoc: function(dname){
            if (window.XMLHttpRequest)
            {
                xhttp=new XMLHttpRequest();
            }
            else
            {
                xhttp=new ActiveXObject("Microsoft.XMLDOM");
            }

            xhttp.open("GET",dname,false);
            xhttp.send();
            return xhttp.responseXML;
        },
        loadXml: function(){
            /*var xmlDoc= this.loadXMLDoc("../start.xml");  
            _model.setWebServiceURL(xmlDoc.getElementsByTagName('conn')[0].innerHTML);
            //this.onAuthenticatePlayer();
            
            _view.loadAssets();*/
            /*
           var Connect = new XMLHttpRequest();
 
          // Define which file to open and
          // send the request.
          Connect.open("GET", "../start.xml", false);
          Connect.setRequestHeader("Content-Type", "text/xml");
          Connect.send(null);

          // Place the response in an XML document.
          var TheDocument = Connect.responseXML;
            //console.log(TheDocument.children[0].getElementsByTagName("conn")[0].firstChild);
            _model.setWebServiceURL(TheDocument.children[0].getElementsByTagName("conn")[0].firstChild.data);
            _view.loadAssets();
            //_model.setWebServiceURL(xmlDoc.getElementsByTagName('conn')[0].innerHTML);*/
            
            $.ajax({				
              type: "GET",				
              url: "../start.xml",				
              dataType: "xml",				
              success: function(xml) { //Upon successful retrieval
                  //console.log('SUCCESS');	
                  $(xml).find('data').each(function(){ //For each item, perform the following	
                      _model.setWebServiceURL($(this).find('conn').text());
                      _view.loadAssets();
                  });
              }
            });
            
        },
        
        startGame: function(){
            _view.startGame();
            _slotTheme = _view.params.slotTheme;
            _slotTheme.params.line = _model.params.line;
            _slotTheme.params.lineBet = _model.params.lineBet;
            _slotTheme.params.coin = _model.params.coin;
            _slotTheme.params.freeCount = _model.params.freeCount;
            _slotTheme.params.freeMultiplier = _model.params.freeMultiplier;
            //_slotTheme.params.jackpot = _model.params.jackpot;
            
            if(_slotTheme.params.betInfo != undefined){
                _slotTheme.params.betInfo.setCredit(_model.params.balance);
            }
            if(_slotTheme.params.controls != undefined){
                _slotTheme.params.controls.setDefaults(_gameProps);
            }
            if(_slotTheme.params.jackpotDisplay != undefined){
                _jackpotValues = _model.params.jackpot;
_slotTheme.params.jackpotDisplay.batch(_jackpotValues[0], _jackpotValues[1], _jackpotValues[2], _jackpotValues[3]);
            }
            _slotTheme.setBetSetting();        
        },
        resultSuccess: function(type){
            switch(type){
                case 'AuthPlayer':
                    _model.getPlayerInfo();
                    break;
                case 'GameInfo':
                    //_view.loadAssets();
                    this.startGame();
                    break;
                case 'SlotBet':
                    this.setSpinResult();
                    break;
                 case 'GetBonusBoxes':
                    _slotTheme.startBonus(_model.params.bonusPrize);
                    break;
                 case 'CollectWinning':
                     if(_model.params.freeCount != undefined){
                        _slotTheme.params.freeCount = _model.params.freeCount;
                    }
                    if(_model.params.freeMultiplier != undefined){
                        _slotTheme.params.freeMultiplier = _model.params.freeMultiplier;
                    }
                    if(_model.params.bonusCredit != undefined){
                        _slotTheme.params.payout = AppUtils.insertComma(AppUtils.toNumeric(_model.params.payout) + AppUtils.toNumeric(_model.params.bonusCredit));
                    }
                    _slotTheme.endBonus();
                    break;
                case 'EOS':
                    if(_slotTheme.params.betInfo != undefined){
                        _slotTheme.params.betInfo.setCredit(_model.params.balance);
                    }
                    break;
            }
        },
        onAuthenticatePlayer: function(){
            _model.AuthenticatePlayer();
        },
        doSpin: function(){
            //set previous spin type. use for detecting correct look of spin button. need to disable spin button on first enter of freespin and last of freespin.
            _slotTheme.params.previousSpinType = _model.params.spinType
            _model.doSpin();
        },
        notifyEOS: function(){
            _model.notifyEOS();
        },
        setBetSetting: function(){
            _model.setBetSetting(_slotTheme.params.line, _slotTheme.params.lineBet, _slotTheme.params.coin);   
        },
        setSpinResult: function(){
			_slotTheme.params.reelSymbols = _model.params.reelSymbols;
			_slotTheme.params.lineWins = _model.params.lineWins;
			_slotTheme.params.bonusWins = _model.params.bonusWins;
			_slotTheme.params.payout = _model.params.payout;
			_slotTheme.params.jackpotWinning = _model.params.jackpotWinning;
			//_slotTheme.params.spinType = _model.params.spinType;
            if (_model.params.freeSpin != undefined)
			{
				_slotTheme.params.freeCount = _model.params.freeSpin.count;
				_slotTheme.params.freeMultiplier = _model.params.freeSpin.multiplier;
				_slotTheme.params.wonFreeSpin = _model.params.freeSpin.won;
			}
			_slotTheme.setSpinResult();
		},
        
        getBonus: function(){
            _model.getBonus();
        },
        getEndBonus: function(_data){
            _model.getEndBonus(_data);
        },
        onError: function(_msg){
            if(_slotTheme != undefined){
                _slotTheme.errorHandler(_msg); 
            }else{
                _view.showCSSError(_msg);   
            }
        },
        onTimeout: function(){
             _model.onTimeout(); 
        },
    });
	
    return Controller;
});