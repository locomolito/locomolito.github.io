define([], function() {
    var container, stackContainer, stackBG, introBG, introMask;
    
    var bigMask;
    var smallMask;
    var _this;
    var layoutManager;
    
    var AnimatedStack = Class.extend({
        init: function(_slotTheme, _container){
            container = _container;
            layoutManager = _slotTheme.params.layoutManager;
            _this=this;
            this.contentStage =container.parent;
            stackContainer = new createjs.Container();
            introContainer = new createjs.Container();
            
            container.addChild(introContainer);
            container.addChild(stackContainer);
            
            var stackSheet = new createjs.Sprite(_slotTheme.getAssetManager().getSpriteSheetJSON('MainElementsJSON','MainElements'));
            
            stackBG = stackSheet.clone();
            stackBG.gotoAndStop('stackedBG');
             
            
            this.lady = stackSheet.clone();
            this.lady.gotoAndStop('lady');
           
            this.star = stackSheet.clone();
            this.star.gotoAndStop('wildGoldStar');
            
            introBG = stackSheet.clone();
            introBG.gotoAndStop('introBG');
            
            
            bigMask = new createjs.Shape();
            layoutManager.createShape("stackMask3", bigMask);
            smallMask = new createjs.Shape();
            layoutManager.createShape("stackMask2", smallMask);             
        }, 
        
        animate3Stacks: function(_x, _y){
            stackContainer.addChild(stackBG);
            stackContainer.addChild(this.lady);
            introContainer.addChild(introBG);
            introContainer.addChild(this.star);
            
            introMask=bigMask.clone();
            
            
            introContainer.x=_x;
            introContainer.y=_y;
            
            this.lady.scaleX=this.lady.scaleY=1;
            stackBG.scaleX=stackBG.scaleY=1;
            
            layoutManager.setPosition("lady3", this.lady);
            layoutManager.setPosition("stackBG3", stackBG);
            bigMask.x=_x +layoutManager.getValue("maskXOffset");
            bigMask.y=_y;
            bigMask.regX=layoutManager.getValue("maskXOffset");
            bigMask.scaleX=0;
            
            stackContainer.mask = bigMask; //commented for testing
            stackContainer.x=_x;
            stackContainer.y=_y;
            
            
            introMask.y=-layoutManager.getValue("introMask3Stack"); //intro elements
            layoutManager.setPosition("star3", this.star);
            layoutManager.setPosition("introBG3", introBG);
                
            introBG.mask=introMask;
            
            this.stack3Intro(_x,_y);
            createjs.Ticker.addEventListener("tick", this.contentStage);
        },
        
        stack3Intro: function(_x,_y){
            var starTo = layoutManager.getValue("starTo3Stack");
            var introMaskTo = layoutManager.getValue("introMaskTo3Stack");
            var ladyTo = layoutManager.getValue("ladyTo3Stack");
            
            
            createjs.Tween.get(this.star, {override:true}).to({y:starTo}, 500).call(this.hideStar, [this.star], this);
            createjs.Tween.get(introMask).to({y:-introMaskTo}, 400);
            
            createjs.Tween.get(bigMask).wait(500).to({scaleX:1}, 400);
            createjs.Tween.get(this.lady).wait(900).to({x:-ladyTo}, 1000, createjs.Ease.backOut);
            
            var loopFunc = this.stack3Loop;
            var localLady = this.lady;
            
            setTimeout(function (){
                loopFunc(localLady); }, 2000);  
        },
        
        stack3Loop:function(_lady){
            var ladyLoop = layoutManager.getValue("ladyLoop3Stack");
            var ladyLoop2 = layoutManager.getValue("ladyLoop3Stack2");
            
            createjs.Tween.removeTweens(_lady);
            createjs.Tween.get(_lady,{loop:true}).to({x:-ladyLoop}, 1000).to({x:-ladyLoop2}, 1000);
        },
         
        hideStar: function(){
            createjs.Tween.removeTweens(this.star);
            createjs.Tween.get(this.star).to({alpha:0}, 200); 
        },
        animate2Stacks: function(_x, _y){
            stackContainer.addChild(stackBG);
            stackContainer.addChild(this.lady);
            introContainer.addChild(introBG);
            introContainer.addChild(this.star);

            introMask=bigMask.clone();
            
            introContainer.x=_x;
            introContainer.y=_y;
            
            this.lady.scaleX=this.lady.scaleY=0.67;
            stackBG.scaleX=stackBG.scaleY=0.69;
            
            layoutManager.setPosition("lady2", this.lady);
            layoutManager.setPosition("stackBG2", stackBG);

            smallMask.x=_x +layoutManager.getValue("maskXOffset");
            smallMask.y=_y;
            smallMask.regX=layoutManager.getValue("maskXOffset");
            smallMask.scaleX=0;
            
            stackContainer.x=_x;
            stackContainer.y=_y;
            
            stackContainer.mask = smallMask;
            
            introMask.y=-layoutManager.getValue("introMask2Stack");
            introBG.scaleX=introBG.scaleY= 0.61;
            layoutManager.setPosition("introBG2", introBG);
            layoutManager.setPosition("star2", this.star);
            
            this.stack2Intro(_x,_y);
            createjs.Ticker.addEventListener("tick", this.contentStage);
        },
        
        stack2Intro: function(_x,_y){
            var starTo = layoutManager.getValue("starTo2Stack");
            var introMaskTo = layoutManager.getValue("introMaskTo2Stack");
            var ladyTo = layoutManager.getValue("ladyTo2Stack");
            
            createjs.Tween.get(this.star, {override:true}).to({y:starTo}, 300).call(this.hideStar, [this.star], this);
            createjs.Tween.get(introMask).to({y:-introMaskTo}, 400);
            
            createjs.Tween.get(smallMask).wait(500).to({scaleX:1}, 400);
            createjs.Tween.get(this.lady).wait(900).to({x:-ladyTo}, 1000, createjs.Ease.backOut);

            var loopFunc = this.stack2Loop;
            var localLady = this.lady;
            
            setTimeout(function (){
                loopFunc(localLady); }, 2000);
        },
        stack2Loop:function(_lady){
            var ladyLoop = layoutManager.getValue("ladyLoop2Stack");
            var ladyLoop2 = layoutManager.getValue("ladyLoop2Stack2");
            
            createjs.Tween.removeTweens(_lady);
            createjs.Tween.get(_lady,{loop:true}).to({x:-ladyLoop}, 1000).to({x:-ladyLoop2}, 1000);

        },

    });
    
    
    return AnimatedStack;
});