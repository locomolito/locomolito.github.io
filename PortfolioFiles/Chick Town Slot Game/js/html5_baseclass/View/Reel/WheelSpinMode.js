

define([], function() {
    var _params = {};
    Object.defineProperty(_params, "SPIN_INTRO", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 0;
		}
    });
    Object.defineProperty(_params, "ON_SPIN", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 1;
		}
    });
    Object.defineProperty(_params, "BEGIN_STOP", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 2;
		}
    });
    Object.defineProperty(_params, "STOPPING", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 3;
		}
    });
    Object.defineProperty(_params, "BOUNCING", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 4;
		}
    });
    Object.defineProperty(_params, "BOUNCING_END", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 5;
		}
    });
    Object.defineProperty(_params, "FULL_STOP", {
        set: function(_value) {
            //console.log('unable to set value');
        },
		get: function() {
            return 6;
		}
    });
    
   var WheelSpinMode = ({
        params: function(){
            return _params;
        }, 
    });
	
    return WheelSpinMode;
});