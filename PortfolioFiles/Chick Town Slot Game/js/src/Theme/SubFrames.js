
define([], function() {
    var _this;
    var slotTheme;
    
    //will contain all elements of Frames.
    var container;
    
    var wheelShadow;
    
    //seperated conatiner for nonExpanding and expanding wheels.
    var wheel0Frames;
    var wheel1Frames;
    var wheel2Frames;
    var wheel3Frames;
    var wheel4Frames;
    
    //big frame container
    var bigFrameContainer;
    
    var anticipationContainer;
    
    var mainSpriteSheets;
     
    var wheelTarget=0;
    var bigFrame;
    var baseX;
    var baseY;
    var wheelXInterval;
    var symbolYInterval;
    
    var activeFrames;
    var layoutManager;
    
    var SubFrames = Class.extend({
        init: function(_slotTheme,_container){
            slotTheme = _slotTheme;
            _this = this;
            this.contentStage = _container;
            layoutManager = slotTheme.params.layoutManager;
            container = new createjs.Container();
            _container.addChild(container);
            
            anticipationContainer = new createjs.Container();
            
            wheel0Frames = new createjs.Container();
            wheel1Frames = new createjs.Container();
            wheel2Frames = new createjs.Container();
            wheel3Frames = new createjs.Container();
            wheel4Frames = new createjs.Container();
            
            wheelShadow = new createjs.Shadow("#FFFFFF", 0, 0, 20);
            
            bigFrameContainer = new createjs.Container();
            
            container.addChild(bigFrameContainer);
            container.addChild(wheel0Frames);
            container.addChild(wheel1Frames);
            container.addChild(wheel2Frames);
            container.addChild(wheel3Frames);
            container.addChild(wheel4Frames);
            container.addChild(anticipationContainer);
            
            layoutManager.setPosition("anticipateContainer", container);

            var assets = _slotTheme.getAssetManager();
            
            mainSpriteSheets = new createjs.Sprite(assets.getSpriteSheetJSON('MainElementsJSON','MainElements'));
            var anticipationFrame = new createjs.Sprite(assets.getSpriteSheetANIMATION('MainElementsJSON','MainElements','anticipateTrio'));
            var anticipateSolo = new createjs.Sprite(assets.getSpriteSheetANIMATION('MainElementsJSON','MainElements','anticipateSolo'));
            anticipateSolo.framerate = 10;
            anticipationFrame.framerate = 10;
            
            var newAnticipationFrame;
            var newFrame;
            
            var reelParams = slotTheme.params.slotReel.params;
            baseX = reelParams.wheelBaseX-layoutManager.getValue("antiBaseOffsetX");
            baseY =  reelParams.wheelBaseY-layoutManager.getValue("antiBaseOffsetY");
            wheelXInterval =  reelParams.wheelXInterval;
			symbolYInterval =  reelParams.symbolYInterval;
            for (var col = 0; col < 5; col++)
			{
				for (var rw = 0; rw < 3; rw++)
				{
                    newFrame = anticipateSolo.clone();
                    newFrame.x = baseX + (wheelXInterval * col) - (col*layoutManager.getValue("anticipateOffsetX"));
                    newFrame.y = baseY + (symbolYInterval * rw) + (rw*layoutManager.getValue("anticipateOffsetY"));
                    newFrame.stop();
                    eval('wheel'+col+'Frames').addChild(newFrame);
                    newFrame.alpha=0; //commented for testing
                } 
            }
            
            bigFrame = anticipationFrame.clone();
            bigFrame.scaleY = 1.008;
            bigFrame.stop();
            bigFrame.alpha=0;
            bigFrameContainer.addChild(bigFrame);
            activeFrames = new Array();
        },
        
        showAnticipationFrame: function(_param){
            createjs.Ticker.addEventListener("tick", this.contentStage);
            createjs.Ticker.setFPS(30);
            
            var pos = _param.positions;
            var col =pos.length-1;
            var row = pos[col];
            
            if(row == -1) return;
            eval('wheel'+col+'Frames').alpha = 1;
            var targetFame = eval('wheel'+col+'Frames').getChildAt(row);
            targetFame.alpha=1;
            targetFame.gotoAndPlay('anticipateSolo');
            activeFrames.push(targetFame);
        },
        
        showAnticipationWheel: function(_wheelIndex){
            console.log("big frame: " + bigFrame);
            createjs.Ticker.addEventListener("tick", this.contentStage);
            bigFrame.visible=true;
            bigFrame.alpha=1;
            bigFrame.play();
            bigFrame.x = baseX + (wheelXInterval * _wheelIndex) - (_wheelIndex*layoutManager.getValue("antiRectOffsetX"));
            bigFrame.y = baseY + layoutManager.getValue("antiRectOffsetY");
        },
        removeAnticipationFrame: function(_param){
            bigFrame.alpha=0;
            createjs.Ticker.removeEventListener("tick", this.contentStage);
            this.contentStage.update();
        },
        removeAllAnticipation: function(){
            var target;
            bigFrame.visible=false;
            bigFrame.alpha=1;
            
            for(var i=0;i<activeFrames.length; i++){
                activeFrames[i].alpha=0;
            
            }
            activeFrames=[];
            
            createjs.Ticker.removeEventListener("tick", this.contentStage);
            this.contentStage.update(); 
        },
    });
	
    return SubFrames;
});