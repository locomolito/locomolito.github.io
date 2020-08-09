define([], function() {
    var _this;
    var slotTheme;
    var container,sumContainer;
    
    var fsSumSpriteSheet;
    
    var summaryBG;
    var txtAmount;
    var amountValue;
    var btnContinue;
    var blackBG;
    
    var layoutManager;
    
    
    var FsSummary = Class.extend({
        init: function(_slotTheme,_rootContainer, _amount){
            slotTheme = _slotTheme;
            layoutManager = slotTheme.params.layoutManager;
            _this = this;
            amountValue =_amount;
            container = new createjs.Container();
            this.contentStage = layoutManager.createCanvas('fsSum_Canvas').stage;
            this.contentStage.addChild(container);
            
            blackBG = new createjs.Shape();
            blackBG.graphics.beginFill("#000000").drawRect(0, 0, 1024, 768);
            blackBG.alpha=0;
            container.addChild(blackBG);
            
            sumContainer = new createjs.Container();
            layoutManager.setPosition("fsSumContainer", sumContainer);
            container.addChild(sumContainer);
            
            fsSumSpriteSheet = new createjs.Sprite(_slotTheme.getAssetManager().getSpriteSheetJSON('BonusGameJSON','BonusGame'));
        },
        
        showSummay: function(){
            createjs.Ticker.addEventListener("tick", this.contentStage);
            createjs.Ticker.setFPS(30);
            
            summaryBG =fsSumSpriteSheet.clone();
            summaryBG.gotoAndStop("winSummary");
            sumContainer.addChild(summaryBG);
             
            txtAmount = new createjs.Text(amountValue, "68px Moderna", "#FFFF00");
            txtAmount.textAlign = "center";
            layoutManager.setPosition("fsSumTxtAmount", txtAmount);
            layoutManager.setFont("fsSumAmount", txtAmount);
            txtAmount.textBaseline = "alphabetic";
            txtAmount.shadow = new createjs.Shadow("#000000", 5, 5, 5);
            sumContainer.addChild(txtAmount); 
            
            btnContinue=fsSumSpriteSheet.clone();
            btnContinue.gotoAndStop("continue");
            layoutManager.setPosition("fsSumbtnContinue", btnContinue);
            
            btnContinue.cursor='pointer';
            sumContainer.addChild(btnContinue);
            btnContinue.on("click", _this.animateOut, _this);
             
            _this.animateIn();
        },
        animateIn:function(){
            
            var fsSumY = layoutManager.getValue("fsSumY");
            createjs.Tween.get(blackBG, {override:true}).to({alpha:0.4}, 300);
            createjs.Tween.get(sumContainer, {override:true}).to({y:fsSumY}, 500, createjs.Ease.backOut);
        },
        
        animateOut:function(){
            createjs.Tween.get(blackBG, {override:true}).to({alpha:0}, 300);
            createjs.Tween.get(sumContainer, {override:true}).to({y:-490}, 500, createjs.Ease.backIn).call(_this.closeSummary,null,_this);
        },
        closeSummary: function(){
            container.removeAllChildren()
            container.parent.removeChild(container);
            container = null;
            
            this.contentStage.autoClear = true;
            this.contentStage.removeAllChildren(); 
            createjs.Ticker.removeEventListener("tick", this.contentStage);
            this.contentStage.update(); 
            
            document.getElementById("fsSum_Canvas").style.display = 'none';
            document.getElementById("fsSum_Canvas").remove();

            slotTheme.closeFSSummary();
        },
    });
	
    return FsSummary;
});