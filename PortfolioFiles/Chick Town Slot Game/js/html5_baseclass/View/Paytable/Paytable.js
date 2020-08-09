


define([], function() {
    
    var _slotTheme;
    var _stage;
    
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
    Object.defineProperty(_params, "stage", {
        set: function(_value) {
            _stage = _value;
        },
		get: function() {
            return _stage;
		}
    });
    
    var Paytable = Class.extend({
        init: function(_slotThemeValue){
            _slotTheme = _slotThemeValue;
            _stage = _slotThemeValue.params.stage;
            this.params = this.getParams();
        },
        getParams: function(){
            return _params;
        },
        closePaytable: function(){
            _slotTheme.closePaytable();
        },
    });
	
    return Paytable;
});