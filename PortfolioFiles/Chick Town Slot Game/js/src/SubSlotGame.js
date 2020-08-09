

define(["../html5_baseclass/SlotGame",
       "SubView"], function(SlotGame,SubView) {
    var SubSlotGame = SlotGame.extend({
        init: function(_data){
            this.props = {gameId:'105', UID:'101', maxLine:30, maxLineBet:10, coinList:[.01, .05, .10, .20, .50, 1]};
            this._super(this.props,_data);
            this.setDefaults();
        },
        setDefaults: function(){
            this.params.view = new SubView();//view class just set it directly to base variable.
            this._super();
        },
        run: function(){
            this._super();
        },
    });
	 
    return SubSlotGame;
});