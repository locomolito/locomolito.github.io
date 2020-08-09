define(["../../Utils/AppUtils"], function(AppUtils) {
    
    var _slotTheme;
    var _stageBG;
    var _stageCreditTxt;
    var _stageBetTxt;
    var _stageWinTxt;
    var _stageLineLeftTxt;
    var _stageLineRightTxt;
    var _stageMessageTxt;
    
    var _txtCredit;
    var _txtTotalBet;
    var _txtLineBet;
    var _txtTotalWin;
    var _txtMessage;
    var _txtCoin;
    var _txtLinesLeft;
    var _txtLinesRight;
    var _txtLinesLeftOutline;
    var _txtLinesRightOutline;
    
    //img
    var _bg;
    var _layoutManager;
    
    var _params = {};
    
    Object.defineProperty(_params, "slotTheme", {
        set: function(_value) {
            _slotTheme = _value;
        },
		get: function() {
            return _slotTheme;
		}
    });
    Object.defineProperty(_params, "stage", {
        set: function(_value) {
            _stage = _value;
        },
		get: function() {
            return _stage;
		}
    });
    
    Object.defineProperty(_params, "txtCredit", {
        set: function(_value) {
            _txtCredit = _value;
        },
		get: function() {
            return _txtCredit;
		}
    });
    Object.defineProperty(_params, "txtTotalBet", {
        set: function(_value) {
            _txtTotalBet = _value;
        },
		get: function() {
            return _txtTotalBet;
		}
    });
    Object.defineProperty(_params, "txtLineBet", {
        set: function(_value) {
            _txtLineBet = _value;
        },
		get: function() {
            return _txtLineBet;
		}
    });
    Object.defineProperty(_params, "txtTotalWin", {
        set: function(_value) {
            _txtTotalWin = _value;
        },
		get: function() {
            return _txtTotalWin;
		}
    });
    Object.defineProperty(_params, "txtMessage", {
        set: function(_value) {
            _txtMessage = _value;
        },
		get: function() {
            return _txtMessage;
		}
    });
    Object.defineProperty(_params, "txtCoin", {
        set: function(_value) {
            _txtCoin = _value;
        },
		get: function() {
            return _txtCoin;
		}
    });
    
    Object.defineProperty(_params, "txtLinesLeft", {
        set: function(_value) {
            _txtLinesLeft = _value;
        },
		get: function() {
            return _txtLinesLeft;
		}
    });
    Object.defineProperty(_params, "txtLinesRight", {
        set: function(_value) {
            _txtLinesRight = _value;
        },
		get: function() {
            return _txtLinesRight;
		}
    });
    Object.defineProperty(_params, "txtLinesLeftOutline", {
        set: function(_value) {
            _txtLinesLeftOutline = _value;
        },
		get: function() {
            return _txtLinesLeftOutline;
		}
    });
    Object.defineProperty(_params, "txtLinesRightOutline", {
        set: function(_value) {
            _txtLinesRightOutline = _value;
        },
		get: function() {
            return _txtLinesRightOutline;
		}
    });
    
    
     Object.defineProperty(_params, "stageLineLeftTxt", {
        set: function(_value) {
            _stageLineLeftTxt = _value;
        },
		get: function() {
            return _stageLineLeftTxt;
		}
    });
     Object.defineProperty(_params, "stageLineRightTxt", {
        set: function(_value) {
            _stageLineRightTxt = _value;
        },
		get: function() {
            return _stageLineRightTxt;
		}
    });
    Object.defineProperty(_params, "stageMessageTxt", {
        set: function(_value) {
            _stageMessageTxt = _value;
        },
		get: function() {
            return _stageMessageTxt;
		}
    });
    Object.defineProperty(_params, "bg", {
        set: function(_value) {
            _bg = _value;
        },
		get: function() {
            return _bg;
		}
    });
   
   Object.defineProperty(_params, "standardSpriteSheet", {
        set: function(_value) {
            _standardSpriteSheet = _value;
        },
		get: function() {
            return _standardSpriteSheet;
		}
    });
    
    var BetInfo = Class.extend({
        init: function(_slotThemeValue){
            this.params = this.getParams();
            _slotTheme = _slotThemeValue;
            
            //get layout manager from slotTheme. dont create a new one.
            _layoutManager = _slotTheme.params.layoutManager;
            
            ///////////*create a new canvas, but i only need the stage so im just getting the stage*////////////////
            _stageBG = _layoutManager.createStandardCanvas('betInfoBG_Canvas').stage;
            _stageCreditTxt = _layoutManager.createStandardCanvas('txtCredit_Canvas').stage;
            _stageBetTxt = _layoutManager.createStandardCanvas('txtTotalBet_Canvas').stage;
            _stageWinTxt = _layoutManager.createStandardCanvas('txtTotalWin_Canvas').stage;
            //_stageLineLeftTxt = _layoutManager.createStandardCanvas('txtLinesLeft_Canvas').stage;
            //_stageLineRightTxt = _layoutManager.createStandardCanvas('txtLinesRight_Canvas').stage;
            
            //add custom elements here
            _bg = _layoutManager.addStandardSprite('betInfoBG');
            _stageBG.addChild(_bg);
            _stageBG.update();
            
            _txtCredit = new createjs.Text("0.00");
            _txtCredit.name = 'txtCredit';
            _layoutManager.positionStandardLayout(_txtCredit);
            _stageCreditTxt.addChild(_txtCredit);
            _stageCreditTxt.update();
            
            
            _txtTotalBet = new createjs.Text("0.00");
            _txtTotalBet.name = 'txtTotalBet';
            _layoutManager.positionStandardLayout(_txtTotalBet);
            _stageBetTxt.addChild(_txtTotalBet);
            _stageBetTxt.update();
           
            _txtTotalWin = new createjs.Text("0.00");
            _txtTotalWin.name = 'txtTotalWin';
            _layoutManager.positionStandardLayout(_txtTotalWin);
            _stageWinTxt.addChild(_txtTotalWin);
            _stageWinTxt.update();
            
            var txtDelayTimeout = setTimeout(function(){
                _stageBG.update();
                _stageCreditTxt.update();
                _stageBetTxt.update();
                _stageWinTxt.update();
            },1000);
            
            return; 
            
        },
        getParams: function(){
            return _params;
        },
        
       setValues: function(_lineValue, _lineBetValue, _coinValue){
            var _line_bet_amt = _lineBetValue * _coinValue;
			var _total_amt = _line_bet_amt * _lineValue;
			_coin = _coinValue;
			 if (_txtLinesRight)
			{
				_txtLinesRight.text = _lineValue;
			}
            if (_txtLinesRightOutline)
			{
				_txtLinesRightOutline.text = _lineValue;
			}
            if (_txtLinesLeft)
			{
				_txtLinesLeft.text = _lineValue;
			}
            if (_txtLinesLeftOutline)
			{
				_txtLinesLeftOutline.text = _lineValue;
			}
			if (_txtTotalBet)
			{
				_txtTotalBet.text = _total_amt.toFixed(2);
			}
			if (_txtCoin)
			{
				_txtCoin.text = _coinValue.toFixed(2);
			}
			if (_txtLineBet)
			{
				_txtLineBet.text = _line_bet_amt.toFixed(2);
				
			}
           if(_stageCreditTxt != undefined){
                _stageCreditTxt.update();
            }
           if(_stageBetTxt != undefined){
                _stageBetTxt.update();
            }
           if(_stageWinTxt != undefined){
                _stageWinTxt.update();
            }
           if(_stageLineLeftTxt != undefined){
                _stageLineLeftTxt.update();
            }
           if(_stageLineRightTxt != undefined){
                _stageLineRightTxt.update();
            }
           if(_stageMessageTxt != undefined){
                _stageMessageTxt.update();
            }
		},
        setCredit: function(_value){
            _value = AppUtils.toNumeric(_value).toFixed(2);
            if(_txtCredit != undefined){
                _txtCredit.text = AppUtils.insertComma(_value);
            }
            if(_stageCreditTxt != undefined){
                _stageCreditTxt.update();
            }
        },
        setMessage: function(_message)
		{
            if (_txtMessage != undefined)
			{
                _txtMessage.text = _message;
			}
            if(_stageMessageTxt != undefined){
                _stageMessageTxt.update();
            }
		},
        setWonAmount: function(_wonAmount){
            _wonAmount = AppUtils.toNumeric(_wonAmount).toFixed(2);
            if (_txtTotalWin != undefined)
			{
				_txtTotalWin.text = AppUtils.insertComma(_wonAmount);
			}
            if(_stageWinTxt != undefined){
                _stageWinTxt.update();
            }
		},
    });
	
    return BetInfo;
});