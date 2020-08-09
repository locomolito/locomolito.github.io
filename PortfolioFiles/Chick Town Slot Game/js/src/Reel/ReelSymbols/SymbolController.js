
//redundant functions on AnimatedSymbols Class. Use this as extension code. easier to edit.
define(["../../../html5_baseclass/View/Reel/AnimatedSymbol"], function(AnimatedSymbol) {
    var layoutManager;
    
    var SymbolController = AnimatedSymbol.extend({
        init: function(_slotTheme,_params){
            this._super();
            
            var assets = _slotTheme.getAssetManager();
            layoutManager = _slotTheme.params.layoutManager;
            //assets are 1 sprite and 1 image for border. used container to hold both asset.
            this.container = new createjs.Container();
            
            //getSpriteSheetANIMATION - get an animation from json based on string pushed. 1st param = json id, 2nd param img id, 3rd param keyword to look for in json.
            
            
            
            if(_params.json=='MainElementsJSON'){
                this.animation = new createjs.Sprite(assets.getSpriteSheetANIMATION("SymbolAnimationsJSON","SymbolAnimations","starParticle"));
                this.animation.framerate = 15;
                this.animation.loop=false;
                this.container.addChild(this.animation);
            }else{
                this.animation = new createjs.Sprite(assets.getSpriteSheetANIMATION(_params.json,_params.img,_params.prefix));
                this.animation.framerate = 10;
                this.container.addChild(this.animation);
            }
            this.star = new createjs.Sprite(assets.getSpriteSheetJSON('MainElementsJSON','MainElements'));
            this.star.gotoAndStop('coinStar');
            this.jsonName = _params.json;
        },
         
        //play animation 1st parameter where to play (can be stage or container), 2nd parameter x coordinate, 3rd parameter y coordinate
        playAnimation: function(_playArea,_x,_y){
            this.playArea = _playArea;
            this.container.x = _x;
            this.container.y = _y;
            this.playArea.addChild(this.container);
            this.animation.visible=true;
            this.animation.play();
            
            if(this.jsonName =='MainElementsJSON') {
                this.animation.on("animationend", function(){this.animation.stop();
                                                        this.animation.visible=false;
                                                        }, this);   
            }
        },
        tick: function(_stars, _holder){
            for(var j=0; j<_stars.length; j++){
                var star =_stars[j];
                star.x+=star.xVel;
                star.y+=star.yVel;
                star.alpha -= 0.06; 
                if(star.scaleX<=star.maxScale){
                    star.scaleX+= 0.06;
                    star.scaleY=star.scaleX;
                } 
                if(star.alpha<=0){
                    _stars.splice(j, 1); 
                    _holder.removeChild(star);
                }
            }
        },
        stopAnimation: function(){
            this.resetAnimation();
        },
        resetAnimation: function(){
            this.playArea.removeChild(this.container);
            this.animation.stop();
            this.animation.gotoAndStop(0);
        },
    });
	
    return SymbolController;
});