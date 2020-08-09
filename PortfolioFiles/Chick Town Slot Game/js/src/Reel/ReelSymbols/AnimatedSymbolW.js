

define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolW = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'SymbolAnimationsJSON',img:'SymbolAnimations',prefix:'SymbolW'});
            this.slotTheme = _slotTheme;
        },
        playAnimation: function(_playArea,_x,_y){
            this._super(_playArea,_x,_y);
        },
    });
	
    return AnimatedSymbolW;
});