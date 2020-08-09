


define([], function() {
    var _slotTheme;
    var _stage;
    var _standardSpriteSheet;
    var _alertContainer;
    var _layoutManager;
    var _this;
    
    var totalWidth;
    var totalHeight;
    
    var AlertBox = Class.extend({
        init: function(_slotThemeValue){
            _this = this;
            _slotTheme = _slotThemeValue;
            
            
            
            _layoutManager = _slotThemeValue.params.layoutManager;
            
            _stage = _layoutManager.createStandardCanvas('error_Canvas').stage;
            
             _standardSpriteSheet = new createjs.Sprite(_slotTheme.getAssetManager().getSpriteSheetJSON('StandardAssetsJSON','StandardAssets'));
            
            totalWidth = _slotThemeValue.params.dimensionWidth;
            totalHeight = _slotThemeValue.params.dimensionHeight;
            
            _alertContainer = new createjs.Container();
            _stage.addChild(_alertContainer);
            
            
        },
        showAlert: function(msg){
            document.getElementById("errorWrapper").style.display = 'block';
            
            _alertContainer.alpha = 0;
            
            if(_this.blacker == undefined || _this.blacker == null){
                _this.blacker = new createjs.Shape();
                _this.blacker.graphics.beginFill("#000").drawRect(0, 0, totalWidth, totalHeight);
                _this.blacker.alpha = 0.70;
                _alertContainer.addChild(_this.blacker);
            }
            
            if(_this.bg == undefined || _this.bg == null){
                _this.bg = _standardSpriteSheet.clone();  
                _this.bg.gotoAndStop('alertbox');
                 var bgBounds = _this.bg.getBounds();
            
                _this.bg.x = (totalWidth / 2) - (bgBounds.width / 2);
                _this.bg.y = (totalHeight / 2) - (bgBounds.height / 2);
                _alertContainer.addChild(_this.bg);
                
                _alertContainer.on("click",_this.closeAlertBox);
            }
            
            if(_this.msgTxt == undefined || _this.msgTxt == null){
                _this.msgTxt = new createjs.Text('');
                this.msgTxt.name = 'txtAlertMessage';
                _layoutManager.positionStandardLayout(_this.msgTxt);
                _alertContainer.addChild(_this.msgTxt);
            }
            
            _this.msgTxt.text = msg; 
            
            createjs.Tween.get(_alertContainer).to({alpha:1}, 400, createjs.Ease.linear);
            
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", _stage);
        },
        
        closeAlertBox: function(){
            createjs.Tween.get(_alertContainer).to({alpha:0}, 400, createjs.Ease.linear).call(
                function(){
                    _slotTheme.closeErrorHandler();
                    document.getElementById("errorWrapper").style.display = 'none';
                    createjs.Ticker.removeEventListener("tick", _stage);
            });
        },
    });
    return AlertBox;
});