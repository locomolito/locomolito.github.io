



define(["../../html5_baseclass/View/Jackpot/JackpotDisplay"], function(JackpotDisplay) {
    
    var stage;
    var elementsContainer;
    var mainSpriteSheets;
    
    var mmmBG;
    var grandBG;

    var txtGrand;
    var txtMajor;
    var txtMinor;
    var txtMini;
     
    var layoutManager;
    
    var assets;
    
    var bitmap, xml, bitmapFont; //for the bitmap text
    
    var SubJackpotDisplay = JackpotDisplay.extend({
        init: function(_slotThemeValue){
            this._super(_slotThemeValue);
            layoutManager = _slotThemeValue.params.layoutManager;
            stage = this.params.stage;
            assets = _slotThemeValue.params.assets;
            elementsContainer = new createjs.Container();
            stage.addChild(elementsContainer);
            
            mainSpriteSheets = new createjs.Sprite(_slotThemeValue.getAssetManager().getSpriteSheetJSON('MainElementsJSON','MainElements'));
            
            xml = assets.getAsset('impact_font_xml');
            bitmap = assets.getAsset('impact_font_png');
            bitmapFont = new BitmapFont(bitmap,xml,50);
            BitmapTextField.registerBitmapFont(bitmapFont,"impact_");
            txtGrand = new createjs.Text("0.00", "22px Moderna", "#FFFF00");
            txtGrand.maxWidth = 159;
            txtGrand.textAlign = "center";
            txtGrand.textBaseline = "alphabetic";
            layoutManager.setPosition("txtGrand", txtGrand);
            layoutManager.setFont("mainUI", txtGrand);
            
            this.params.txtGrand = txtGrand; //set value so main can manipulate it
            elementsContainer.addChild(txtGrand);
             
            txtMajor = new createjs.Text("0.00", "22px Moderna", "#FFFF00");
            txtMajor.maxWidth = 112;
            txtMajor.textAlign = "center";
            layoutManager.setPosition("txtMajor", txtMajor);
            layoutManager.setFont("mainUI", txtMajor);
            txtMajor.textBaseline = "alphabetic";
            this.params.txtMajor = txtMajor; //set value so main can manipulate it
            elementsContainer.addChild(txtMajor);
            
            txtMinor = new createjs.Text("0.00", "18px Moderna", "#FFFF00");
            txtMinor.maxWidth = 112;
            txtMinor.textAlign = "center";
            layoutManager.setPosition("txtMinor", txtMinor);
            layoutManager.setFont("mainUI", txtMinor);
            txtMinor.textBaseline = "alphabetic";
            this.params.txtMinor = txtMinor; //set value so main can manipulate it
            elementsContainer.addChild(txtMinor);
            
            txtMini = new createjs.Text("0.00", "18px Moderna", "#FFFF00");
            txtMini.maxWidth = 112;
            txtMini.textAlign = "center";
            layoutManager.setPosition("txtMini", txtMini);
            layoutManager.setFont("mainUI", txtMini);
            txtMini.textBaseline = "alphabetic";
            this.params.txtMini = txtMini; //set value so main can manipulate it
            elementsContainer.addChild(txtMini);
            var txtDelayTimeout = setTimeout(function(){
                txtGrand.parent.parent.update();
                txtMajor.parent.parent.update();
                txtMinor.parent.parent.update();
                txtMini.parent.parent.update();
            },1000);
        },
    });
	
    return SubJackpotDisplay;
});