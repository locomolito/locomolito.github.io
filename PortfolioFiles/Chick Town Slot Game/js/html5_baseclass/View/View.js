

define(["./Theme/AssetManager"], function(AssetManager) {
    
    var _slotTheme;
    var _controller;
    var _assets;
    var _gameProps;
    
    var _dimensionWidth;
    var _dimensionHeight;
    var _dimensionScale;
    var _assetSize;
    
    var _landscapeMsg;
    
    var _params = {};
    
    //CLASS
    Object.defineProperty(_params, "slotTheme", {
        set: function(_value) {
            _slotTheme = _value;
        },
		get: function() {
            return _slotTheme;
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
    Object.defineProperty(_params, "assets", {
        set: function(_value) {
            _assets = _value;
        },
		get: function() {
            return _assets;
		}
    });
    Object.defineProperty(_params, "dimensionWidth", {
        set: function(_value) {
            _dimensionWidth = _value;
        },
		get: function() {
            return _dimensionWidth;
		}
    });
    Object.defineProperty(_params, "dimensionHeight", {
        set: function(_value) {
            _dimensionHeight = _value;
        },
		get: function() {
            return _dimensionHeight;
		}
    });
    Object.defineProperty(_params, "assetSize", {
        set: function(_value) {
            _assetSize = _value;
        },
		get: function() {
            return _assetSize;
		}
    });
    
    var View = Class.extend({
        init: function(){
            if(screen.width >= 800){
                _assetSize = 'BIG';
                _dimensionWidth = 1024;
                _dimensionHeight = 748;
                //canvas.width = 1024;
	            //canvas.height = 748;
            }else{
                _assetSize = 'SMALL';
                _dimensionWidth = 480;
                _dimensionHeight = 320;
                //canvas.width = 480;
	            //canvas.height = 320;
            }
            this.forceResize();
            //console.log('_assetSize:'+_assetSize+'     screen.width:'+screen.width + '   screen.height:' +screen.height);
            this.params = this.getParams();
        },
        getParams: function(){
            return _params;
        }, 
        setDefaults: function(_controllerValue,_gamePropsValue){
            _controller = _controllerValue;
            _gameProps = _gamePropsValue;
            
            _controller.loadXml();
        },
        loadAssets: function(_files,_cssPath){
            //console.log('VIEW LOAD ASSETS');
            
            //load css first before loading files
            loadCss(_files,_cssPath);
            
            _assets = new AssetManager(_files,_controller.onAuthenticatePlayer);
        },
        doSlotThemeEvents: function(_data){
            switch(_data.type){
                case 'SPIN':
                    _controller.doSpin();    
                break;
                case 'LINE':
                case 'LINEBET':
                case 'COIN':
                    _controller.setBetSetting();
                    _slotTheme.setBetSetting();
                break;
                case 'STOP':
                    _controller.notifyEOS();
                    break;
                case 'TIMEOUT':
                    _controller.onTimeout();
                    break;
            }
        },
        doFeaturesEvents: function(_data){
            //console.log('FEATURE EVENT');
            //console.log(_data);
            switch(_data.type){
                case 'ON_BONUS_START':
                    _controller.getBonus();
                break;
                case 'ON_BONUS_END':
                    _controller.getEndBonus(_data.value);
                break;
                
            }
        },
        startGame: function(){
            _slotTheme.setDefaults(this,_gameProps,_assets,_assetSize);
            this.forceResize();
            _slotTheme.startGame();
        },
        
        forceResize: function(){
            window.onresize();
        },
        
        showCSSError: function(msg){
            
            //document.getElementById("preloadTxtMsg").style.display = 'none';
            document.getElementById("preloadTxtPerc").style.display = 'none';
            document.getElementById("preloadTxtMsg").innerHTML=msg;
           // var input = document.createElement('h1'); 
            //input.innerHTML=msg;
            //document.getElementById("preloadMessageWrapper").appendChild(input);
        },
    });
    
    
    window.onresize = function() {
        checkViewPort();
            
        if(_slotTheme != undefined){
            _slotTheme.params.dimensionScale = _dimensionScale;
            _slotTheme.params.dimensionWidth = _dimensionWidth;
            _slotTheme.params.dimensionHeight = _dimensionHeight;
        }
        
        if (window.innerHeight > window.innerWidth){
            document.getElementById("canvasScale").style.visibility = 'hidden';
            if(_landscapeMsg != undefined && _landscapeMsg != null){
                document.getElementById("playLandscapeContainer").style.display = 'block';
                return;
            }
            _landscapeMsg = document.createElement('div');
            _landscapeMsg.id = 'playLandscape';
            document.getElementById("playLandscapeContainer").style.display = 'block';
            document.getElementById("playLandscapeContainer").appendChild(_landscapeMsg);
            document.getElementById("playLandscape").style.width = '100%';
            document.getElementById("playLandscape").style.height = '100%';
        }else {
            document.getElementById("canvasScale").style.visibility = 'visible';
            document.getElementById("canvasScale").style.transform = "scale("+(_dimensionScale)+","+(_dimensionScale)+")";   
            document.getElementById("canvasScale").style.msTransform  = "scale("+(_dimensionScale)+","+(_dimensionScale)+")";   
            document.getElementById("canvasScale").style.webkitTransform = "scale("+(_dimensionScale)+","+(_dimensionScale)+")";   
            if(_landscapeMsg != undefined && _landscapeMsg != null){
                document.getElementById("playLandscapeContainer").style.display = 'none';
                document.getElementById("playLandscape").remove();
                _landscapeMsg = null;
            }
        }
    };
        
    checkViewPort = function(){
        var windowWidth = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || 
document.documentElement.clientWidth || 
document.getElementsByTagName('body')[0].clientWidth;
            
        var windowHeight = window.innerHeight && document.documentElement.clientHeight ? Math.min(window.innerHeight, document.documentElement.clientHeight) : window.innerHeight || 
document.documentElement.clientHeight || 
document.getElementsByTagName('body')[0].clientHeight;
        
        var _scale = Math.min( windowWidth/_dimensionWidth, windowHeight/_dimensionHeight);
        _dimensionScale = parseFloat(_scale.toFixed(2)) - 0.01;//0.01 fix for width exceeding window width and showing overflow
            
        //adjust preloader css.
        document.getElementById("preloaderContainer").style.transform = "scale("+_scale+","+_scale+")";
        document.getElementById("preloaderContainer").style.msTransform  = "scale("+_scale+","+_scale+")";
        document.getElementById("preloaderContainer").style.webkitTransform = "scale("+_scale+","+_scale+")";
            
    };
    
    loadCss = function(_files,_filename){
        //console.log('LOADING CSS');
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", _filename); 
        if (typeof fileref!="undefined"){
            //console.log('APPEND CSS');
            document.getElementsByTagName("head")[0].appendChild(fileref);    
        }
    }
    
    //FOCUS DETECTION, using recommended API and event listener
    onBlur = function(){
        if(_slotTheme != undefined){
            _slotTheme.onfocus(false);   
        }
    };
    onFocus = function(){
        if(_slotTheme != undefined){
            _slotTheme.onfocus(true);   
        }
    };
    $(document).blur(onBlur).focus(onFocus);
    
    (function() {
      var hidden = "hidden";

      // Standards:
      if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
      else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
      else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
      else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
      // IE 9 and lower:
      else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
      // All others:
      else
        window.onpageshow = window.onpagehide
        = window.onfocus = window.onblur = onchange;

      function onchange (evt) {
        var v = "visible", h = "hidden",
            evtMap = {
              focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
            };

        evt = evt || window.event;
        if (evt.type in evtMap)
          document.body.className = evtMap[evt.type];
        else
          document.body.className = this[hidden] ? "hidden" : "visible";
          
        
        if(document.body.className == "hidden"){
            onBlur();
        }else {
            onFocus();
        }
      }

      // set the initial state (but only if browser supports the Page Visibility API)
      if( document[hidden] !== undefined )
        onchange({type: document[hidden] ? "blur" : "focus"});
        
    })();
    
    
    return View;
});