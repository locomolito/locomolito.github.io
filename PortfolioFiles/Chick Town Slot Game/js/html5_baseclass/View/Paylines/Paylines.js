

define([], function() {
    
    var _slotTheme;
    var _stage;
    
    var _controlsPopUp;
    
    var _paylineContainer;
    
    var _max;
    var _prefix = "payline_"; //fixed standard
    var _max_selected;
    var _current;
    
    var _timer;
    var _this;
    var _params = {};
    
    //CLASS
    Object.defineProperty(_params, "slotTheme", {
        set: function(_value) {
            _slotTheme = _value;
        },
		get: function() {
            return _slotTheme;
		}
    });
    Object.defineProperty(_params, "paylineContainer", {
        set: function(_value) {
            _paylineContainer = _value;
        },
		get: function() {
            return _paylineContainer;
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
    
    var Paylines = Class.extend({
        init: function(_slotThemeValue){
            _slotTheme = _slotThemeValue;
            _max = _slotThemeValue.params.gameProps.maxLine;
            
            _this = this;
            _paylineContainer = new createjs.Container();
            
            this.params = this.getParams();
        },
        getParams: function(){
            return _params;
        },
        hideAll: function(){
            clearInterval(_timer);
            for (var i = 0; i < _max; i++)
			{
                _loc_1 = _paylineContainer.getChildByName(_prefix + String(i + 1));
				_loc_1.visible = false;
				_loc_1.alpha = 1;
			}
            _paylineContainer.visible = false;
            _stage.update();
        },
        
        showLines: function(total){
			if (total == undefined || isNaN(total) == true){
				return;
            }
            var _loc_1;
			for (var i = 0; i < _max; i++)
			{
                _loc_1 = _paylineContainer.getChildByName(_prefix + String(i + 1));
				_loc_1.visible = (i < total);
				_loc_1.alpha = 1;
			}
			_max_selected = total;
			
			_paylineContainer.visible = true;
            //_stage.update();
            
            clearInterval(_timer);
            _timer = setInterval(_this.timerComplete, 3000 );
            
            _stage.update();
		},
        timerComplete: function(){
            _this.hideAll();
            if(_controlsPopUp == undefined){
                _controlsPopUp = _slotTheme.params.controls.params.controlsPopUp.params;
            }
            if(_controlsPopUp.isHidden == true){
                _slotTheme.animateWinnings();    
            }
            _stage.update();
        },  
        animateWinningLine: function(lineNumber){
			//dont show if not actual winning line
            if (lineNumber <= 0 || isNaN(lineNumber))
			{
				return;
			}
			
			//hide all paylines
			_this.hideAll();
			
			//show payline (containers)
			_paylineContainer.visible = true;
			
			//get winning line
			_current = _paylineContainer.getChildByName(_prefix + lineNumber);
			
			//show winning line
			_current.visible = true;
            
            _stage.update();
		},
        
        
    });
	
    return Paylines;
});