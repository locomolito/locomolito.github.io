
define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolS = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'SymbolAnimationsJSON',img:'SymbolAnimations',prefix:'SymbolS'});
        },
        playAnimation: function(_playArea,_x,_y){
            this._super(_playArea,_x,_y);
        },
    });
	
    return AnimatedSymbolS;
});