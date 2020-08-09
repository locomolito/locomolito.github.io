


define(["../../html5_baseclass/View/Bonus/Bonus"], function(Bonus) {
    var _this;
    var bonusSpriteSheet;
    
    var container, themeContainer, slotTheme, background, lady;
    var dresses;
    var fsLabel, fsBG, fmLabel, fmBG, fsTxt, fmTxt, messageBG;
    var txtAllPrizes, txtAllTypes;
    
    var fsWon=8; 
    var fmWon=2;
    var pickCount=2;
    var currentPicked;
    var btnContinue;
    var handlerClosure;
    var layoutManager;
    
    
    
    var SubBonus = Bonus.extend({
        init: function(_prizeListValue, _pickCountValue, _slotThemeValue, _container){
            _this = this;  
            
            slotTheme = _slotThemeValue;
            layoutManager = slotTheme.params.layoutManager;
            this.contentStage = layoutManager.createCanvas('bonusGame_Canvas').stage;
            themeContainer = this.contentStage;
            container = new createjs.Container();
            themeContainer.addChild(container);
            
            this._super(_prizeListValue, _pickCountValue, _slotThemeValue);
            
            bonusSpriteSheet = new createjs.Sprite(slotTheme.getAssetManager().getSpriteSheetJSON('BonusGameJSON','BonusGame'));
            
           _this.setUpDisplay();
        },
        
        setUpDisplay: function(){
            
            background = bonusSpriteSheet.clone();
            background.gotoAndStop('bonusGameBG');
            container.addChild(background);
            
            dresses= new Array();
            
            dresses[0] = bonusSpriteSheet.clone();
            dresses[0].gotoAndStop('dressPink');
            layoutManager.setPosition("dress0", dresses[0]);
            layoutManager.setHitArea("dress0", dresses[0]);
            dresses[0].cursor='pointer';
            container.addChild(dresses[0]);
            
             
            dresses[1] = bonusSpriteSheet.clone();
            dresses[1].gotoAndStop('dressBlue');
            layoutManager.setPosition("dress1", dresses[1]);
            layoutManager.setHitArea("dress1", dresses[1]);
            dresses[1].cursor='pointer';
            container.addChild(dresses[1]);
            
            dresses[2] = bonusSpriteSheet.clone();
            dresses[2].gotoAndStop('dressGreen');
            layoutManager.setPosition("dress2", dresses[2]);
            layoutManager.setHitArea("dress2", dresses[2]);
            dresses[2].cursor='pointer';
            container.addChild(dresses[2]);
            
            dresses[3] = bonusSpriteSheet.clone();
            dresses[3].gotoAndStop('dressPurple');
            layoutManager.setPosition("dress3", dresses[3]);
            layoutManager.setHitArea("dress3", dresses[3]);
            dresses[3].cursor='pointer';
            container.addChild(dresses[3]);
            
            dresses[4] = bonusSpriteSheet.clone();
            dresses[4].gotoAndStop('dressBrown');
            layoutManager.setPosition("dress4", dresses[4]);
            layoutManager.setHitArea("dress4", dresses[4]);
            dresses[4].cursor='pointer';
            container.addChild(dresses[4]);
            
            dresses[0].on("click",this.doClickHandler);
            dresses[1].on("click",this.doClickHandler);
            dresses[2].on("click",this.doClickHandler);
            dresses[3].on("click",this.doClickHandler);
            dresses[4].on("click",this.doClickHandler);

            dresses[0].on("mouseover",this.doOverHandler);
            dresses[1].on("mouseover",this.doOverHandler);
            dresses[2].on("mouseover",this.doOverHandler);
            dresses[3].on("mouseover",this.doOverHandler);
            dresses[4].on("mouseover",this.doOverHandler);
            
            lady = bonusSpriteSheet.clone();
            lady.gotoAndStop('bonusLady');
            layoutManager.setPosition("lady", lady);
            container.addChild(lady);
        
            fsLabel = bonusSpriteSheet.clone();
            fsLabel.gotoAndStop('totalFS');
            layoutManager.setPosition("bonusFSLabel", fsLabel);
            container.addChild(fsLabel);
            
            fsBG = bonusSpriteSheet.clone();
            fsBG.gotoAndStop('miniLabelBG');
            layoutManager.setPosition("bonusFSBG", fsBG);
            container.addChild(fsBG);
            
            fmLabel = bonusSpriteSheet.clone();
            fmLabel.gotoAndStop('tultalMultiplier');
            layoutManager.setPosition("bonusFMLabel", fmLabel);
            container.addChild(fmLabel);
            
            fmBG = bonusSpriteSheet.clone();
            fmBG.gotoAndStop('miniLabelBG');
            layoutManager.setPosition("bonusFMBG", fmBG);
            container.addChild(fmBG);
            
            messageBG = bonusSpriteSheet.clone();
            messageBG.gotoAndStop('bonusMsgBG');
            layoutManager.setPosition("bonusMessage", messageBG);
            container.addChild(messageBG);
            
            
            fsTxt = new createjs.Text(fsWon, "25px Moderna", "#FFFF00");
            fsTxt.maxWidth = 104;
            fsTxt.textAlign = "center";
            layoutManager.setPosition("bonusFSTxt", fsTxt);
            layoutManager.setFont("bonusGameWin", fsTxt);
            fsTxt.textBaseline = "alphabetic";
            container.addChild(fsTxt);
             
            fmTxt = new createjs.Text("x" + fmWon, "25px Moderna", "#FFFF00");
            fmTxt.maxWidth = 104;
            fmTxt.textAlign = "center";
            layoutManager.setPosition("bonusFMTxt", fmTxt);
            layoutManager.setFont("bonusGameWin", fmTxt);
            fmTxt.textBaseline = "alphabetic";
            container.addChild(fmTxt);
             
            //ADD TEXT PRIZES
            txtAllPrizes=new Array();
            txtAllTypes=new Array();
            var amtX = [91,235,385,544,700];
            var amtY = [374,314,304,362,382];
            var typeX= [90,237,386,544,699];
            var typeY= [403,343,333,393,410];
            
            for(var i=0; i<5; i++){
                txtAllPrizes[i] = new createjs.Text("", "25px Moderna", "#FFFF00");
                txtAllPrizes[i].maxWidth = 104;
                txtAllPrizes[i].textAlign = "center";
                layoutManager.setPosition("bonusAmtTxt", txtAllPrizes[i], i);
                layoutManager.setFont("bonusAmtTxt", txtAllPrizes[i]);
                txtAllPrizes[i].alpha=0;
                txtAllPrizes[i].shadow = new createjs.Shadow("#000000", 0, 0, 5);
                container.addChild(txtAllPrizes[i]); 
                
                txtAllTypes[i] = new createjs.Text("", "19px Moderna", "#FFFF00");
                txtAllTypes[i].maxWidth = 104;
                txtAllTypes[i].textAlign = "center";
                layoutManager.setPosition("bonusTypeTxt", txtAllTypes[i], i);
                 layoutManager.setFont("bonusTypeTxt", txtAllTypes[i]);
                txtAllTypes[i].alpha=0;
                txtAllTypes[i].shadow = new createjs.Shadow("#000000", 0, 0, 5);
                container.addChild(txtAllTypes[i]); 
                
            }
            createjs.Ticker.addEventListener("tick", this.contentStage);
            createjs.Ticker.setFPS(60);
            this.transitionIn();
            
        },
        
        transitionIn: function(){
            container.alpha=0;
            var ladyX = layoutManager.getValue("ladyX");
            createjs.Tween.get(container, {override:true}).to({alpha:1}, 500);
            createjs.Tween.get(lady, {override:true}).wait(500).to({x:ladyX}, 300, createjs.Ease.backOut);
            createjs.Tween.get(messageBG, {override:true}).wait(700).to({y:21}, 300, createjs.Ease.backOut).call(this.animInComplete);
            
        },
        
        animInComplete:function(){
        },
        
        
        doClickHandler: function(e){
            createjs.Ticker.addEventListener("tick", themeContainer);
            pickCount--;
            
            currentPicked = _this.pick();
            
            if(currentPicked.type=="FS"){
                fsWon+= parseInt(currentPicked.value);
                fsTxt.text=fsWon;
            }else if(currentPicked.type=="FM"){
                fmWon+=parseInt(currentPicked.value);
                fmTxt.text = "x" +fmWon;
            }
             
            e.currentTarget.shadow = new createjs.Shadow("#FF00CC", 0, 0, 10);

            for(var i=0; i<dresses.length; i++){
                if(e.currentTarget==dresses[i]){
                    txtAllPrizes[i].text = currentPicked.value;
                    if(currentPicked.type=="FS") txtAllTypes[i].text = "FREE SPINS";  
                    else if(currentPicked.type=="FM") txtAllTypes[i].text = "MULTIPLIER";  
                    
                    createjs.Tween.get(txtAllPrizes[i], {override:true}).to({alpha:1}, 500);
                    createjs.Tween.get(txtAllTypes[i], {override:true}).to({alpha:1}, 500).call(_this.animInComplete);
                    
                    dresses[i].mouseEnabled = false;
                }
            }
            
            if(pickCount==0){
                for(var i=0; i<dresses.length; i++){
                    if(txtAllPrizes[i].alpha==0){
                        dresses[i].mouseEnabled = false;
                     }
                }
                setTimeout(_this.showOtherPrizes, 2000);
            }
        },
        
        showOtherPrizes: function(){
            var counter=0;
            
            for(var i=0; i<dresses.length; i++){
                if(txtAllPrizes[i].alpha==0){
                    txtAllPrizes[i].color="#FFF";
                    txtAllTypes[i].color="#FFF";
                    
                    txtAllPrizes[i].text = _this.params.prizeList[counter].value;
                    if(_this.params.prizeList[counter].type=="FS") txtAllTypes[i].text = "FREE SPINS";  
                    else if(_this.params.prizeList[counter].type=="FM") txtAllTypes[i].text = "MULTIPLIER";  
                    
                    createjs.Tween.get(txtAllPrizes[i], {override:true}).wait(counter*400).to({alpha:1}, 500);
                    createjs.Tween.get(txtAllTypes[i], {override:true}).wait(counter*400).to({alpha:1}, 500);
                    counter++;
                }
            }
            
            setTimeout(_this.showSummary, 3000);
        },
        
        doOverHandler: function(e){
            
        },
        
        showSummary: function(){
            var sumContainer=new createjs.Container();
            layoutManager.setPosition("bonusSum", sumContainer);

            container.addChild(sumContainer);
            
            var sumBG =bonusSpriteSheet.clone();
            sumBG.gotoAndStop("winSummary");
            sumContainer.addChild(sumBG);
            
            var txtA = new createjs.Text("", "48px Moderna", "#FFFF00");
            txtA.text=fsWon + " FREE SPINS";
            txtA.textAlign = "center";
            layoutManager.setPosition("bonusSumTxtA", txtA);
            layoutManager.setFont("bonusSumTxtAC", txtA);
            txtA.textBaseline = "alphabetic";
            txtA.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            sumContainer.addChild(txtA);
            
            var txtB = new createjs.Text("AND", "35px Moderna", "#FFFF00");
            txtB.textAlign = "center";
            layoutManager.setPosition("bonusSumTxtB", txtB);
            layoutManager.setFont("bonusSumTxtB", txtB);
            txtB.textBaseline = "alphabetic";
            txtB.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            sumContainer.addChild(txtB);
            
            var txtC = new createjs.Text("", "48px Moderna", "#FFFF00");
            txtC.text=fmWon + " MULTIPLIER";
            txtC.textAlign = "center";
            layoutManager.setPosition("bonusSumTxtC", txtC);
            layoutManager.setFont("bonusSumTxtAC", txtC);
            txtC.textBaseline = "alphabetic";
            txtC.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            sumContainer.addChild(txtC);
            
            btnContinue =bonusSpriteSheet.clone();
            btnContinue.gotoAndStop("continue");
            layoutManager.setPosition("bonusSumContinue", btnContinue);
            btnContinue.cursor='pointer';
            btnContinue.on("click",_this.animOut);
            sumContainer.addChild(btnContinue);
            
            createjs.Tween.get(sumContainer, {override:true}).to({x:31}, 1000, createjs.Ease.backOut);
            createjs.Tween.get(fsLabel, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(fsBG, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(fmLabel, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(fmBG, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(fsTxt, {override:true}).to({alpha:0}, 500);
            createjs.Tween.get(fmTxt, {override:true}).to({alpha:0}, 500);
        },
        
        animOut: function(){
            createjs.Tween.get(container, {override:true}).to({alpha:0}, 1000);
            createjs.Tween.get(container, {override:true}).to({alpha:0}, 1000);
            createjs.Tween.get(container, {override:true}).to({alpha:0}, 1000).call(_this.closeBonus,null,_this);          
            
        },
        
        closeBonus:function(){
            themeContainer.removeChild(container);
            this.contentStage.autoClear = true;
            this.contentStage.removeAllChildren(); 
            createjs.Ticker.removeEventListener("tick", this.contentStage);
            this.contentStage.update(); 
            
            document.getElementById("bonusGame_Canvas").style.display = 'none';
            document.getElementById("bonusGame_Canvas").remove();
            _this.endBonus();
        },
    });
	
    return SubBonus;
});