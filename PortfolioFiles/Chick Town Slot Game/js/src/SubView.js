

define(["../html5_baseclass/View/View",
       "Theme/SubTheme"], function(View,SubTheme) {
    var SubView = View.extend({
        init: function(){
            this._super();
            
        },
        startGame: function(){
            this.params.slotTheme = new SubTheme();
            
            //super after variable declarations so baseclass can copy variables
            this._super();
            
        },
         
        loadAssets: function(){
            console.log('SUBVIEW LOAD ASSETS');

            var _file;
            //declare all files to be loaded first. Array with object contents add id and src to content.
            if(this.params.assetSize == 'BIG'){
                _files = [
                {src: "res/Images/big/MainElements.png", id: "MainElements", crossOrigin:true},
                {src: "res/Images/big/MainElements.json", id: "MainElementsJSON", crossOrigin:true},
                {src: "res/Images/big/StandardAssets.png", id: "StandardAssets", crossOrigin:true},
                {src: "res/Images/big/StandardAssets.json", id: "StandardAssetsJSON", crossOrigin:true},
                {src: "res/Images/big/Paylines.png", id: "Paylines", crossOrigin:true},
                {src: "res/Images/big/Paylines.json", id: "PaylinesJSON", crossOrigin:true},
                {src: "res/Images/big/SymbolAnimations.png", id: "SymbolAnimations", crossOrigin:true},
                {src: "res/Images/big/SymbolAnimations.json", id: "SymbolAnimationsJSON", crossOrigin:true},
                {src: "res/Images/big/BonusGame.json", id: "BonusGameJSON", crossOrigin:true},
                {src: "res/Images/big/jackpotAnim.png", id: "jackpotAnim", crossOrigin:true},
                {src: "res/Images/big/jackpotAnim.json", id: "jackpotAnimJSON", crossOrigin:true},
                {src: "res/Images/big/Paytable.png", id: "Paytable", crossOrigin:true},
                {src: "res/Images/big/Paytable.json", id: "PaytableJSON", crossOrigin:true},
                {src: "res/Images/big/coins.png", id: "coins", crossOrigin:true},
                {src: "res/Images/big/coins.json", id: "coinsJSON", crossOrigin:true},
                {src: "res/Sounds/GQ_BGM.mp3", id: "GQ_BGM", crossOrigin:true},
                {src: "res/Sounds/GQ_FreeSpin_BGM.mp3", id: "GQ_FreeSpin_BGM", crossOrigin:true},
                {src: "res/Sounds/GQ_SpinStop.mp3", id: "GQ_SpinStop", crossOrigin:true},
                {src: "res/Sounds/GQ_ReelSpin.mp3", id: "GQ_ReelSpin", crossOrigin:true},
                {src: "res/Sounds/GQ_BtnClick.mp3", id: "GQ_BtnClick", crossOrigin:true},
                {src: "res/Images/big/BonusGame.png", id: "BonusGame", crossOrigin:true},
                {src: "res/impact_font.png", id: "impact_font_png", crossOrigin:true},
                {src: "res/impact_font.xml", id: "impact_font_xml", crossOrigin:true},
		          ];
                
                this._super(_files,'css/style_1024x748.css');
            }else{
                _files = [
                {src: "res/Images/small/MainElements.png", id: "MainElements", crossOrigin:true},
                {src: "res/Images/small/MainElements.json", id: "MainElementsJSON", crossOrigin:true},
                {src: "res/Images/small/StandardAssets.png", id: "StandardAssets", crossOrigin:true},
                {src: "res/Images/small/StandardAssets.json", id: "StandardAssetsJSON", crossOrigin:true},
                {src: "res/Images/small/Paylines.png", id: "Paylines", crossOrigin:true},
                {src: "res/Images/small/Paylines.json", id: "PaylinesJSON", crossOrigin:true},
                {src: "res/Images/small/SymbolAnimations.png", id: "SymbolAnimations", crossOrigin:true},
                {src: "res/Images/small/SymbolAnimations.json", id: "SymbolAnimationsJSON", crossOrigin:true},
                {src: "res/Images/small/BonusGame.json", id: "BonusGameJSON", crossOrigin:true},
                {src: "res/Images/small/jackpotAnim.png", id: "jackpotAnim", crossOrigin:true},
                {src: "res/Images/small/jackpotAnim.json", id: "jackpotAnimJSON", crossOrigin:true},
                {src: "res/Images/small/Paytable.png", id: "Paytable", crossOrigin:true},
                {src: "res/Images/small/Paytable.json", id: "PaytableJSON", crossOrigin:true},
                {src: "res/Images/small/coins.png", id: "coins", crossOrigin:true},
                {src: "res/Images/small/coins.json", id: "coinsJSON", crossOrigin:true},
                {src: "res/Sounds/GQ_BGM.mp3", id: "GQ_BGM", crossOrigin:true},
                {src: "res/Sounds/GQ_FreeSpin_BGM.mp3", id: "GQ_FreeSpin_BGM", crossOrigin:true},
                {src: "res/Sounds/GQ_SpinStop.mp3", id: "GQ_SpinStop", crossOrigin:true},
                {src: "res/Sounds/GQ_ReelSpin.mp3", id: "GQ_ReelSpin", crossOrigin:true},
                {src: "res/Sounds/GQ_BtnClick.mp3", id: "GQ_BtnClick", crossOrigin:true},
                {src: "res/Images/small/BonusGame.png", id: "BonusGame", crossOrigin:true},
                {src: "res/impact_font.png", id: "impact_font_png", crossOrigin:true},
                {src: "res/impact_font.xml", id: "impact_font_xml", crossOrigin:true},
		          ];
                this._super(_files,'css/style_480x320.css');
            
            }   
        },  
    });
	
    return SubView;
});