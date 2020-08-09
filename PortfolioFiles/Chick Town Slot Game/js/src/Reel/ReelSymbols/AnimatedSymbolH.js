

define(["Reel/ReelSymbols/SymbolController"], function(SymbolController) {
    var AnimatedSymbolH = SymbolController.extend({
        init: function(_slotTheme){
            this._super(_slotTheme,{json:'MainElementsJSON',img:'MainElements',prefix:'static_H'});
        },
    });
	
    return AnimatedSymbolH;
});