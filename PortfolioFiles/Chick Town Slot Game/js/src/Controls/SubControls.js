

define(["../../html5_baseclass/View/Controls/Controls"], function(Controls) {
    
    var soundManager;
    
    var SubControls = Controls.extend({
        init: function(_slotTheme){
            this._super(_slotTheme);
            
            soundManager = _slotTheme.params.soundManager;
            
        },
        
        playBtnSounds: function(_btn){ 
            soundManager.playSound('BTN');
        },
        
    });
	
    return SubControls;
});