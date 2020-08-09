define(["../../html5_baseclass/Utils/AppUtils","../Theme/SubParticle"], function(AppUtils,SubParticle)  {
    var _this;
    var slotTheme;
    var jpContainer;
    var rootContainer;
    
    var jpAnimSpriteSheet;
    var bonusSpriteSheet;
    var jpBg, youWon, btnContinue, txtAmount, typeTxt;
    var winType="GRAND";
    var JPData;
    var sumContainer;
    var blackBG;
    var animatedValue;
    var particleContainer;
    
    var layoutManager;
    var SubJackpotAnimation = Class.extend({
        init: function(_slotTheme,_rootContainer,_JPData, _comboLen){    
            slotTheme = _slotTheme;
            layoutManager = slotTheme.params.layoutManager;
            _this = this;
            JPData =_JPData;
            comboLen =_comboLen;
            jpContainer = new createjs.Container();
            this.contentStage = layoutManager.createCanvas('jackpot_Canvas').stage;
            this.contentStage.addChild(jpContainer);
            rootContainer = this.contentStage;
            jpAnimSpriteSheet = new createjs.Sprite(slotTheme.getAssetManager().getSpriteSheetJSON('jackpotAnimJSON','jackpotAnim'));
            bonusSpriteSheet = new createjs.Sprite(slotTheme.getAssetManager().getSpriteSheetJSON('BonusGameJSON','BonusGame'));
            
            _this.setDisplay();
            
            animatedValue=10;
            
            createjs.Ticker.addEventListener("tick", this.contentStage);
            createjs.Ticker.setFPS(30);
        },
        
        setDisplay: function(){
            blackBG = new createjs.Shape();
            blackBG.graphics.beginFill("#000000").drawRect(0, 0, 1024, 768);
            blackBG.alpha=0;
            jpContainer.addChild(blackBG);
            
            particleContainer = new createjs.Container();
            jpContainer.addChild(particleContainer);
            
            var parti = new SubParticle(slotTheme,particleContainer, "coin"); //particle
            
            sumContainer = new createjs.Container();
            layoutManager.setPosition("jpSumContainer", sumContainer);
            jpContainer.addChild(sumContainer);
            
            jpBg = jpAnimSpriteSheet.clone();
            jpBg.gotoAndStop('jpAnimBG');
            sumContainer.addChild(jpBg);
            
            btnContinue = bonusSpriteSheet.clone();
            btnContinue.gotoAndStop('continue');
            layoutManager.setPosition("jpBtnContinue", btnContinue);
            btnContinue.cursor='pointer';
            sumContainer.addChild(btnContinue);
            sumContainer.on("click",this.doTouchHandler);

            txtAmount = new createjs.Text("", "68px Moderna", "#FFFF00");
            txtAmount.textAlign = "center";
            layoutManager.setPosition("jpTxtAmount", txtAmount);
            layoutManager.setFont("jpAnimation", txtAmount);
            txtAmount.textBaseline = "alphabetic";
            txtAmount.text= AppUtils.insertComma(JPData.won_amount);
            txtAmount.shadow = new createjs.Shadow("#000000", 3, 3, 5);
            sumContainer.addChild(txtAmount); 
            
            youWon = jpAnimSpriteSheet.clone();
            youWon.gotoAndStop('youWonTxt');
            layoutManager.setPosition("jpYouWon", youWon);
            jpContainer.addChild(youWon);
            
            var comboLen = JPData.symbol_count.split("|")
            switch(comboLen.length){
                case 5:
                        typeTxt = jpAnimSpriteSheet.clone();
                        typeTxt.gotoAndStop('grandTxt');
                        layoutManager.setPosition("jpGrand", typeTxt);
                    break;
                case 4:
                        typeTxt = jpAnimSpriteSheet.clone();
                        typeTxt.gotoAndStop('majorTxt');
                        layoutManager.setPosition("jpMajor", typeTxt);
                    break;
                case 3:
                        typeTxt = jpAnimSpriteSheet.clone();
                        typeTxt.gotoAndStop('minorTxt');
                        layoutManager.setPosition("jpMinor", typeTxt);
                    break;
                case 2:
                        typeTxt = jpAnimSpriteSheet.clone();
                        typeTxt.gotoAndStop('miniTxt');
                        layoutManager.setPosition("jpMini", typeTxt);
                    break;
            }
            
            sumContainer.addChild(typeTxt);
            
            _this.animatein();
            
        },
        
        animatein: function(){
            var youWonY = layoutManager.getValue("youWonY");
            var jpSumY = layoutManager.getValue("jpSumY");
            
            createjs.Tween.get(blackBG, {override:true}).to({alpha:0.4}, 200);
            createjs.Tween.get(sumContainer, {override:true}).to({y:jpSumY}, 1500, createjs.Ease.backOut);
            createjs.Tween.get(youWon, {override:true}).wait(200).to({y:youWonY}, 700, createjs.Ease.backOut);
            
            var myChange = _this.onChangeHandler;
            createjs.Tween.get(_this, {override:true, onChange: myChange}).to({animatedValue:120}, 1000); 
        },
        
        onChangeHandler: function(e){
        },
         
        doTouchHandler: function(e){
            var youWonY = youWon.getBounds();
            var jpSumY = sumContainer.getBounds();
            
            console.log(youWon.getBounds() + " woonn");
            
            createjs.Tween.get(blackBG, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(sumContainer, {override:true}).wait(200).to({y:-jpSumY.height}, 1000, createjs.Ease.backIn).call(_this.animOutComplete, [], this);
            createjs.Tween.get(youWon, {override:true}).to({y:-youWonY.height}, 700, createjs.Ease.backIn);  
        },
        
        animOutComplete: function(){
            rootContainer.autoClear = true;
            rootContainer.removeAllChildren(); 
            createjs.Ticker.removeEventListener("tick", rootContainer);
            rootContainer.update(); 
            
            document.getElementById("jackpot_Canvas").style.display = 'none';
            document.getElementById("jackpot_Canvas").remove();
            
            slotTheme.endJackpotAnimation();
        },
    });
	
    return SubJackpotAnimation;
});