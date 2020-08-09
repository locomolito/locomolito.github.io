

define([], function() {
    
    var _slotTheme;
    var _stage;
    
    var _pickCount;
	var _prizeList;
	var _pickedList;
    
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
    
    Object.defineProperty(_params, "pickCount", {
        set: function(_value) {
            _pickCount = _value;
        },
		get: function() {
            return _pickCount;
		}
    });
    Object.defineProperty(_params, "prizeList", {
        set: function(_value) {
            _prizeList = _value;
        },
		get: function() {
            return _prizeList;
		}
    });
    Object.defineProperty(_params, "pickedList", {
        set: function(_value) {
            _pickedList = _value;
        },
		get: function() {
            return _pickedList;
		}
    });
    
    var Bonus = Class.extend({
        init: function(_prizeListValue, _pickCountValue, _slotThemeValue){
            //console.log('BONUS INITIALIZE');
            this.params = this.getParams();
            _slotTheme = _slotThemeValue;
            _stage = _slotThemeValue.params.stage;
            
            _pickCount = _pickCountValue;
            _prizeList = _prizeListValue;
            
            _pickedList = new Array();
        },
        getParams: function(){
            return _params;
        },
        pick: function(){
			var index = -1;
			var data;
			if (_pickCount > 0 && _prizeList.length > 0) {
				index = Math.floor(Math.random() * (_prizeList.length-1));
				_pickedList.push(_prizeList[index].index);
				data = {type:_prizeList[index].type,value:_prizeList[index].value,index:_prizeList[index].index}
				_prizeList.splice(index, 1);
				_pickCount--;
			}
			return data;
		},
        
        endBonus: function(){
            _slotTheme.params.view.doFeaturesEvents({type:'ON_BONUS_END',value:_pickedList});
		},
    });
	
    return Bonus;
});