
define(["../../Utils/AppUtils",
       "../Theme/AlertBox"], function(AppUtils,AlertBox) {
    /*NOTES:
                - call paramaters from baseclass using this.params.[variable name]
                - call functions from base using this.[function name]
                - call super function using this._super();
                
            - '_this' --- things that involve calling functions within the same class like timers and buttons dispatch destroys the this parameters and create a new class object which will be pointed to ['this'] all functions and functionalities will not be accessible anymore via the new this since its a totally different class object. - fix it by declaring _this and holding on to the initial this parameter;
            */
    
    var _view;
    var _stage;
    var _animatedSymbolStage;
    var _canvas;
    var _controls;
    var _betInfo;
    var _paylines;
    var _jackpotDisplay;
    var _slotReel;
    var _paytable;
    var _soundManager;
    var _alertBox;
    var _layoutManager;
    
    var _assets;
    var _gameProps;
    
    var _line;
	var _lineBet;
    var _coin;
	var _coinList;
	var _reelSymbols;
	var _lineWins;
	var _bonusWins;
	var _jackpotWinning;
	var _payout;
	var _bonusPrize;
	var _freeCount;
	var _freeMultiplier;
    var _onErrorActivated;
    var _previousSpinType; //spin type of last spin. use for detecting correct status of spin button. need to disable spin button upon first enter and last spin. 
    
    var _animatedContainer;//container on where to play animations
    
    var _animationOrder;
    var _allWinningLines;
    var _bonusScatter;
    var _bonusFG;
    var _bonusDU;
    var _bonusFC;
    var _bonusFS;
    var _bonusFGInfo;
    var _bonusFCInfo;
    var _bonusFSInfo;
    var _bonusDUInfo;
    var _scatterInfo;
    
    var _bigWinningType;
    
    var _browser;
    var _isMobile;
    var _assetSize;
    var _dimensionScale;
    var _dimensionWidth;
    var _dimensionHeight;
    
    var _params = {};
    
    var fpsLabel;
    
    //CLASS
    Object.defineProperty(_params, "view", {
        set: function(_value) {
            _view = _value;
        },
		get: function() {
            return _view;
		}
    });
    Object.defineProperty(_params, "stage", {
        set: function(_value) {
            _stage = _value;
        },
		get: function() {
            return _stage;
		}
    });
    
    Object.defineProperty(_params, "animatedSymbolStage", {
        set: function(_value) {
            _animatedSymbolStage = _value;
        },
		get: function() {
            return _animatedSymbolStage;
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
    Object.defineProperty(_params, "controls", {
        set: function(_value) {
            _controls = _value;
        },
		get: function() {
            return _controls;
		}
    });
    Object.defineProperty(_params, "betInfo", {
        set: function(_value) {
            _betInfo = _value;
        },
		get: function() {
            return _betInfo;
		}
    });
    Object.defineProperty(_params, "paylines", {
        set: function(_value) {
            _paylines = _value;
        },
		get: function() {
            return _paylines;
		}
    });
    Object.defineProperty(_params, "jackpotDisplay", {
        set: function(_value) {
            _jackpotDisplay = _value;
        },
		get: function() {
            return _jackpotDisplay;
		}
    });
    Object.defineProperty(_params, "slotReel", {
        set: function(_value) {
            _slotReel = _value;
        },
		get: function() {
            return _slotReel;
		}
    });
    Object.defineProperty(_params, "paytable", {
        set: function(_value) {
            _paytable = _value;
        },
		get: function() {
            return _paytable;
		}
    });
    Object.defineProperty(_params, "soundManager", {
        set: function(_value) {
            _soundManager = _value;
        },
		get: function() {
            return _soundManager;
		}
    });
    
    // VARIABLES
    Object.defineProperty(_params, "line", {
        set: function(_value) {
            _line = _value;
        },
		get: function() {
            return _line;
		}
    });
    Object.defineProperty(_params, "lineBet", {
        set: function(_value) {
            _lineBet = _value;
        },
		get: function() {
            return _lineBet;
		}
    });
    Object.defineProperty(_params, "coin", {
        set: function(_value) {
            _coin = _value;
        },
		get: function() {
            return _coin;
		}
    });
    Object.defineProperty(_params, "coinList", {
        set: function(_value) {
            _coinList = _value;
        },
		get: function() {
            return _coinList;
		}
    });
    Object.defineProperty(_params, "reelSymbols", {
        set: function(_value) {
            _reelSymbols = _value;
        },
		get: function() {
            return _reelSymbols;
		}
    });
    Object.defineProperty(_params, "lineWins", {
        set: function(_value) {
            _lineWins = _value;
        },
		get: function() {
            return _lineWins;
		}
    });
    Object.defineProperty(_params, "bonusWins", {
        set: function(_value) {
            _bonusWins = _value;
        },
		get: function() {
            return _bonusWins;
		}
    });
    Object.defineProperty(_params, "jackpotWinning", {
        set: function(_value) {
            _jackpotWinning = _value;
        },
		get: function() {
            return _jackpotWinning;
		}
    });
    Object.defineProperty(_params, "payout", {
        set: function(_value) {
            _payout = _value;
        },
		get: function() {
            return _payout;
		}
    });
    Object.defineProperty(_params, "bonusPrize", {
        set: function(_value) {
            _bonusPrize = _value;
        },
		get: function() {
            return _bonusPrize;
		}
    });
    Object.defineProperty(_params, "freeCount", {
        set: function(_value) {
            _freeCount = _value;
        },
		get: function() {
            return _freeCount;
		}
    });
    Object.defineProperty(_params, "freeMultiplier", {
        set: function(_value) {
            _freeMultiplier = _value;
        },
		get: function() {
            return _freeMultiplier;
		}
    });
    Object.defineProperty(_params, "animationOrder", {
        set: function(_value) {
            _animationOrder = _value;
        },
		get: function() {
            return _animationOrder;
		}
    });
    Object.defineProperty(_params, "allWinningLines", {
        set: function(_value) {
            _allWinningLines = _value;
        },
		get: function() {
            return _allWinningLines;
		}
    });
    Object.defineProperty(_params, "bonusScatter", {
        set: function(_value) {
            _bonusScatter = _value;
        },
		get: function() {
            return _bonusScatter;
		}
    });
    Object.defineProperty(_params, "bonusFG", {
        set: function(_value) {
            _bonusFG = _value;
        },
		get: function() {
            return _bonusFG;
		}
    });
    Object.defineProperty(_params, "bonusDU", {
        set: function(_value) {
            _bonusDU = _value;
        },
		get: function() {
            return _bonusDU;
		}
    });
    Object.defineProperty(_params, "bonusFC", {
        set: function(_value) {
            _bonusFC = _value;
        },
		get: function() {
            return _bonusFC;
		}
    });
    Object.defineProperty(_params, "bonusFS", {
        set: function(_value) {
            _bonusFS = _value;
        },
		get: function() {
            return _bonusFS;
		}
    });
    Object.defineProperty(_params, "gameProps", {
        set: function(_value) {
            _gameProps = _value;
        },
		get: function() {
            return _gameProps;
		}
    });
    Object.defineProperty(_params, "previousSpinType", {
        set: function(_value) {
            _previousSpinType = _value;
        },
		get: function() {
            return _previousSpinType;
		}
    });
    Object.defineProperty(_params, "animatedContainer", {
        set: function(_value) {
            _animatedContainer = _value;
        },
		get: function() {
            return _animatedContainer;
		}
    });
    Object.defineProperty(_params, "browser", {
        set: function(_value) {
            _browser = _value;
        },
		get: function() {
            return _browser;
		}
    });
    Object.defineProperty(_params, "isMobile", {
        set: function(_value) {
            _isMobile = _value;
        },
		get: function() {
            return _isMobile;
		}
    });
    
    Object.defineProperty(_params, "bigWinningType", {
        set: function(_value) {
            _bigWinningType = _value;
        },
		get: function() {
            return _bigWinningType;
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
    
    
    Object.defineProperty(_params, "onErrorActivated", {
        set: function(_value) {
            _onErrorActivated = _value;
        },
		get: function() {
            return _onErrorActivated;
		}
    });
    Object.defineProperty(_params, "   ", {
        set: function(_value) {
            _layoutManager = _value;
        },
		get: function() {
            return _layoutManager;
		}
    });
    Object.defineProperty(_params, "dimensionScale", {
        set: function(_value) {
            _dimensionScale = _value.toFixed(2);
        },
		get: function() {
            return _dimensionScale;
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
    Object.defineProperty(_params, "canvas", {
        set: function(_value) {
            _canvas = _value;
        },
		get: function() {
            return _canvas;
		}
    });
    
    // BASE THEME
    var Theme = Class.extend({
        init: function(){
            
            //_stage = new createjs.Stage(canvas.view);
            
            _browser = this.checkBrowser();
            _isMobile = this.checkDevice();
            
            
            _animationOrder = new Array();
            _animatedContainer = new createjs.Container();
            this.params = this.getParams();
        },
        /*onResize: function(){
            if(_canvas == undefined){
                return;   
            }
            
            if (window.innerHeight > window.innerWidth){
                //alert("Please use Landscape!");
                document.getElementById("canvasContainer").style.visibility = 'hidden';
                
                if(_landscapeMsg != undefined && _landscapeMsg != null){
                    document.getElementById("playLandscape").style.display = 'block';
                    return;
                }
                _landscapeMsg = document.createElement('div');
                _landscapeMsg.id = 'playLandscape';
                document.getElementsByTagName('body')[0].appendChild(_landscapeMsg);
                document.getElementById("playLandscape").style.width = '100%';
                document.getElementById("playLandscape").style.height = '100%';
                //document.getElementById("canvasContainer").appendChild(_landscapeMsg);
            }else {
                if(_landscapeMsg != undefined && _landscapeMsg != null){
                    document.getElementById("playLandscape").style.display = 'none';
                }
                document.getElementById("canvasContainer").style.visibility = 'visible';
                document.getElementById("canvasContainer").style.transform = "scale("+(_dimensionScale)+","+(_dimensionScale)+")";   
            }
            return;
            
            
            //FIX FOR BLURRY TEXT BUT bug on image
            _canvas.width = _dimensionWidth * _dimensionScale;
			_canvas.height = _dimensionHeight * _dimensionScale;
            
            _stage.setTransform(0, 0, _dimensionScale, _dimensionScale);
            this.updateStage();
            
            var ctx = _stage.canvas.getContext("2d");
            _canvas.imageSmoothingEnabled = true;
            _canvas.wimageSmoothingEnabled = true;
            _canvas.mozImageSmoothingEnabled = true;
            _canvas.mozImageSmoothingEnabled = true; 
            _canvas.webkitImageSmoothingEnabled = true;
            _canvas.webkitImageSmoothingEnabled = true;
            //console.log('CONTEXT SET');
            
            
        },*/
        getParams: function(){
            return _params;
        }, 
        setDefaults: function(_viewValue,_gamePropsValue,_assetsValue,_assetSizeValue){
            _view = _viewValue;
            _gameProps = _gamePropsValue;
            _assets = _assetsValue;
            _assetSize = _assetSizeValue;
            
            _isFreeSpinMode = false;
            _payout = '0.00';
            
            
        },
        checkDevice: function() {
            isAndroid = function() {
                return navigator.userAgent.match(/Android/i);
            };
            isBlackBerry = function() {
                return navigator.userAgent.match(/BlackBerry/i);
            };
            isIOS = function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            };
            isOpera = function() {
                return navigator.userAgent.match(/Opera Mini/i);
            };
            isWindows = function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            };
            return (isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows());
        },
        checkBrowser: function(){
            var ua= navigator.userAgent, tem, 
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\bOPR\/(\d+)/);
                if(tem!= null) return 'Opera '+tem[1];
            }
            M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            return M.join(' ');  
        },
        onfocus: function(_state){
            if(_soundManager != undefined){
                if(_state == true){
                    _soundManager.unMute();
                }else{
                    _soundManager.mute();
                }
            }
        },
        doSlotThemeEvents: function(_data){
            ////console.log('THEME doSlotThemeEvents:'+ _data.type);
            switch(_data.type){
                case 'SPIN':
                    this.onSpin();
                break;
                case 'LINE':
                    _line = _data.line;
                    if(_line > 1){
                        _betInfo.setMessage('Playing with '+_line+' lines.');
                    }else {
                        _betInfo.setMessage('Playing with '+_line+' line.');
                    }
                    this.stopAllAnimations();
                break;
                case 'STOP':
                    this.onSpinStop();
                break;
                case 'LINEBET':
                    _lineBet = _data.lineBet;
                    if(_lineBet > 1){
                        _betInfo.setMessage('Playing with '+_lineBet+' bets per line.');
                    }else {
                        _betInfo.setMessage('Playing with '+_lineBet+' bet per line.');
                    }
                break;
                case 'COIN':
                    _coin = _data.coin;
                    _betInfo.setMessage('Playing with '+_coin+' coins.');
                break;
                case 'MUSIC':
                    if(_data.status == true){
                        _soundManager.setVolume(1,'MUSIC');
                    }else {
                        _soundManager.setVolume(0,'MUSIC');
                    }
                break;
                case 'SFX':
                     if(_data.status == true){
                        _soundManager.setVolume(1,'EFFECTS');
                    }else {
                        _soundManager.setVolume(0,'EFFECTS');
                    }
                break;
                case 'SPINVALUE':
                        
                break;
            }
            _view.doSlotThemeEvents(_data);
            
        },
        
        doFeaturesEvents: function(_data){
            switch(_data.type){
                case 'ON_BONUS_START':
                    
                break;
                case 'ON_BONUS_END':
                    
                break;
                
            }
            _view.doFeaturesEvents(_data);
        },
        
        //call super after all settings are done so that base can hold the variables.
        startGame: function(){
            //hide preloader
            document.getElementById("preloadWrapper").style.visibility = 'hidden';
            
            //ACTIVATE TOUCH
            //createjs.Touch.enable(_stage, [singleTouch=false]  [allowDefault=true]);
            
            
            
            //globalTicker for all
            //createjs.Ticker.useRAF = true;
            //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            //createjs.Ticker.setFPS(30);
            //createjs.Ticker.addEventListener("tick", _stage);
            //createjs.Ticker.addEventListener("tick", this.getFPS);
            
            //console.log('_isMobile:'+_isMobile);
            
            if(_isMobile == null){
                //_stage.enableMouseOver(10);
            }
            
            
            if (_animationOrder == undefined) {
                _animationOrder = new Array();
            }
            _bonusFGInfo = new Object();
			_bonusFCInfo = new Object();
			_bonusFSInfo = new Object();
			_bonusDUInfo = new Object();
			_scatterInfo = new Object();
			//organize winnings base on pushed datas.
			if (_animationOrder)
			{
				for (var a = 0; a < _animationOrder.length; a++)
				{
					switch (String(_animationOrder[a].type))
					{
						case "BONUSFG": 
							_bonusFGInfo.symbol = _animationOrder[a].symbol;
							if (_animationOrder[a].isScatter)
							{
								_bonusFGInfo.scatter = Boolean(_animationOrder[a].isScatter);
							}
							else
							{
								_bonusFGInfo.scatter = false;
							}
							break;
						case "BONUSDU": 
							_bonusDUInfo.symbol = _animationOrder[a].symbol;
							if (_animationOrder[a].isScatter)
							{
								_bonusDUInfo.scatter = Boolean(_animationOrder[a].isScatter);
							}
							else
							{
								_bonusDUInfo.scatter = false;
							}
							break;
						case "BONUSFC": 
							_bonusFCInfo.symbol = _animationOrder[a].symbol;
							if (_animationOrder[a].isScatter)
							{
								_bonusFCInfo.scatter = Boolean(_animationOrder[a].isScatter);
							}
							else
							{
								_bonusFCInfo.scatter = false;
							}
							break;
						case "BONUSFS": 
							_bonusFSInfo.symbol = _animationOrder[a].symbol;
							if (_animationOrder[a].isScatter)
							{
								_bonusFSInfo.scatter = Boolean(_animationOrder[a].isScatter);
							}
							else
							{
								_bonusFSInfo.scatter = false;
							}
							break;
						case "SCATTER": 
							if (_animationOrder[a].useWild)
							{
								_scatterInfo.useWild = Boolean(_animationOrder[a].useWild);
								_scatterInfo.positions = _animationOrder[a].wildPositions;
							}
							else
							{
								_scatterInfo.useWild = false;
							}
							_scatterInfo.matrix = null;
							break;
					
					}
				}
			}
            //console.log('START GAME');
        },
        
        
        //redrawing contents on stage
        /*updateStage: function(evt){
            //var _currentFps = Math.round(createjs.Ticker.getMeasuredFPS());
            //fpsLabel.text = _currentFps + " fps";
            _stage.update();
            //console.log('UPDATE');
        },*/
        
        getFPS: function(evt){
            if(fpsLabel == undefined){
                fpsLabel = new createjs.Text("-- fps", "bold 14px Arial", "#000");
                _stage.addChild(fpsLabel);
            }
            
            var _currentFps = Math.round(createjs.Ticker.getMeasuredFPS());
            fpsLabel.text = _currentFps + " fps" + '    scale:' + _dimensionScale + '    screen:' + screen.width + 'x' + screen.height + '     mode:' + createjs.Ticker.timingMode + '   isMobile:' + _isMobile + '    _browser:' + _browser;
            
            if(_stage != undefined){
                _stage.update(evt);
            }
        },
        
        setBetSetting: function(){
            if (_paylines)
			{
				_paylines.showLines(_line);
			}
            if (_betInfo)
			{
				_betInfo.setValues(_line, _lineBet, _coin);
			}
			if (_controls)
			{
				_controls.updateStateByValues(_line);
			}
            if(_freeCount > 0){
                this.disableAllButtons(false);  
            }
            //console.log('SET BET SETTING');
		},
       
        //spin function
        onSpin: function(){
            _slotReel.stopAllAnimations();
            if(_freeCount > 0){
                this.disableAllButtons(false);  
            }else {
                this.disableAllButtons();  
            }
            
			if (_paylines)
			{
				_paylines.hideAll();
			}
			
            _onErrorActivated = false;
            
            _betInfo.setWonAmount("0");
			
			//set to 0 after displaying previous on screen
			_payout = "0";
			
            _allWinningLines = null;
			_bonusScatter = null;
			_bonusFG = null;
			_bonusDU = null;
			_bonusFC = null;
			_bonusFS = null;
            
			_lineWins = new Array();
			_reelSymbols = new Array();
			_bonusWins = new Array();
			_jackpotWinning = null;
            _bigWinningType = null;
            
            _slotReel.onSpin();
        },
        
        onSpinStop: function(){
            //error message on spin. defaults values no need to proceed.
            if(_onErrorActivated == true){
                //stop autospin
                if(_controls.params.isAutoSpin == true){
                    _controls.doAutoSpin();
                }   
                this.disableAllButtons(false);   
                return;   
            }
            
            if(_controls){
                _controls.onSpinStop();
            }
            
            if(_freeCount > 0){
                ////console.log('_freeCount:'+_freeCount);
                this.disableAllButtons(false);   
            }else {
                if( _controls.params.isAutoSpin == true){
                    this.disableAllButtons();   
                }else {
                    this.enableAllButtons();   
                }
            }
            
            
            if (_betInfo)
			{
				_betInfo.setWonAmount(_payout);
				_betInfo.setMessage("");
			}
            
            if (_animationOrder.length == 0)
			{
				//dont check if not initialize as they might be using different symbols
				return;
			}
            
            //checking of line wins
			_allWinningLines = new Array();
			var myWinObject;
			
			//if any of the special symbols won, disable spin capability of Free Spin.
			var specialSymbolWon = false;
			
			/*
			   allWinningLines object datas below:
			   symbolType = symbol type
			   symbolPosition = position on reel
			   wonAmount = read the variable :D
			   lineNo = line who won
			   matrix = matrix of who won
			   hasWild = read the variable :D
			 */
			
			//bonus checking done outside so i wont keep looping
			if (_bonusWins != null && _bonusWins.length > 0)
			{
				for (var j = 0; j < _bonusWins.length; j++)
				{
					if (_bonusWins[j].type == "SCATTER")
					{
						_bonusScatter = _bonusWins[j];
						if (_scatterInfo.useWild)
						{
							this.getNewScatterMatrix();
						}
					}
					else if (_bonusWins[j].type == "BONUSFG")
					{
						_bonusFG = _bonusWins[j];
					}
					else if (_bonusWins[j].type == "BONUSDU")
					{
						_bonusDU = _bonusWins[j];
					}
					else if (_bonusWins[j].type == "BONUSFC")
					{
						_bonusFC = _bonusWins[j];
					}
					else if (_bonusWins[j].type == "BONUSFS")
					{
						_bonusFS = _bonusWins[j];
					}
				}
			}
			
			//search for X, Y, Z winning lines
			if (_lineWins && _lineWins.length > 0)
			{
				for (var l = 0; l < _lineWins.length; l++)
				{
					if (_lineWins[l].type == _bonusFGInfo.symbol)
					{
						_bonusFGInfo.lineNo = _lineWins[l].line_no;
					}
					else if (_lineWins[l].type == _bonusDUInfo.symbol)
					{
						_bonusDUInfo.lineNo = _lineWins[l].line_no;
					}
					else if (_lineWins[l].type == _bonusFCInfo.symbol)
					{
						_bonusFCInfo.lineNo = _lineWins[l].line_no;
					}
					else if (_lineWins[l].type == _bonusFSInfo.symbol)
					{
						_bonusFSInfo.lineNo = _lineWins[l].line_no;
					}
				}
			}
			
			//cycle and set the winning orders.
			for (var a = 0; a < _animationOrder.length; a++)
			{
				switch (String(_animationOrder[a].type))
				{
					case "JACKPOT": 
						if (_jackpotWinning)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_jackpotWinning.type), symbolPosition: _jackpotWinning.symbol_count, wonAmount: _jackpotWinning.won_amount, lineNo: _jackpotWinning.line_no, matrix: this.convertToMaxtrix(_jackpotWinning), has_wild: false, comboLength: this.getComboLength(_jackpotWinning)};
							_allWinningLines.push(myWinObject);
							this.disableAllButtons(false);
							specialSymbolWon = true;
						}
						break;
					case "SCATTER": 
						if (_bonusScatter)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_bonusScatter.type), symbolPosition: _bonusScatter.position, wonAmount: _bonusScatter.won_amount, lineNo: "none", matrix: this.convertToMaxtrix(_bonusScatter), has_wild: false, comboLength: this.getComboLength(_bonusScatter)};
							_allWinningLines.push(myWinObject);
						}
						break;
					case "LINES": 
						if (_lineWins && _lineWins.length > 0)
						{
							for (var i = 0; i < _lineWins.length; i++)
							{
								if (_lineWins[i].type != "M" && _lineWins[i].type != "X" && _lineWins[i].type != "Y" && _lineWins[i].type != "Z")
								{
									myWinObject = new Object();
									myWinObject = {symbolType: String(_lineWins[i].type), symbolPosition: _lineWins[i].symbol_count, wonAmount:_lineWins[i].won_amount, lineNo: _lineWins[i].line_no, matrix: this.convertToMaxtrix(_lineWins[i]), has_wild: _lineWins[i].has_wild, comboLength: this.getComboLength(_lineWins[i])};
									_allWinningLines.push(myWinObject);
								}
							}
						}
						break;
					case "BONUSFG": 
						if (_bonusFG)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_bonusFG.type), symbolPosition: _bonusFG.position, wonAmount: 0, lineNo: _bonusFGInfo.lineNo, matrix: this.convertToMaxtrix(_bonusFG, _bonusFGInfo.scatter), has_wild: false, comboLength: this.getComboLength(_bonusFG)};
							_allWinningLines.push(myWinObject);
							this.disableAllButtons(false);
							specialSymbolWon = true;
						}
						break;
					case "BONUSDU": 
						if (_bonusDU)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_bonusDU.type), symbolPosition: _bonusDU.position, wonAmount: _bonusDU.won_amount, lineNo: _bonusDUInfo.lineNo, matrix: this.convertToMaxtrix(_bonusDU, _bonusDUInfo.scatter), has_wild: false, comboLength: this.getComboLength(_bonusDU)};
							_allWinningLines.push(myWinObject);
							this.disableAllButtons(false);
							specialSymbolWon = true;
						}
						break;
					case "BONUSFC": 
						if (_bonusFC)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_bonusFC.type), symbolPosition: _bonusFC.position, wonAmount: 0, lineNo: _bonusFCInfo.lineNo, matrix: this.convertToMaxtrix(_bonusFC, _bonusFCInfo.scatter), has_wild: false, comboLength: this.getComboLength(_bonusFC)};
							_allWinningLines.push(myWinObject);
							this.disableAllButtons(false);
							specialSymbolWon = true;
						}
						break;
					case "BONUSFS": 
						if (_bonusFS)
						{
							myWinObject = new Object();
							myWinObject = {symbolType: String(_bonusFS.type), symbolPosition: _bonusFS.position, wonAmount: 0, lineNo: _bonusFSInfo.lineNo, matrix: this.convertToMaxtrix(_bonusFS, _bonusFSInfo.scatter), has_wild: false, comboLength: this.getComboLength(_bonusFS)};
							_allWinningLines.push(myWinObject);
							this.disableAllButtons(false);
							specialSymbolWon = true;
						}
						break;
				}
				myWinObject = null;
			}
            if(_jackpotWinning == undefined || _jackpotWinning == null){
				this.checkBigWin();
			}
			if (_freeCount > 0)
			{
				//disable all buttons upon entering freespin mode. and dont enable spin button.
                if(_previousSpinType == 'RS') {
                    this.disableAllButtons(false);
                    return;
                }
                
                //enable spin capability without finishing all animations
                ////console.log('specialSymbolWon:'+specialSymbolWon);
				if (specialSymbolWon == false)
				{
					_controls.enableSpin();
				}
			}else {
                //disable all buttons on last freespin. and dont enable spin button.
                if(_previousSpinType == 'FS') {
                    this.disableAllButtons(false);
                    return;
                }  
            }
        },
        
        animateWinnings: function(){
            //console.log('animateWinnings must be overriden in subclass');    
        },
        stopAllAnimations: function(){
            //console.log('stopAllAnimations must be overriden in subclass');    
        },
        resumeAnimation: function(){
            //console.log('resumeAnimation must be overriden in subclass');    
        },
        //Bonus
        runBunos: function(){
            _view.doFeaturesEvents({type:'ON_BONUS_START'});
        },
        startBonus: function(_prizeList){
            //console.log('startBonus must be overriden in subclass and use');    
        },
        endBonus: function()
		{
			//console.log('endBonus must be overriden in subclass and use');    
		},
        openPaytable: function(){
            //console.log('openPaytable must be overriden in subclass and use this.params.paytable = paytable class');    
        },
        
        closePaytable: function(){
            //console.log('closePaytable must be overriden in subclass and use this.params.paytable = paytable class');    
        },
        checkButtonStats: function(){
            //console.log('checkButtonStats must be overriden in subclass');
        },
        setSpinResult: function(){
			_slotReel.onSpinResult(_reelSymbols);
		},
        checkBigWin: function(){
			var totalBet = (_line * _lineBet * _coin);
			var totalWin = AppUtils.toNumeric(_payout);
			if (totalBet <= 50) {
				if (totalWin >= (totalBet * 20)) {
					_bigWinningType = {type:"Unbelievable",amount:totalWin};
				}else if (totalWin >= (totalBet * 10)) {
					_bigWinningType = {type:"Super",amount:totalWin};
				}else if (totalWin >= (totalBet * 5)) {
					_bigWinningType = {type:"Big",amount:totalWin};
				}
			}else {
				if (totalWin >= (totalBet * 20)) {
					_bigWinningType = {type:"Unbelievable",amount:totalWin};
				}else if (totalWin >= (totalBet * 5)) {
					_bigWinningType = {type:"Big",amount:totalWin};
				}
			}
            
		},
        disableAllButtons: function(enableStopButton){
			//disabling line numbers, control buttons, 
			//set to false if you want to disable stopAutoSpin, applicable on bunos and freespin    
            if(enableStopButton == undefined){
                enableStopButton = true;   
            }
			if (_controls)
			{
				_controls.setControlStatus('DISABLE');
			}
			_controls.enableStopAutoSpin(enableStopButton);
		},
        
        enableAllButtons: function(){
            if (_controls)
			{
				_controls.setControlStatus('ENABLE');
			}
		},
        
        //ERRORS//
        errorHandler: function(_msg){
            ////console.log('ERROR MSG:'+_msg);
            if(_alertBox == undefined){
                _alertBox = new AlertBox(this);
            }
            _alertBox.showAlert(_msg);
            
            _onErrorActivated = true;
            if (_slotReel.params.reelStillSpinning)
			{
				_slotReel.errorStopSpin();
			}
			/*if (_freeCount > 0) {
				_controls.enableSpin();
			}*/
            
            this.disableAllButtons(false);
		},
        closeErrorHandler: function(){
            _onErrorActivated = false;
            this.enableAllButtons();
		},
        
        ////UTILS////
        convertToMaxtrix: function(param, isScatterType){
            if(isScatterType == undefined){
                isScatterType = false;   
            }
			var newMatrix = new Array();
			var indexes = new Array();
			for (var _c = 0; _c < 5; _c++)
			{
				newMatrix.push(new Array(0, 0, 0));
			}
            if (param.symbol_count)
			{
				indexes = param.symbol_count.split("|");
                for (var _a = 0; _a < indexes.length; _a++)
				{
                    if (indexes.length == 2 && _a == 1)
					{
                        newMatrix[_a][Number(indexes[_a])] = 2;
					}
					else if (indexes.length == 3 && _a == 2)
					{
                        newMatrix[_a][Number(indexes[_a])] = 2;
					}
					else if (indexes.length == 4 && _a == 2)
					{
                        newMatrix[_a][Number(indexes[_a])] = 2;
					}
					else if (indexes.length == 5 && _a == 2)
					{
                        newMatrix[_a][Number(indexes[_a])] = 2;
					}
					else
					{
                        newMatrix[_a][Number(indexes[_a])] = 1;
					}
				}
                
			}
			else{
                ////console.log(param);
                indexes = param.position.split("|");
                if (param.type == "SCATTER" || isScatterType == true)
				{
					for (var s_idx = 0; s_idx < indexes.length; s_idx++)
					{
						if (indexes.length == 2 && s_idx == 0)
						{
							newMatrix[Number(indexes[s_idx].charAt(0))][Number(indexes[s_idx].charAt(1))] = 2;
						}
						else if (indexes.length == 3 && s_idx == 1)
						{
							newMatrix[Number(indexes[s_idx].charAt(0))][Number(indexes[s_idx].charAt(1))] = 2;
						}
						else if (indexes.length == 4 && s_idx == 2)
						{
							newMatrix[Number(indexes[s_idx].charAt(0))][Number(indexes[s_idx].charAt(1))] = 2;
						}
						else if (indexes.length == 5 && s_idx == 2)
						{
							newMatrix[Number(indexes[s_idx].charAt(0))][Number(indexes[s_idx].charAt(1))] = 2;
						}
						else
						{
							newMatrix[Number(indexes[s_idx].charAt(0))][Number(indexes[s_idx].charAt(1))] = 1;
						}
					}
				}
				else
				{
					for (var _i = 0; _i < indexes.length; _i++)
					{
						if (indexes.length == 2 && _i == 1)
						{
							newMatrix[_i][Number(indexes[_i])] = 2;
						}
						else if (indexes.length == 3 && _i == 2)
						{
							newMatrix[_i][Number(indexes[_i])] = 2;
						}
						else if (indexes.length == 4 && _i == 2)
						{
							newMatrix[_i][Number(indexes[_i])] = 2;
						}
						else if (indexes.length == 5 && _i == 2)
						{
							newMatrix[_i][Number(indexes[_i])] = 2;
						}
						else
						{
							newMatrix[_i][Number(indexes[_i])] = 1;
						}
					}
				}
			}
            
			return newMatrix;
		},
        getComboLength: function(param){
			var indexes = new Array();
			if (param.symbol_count)
			{
				indexes = param.symbol_count.split("|");
			}
			else
			{
				indexes = param.position.split("|");
			}
			return indexes.length;
		},
        
        getAssetManager: function(){
            return _assets;   
        },
        getNewScatterMatrix: function(){
			var splitPosition = _bonusScatter.position.split("|");
			var wildPositions = _scatterInfo.positions;
			//check if all symbols have been converted to wild first
			if (splitPosition.length < (wildPositions.length * 3))
			{
				//not yet using a complete wild line
				//probably the start of FS.
				return;
			}
			
			var newPositions = "";
			var matchFound = false;
			for (var i = 0; i < splitPosition.length; i++)
			{
				for (var a = 0; a < wildPositions.length; a++)
				{
					if (splitPosition[i].charAt(0) == wildPositions[a])
					{
						splitPosition.splice(i, 1);
						matchFound = true;
					}
				}
				if (matchFound)
				{
					matchFound = false;
					i--;
				}
			}
			newPositions = splitPosition.toString();
			for (a = 0; a < wildPositions.length; a++)
			{
				splitPosition.push(String(wildPositions[a] + "1"));
			}
			
			newPositions = splitPosition.toString();
			newPositions = newPositions.split(",").join("|");
			_bonusScatter.position = newPositions;
		}
    });
    
    return Theme;
});