
define(["SubSlotGame"], function(SubSlotGame) {

	(function() {
        
        var subGame;
        
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                
                //init();
            }
        }, 10);
        
        
        init = function(_data){
            subGame = new SubSlotGame(_data);
            console.log("here3");
            subGame.run();
            
        };
	})();
    
    
});