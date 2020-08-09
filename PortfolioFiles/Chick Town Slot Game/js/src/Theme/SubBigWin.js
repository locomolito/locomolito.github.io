



define([], function() {
    var _this;
    var slotTheme;
    var container;
    
    var bigWinSpriteSheets;
   
    var SubBigWin = Class.extend({
        init: function(_slotTheme,_rootContainer){
            //console.log('SubBigWin INITIALIZE');
            slotTheme = _slotTheme;
            _this = this;
            
            container = new createjs.Container();
            _rootContainer.addChild(container);

            this.closeBigWin();
        },
        
        closeBigWin: function(){
            container.removeAllChildren()
            container.parent.removeChild(container);
            container = null;

            slotTheme.closeBigWin();
        },
    });
	
    return SubBigWin;
});