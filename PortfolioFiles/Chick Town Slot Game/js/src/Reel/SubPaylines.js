



define(["../../html5_baseclass/View/Paylines/Paylines"], function(Paylines) {
    var containerTween;
    var slotTheme;
    var layoutManager;
    var SubPaylines = Paylines.extend({
        init: function(_slotTheme){
            this._super(_slotTheme);
            
            stage = _slotTheme.params.stage;
            
            slotTheme = _slotTheme;
            layoutManager = slotTheme.params.layoutManager;
            var paylineSpriteSheets = new createjs.Sprite(_slotTheme.getAssetManager().getSpriteSheetJSON('PaylinesJSON','Paylines'));
            
            //get container from baseclass, if your gonna manipulate it put the variable outside. otherwise its ok here
            var container = this.params.paylineContainer;
            
            stage = layoutManager.createCanvas('payline_Canvas').stage;
            this.params.stage = stage;//base needs this to update
            stage.addChild(container);
            
            
            //set look here
            var newSprite;
            for(var i = 1; i<=_slotTheme.params.gameProps.maxLine; i++){
                newSprite = paylineSpriteSheets.clone();
                newSprite.gotoAndStop('payline' + i);
                newSprite.visible = false;
                newSprite.name = 'payline_'+i//needed by base class
                container.addChild(newSprite);
                
                layoutManager.setPosition("payline", newSprite, i-1);
                /*
                width and height not supprted by EaselJs. use this as a workaround to resize the scaled payline.
                calculated base on TP scale. -- scale = 1 + (1 - Tp scale);
                 
                */
            }
        },
    });
	
    return SubPaylines;
});