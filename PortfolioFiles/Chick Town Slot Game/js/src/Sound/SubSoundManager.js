define(["../../html5_baseclass/View/SoundManager/SoundManager"], function(SoundManager) {
    
    /**
        - based on quick research only 1 file type is currently supported across all browsers. MP3
          http://www.w3schools.com/htmL/html5_audio.asp
          
        - sounds are preloaded in asset manager. push the values in subView.
        - playSound(id,data);
             - id = id pused in subView when loading the file.
             - data = data required. see samples below
                 check here for reference http://www.createjs.com/Docs/SoundJS/classes/Sound.html
             
             
        //PARAMS     
        this.params.volumeMusic - volume needed for BGM sounds
        this.params.volumeSfx - volume needed for Effects sounds
        this.params.lastMusicVolume - last music volume set by controls. Might be needed in the future.
        this.params.lastEffectVolume - last effect volume set by controls. Might be needed in the future.
    **/
    
    var _this;
    var assets;
    
    var soundBGM;
    
    var sfxSpin;
    var sfxSpinStop;
    var standardSounds;
    
    var SubSoundManager = SoundManager.extend({
        init: function(_slotThemeValue){
            this._super(_slotThemeValue);
            _this = this;
            assets = _slotThemeValue.params.assets;
        },
        
        setChannelVolume: function() {
            //adjust all your volumes here, this is called when theres volume manipulation in controls.
            //use _this.params.volumeMusic for music volume;
            //use _this.params.volumeSfx for sfx volume;
            
            if(soundBGM != undefined && soundBGM != null){
                soundBGM.volume = _this.params.volumeMusic;
            }
            if(sfxSpin != undefined && sfxSpin != null){
                sfxSpin.volume = _this.params.volumeSfx;
            }
            
//            _this.params.volumeMusic =0; //added while testing. no sound while testing.
//            _this.params.volumeSfx =0;
        },      
        playBGMSounds: function(_target){
            if(soundBGM != undefined && soundBGM != null){
                soundBGM.stop();
            }
             switch(_target){
                case 'Main':
                     soundBGM = assets.playSound('GQ_BGM',{loop: 999999});
                     soundBGM.volume = _this.params.volumeMusic;
                     break;
             }
        },
        playSpinSound: function(){
            _this.stopSpinSound();
            sfxSpin = assets.playSound('GQ_ReelSpin',{loop: 99999}); 
            sfxSpin.volume = _this.params.volumeSfx;
        },
        stopSpinSound:function(){
            if(sfxSpin != undefined && sfxSpin != null){
                sfxSpin.stop();
            }
        },
        playSpinStop: function(){
            if(sfxSpinStop != undefined && sfxSpinStop != null){
                sfxSpinStop.stop();
            }
            sfxSpinStop = assets.playSound('GQ_SpinStop',{startTime: 50}); 
            sfxSpinStop.volume = _this.params.volumeSfx;  
        },
        playSound: function(_target){
            if(standardSounds != undefined && standardSounds != null){
                standardSounds.stop();
            }
            switch(_target){
                 case 'BTN':
                    standardSounds = assets.playSound('GQ_BtnClick'); 
                    break;
            }
            
            standardSounds.volume = _this.params.volumeSfx;  
        },
    });
	
    return SubSoundManager;
});