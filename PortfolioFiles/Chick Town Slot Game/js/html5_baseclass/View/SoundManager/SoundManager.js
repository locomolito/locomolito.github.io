

define([], function() {
    var _params = {};
    
    var _volumeMusic = 1;
    var _volumeSfx = 1;
    var _lastMusicVolume = 1;
    var _lastEffectVolume = 1;
    
    Object.defineProperty(_params, "volumeMusic", {
        set: function(_value) {
            _volumeMusic = _value;
        },
		get: function() {
            return _volumeMusic;
		}
    });
    Object.defineProperty(_params, "volumeSfx", {
        set: function(_value) {
            _volumeSfx = _value;
        },
		get: function() {
            return _volumeSfx;
		}
    });
    Object.defineProperty(_params, "lastMusicVolume", {
        set: function(_value) {
            _lastMusicVolume = _value;
        },
		get: function() {
            return _lastMusicVolume;
		}
    });
    Object.defineProperty(_params, "lastEffectVolume", {
        set: function(_value) {
            _lastEffectVolume = _value;
        },
		get: function() {
            return _lastEffectVolume;
		}
    });
    
    
    
    var SoundManager = Class.extend({
        init: function(_slotThemeValue){
            this.params = this.getParams();
        },
        getParams: function(){
            return _params;
        }, 
        setVolume: function(volume,type){
			switch(type) {
				case "MUSIC":
					_volumeMusic = volume;
					_lastMusicVolume = volume;
					break;
				case "EFFECTS":
					_volumeSfx = volume;
					_lastEffectVolume = volume;
					break;
            }
			this.setChannelVolume();
		},
        mute: function(){
			_volumeMusic = 0;
			_volumeSfx = 0;
			this.setChannelVolume();
		},
        unMute: function(){
			_volumeMusic = _lastMusicVolume;
			_volumeSfx = _lastMusicVolume;
			this.setChannelVolume();
		},
        setChannelVolume: function() {
			//adjust all your volumes here
            //console.log('setChannelVolume must be overriden in subClass');  
        },      
    });
    return SoundManager;
});