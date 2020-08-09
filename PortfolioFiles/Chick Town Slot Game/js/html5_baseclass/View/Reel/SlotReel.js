

define(["./ImagePool",
       "./Wheels",
       "./WheelSpinMode",
       "../../Utils/AppUtils",
       "./LineMap",], function(ImagePool,Wheels,WheelSpinMode,AppUtils,LineMap) {
    
    var _slotTheme;
    var _stage;
    var _this;
    var _imagePool;
   
    //timeouts
    var _timeoutMaxTime = 20000;
    var _timeoutTimer;
    
    //PARAMS
	var _defaultNormalStop = 300;
	var _anticipationTime = 5000;
	var _symbolList;
	var _symbolCode;
	var _movieList;
	var _fillerList;
	var _allWheels;
    var _wheelXInterval;
	var _symbolYInterval;
    var _reelStillSpinning;
    var _symbolYRef = 0;
	var _symbolXRef = 0;
	var _wheelHeight;
    var _spinHeight;
	var _columns;
	var _rows;
    
    //0,0 position of wheel relative to stage
    var _wheelBaseX;
    var _wheelBaseY;
    
	
    
    //spinning
    var _spinParams;
	var _result;
    var _spinTime;
    var _stopIndex;
    var _wheelStartTime;
    var _wheelStoppedCount;
    var _timeoutCounter;
    var _totalWheelResultOut;
    var _wheelSpinMode;
    var _wheelStarted;
    var _moveWheelTimer;//timer
    var _moveIntroTimer;//timer
    var _moveStopTimer;//timer
    var _delayDispatchTimer// delay dispatching stop to slottheme, it doest look good when after completion it goes staright to animation. not enough time to see all the reels.
   
    //animating win
    var _animatedContainer;//added from slottheme. play animations here
    var _allAnimatedMc;
    var _animW;
    var codeIndex;
    var targetMc;
	var animatedData;
    var targetData;
    var matrix;
    
    
    ///anticipation
    var _symbolsForDelay;
    var _anticipationStatus;
    var _wheelStatus;
    var _linemap = 'DC';
    
    var _this;
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
    
    //OTHERS
    Object.defineProperty(_params, "stage", {
        set: function(_value) {
            _stage = _value;
        },
		get: function() {
            return _stage;
		}
    });
    Object.defineProperty(_params, "stageWheel", {
        set: function(_value) {
            _stageWheel = _value;
        },
		get: function() {
            return _stageWheel;
		}
    });
    
   
    //OBJECTS
    
    Object.defineProperty(_params, "reelStillSpinning", {
        set: function(_value) {
            _reelStillSpinning  = _value;
        },
		get: function() {
            return _reelStillSpinning ;
		}
    });
    Object.defineProperty(_params, "defaultNormalStop", {
        set: function(_value) {
            _defaultNormalStop  = _value;
        },
		get: function() {
            return _defaultNormalStop ;
		}
    });
    Object.defineProperty(_params, "anticipationTime", {
        set: function(_value) {
            _anticipationTime  = _value;
        },
		get: function() {
            return _anticipationTime ;
		}
    });
    Object.defineProperty(_params, "symbolList", {
        set: function(_value) {
            _symbolList = _value;
        },
		get: function() {
            return _symbolList;
		}
    });
    Object.defineProperty(_params, "symbolCode", {
        set: function(_value) {
            _symbolCode = _value;
        },
		get: function() {
            return _symbolCode;
		}
    });
    Object.defineProperty(_params, "movieList", {
        set: function(_value) {
            _movieList = _value;
        },
		get: function() {
            return _movieList;
		}
    });
    Object.defineProperty(_params, "fillerList", {
        set: function(_value) {
            _fillerList = _value;
        },
		get: function() {
            return _fillerList;
		}
    });
    Object.defineProperty(_params, "wheelXInterval", {
        set: function(_value) {
            _wheelXInterval = _value;
        },
		get: function() {
            return _wheelXInterval;
		}
    });
    Object.defineProperty(_params, "symbolYInterval", {
        set: function(_value) {
            _symbolYInterval = _value;
        },
		get: function() {
            return _symbolYInterval;
		}
    });
    Object.defineProperty(_params, "wheelBaseX", {
        set: function(_value) {
            _wheelBaseX = _value;
        },
		get: function() {
            return _wheelBaseX;
		}
    });
    Object.defineProperty(_params, "wheelBaseY", {
        set: function(_value) {
            _wheelBaseY = _value;
        },
		get: function() {
            return _wheelBaseY;
		}
    });
    
    Object.defineProperty(_params, "symbolYRef", {
        set: function(_value) {
            _symbolYRef  = _value;
        },
		get: function() {
            return _symbolYRef;
		}
    });
    Object.defineProperty(_params, "symbolXRef", {
        set: function(_value) {
            _symbolXRef  = _value;
        },
		get: function() {
            return _symbolXRef ;
		}
    });
    Object.defineProperty(_params, "wheelHeight", {
        set: function(_value) {
            _wheelHeight = _value;
        },
		get: function() {
            return _wheelHeight;
		}
    });
    Object.defineProperty(_params, "spinHeight", {
        set: function(_value) {
            _spinHeight = _value;
        },
		get: function() {
            return _spinHeight;
		}
    });
    Object.defineProperty(_params, "columns", {
        set: function(_value) {
            _columns = _value;
        },
		get: function() {
            return _columns;
		}
    });
    Object.defineProperty(_params, "rows", {
        set: function(_value) {
            _rows  = _value;
        },
		get: function() {
            return _rows ;
		}
    });
    Object.defineProperty(_params, "result", {
        set: function(_value) {
            _result = _value;
        },
		get: function() {
            return _result;
		}
    });
    
    Object.defineProperty(_params, "spinParams", {
        set: function(_value) {
            _spinParams = _value;
        },
		get: function() {
            return _spinParams;
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
    
    
    Object.defineProperty(_params, "spinTime", {
        set: function(_value) {
            _spinTime = _value;
        },
		get: function() {
            return _spinTime;
		}
    });
    Object.defineProperty(_params, "wheelStartTime", {
        set: function(_value) {
            _wheelStartTime = _value;
        },
		get: function() {
            return _wheelStartTime;
		}
    });
    Object.defineProperty(_params, "allWheels", {
        set: function(_value) {
            _allWheels = _value;
        },
		get: function() {
            return _allWheels;
		}
    });
    Object.defineProperty(_params, "symbolsForDelay", {
        set: function(_value) {
            _symbolsForDelay = _value;
        },
		get: function() {
            return _symbolsForDelay;
		}
    });
    Object.defineProperty(_params, "linemap", {
        set: function(_value) {
            _linemap = _value;
        },
		get: function() {
            return _linemap;
		}
    });
    Object.defineProperty(_params, "wheelStoppedCount", {
        set: function(_value) {
            _wheelStoppedCount = _value;
        },
		get: function() {
            return _wheelStoppedCount;
		}
    });
    
    
    var SlotReel = Class.extend({
        init: function(_slotThemeValue){
            _this = this;
            
            _slotTheme = _slotThemeValue;
            _stage = _slotThemeValue.params.animatedSymbolStage;
            
            _animatedContainer = _slotThemeValue.params.animatedContainer;
            
            _this = this;
            
            this.params = _this.getParams();
            
            _spinParams = [];
            
            _symbolsForDelay = new Array();
            
            _this.setDefaults();
        },
        getParams: function(){
            return _params;
        }, 
        setDefaults: function(){
            /*NEW CANVAS*/
            _this.newCanvas = document.createElement('canvas');
            _this.newCanvas.id     = "wheelCanvas";
            _this.newCanvas.width  = parseInt(_wheelXInterval * _columns);
            _this.newCanvas.height = _wheelHeight;
            
            //console.log(_this.newCanvas.width + '   ' + _this.newCanvas.height);
            document.getElementById("wheelWrapper").appendChild(this.newCanvas);
            _stageWheel = new createjs.Stage(_this.newCanvas);
            createjs.Ticker.setFPS(10);
            //////////////////////////////////////////////////////
            
            
            
            _imagePool = new ImagePool(50, 3, _symbolList, _symbolCode, _movieList,_slotTheme);
            _allWheels = new Array();
            
            _wheelSpinMode = WheelSpinMode.params();
            
            _this.showDefaultResult();
            
            /*
            - _spinParams should follow this format
            - _wheelSpinMode.SPIN_INTRO
            - _wheelSpinMode.ON_SPIN
            - _wheelSpinMode.BOUNCING - can push as many bouncing as you want to get the desired effect
            - _wheelSpinMode.BOUNCING_END - should always be last
            */
            if(_spinParams.length == 0){
               _spinParams[0] = {moveInterval:10, direction:2, targetY: -250, mode: _wheelSpinMode.SPIN_INTRO};
                _spinParams[1] = {moveInterval:40, direction:1, targetY: 0, mode: _wheelSpinMode.ON_SPIN};
                _spinParams[2] = {moveInterval:20, direction:1, targetY: -100, mode: _wheelSpinMode.BOUNCING};
                _spinParams[3] = {moveInterval:10, direction:2, targetY: -180, mode: _wheelSpinMode.BOUNCING};
                _spinParams[4] = {moveInterval:5, direction:1, targetY: 0, mode: _wheelSpinMode.BOUNCING_END};
            }
                
            if(_spinTime == undefined){
                _spinTime = 20;
            }
            if(_wheelStartTime == undefined){
                _wheelStartTime = 300;
            }
            
            for (var i = 0; i < _columns; i++)
			{
                var _w = new Wheels(_rows, _wheelHeight, _spinHeight, _wheelXInterval, _symbolYInterval, _symbolXRef, _symbolYRef, _symbolList, _symbolCode, _imagePool, i,_slotTheme, _this);
                _w.updateSpinParams(_spinParams);
                _w.updateResult(_result[i]);
                //_w.setDefaults(_wheelBaseX, _wheelBaseY);
                _w.setDefaults((i * _wheelXInterval) + _wheelBaseX, _wheelBaseY);    
                _allWheels.push(_w);
			}
            
        },
        
        ///////////// TIMEOUTS ///////////////////
        onAutoStop: function(){
            ////console.log('TIMEOUT');
            clearTimeout(_timeoutTimer);
            _slotTheme.doSlotThemeEvents({type:'TIMEOUT'});
            _this.showDefaultResult();
            _this.stop();
            
            //console.log('AUTO STOP');
        },
        
        ///////////// SPINS //////////////////////
        onSpin: function(){
			_this.stopAllAnimations();
            _reelStillSpinning = true;
            _wheelStoppedCount = 0;
            _timeoutCounter = 0;
            _result = null;
            _totalWheelResultOut = 0;
            _wheelStarted = 0;
            
			for (var i = 0; i < _columns; i++)
			{
                _allWheels[i].onSpin();
			}
            
            _moveIntroTimer = setInterval(_this.onStartWheel, _wheelStartTime );
            _moveWheelTimer = setInterval(_this.onMoveWheel, _spinTime );
            
            _timeoutTimer = setTimeout(_this.onAutoStop, _timeoutMaxTime );
            
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", _stageWheel);
		},
        onStartWheel: function(){
            //_spinParams = { moveInterval:10, direction:2, targetY: -250 };
            //_allWheels[_wheelStarted].updateSpinParams(_spinParams, _wheelSpinMode.SPIN_INTRO);
            _wheelStarted++;
			if (_wheelStarted == _columns)
			{
				clearInterval(_moveIntroTimer);
			}
        },
        onSpinResult: function(_resultSpin)
		{
            clearTimeout(_timeoutTimer);
            _result = _resultSpin;
            if (_totalWheelResultOut == _columns)
			{
				_this.stop();
			}
            
            if(_symbolsForDelay.length > 0){
                _this.checkAnticipation();
            }
		},
        onMoveWheel: function()
		{
            for (var i = 0; i < _wheelStarted; i++)
			{
                _allWheels[i].moveWheel();
			}
            //_stage.update();
		},
        stop: function(){
            for (var i = 0; i < _columns; i++)
			{
				_allWheels[i].updateResult(_result[i]);
			}
            
            _stopIndex = 0;
            _moveStopTimer = setInterval(_this.onStopWheel, _defaultNormalStop );
        },
        checkWheelEvent: function(_data){
            switch(_data.type){
                case 'ON_RESULT_OUT':
                    _totalWheelResultOut++;
                    if (_totalWheelResultOut == _columns)
					{
						//if result has already entered before all animations are out of the stage, start stopping reels
                        if (_result != undefined)
						{
							_this.stop();
						}
					}
                    break;
                case 'ON_STOP':
                    _wheelStoppedCount++;

                    //dont bother checking if it has no anticipation
                    var hasAnticipation = false;
                    var allResult;
                    for (param in _anticipationStatus) {
                        var statusParam = _anticipationStatus[param];
                        var ar;
                        if (statusParam.status[_wheelStoppedCount] == 'Lost' && statusParam.hasAnticipation == true) {
                            statusParam.hasAnticipation = false;

                            //remove anticipation elements on reel.
                            if (statusParam.stacked == false) {
                                _this.anticipationLost({
                                    positions: statusParam.anticipationPositions[_wheelStoppedCount - 1].toString().split(','),
                                    code: param,
                                    statusParam: statusParam
                                });
                            } else {
                                //only cycle if its stacked
                                for (allResult = 0; allResult < statusParam.anticipationPositions[_wheelStoppedCount - 1].length; allResult++) {
                                    _this.anticipationLost({
                                        positions: statusParam.anticipationPositions[_wheelStoppedCount - 1][allResult].toString().split(','),
                                        code: param,
                                        wheelIndex: _wheelStoppedCount
                                    });
                                }
                            }
                        } else if (statusParam.status[_wheelStoppedCount] == 'Anticipation') {
                            if (statusParam.hasAnticipation == true) {
                                hasAnticipation = true;

                                //add anticipation elements on reel.
                                if (statusParam.stacked == false) {
                                    _this.anticipationFound({
                                        positions: statusParam.anticipationPositions[_wheelStoppedCount].toString().split(','),
                                        code: param
                                    });
                                } else {
                                    //only cycle if its stacked
                                    for (allResult = 0; allResult < statusParam.anticipationPositions[_wheelStoppedCount].length; allResult++) {
                                        _this.anticipationFound({
                                            positions: statusParam.anticipationPositions[_wheelStoppedCount][allResult].toString().split(','),
                                            code: param,
                                            wheelIndex: _wheelStoppedCount,
                                            statusParam: statusParam
                                        });
                                    }
                                }
                            }
                        }
                    }
                    if (hasAnticipation == true) {
                        _this.playWheelAnimation({
                            willPlay: true,
                            wheelIndex: _wheelStoppedCount
                        });
                    } else {
                        _this.playWheelAnimation({
                            willPlay: false
                        });
                    }



                    if (_wheelStoppedCount == _columns) {
                        clearInterval(_moveIntroTimer);
                        clearInterval(_moveWheelTimer);
                        clearInterval(_moveStopTimer);
                        _delayDispatchTimer = setTimeout(_this.onDelayDispatch, 500);

                        _reelStillSpinning = false;
                    }


                    break;
            }
        },
        onDelayDispatch: function(){
            clearTimeout(_delayDispatchTimer);
            createjs.Ticker.removeEventListener("tick", _stageWheel);
            _slotTheme.doSlotThemeEvents({type:'STOP'});  
        },
        onStopWheel: function()
		{
           
			clearInterval(_moveStopTimer);
            
			if (_stopIndex >= _columns)
			{
                return;
			}
			_allWheels[_stopIndex].stopWheel(_wheelSpinMode.BEGIN_STOP);
			_stopIndex++;
            
            //check if it will anticipate.
            if(_wheelStatus != undefined && _wheelStatus[_stopIndex] == 'Anticipation'){
                _moveStopTimer = setInterval(_this.onStopWheel, _anticipationTime );        
            }else {
                _moveStopTimer = setInterval(_this.onStopWheel, _defaultNormalStop );        
            }
        },
        
        errorStopSpin: function(){
            _this.showDefaultResult();
			clearInterval(_moveIntroTimer); 
            clearInterval(_moveWheelTimer); 
            clearInterval(_moveStopTimer); 
            clearInterval(_delayDispatchTimer);
            clearTimeout(_timeoutTimer);
            
            for (var i = 0; i < _allWheels.length; i++) {
				stopIndex = i + 1;
                _allWheels[i].updateResult(_result[i]);
				_allWheels[i].showDefaultResult();
				
			}
            _reelStillSpinning = false;
			//this.dispatchEvent(new ReelEvent(ReelEvent.ON_DEFAULT_STOP));
		},
        
		  ///////////// END OF SPINS //////////////////////  
        
        
        ////////////// WINNING ANIMATIONS ////////////////////
        //_sendData if ever theres a need to manipulate the targetData from animation. use true on 4th parameter
        setSymbolAnimation: function(_winData,_loseAlpha,_wonAlpha,_sendData){
            _this.stopAllAnimations();
            if(_loseAlpha == undefined){
                _loseAlpha = 0.5;   
            }
            if(_wonAlpha == undefined){
                _wonAlpha = 1;
            }
            
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", _stage);
            
            _allAnimatedMc = new Array();
            matrix = _winData.matrix;
            for (var col = 0; col < _columns; col++)
			{
				for (var rw = 0; rw < _rows; rw++)
				{
					_animW = _allWheels[col];
                    targetData = _animW.getItemAt(rw); 
					codeIndex = targetData.codeIndex;
                    targetData.object.alpha = _loseAlpha;
                    if (matrix[col][rw] == 1 || matrix[col][rw] == 2)
					{
                        targetData.object.alpha = _wonAlpha;
                        targetMc = _imagePool.getAnimatedMc(_symbolCode[codeIndex]); 
                        animatedData = {mc: targetMc, codeIndex: _symbolCode[codeIndex], column: col, row: rw};
                        _allAnimatedMc.push(animatedData);
                        if(_sendData == true){
                            targetMc.playAnimation(_animatedContainer,(_wheelXInterval * col) + _wheelBaseX,targetData.y + _wheelBaseY,targetData);
                        }else{
                            targetMc.playAnimation(_animatedContainer,(_wheelXInterval * col) + _wheelBaseX,targetData.y + _wheelBaseY);
                        }
                    }
                }
            }
            
            _stage.update();
            
            for(var i = 0; i < _allWheels.length; i++){
                _allWheels[i].stage.update();
            }
            
            
        },
        stopAllAnimations: function(){
           
            for (var col = 0; col < _columns; col++)
			{
				for (var rw = 0; rw < _rows; rw++)
				{
					_animW = _allWheels[col];
                    targetData = _animW.getItemAt(rw); 
					targetData.object.alpha = 1;
				}
			}
            
            if (_allAnimatedMc != undefined || _allAnimatedMc != null && _allAnimatedMc.length > 0)
			{
				for (var i = 0; i < _allAnimatedMc.length; i++)
				{
                    _allAnimatedMc[i].mc.resetAnimation();
					_imagePool.disposeAnimatedMc(_allAnimatedMc[i].mc, _allAnimatedMc[i].codeIndex);
                    
				}
				_allAnimatedMc = null;
			}
            
            for(var i = 0; i < _allWheels.length; i++){
                _allWheels[i].stage.update();
            }
            
            createjs.Ticker.removeEventListener("tick", _stage);
            _stage.update();
		},
        showDefaultResult: function(){
			var fill1 = ["A", "G", "C", "E"];
			var fill2 = ["F", "B", "D"];
			var _res = new Array();
            for (var c = 0; c < _columns; c++)
			{
				var tempArray1;
				if (c % 2 == 0)
					tempArray1 = fill1.concat();
				else
					tempArray1 = fill2.concat();
				var col = new Array();
				for (var i = 0; i < _rows; i++)
				{
					var _r;
					_r = Math.floor(Math.random() * tempArray1.length);
					col.push(tempArray1[_r]);
					tempArray1.splice(_r, 1);
				}
				_res.push(col);
			}
			_result = _res;
		},
         ////////////// END OF WINNING ANIMATIONS ////////////////////
        
        
         ////////////// ANTICIPATION //////////////////// 
        checkAnticipation: function(){
            ////console.log(_symbolsForDelay);
            ////console.log(_result);
            _anticipationStatus = {};
            _wheelStatus = new Array('none','none','none','none','none');
            //_result = [['M','A','A'],['M','W','A'],['A','A','A'],['W','S','C'],['A','A','C']]
            //_result = [['A','A','A'],['M','W','S'],['A','S','A'],['W','B','C'],['A','A','C']]
            //_result = [['M','A','A'],['M','A','A'],['A','B','A'],['S','B','C'],['A','A','C']]
            //_result = [['S','A','A'],['A','S','A'],['A','B','S'],['S','B','C'],['A','S','C']]
            //_result = [['M','A','B'],['M','B','C'],['A','B','C'],['A','B','C'],['A','B','C']]
            //_result = [['M','A','B'],['M','B','C'],['M','B','C'],['A','B','C'],['A','B','C']]
            //_result = [['M','M','M'],['A','B','C'],['A','B','C'],['A','B','C'],['A','B','C']]
            //_result = [['M','M','M'],['M','M','M'],['A','B','C'],['A','B','C'],['A','B','C']]
            //_result = [['M','M','M'],['M','M','M'],['M','M','M'],['A','B','C'],['A','B','C']]
            //_result = [['M','M','M'],['M','M','M'],['M','M','M'],['M','M','M'],['A','B','C']]
            //_result = [['M','M','M'],['M','M','M'],['M','M','M'],['M','M','M'],['M','M','M']]
            
            var resultFound;
            
            for(var r = 0; r < _result.length; r++){
                for(var s = 0; s < _symbolsForDelay.length; s++){
                    
                    //search for symbol in result
                    resultFound = AppUtils.findAllIndexInArray(_symbolsForDelay[s].code,_result[r]);
                    
                    if(_anticipationStatus[_symbolsForDelay[s].code] == undefined){
                        _anticipationStatus[_symbolsForDelay[s].code] = {};   
                        _anticipationStatus[_symbolsForDelay[s].code]['position'] = new Array();//all codes found in the results
                        _anticipationStatus[_symbolsForDelay[s].code]['length'] = 0; //how many symbols founds
                        _anticipationStatus[_symbolsForDelay[s].code]['consecutive'] = true; //is it consecutive, only used for line type.
                        _anticipationStatus[_symbolsForDelay[s].code]['status'] = new Array(); //status per wheel stop.
                        _anticipationStatus[_symbolsForDelay[s].code]['stacked'] = false;//dont run the code cycle under checkWithinMinimum if its not stack.
                        _anticipationStatus[_symbolsForDelay[s].code]['anticipationPositions'] = new Array([],[],[],[],[]);//positions of symbols when it will anticipate
                        _anticipationStatus[_symbolsForDelay[s].code]['hasAnticipation'] = false;//if it will anticipate or not.
                    }
                    
                    
                    if(resultFound != null && resultFound.length > 1){
                        //found more than 1 in result. probably stacked type use cycle code under cycleAllPossible although its heavy resources
                        _anticipationStatus[_symbolsForDelay[s].code]['stacked'] = true;   
                    }

                    
                    //////////////-----LINE-----///////////////
                    if(_symbolsForDelay[s].type == 'LINE'){ 
                        //increment results found.
                        if(resultFound != null){
                            ////console.log('resultFound:'+resultFound);
                            ////console.log('consecutive:'+_anticipationStatus[_symbolsForDelay[s].code]['consecutive']);
                            
                            if(_anticipationStatus[_symbolsForDelay[s].code]['consecutive'] == true){
                                //check if length is at minimum
                                if(parseInt(_anticipationStatus[_symbolsForDelay[s].code]['length']) < (parseInt(_symbolsForDelay[s].minimum) - 1)){
                                    _anticipationStatus[_symbolsForDelay[s].code]['status'][r] = 'Possible';
                                }else {
                                    _this.checkWithinMinimum(s,r);
                                }
                            }else {
                                //even if result is found if its not consecutive consider it as lost
                                _anticipationStatus[_symbolsForDelay[s].code]['status'][r] = 'Lost';
                            }
                            _anticipationStatus[_symbolsForDelay[s].code]['length']++;
                        }else {
                            if(_anticipationStatus[_symbolsForDelay[s].code]['consecutive'] == true){
                               //consecutive broke. still need to anticipate in next wheel as user doesnt know its broken yet. dont anticipate after next
                                _this.checkWithinMinimum(s,r);
                                _anticipationStatus[_symbolsForDelay[s].code]['consecutive'] = false;
                            }else {
                                //its line so should be consecutive, once its nulled consider it as lost
                                _anticipationStatus[_symbolsForDelay[s].code]['status'][r] = 'Lost';
                            }    
                        }
                        
                    //////////////-----SCATTER-----/////////////////////
                    }else if(_symbolsForDelay[s].type == 'SCATTER'){
                        if(_symbolsForDelay[s].wheelPosition.length == 5){
                            //ALL WHEEL SCATTER
                            ////console.log('ALL WHEEL SCATTER');
                            ////console.log(resultFound);
                            _this.checkWithinMinimum(s,r);
                            if(resultFound != null){
                                _anticipationStatus[_symbolsForDelay[s].code]['length']++;        
                            }
                        }else {
                            //SPECIFIC WHEEL SCATTER
                            ////console.log('SPECIFIC WHEEL SCATTER');
                            ////console.log('resultFound:'+resultFound);
                            if(resultFound != null){
                                if(resultFound.length == _result[r].length){
                                    //probably under expanding wild. no need to anticipate.  
                                    ////console.log('EQUAL TO ROWS');
                                    _anticipationStatus[_symbolsForDelay[s].code]['status'][r] = 'Possible';
                                    return;
                                }else {
                                    //check if its within specified wheel index.
                                    ////console.log('FOUND');
                                    _this.checkWithinMinimum(s,r);
                                    for(var wi = 0; wi < _symbolsForDelay[s].wheelPosition.length; wi++){
                                        if(parseInt(_symbolsForDelay[s].wheelPosition[wi] - 1) == r){
                                            ////console.log('FOUND WITHIN');   
                                            _anticipationStatus[_symbolsForDelay[s].code]['length']++;
                                        }
                                    }
                                    
                                }
                            }else {
                                ////console.log('NONE FOUND');
                                //even if nothing is found if its been declared by checkWithinMinimum as it will anticipate here, dont override it.
                                if(_anticipationStatus[_symbolsForDelay[s].code]['status'][r] != 'Anticipation' && _anticipationStatus[_symbolsForDelay[s].code]['status'][r] != 'Lost'){
                                    _anticipationStatus[_symbolsForDelay[s].code]['status'][r] = 'Possible';
                                }else {
                                    //checkWithinMinimum told it to anticipate here, tell it to hold the new updated position
                                    _anticipationStatus[_symbolsForDelay[s].code]['anticipationPositions'][r].push(String(_anticipationStatus[_symbolsForDelay[s].code]['position']));
                                }
                            }
                        }
                    }
                    
                    //hold positions found
                    if(resultFound == null){
                        _anticipationStatus[_symbolsForDelay[s].code]['position'][r] = -1;   
                    }else{
                        _anticipationStatus[_symbolsForDelay[s].code]['position'][r] = resultFound;
                    }
                    
                }
            }
            
            ////console.log('END');
            ////console.log(_anticipationStatus);
        },
        
        checkWithinMinimum: function(_s,_r){
            //check whats the minimum line needed to win the conbination vs lines current being played
            ////console.log('-------------');
            ////console.log(String(_anticipationStatus[_symbolsForDelay[_s].code]['position']));
            ////console.log(_anticipationStatus[_symbolsForDelay[_s].code]['position'].length);
            var minimumLine;
            if (_anticipationStatus[_symbolsForDelay[_s].code]['stacked'] == false){
                minimumLine = LineMap.getMinimumLineNumberMatch(String(_anticipationStatus[_symbolsForDelay[_s].code]['position']),_linemap);
                _anticipationStatus[_symbolsForDelay[_s].code]['anticipationPositions'][_r].push(String(_anticipationStatus[_symbolsForDelay[_s].code]['position']));
            }else {
                minimumLine = _this.cycleAllPossible(_s,_r);
            }
            
            if(_symbolsForDelay[_s].type == 'LINE'){
                ////console.log('minimumLine:'+minimumLine);
                if(parseInt(minimumLine) <= _slotTheme.params.line && parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length']) >= (parseInt(_symbolsForDelay[_s].minimum) - 1)){
                    //within minimum line needed anticipate
                    _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Anticipation';
                    _anticipationStatus[_symbolsForDelay[_s].code]['hasAnticipation'] = true;
                    _wheelStatus[_r] = 'Anticipation';
                }else {
                    //current line is below minimum needed to win
                    _anticipationStatus[_symbolsForDelay[_s].code]['consecutive'] = false;
                    _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Lost';
                }
            }else if(_symbolsForDelay[_s].type == 'SCATTER'){
                if(_symbolsForDelay[_s].wheelPosition.length == 5){
                    //ALL WHEEL SCATTER
                    if(parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length']) >= (parseInt(_symbolsForDelay[_s].minimum) - 1)){
                        //within minimum number needed for anticipation
                        _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Anticipation';
                        _anticipationStatus[_symbolsForDelay[_s].code]['hasAnticipation'] = true;
                        _wheelStatus[_r] = 'Anticipation';
                    }else {
                        //not yet
                        _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Possible';
                    }
                }else {
                    //SPECIFIC WHEEL SCATTER  
                    
                    ////console.log('++++++++++++');
                    ////console.log(parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length']) + ':::'+ (parseInt(_symbolsForDelay[_s].minimum) - 1));
                    ////console.log('++++++++++++');
                    ////console.log(parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length'] + 1));
                    ////console.log((parseInt(_symbolsForDelay[_s].minimum) - 1))
                    if(parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length'] + 1) >= (parseInt(_symbolsForDelay[_s].minimum) - 1)){
                        //within minimum number needed for anticipation
                        ////console.log('==================');
                        if(_anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] != 'Anticipation' && _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] != 'Lost'){
                            _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Possible';
                        }
                        
                        //tell all succeeding pushed wheel to anticipate. 
                        for(var wa = 0; wa < _symbolsForDelay[_s].wheelPosition.length; wa++){
                            ////console.log(parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1)+'////'+_r+'||||'+_symbolsForDelay[_s].wheelPosition[_symbolsForDelay[_s].wheelPosition.length - 1]);
                            ////console.log(parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1) >= _r);
                            if(parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1) > _r){
                                ////console.log('ADDING:'+parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1));
                                _anticipationStatus[_symbolsForDelay[_s].code]['status'][parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1)] = 'Anticipation';
                                _wheelStatus[parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1)] = 'Anticipation';
                            }
                        }
                        
                        //tell all wheels above the last wheel to not anticipate.
                        for(wa = _symbolsForDelay[_s].wheelPosition[_symbolsForDelay[_s].wheelPosition.length - 1] + 1; wa <= _result.length; wa++){
                            _anticipationStatus[_symbolsForDelay[_s].code]['status'][wa - 1] = 'Lost';
                        }
                        
                        //_symbolsForDelay[_s].wheelPosition[_symbolsForDelay[_s].wheelPosition.length - 1] >= parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1)
                        //_anticipationStatus[_symbolsForDelay[_s].code]['status'][parseInt(_symbolsForDelay[_s].wheelPosition[wa] - 1)] = 'Lost';
                        
                        _anticipationStatus[_symbolsForDelay[_s].code]['hasAnticipation'] = true;
                    }else {
                        //not yet
                        ////console.log('@@@@@@@@@@@@@@@@');
                        ////console.log('NOT YET  '+ parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length']) + ':'+(parseInt(_symbolsForDelay[_s].minimum) - 1));
                        _anticipationStatus[_symbolsForDelay[_s].code]['status'][_r] = 'Possible';
                    }
                }
            }
        },
        
        anticipationFound: function(_params){
            ////console.log('ANTICIPATION FOUND');
            ////console.log(_params);
        },
        anticipationLost: function(_params){
            ////console.log('ANTICIPATION LOST');
            ////console.log(_params);
        },
        playWheelAnimation: function(_params){
            ////console.log('PLAYWHEELANIMATION');
            ////console.log(_params);
        },
       
        cycleAllPossible: function(_s,_r){
            //cycle and check all possible line combinations. code was done this way because of stackwild. although unlikely code should be able to handle combinations of up to [['M','M','M'],['M','M','M'],['M','M','M'],['M','M','M'],['M','M','M']]. will only run though here if it detected multiple instances of symbol code under 1 wheel result. dumugo ilong ko sa pagiisip kung pano iloloop ung result. 
            var str = new Array();
            var minimumLineMatch = 100;
            if(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0] != null){
                for(var a = 0; a < _anticipationStatus[_symbolsForDelay[_s].code]['position'][0].length; a++){
                    str = [];
                    if(_anticipationStatus[_symbolsForDelay[_s].code]['position'][1] != null){
                        for(var b = 0; b < _anticipationStatus[_symbolsForDelay[_s].code]['position'][1].length; b++){
                            str = [];
                            if(_anticipationStatus[_symbolsForDelay[_s].code]['position'][2] != null){
                                for(var c = 0; c < _anticipationStatus[_symbolsForDelay[_s].code]['position'][2].length; c++){
                                    str = [];
                                    if(_anticipationStatus[_symbolsForDelay[_s].code]['position'][3] != null){
                                        for(var d = 0; d < _anticipationStatus[_symbolsForDelay[_s].code]['position'][3].length; d++){
                                            str = [];
                                            if(_anticipationStatus[_symbolsForDelay[_s].code]['position'][4] != null){
                                                for(var e = 0; e < _anticipationStatus[_symbolsForDelay[_s].code]['position'][4].length; e++){
                                                    str = [];
                                                    str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0][a])
                                                    str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][1][b]);
                                                    str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][2][c]);
                                                    str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][3][d]);    
                                                    str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][4][e]);    
                                                    minimumLineMatch = _this.addPossibleFromStacked(str,_s,_r);
                                                }
                                            }else {
                                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0][a])
                                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][1][b]);
                                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][2][c]);
                                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][3][d]);
                                                minimumLineMatch = _this.addPossibleFromStacked(str,_s,_r);
                                            }
                                        }
                                    }else {
                                        str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0][a])
                                        str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][1][b]);
                                        str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][2][c]);
                                        minimumLineMatch = _this.addPossibleFromStacked(str,_s,_r);
                                    }
                                }
                            }else{
                                str = [];
                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0][a])
                                str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][1][b]);
                                minimumLineMatch = _this.addPossibleFromStacked(str,_s,_r);
                            }
                        }
                    }else {
                        str = [];
                        str.push(_anticipationStatus[_symbolsForDelay[_s].code]['position'][0][a])
                        minimumLineMatch = _this.addPossibleFromStacked(str,_s,_r);
                    }
                }
            }
            return minimumLineMatch;
        },
        addPossibleFromStacked: function(str,_s,_r){
            var newMinimum = LineMap.getMinimumLineNumberMatch(String(str),_linemap);
            var minimumLineMatch = 5000;
            if(newMinimum > 0){
                if(minimumLineMatch > newMinimum){
                    minimumLineMatch = newMinimum;
                }
                
            }
            
            //hold symbol positions for animation
            if(parseInt(minimumLineMatch) <= _slotTheme.params.line && parseInt(_anticipationStatus[_symbolsForDelay[_s].code]['length']) >= (parseInt(_symbolsForDelay[_s].minimum) - 1)){
                _anticipationStatus[_symbolsForDelay[_s].code]['anticipationPositions'][_r].push(String(str));
            }
            ////console.log('POSIBILITY:'+String(str) + '   ' + newMinimum);
            return minimumLineMatch;
        },
         ////////////// END OF ANTICIPATION ////////////////////
        
        
    });
	
    return SlotReel;
});