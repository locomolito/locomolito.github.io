
define(["./ControlsPopUp"], function(ControlsPopUp) {
    
    //class
    var _slotTheme;
    var _controlsPopUp;
    var _this;
    
    //btns
    var _btnSpin, _btnAutoSpin, _btnStopAuto, _btnInfo, _btnSettings, _btnLineUp, _btnLineDown;
    
    
    //Others
    //var _stage;
    var _stageBtnSpin;
    var _stageBtnAutoSpin;
    var _stageBtnUp;
    var _stageBtnDown;
    var _stageBtnInfo;
    var _stageBtnSettings;
    
    var _layoutManager;
    var _spinCountContainer;
    var _currLine;
    var _gameProps;
    var _isAutoSpin = false;
    var _spinCount = 0;
    var _txtSpinCount;
    
    var _params = {};
    var _isMobile;
    var _isPressed = false;
    var _incrementInterval;//timer used to change values of line up and down while button is pressed.
    
    //CLASS
    Object.defineProperty(_params, "slotTheme", {
        set: function(_value) {
            _slotTheme = _value;
        },
		get: function() {
            return _slotTheme;
		}
    });
    Object.defineProperty(_params, "autoPlay", {
        set: function(_value) {
            _autoPlay = _value;
        },
		get: function() {
            return _autoPlay;
		}
    });
    Object.defineProperty(_params, "settings", {
        set: function(_value) {
            _settings = _value;
        },
		get: function() {
            return _settings;
		}
    });
    
    //BTN
    Object.defineProperty(_params, "btnSpin", {
        set: function(_value) {
            _btnSpin = _value;
        },
		get: function() {
            return _btnSpin;
		}
    });
    Object.defineProperty(_params, "btnStopAuto", {
        set: function(_value) {
            _btnStopAuto = _value;
        },
		get: function() {
            return _btnStopAuto;
		}
    });
    Object.defineProperty(_params, "btnAutoSpin", {
        set: function(_value) {
            _btnAutoSpin = _value;
        },
		get: function() {
            return _btnAutoSpin;
		}
    });
    
    Object.defineProperty(_params, "btnInfo", {
        set: function(_value) {
            _btnInfo = _value;
        },
		get: function() {
            return _btnInfo;
		}
    });
    
    Object.defineProperty(_params, "btnSettings", {
        set: function(_value) {
            _btnSettings = _value;
        },
		get: function() {
            return _btnSettings;
		}
    });
    
    Object.defineProperty(_params, "btnLineUp", {
        set: function(_value) {
            _btnLineUp = _value;
        },
		get: function() {
            return _btnLineUp;
		}
    });
    Object.defineProperty(_params, "btnLineDown", {
        set: function(_value) {
            _btnLineDown = _value;
        },
		get: function() {
            return _btnLineDown;
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
    Object.defineProperty(_params, "isAutoSpin", {
        set: function(_value) {
            _isAutoSpin = _value;
        },
		get: function() {
            return _isAutoSpin;
		}
    });
    Object.defineProperty(_params, "controlsPopUp", {
        set: function(_value) {
            _controlsPopUp = _value;
        },
		get: function() {
            return _controlsPopUp;
		}
    });
    
    
    var Controls = Class.extend({
        init: function(_slotThemeValue){
            _this = this;
            _slotTheme = _slotThemeValue;
            
            this.params = this.getParams();
            
        },
        getParams: function(){
            return _params;
        },
        setDefaults: function(_gamePropsValue){
            _gameProps = _gamePropsValue;
            
            _isMobile = _slotTheme.params.isMobile;
            
            //see subtheme for instructions
            //get layout manager from slotTheme. dont create a new one.
            _layoutManager = _slotTheme.params.layoutManager;
            
            ///////////*create a new canvas, but i only need the stage so im just getting the stage*////////////////
            _stageBtnSpin = _layoutManager.createStandardCanvas('btnSpin_canvas').stage;
            _stageBtnAutoSpin = _layoutManager.createStandardCanvas('btnAuto_canvas').stage;
            _stageBtnInfo = _layoutManager.createStandardCanvas('btnInfo_canvas').stage;
            _stageBtnUp = _layoutManager.createStandardCanvas('btnLineUp_canvas').stage;
            _stageBtnDown = _layoutManager.createStandardCanvas('btnLineDown_canvas').stage;
            _stageBtnSettings = _layoutManager.createStandardCanvas('btnSettings_canvas').stage;
            
            if(_isMobile == null){
                _stageBtnSpin.enableMouseOver(10);
                _stageBtnAutoSpin.enableMouseOver(10);
                _stageBtnInfo.enableMouseOver(10);
                _stageBtnUp.enableMouseOver(10);
                _stageBtnDown.enableMouseOver(10);
                _stageBtnSettings.enableMouseOver(10);
            }
            
            _btnSpin = _layoutManager.addStandardSprite('btnSpin');
            _stageBtnSpin.addChild(_btnSpin);
            _stageBtnSpin.update();
            
            _btnAutoSpin  = _layoutManager.addStandardSprite('btnAutoSpin');
            _stageBtnAutoSpin.addChild(_btnAutoSpin);
            _stageBtnAutoSpin.update();
            
            _btnStopAuto  = _layoutManager.addStandardSprite('btnStopAuto');
            _stageBtnAutoSpin.addChild(_btnStopAuto);
            _stageBtnAutoSpin.update();
            
            _btnInfo  = _layoutManager.addStandardSprite('btnInfo');
            _stageBtnInfo.addChild(_btnInfo);
            _stageBtnInfo.update();
            
            _btnSettings  = _layoutManager.addStandardSprite('btnSettings');
            _stageBtnSettings.addChild(_btnSettings);
            _stageBtnSettings.update();
            
            _btnLineUp  = _layoutManager.addStandardSprite('btnLineUp');
            _stageBtnUp.addChild(_btnLineUp);
            _stageBtnUp.update();
            
            //having issue with hitarea on phone. use this as fix
            var btnLineUpHit = new createjs.Shape();
			btnLineUpHit.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
			_btnLineUp.hitArea = btnLineUpHit;
            
            _btnLineDown  = _layoutManager.addStandardSprite('btnLineDown');
            _stageBtnDown.addChild(_btnLineDown);
            _stageBtnDown.update();
            
            //having issue with hitarea on phone. use this as fix
            var btnLineUpHit = new createjs.Shape();
            btnLineUpHit.name = 'btnLineDownHit';
            _layoutManager.positionStandardLayout(btnLineUpHit);
			_btnLineUp.hitArea = btnLineUpHit;
            
            var btnLineDownHit = new createjs.Shape();
            btnLineDownHit.name = 'btnLineDownHit';
            _layoutManager.positionStandardLayout(btnLineDownHit);
			_btnLineDown.hitArea = btnLineDownHit;
            
            //autoplay count
            _spinCountContainer = new createjs.Container();
            _spinCountContainer.name = 'spinCountContainer';
            _layoutManager.positionStandardLayout(_spinCountContainer);
            _stageBtnAutoSpin.addChild(_spinCountContainer); 
            
            _txtSpinCount = new createjs.Text(_spinCount.toString());
            _txtSpinCount.name = 'txtSpinCount';
            _layoutManager.positionStandardLayout(_txtSpinCount);
            _spinCountContainer.addChild(_txtSpinCount);
            
            _controlsPopUp = new ControlsPopUp(_slotTheme);
            
            this.addControlListeners();
        },
        addControlListeners: function(){
            if(_btnSpin != undefined){
                _btnSpin.on("click",_this.doTouchHandler);
                if (_isMobile == null) {
                    _btnSpin.on("mouseover",_this.doTouchHandler);
                    _btnSpin.on("mouseout",_this.doTouchHandler);
                    _btnSpin.on("mousedown",_this.doTouchHandler);
                }
            }
            
            if(_btnAutoSpin != undefined){
                _btnAutoSpin.on("click",_this.doTouchHandler);
                if (_isMobile == null) {
                    _btnAutoSpin.on("mouseover",_this.doTouchHandler);
                    _btnAutoSpin.on("mouseout",_this.doTouchHandler);
                    _btnAutoSpin.on("mousedown",_this.doTouchHandler);
                }
            }
            
            if(_btnInfo != undefined){
                _btnInfo.on("click",_this.doTouchHandler);
                if (_isMobile == null) {
                    _btnInfo.on("mouseover",_this.doTouchHandler);
                    _btnInfo.on("mouseout",_this.doTouchHandler);
                    _btnInfo.on("mousedown",_this.doTouchHandler);
                }
            }
            
            if(_btnSettings != undefined){
                _btnSettings.on("click",_this.doTouchHandler);
                if (_isMobile == null) {
                    _btnSettings.on("mouseover",_this.doTouchHandler);
                    _btnSettings.on("mouseout",_this.doTouchHandler);
                    _btnSettings.on("mousedown",_this.doTouchHandler);
                }
            }
            
            if(_btnLineUp != undefined){
                _btnLineUp.on("click",_this.doLineHandler);
                _btnLineUp.on("mouseover",_this.doLineHandler);
                    _btnLineUp.on("mouseout",_this.doLineHandler);
                    _btnLineUp.on("mousedown",_this.doLineHandler);
                
            }
            
            if(_btnLineDown != undefined){
                _btnLineDown.on("click",_this.doLineHandler);
                _btnLineDown.on("mouseover",_this.doLineHandler);
                _btnLineDown.on("mouseout",_this.doLineHandler);
                _btnLineDown.on("mousedown",_this.doLineHandler);
                
            }
            if(_btnStopAuto != undefined){
                _btnStopAuto.on("click",_this.doTouchHandler);
                if (_isMobile == null) {
                    _btnStopAuto.on("mouseover",_this.doTouchHandler);
                    _btnStopAuto.on("mouseout",_this.doTouchHandler);
                    _btnStopAuto.on("mousedown",_this.doTouchHandler);
                }
            }
            
            //handles mouseup detection for lineup and down. mouseuot on btn on mobile is not being detected.
            //_stageBtnUp.on('stagemouseup',_this.mouseHandler);
            //_stageBtnDown.on('stagemouseup',_this.mouseHandler);
        },
        mouseHandler: function(e){
            if(_isPressed == true){
                _isPressed = false;
                if(_incrementInterval != undefined){
                    clearInterval(_incrementInterval)
                }
                _this.updateStateByValues(_currLine);
            }
        },
        doLineHandler: function(e){
            if(e.currentTarget.mouseEnabled == false){
                clearInterval(_incrementInterval);
                _isPressed = false;
                return;  
            }
            switch(e.type){
                case 'click':
                    if(_incrementInterval != undefined){
                        clearInterval(_incrementInterval)
                    }
                    _isPressed = false;
                    if(e.currentTarget == _btnLineUp){
                        _this.doLine(1);
                    }else{
                        _this.doLine(-1);
                    }
                    _this.playBtnSounds(_btnLineDown);
                    break;
                case 'mouseover':
                    e.currentTarget.gotoAndStop(e.currentTarget.name + '_'+e.type);
                    break;
                case 'mouseout':
                    e.currentTarget.gotoAndStop(e.currentTarget.name + '_'+e.type);
                    break;
                case 'mousedown':
                    e.currentTarget.gotoAndStop(e.currentTarget.name + '_'+e.type);
                    /*if(e.currentTarget == _btnLineUp){
                        _incrementInterval = setInterval(function () {
                            if(e.currentTarget.mouseEnabled == true){
                                _isPressed = true;
                                _this.doLine(1);
                            }else{
                                _isPressed = false;  
                                clearInterval(_incrementInterval);
                            }
                        }, 200);
                    }else{
                        _incrementInterval = setInterval(function () {
                            if(e.currentTarget.mouseEnabled == true){
                                _isPressed = true;
                                _this.doLine(-1);
                            }else{
                                _isPressed = false;   
                                clearInterval(_incrementInterval);
                            }
                        }, 200);
                    }*/
                    break;
            }
            _stageBtnUp.update();
            _stageBtnDown.update();
        },
        doTouchHandler: function(e){
            if(e.currentTarget.mouseEnabled == false){
                return;  
            }
            if(e.type != 'click'){
                e.currentTarget.gotoAndStop(e.currentTarget.name + '_'+e.type);
                switch (e.currentTarget)
                {
                    case _btnSpin:
                        _stageBtnSpin.update();
                        break;
                    case _btnLineUp:
                       _stageBtnUp.update();
                        break;
                    case _btnLineDown:
                        _stageBtnDown.update();
                        break;
                    case _btnStopAuto:
                        _stageBtnAutoSpin.update();
                        break;
                    case _btnSettings:                    
                        _stageBtnSettings.update();
                        break;
                    case _btnAutoSpin:
                        _stageBtnAutoSpin.update();
                        break;
                    case _btnInfo:
                        _stageBtnInfo.update();
                        break;
                    }
                return;   
            }else{
                e.currentTarget.gotoAndStop(e.currentTarget.name + '_mouseout');
            }
                
            switch (e.currentTarget)
			{
				case _btnSpin:
                    _this.playBtnSounds(_btnSpin);
                    _this.doSpin();
					break;
                case _btnLineUp:
                    _this.playBtnSounds(_btnLineUp);
                    _this.doLine(1);
                    break;
                case _btnLineDown:
                    _this.playBtnSounds(_btnLineDown);
                    _this.doLine(-1);
					break;
                case _btnStopAuto:
                    _this.playBtnSounds(_btnStopAuto);
                    _this.doAutoSpin();
                    _slotTheme.checkButtonStats();
                    break;
                case _btnSettings:                    
                    _this.playBtnSounds(_btnSettings);
                    _slotTheme.stopAllAnimations();
                    _this.setControlStatus('DISABLE');
                    _controlsPopUp.openPopUp('SETTINGS');
                    break;
                case _btnAutoSpin:
                    _this.setControlStatus('DISABLE');
                    _this.playBtnSounds(_btnAutoSpin);
                    _slotTheme.stopAllAnimations();
                    _controlsPopUp.openPopUp('AUTOSPIN');
                    break;
                case _btnInfo:
                    _this.setControlStatus('DISABLE');
                    _this.playBtnSounds(_btnInfo);
                    _slotTheme.stopAllAnimations();
                    _slotTheme.openPaytable();
                    break;
			}
        },
        
        playBtnSounds: function(_btn){
            //console.log('playBtnSounds must be overriden in subclass');
        },
        
        /*
            values are 'ENABLE' and 'DISABLE'
        */
        setControlStatus: function(_type){
            ////console.log('STATUS:'+_type);
            if(_type == 'DISABLE'){    
                if(_btnSpin != undefined){
                    _btnSpin.mouseEnabled = false;
                    _btnSpin.gotoAndStop('btnSpin_disabled');
                }
                if(_btnAutoSpin != undefined){
                    _btnAutoSpin.mouseEnabled = false;
                    _btnAutoSpin.gotoAndStop('btnAutoSpin_disabled');
                }
                if(_btnInfo != undefined){
                    _btnInfo.mouseEnabled = false;
                    _btnInfo.gotoAndStop('btnInfo_disabled');
                }
                if(_btnSettings != undefined){
                    _btnSettings.mouseEnabled = false;
                    _btnSettings.gotoAndStop('btnSettings_disabled');
                }
                if(_btnLineDown != undefined){
                    _btnLineDown.mouseEnabled = false;
                    _btnLineDown.gotoAndStop('btnLineDown_disabled');
                }
                if(_btnLineUp != undefined){
                    _btnLineUp.mouseEnabled = false;
                    _btnLineUp.gotoAndStop('btnLineUp_disabled');
                } 
            }else {
                if(_btnSpin != undefined){
                    _btnSpin.mouseEnabled = true;
                    _btnSpin.gotoAndStop('btnSpin_mouseout');
                }
                if(_btnAutoSpin != undefined){
                    _btnAutoSpin.mouseEnabled = true;
                    _btnAutoSpin.gotoAndStop('btnAutoSpin_mouseout');
                }
                if(_btnInfo != undefined){
                    _btnInfo.mouseEnabled = true;
                    _btnInfo.gotoAndStop('btnInfo_mouseout');
                }
                if(_btnSettings != undefined){
                    _btnSettings.mouseEnabled = true;
                    _btnSettings.gotoAndStop('btnSettings_mouseout');
                }
                if(_btnLineDown != undefined){
                   _btnLineDown.mouseEnabled = _currLine > 1;
                    if(_btnLineDown.mouseEnabled){
                        _btnLineDown.gotoAndStop('btnLineDown_mouseout');
                    }else {
                        _btnLineDown.gotoAndStop('btnLineDown_disabled');
                    }
                }
                if(_btnLineUp != undefined){
                     _btnLineUp.mouseEnabled = _currLine < _gameProps.maxLine;
					if(_btnLineUp.mouseEnabled){
                        _btnLineUp.gotoAndStop('btnLineUp_mouseout');
                    }else {
                        _btnLineUp.gotoAndStop('btnLineUp_disabled');
                    }
                } 
            }
             _stageBtnSpin.update();
             _stageBtnUp.update();
             _stageBtnDown.update();
             _stageBtnAutoSpin.update();
             _stageBtnSettings.update();
             _stageBtnAutoSpin.update();
             _stageBtnInfo.update();
        },
        enableSpin: function()
		{
			if (_btnSpin != undefined)
			{
                ////console.log('---SPIN ENABLED---');
				_btnSpin.mouseEnabled = true;
                _btnSpin.gotoAndStop('btnSpin_mouseout');
                _stageBtnSpin.update();
			}
		},
        enableStopAutoSpin: function(param){
			if(_btnStopAuto != undefined){
				_btnStopAuto.mouseEnabled = param;
                if(_btnStopAuto.mouseEnabled == true){
                    _btnStopAuto.gotoAndStop('btnStop_mouseout');
                }else {
                    _btnStopAuto.gotoAndStop('btnStop_disabled');
                }
                _stageBtnAutoSpin.update();
			}
		},
        doSpin: function (){
            if(_slotTheme.params.freeCount == 0){
                _spinCount--;
                if(parseInt(_spinCount) < 10){
                    _txtSpinCount.text = '0'+_spinCount.toString();
                }else {
                    _txtSpinCount.text = _spinCount.toString();    
                }
            }
            _slotTheme.doSlotThemeEvents({type:'SPIN',data:{}});
		},
        doLine: function(_value){
            var _loc_1 = _currLine;
			if (_btnLineDown == null ||  _btnLineDown == undefined)
			{
				if (_loc_1 == _gameProps.maxLine)
				{
					_loc_1 = 0;
				}
			}
			_loc_1 += _value;
            _slotTheme.doSlotThemeEvents({type:'LINE',line:_loc_1});
			return;
		},
        doAutoSpin: function(){
			_isAutoSpin = !_isAutoSpin;
            _spinCountContainer.visible  = _isAutoSpin;
			if (_btnAutoSpin != null && _btnAutoSpin != undefined)
			{
				_btnAutoSpin.visible = !_isAutoSpin;
			}
			if (_btnStopAuto != null && _btnStopAuto != undefined)
			{
				_btnStopAuto.visible = _isAutoSpin;
			}
			if (_isAutoSpin == true)
			{
				_this.doSpin();
			}
            
            _stageBtnAutoSpin.update();
		},
        setAutoSpinCount: function(_value){
            if(parseInt(_value) < 10){
                _value = '0'+_value.toString();   
            }
            //console.log('SETAUTO:'+_value);
            _spinCount = _value;  
            _txtSpinCount.text = _spinCount.toString();
            
            if (_btnAutoSpin != null && _btnAutoSpin != undefined)
			{
				_btnAutoSpin.visible = false;
			}
            if (_btnStopAuto != null && _btnStopAuto != undefined)
			{
				_btnStopAuto.visible = true;
                _btnStopAuto.mouseEnabled = false;
                 _btnStopAuto.gotoAndStop('btnStop_disabled');
			}
            _spinCountContainer.visible = true;
            
            _stageBtnAutoSpin.update();
        },
        onSpinStop: function(){
            if(_spinCount == 0){
                //default of 10
                _spinCount = 10;
                if(_isAutoSpin == true){
                    _this.doAutoSpin();
                }
            }
        },
        updateStateByValues: function(lines){
            if(_controlsPopUp != undefined && _controlsPopUp.params.isHidden == false){
                //disable line btns if controls popup is open
                _btnLineUp.gotoAndStop('btnLineUp_disabled');
                _btnLineDown.gotoAndStop('btnLineDown_disabled');
                _stageBtnUp.update();
                _stageBtnDown.update();
                return;
            }
            if (lines > 0)
			{
				if (_btnLineDown != null &&  _btnLineDown != undefined)
				{
					_btnLineDown.mouseEnabled = lines > 1;
                    if(_btnLineDown.mouseEnabled){
                        if (_isPressed == true) {
                            if(lines < _currLine){
                                _btnLineDown.gotoAndStop('btnLineDown_mousedown');
                            }else{
                                _btnLineDown.gotoAndStop('btnLineDown_mouseout');
                            }
                        }else{
                            _btnLineDown.gotoAndStop('btnLineDown_mouseout');
                        }
                    }else {
                        _btnLineDown.gotoAndStop('btnLineDown_disabled');
                    }
				}
				if (_btnLineUp != null && _btnLineUp != undefined)
				{
                    _btnLineUp.mouseEnabled = lines < _gameProps.maxLine;
					if(_btnLineUp.mouseEnabled){
                        if (_isPressed == true) {
                            if(lines > _currLine){
                                _btnLineUp.gotoAndStop('btnLineUp_mousedown');
                            }else{
                                _btnLineUp.gotoAndStop('btnLineUp_mouseout');
                            }
                        }else{
                            _btnLineUp.gotoAndStop('btnLineUp_mouseout');
                        }
                    }else {
                        _btnLineUp.gotoAndStop('btnLineUp_disabled');
                    }
                }
                _currLine = lines;
			}
            _stageBtnUp.update();
            _stageBtnDown.update();
        },
        
    });
	
    return Controls;
});