

define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolD = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'MainElementsJSON',img:'MainElements',prefix:'static_D'});
        },
    });
	
    return AnimatedSymbolD;
});