

define(["./Model/Model",
        "./Controller/Controller"], function(Model,Controller) {

	var _vendors = ["o", "ms", "moz", "webkit"];
	for (var i = _vendors.length; i-- && !window.requestAnimationFrame;) {
		var v = _vendors[i];

		window.requestAnimationFrame = window[v + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[v + "CancelAnimationFrame"] ||
									  window[v + "CancelRequestAnimationFrame"];
	}
    
    var _view;
    var _model;
    var _controller;
    
    var _params = {};
    var _postParams;
    
    //CLASS
    Object.defineProperty(_params, "view", {
        set: function(_value) {
            _view = _value;
        },
		get: function() {
            return _view;
		}
    });
    
    Object.defineProperty(_params, "model", {
        set: function(_value) {
            _model = _value;
        },
		get: function() {
            return _model;
		}
    });
    
    Object.defineProperty(_params, "controller", {
        set: function(_value) {
            _controller = _value;
        },
		get: function() {
            return _controller;
		}
    });
    
	var SlotGame = Class.extend({
        init: function(_gameProps,postParams){
            this.gameProps = _gameProps;
            this.params = this.getParams();
            _postParams = postParams;
        },
        getParams: function(){
            return _params;
        }, 
        setDefaults: function(){
            if(_postParams != undefined){
                var obj = _postParams.split(',');

                //$parameters = $userId.','.$gameID;
                //_postParams

                if(obj[0] != undefined && obj[0] != ''){
                    this.gameProps.UID = obj[0]; 
                }
            }
            _model = new Model();
            _controller = new Controller();
            
            
            _model.setDefaults(this.gameProps,_controller);
            _controller.setDefaults(_model,_view,this.gameProps);
            _view.setDefaults(_controller,this.gameProps);  
            
            /*$.ajax({
                type: "POST",
                url: 'index.php',
                data: '&showMe=true', 
                success: function(data)
                {
                    //get id being passed by from launcher
                    var dummy = data.split('~|~');
                    //console.log(data);
                    //console.log(dummy);
                    var obj = JSON.parse(dummy[1]);
                    var id = obj.userId;
                    
                    if(id != undefined && id != ''){
                        _gameProps.UID = id; 
                    }
                    //console.log('WAAAAAAAAAAA:'+id);   
                    _model = new Model();
                    _controller = new Controller();
            
                    _model.setDefaults(_gameProps,_controller);
                    _controller.setDefaults(_model,_view,_gameProps);
                    _view.setDefaults(_controller,_gameProps);  
                }
            });*/
            
        },
        run: function() {
			if (this._running) return;
			this._running = true;
            
            //console.log('RUNNING GAME');
            
            //view.startGame();
		},
        
        
	});


	return SlotGame;
});