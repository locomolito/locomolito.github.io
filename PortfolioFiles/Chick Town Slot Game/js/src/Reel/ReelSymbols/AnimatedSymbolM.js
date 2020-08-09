

define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolM = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'SymbolAnimationsJSON',img:'SymbolAnimations',prefix:'SymbolM'});
        },
        playAnimation: function(_playArea,_x,_y){
            this._super(_playArea,_x,_y);
        },
    });
	
    return AnimatedSymbolM;
});