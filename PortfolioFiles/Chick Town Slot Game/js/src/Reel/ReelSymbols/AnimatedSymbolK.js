
define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolK = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'MainElementsJSON',img:'MainElements',prefix:'static_K'});
        },
    });
	
    return AnimatedSymbolK;
});