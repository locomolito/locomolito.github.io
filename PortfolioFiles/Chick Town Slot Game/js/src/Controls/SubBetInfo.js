

define(["../../html5_baseclass/View/Controls/BetInfo"], function(BetInfo) {
   
    //class
    var slotTheme;
    var stage;
    
    var mainSpriteSheets;
    
    var SubBetInfo = BetInfo.extend({
        init: function(_slotThemeValue){
            var layoutManager = _slotThemeValue.params.layoutManager;
            this._super(_slotThemeValue);
            slotTheme = _slotThemeValue;
            stage = slotTheme.params.stage;
             
            mainSpriteSheets = new createjs.Sprite(slotTheme.getAssetManager().getSpriteSheetJSON('MainElementsJSON','MainElements'));
            
            this.params.stageLineRightTxt = layoutManager.createCanvas('txtLinesRight_Canvas').stage;
            this.params.stageLineLeftTxt = layoutManager.createCanvas('txtLinesLeft_Canvas').stage;
            this.params.stageMessageTxt = layoutManager.createCanvas('txtInfoMessage_Canvas').stage;
           
            var txtInfo = new createjs.Text("0.00", "22px Moderna", "#FFFF00");
            this.params.txtMessage = txtInfo;
            txtInfo.maxWidth = 630;
            txtInfo.textAlign = "center";
            layoutManager.setPosition("infoMessage", txtInfo);
            layoutManager.setFont("mainUI", txtInfo);
            txtInfo.textBaseline = "alphabetic";
            txtInfo.letterSpacing = layoutManager.getValue("spacingInfo");
            console.log("ggege");
            this.params.stageMessageTxt.addChild(txtInfo);
  
            var txtLinesRight = new createjs.Text("0.00", "25px Moderna", "#FFFFFF");
            txtLinesRight.maxWidth = 45;
            txtLinesRight.textAlign = "center";
            layoutManager.setPosition("txtLinesRight", txtLinesRight);
            layoutManager.setFont("mainUI", txtLinesRight);
            txtLinesRight.textBaseline = "alphabetic";
            txtLinesRight.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            this.params.txtLinesRight = txtLinesRight;
            this.params.stageLineRightTxt.addChild(txtLinesRight);
            
            var txtLinesLeft = new createjs.Text("0.00", "25px Moderna", "#FFFFFF");
            txtLinesLeft.maxWidth = 45;
            txtLinesLeft.textAlign = "center";
            layoutManager.setPosition("txtLinesLeft", txtLinesLeft);
            layoutManager.setFont("mainUI", txtLinesLeft);
            txtLinesLeft.textBaseline = "alphabetic";
            txtLinesLeft.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            this.params.txtLinesLeft = txtLinesLeft;
            this.params.stageLineLeftTxt.addChild(txtLinesLeft);
            
            var txtDelayTimeout = setTimeout(function(){
                txtLinesLeft.parent.update();
                txtLinesRight.parent.update();
                txtInfo.parent.update();
            },1000);
        },
        
        setMessage: function(_message)
		{
            this._super(_message);
		},
    });
	
    return SubBetInfo;
});