



define(["../../Utils/AppUtils"], function(AppUtils) {
    
    var _slotTheme;
    var _stage;
    
    //txt
    var _txtGrand;
    var _txtMajor;
    var _txtMinor;
    var _txtMini;
    
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
    
    Object.defineProperty(_params, "txtGrand", {
        set: function(_value) {
            _txtGrand = _value;
        },
		get: function() {
            return _txtGrand;
		}
    });
    Object.defineProperty(_params, "txtMajor", {
        set: function(_value) {
            _txtMajor = _value;
        },
		get: function() {
            return _txtMajor;
		}
    });
    Object.defineProperty(_params, "txtMinor", {
        set: function(_value) {
            _txtMinor = _value;
        },
		get: function() {
            return _txtMinor;
		}
    });
    Object.defineProperty(_params, "txtMini", {
        set: function(_value) {
            _txtMini = _value;
        },
		get: function() {
            return _txtMini;
		}
    });
    
    //JACKPOT DISPLAY BASE
    var JackpotDisplay = Class.extend({
        init: function(_slotThemeValue){
            this.params = this.getParams();
            _slotTheme =_slotThemeValue; 
            _stage = _slotTheme.params.stage;
        },
        getParams: function(){
            return _params;
        }, 
        batch: function(_grandPrize, _majorPrize, _minorPrize, _miniPrize){
            _txtGrand.text = AppUtils.insertComma(_grandPrize);
			_txtMajor.text = AppUtils.insertComma(_majorPrize);
			_txtMinor.text = AppUtils.insertComma(_minorPrize);
			_txtMini.text = AppUtils.insertComma(_miniPrize);
            
            _txtGrand.stage.update();
            _txtMajor.stage.update();
            _txtMinor.stage.update();
            _txtMini.stage.update();
		}
    });
	
    return JackpotDisplay;
});