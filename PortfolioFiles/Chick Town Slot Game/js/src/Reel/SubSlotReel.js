

define(["../../html5_baseclass/View/Reel/SlotReel",
        "../../html5_baseclass/View/Reel/WheelSpinMode",
        "../Reel/ReelSymbols/AnimatedStack",
        "../Reel/ReelSymbols/AnimatedSymbolA",
        "../Reel/ReelSymbols/AnimatedSymbolB",
        "../Reel/ReelSymbols/AnimatedSymbolC",
        "../Reel/ReelSymbols/AnimatedSymbolD",
        "../Reel/ReelSymbols/AnimatedSymbolE",
        "../Reel/ReelSymbols/AnimatedSymbolF",
        "../Reel/ReelSymbols/AnimatedSymbolG",
        "../Reel/ReelSymbols/AnimatedSymbolH",
        "../Reel/ReelSymbols/AnimatedSymbolI",
        "../Reel/ReelSymbols/AnimatedSymbolJ",
        "../Reel/ReelSymbols/AnimatedSymbolK",
        "../Reel/ReelSymbols/AnimatedSymbolM",
        "../Reel/ReelSymbols/AnimatedSymbolS",
        "../Reel/ReelSymbols/AnimatedSymbolW"], function(SlotReel,WheelSpinMode,
                                                         AnimatedStack,
                                                         AnimatedSymbolA,
                                                         AnimatedSymbolB,
                                                         AnimatedSymbolC,
                                                         AnimatedSymbolD,
                                                         AnimatedSymbolE,
                                                         AnimatedSymbolF,
                                                         AnimatedSymbolG,
                                                         AnimatedSymbolH,
                                                         AnimatedSymbolI,
                                                         AnimatedSymbolJ,
                                                         AnimatedSymbolK,
                                                         AnimatedSymbolM,
                                                         AnimatedSymbolS,
                                                         AnimatedSymbolW) {
    //class 
    var slotTheme;
    var frames;
    
    //others
    var _this;
    var soundManager;
    var isExpanded = false;
    var wildAnims = [1, 1, 1, 1, 1];
    var layoutManager;
    
    var SubSlotReel = SlotReel.extend({
        /*
        - The following parameters can be accessed via _this.params.
        slotTheme - slotTheme Class
        stage - stage
        reelStillSpinning - if wheels are still animating spin
        defaultNormalStop - stop time for wheel
        anticipationTime - stop time of wheel if theres an anticipation
        symbolList - static images used to show on reel
        symbolCode - symbols codes used in game
        movieList - class containing animatedsymbols
        fillerList - if you need a different images to use during spin
        wheelXInterval - horizontal gap between wheels
        symbolYInterval - vertical gap between wheels
        wheelBaseX - coordinate for adding wheels. X position of Reel.
        wheelBaseY - coordinate for adding wheels. Y position of Reel.
        symbolYRef - if using registration points
        symbolXRef - if using registration points
        wheelHeight - wheel height
        columns - how manay columns
        rows - how many rows
        result - spin results
        spinParams - spin parameters. see desc below 
        animatedContainer - a container added to slotTheme on where to play animated symbol. see slotTheme for additional dec.
        spinTime - timer for wheel spin. default is 20; - lower number smoother spin but higher cpu.
        wheelStartTime - delay for playing next wheel.
        
        --ANTICIPATION
        linemap - which line map to use. currently only has 2 values DC and CH
        anticipationTime - length of anticipation
        
        */
        init: function(_slotTheme){
            _this = this;
            this._super(_slotTheme); 
            layoutManager = _slotTheme.params.layoutManager;

        },
        setDefaults: function(){
            slotTheme = this.params.slotTheme;
            
            soundManager = slotTheme.params.soundManager; 
             
            var layoutManager = slotTheme.params.layoutManager;
            
            var assets = slotTheme.getAssetManager();
            
            mainSpriteSheets = new createjs.Sprite(slotTheme.getAssetManager().getSpriteSheetJSON('MainElementsJSON','MainElements'));
            
            var Symbol_A = mainSpriteSheets.clone();
            Symbol_A.gotoAndStop('static_A');
            var Symbol_B = mainSpriteSheets.clone();
            Symbol_B.gotoAndStop('static_B');
            var Symbol_C = mainSpriteSheets.clone();
            Symbol_C.gotoAndStop('static_C');
            var Symbol_D = mainSpriteSheets.clone();
            Symbol_D.gotoAndStop('static_D');
            var Symbol_E = mainSpriteSheets.clone();
            Symbol_E.gotoAndStop('static_E');
            var Symbol_F = mainSpriteSheets.clone();
            Symbol_F.gotoAndStop('static_F');
            var Symbol_G = mainSpriteSheets.clone();
            Symbol_G.gotoAndStop('static_G');
            var Symbol_H = mainSpriteSheets.clone();
            Symbol_H.gotoAndStop('static_H');
            var Symbol_I = mainSpriteSheets.clone();
            Symbol_I.gotoAndStop('static_I');
            var Symbol_J = mainSpriteSheets.clone();
            Symbol_J.gotoAndStop('static_J');
            var Symbol_K = mainSpriteSheets.clone();
            Symbol_K.gotoAndStop('static_K');
            var Symbol_M = mainSpriteSheets.clone();
            Symbol_M.gotoAndStop('static_M');
            var Symbol_S= mainSpriteSheets.clone();
            Symbol_S.gotoAndStop('static_S');
            var Symbol_W = mainSpriteSheets.clone();
            Symbol_W.gotoAndStop('static_W');
            
            this.params.symbolList = [
                Symbol_A,
                Symbol_B,
                Symbol_C,
                Symbol_D,
                Symbol_E,
                Symbol_F,
                Symbol_G,
                Symbol_H,
                Symbol_I,
                Symbol_J,
                Symbol_K,
                Symbol_M,
                Symbol_S,
                Symbol_W
			];
            this.params.movieList = [
                AnimatedSymbolA,
                AnimatedSymbolB,
                AnimatedSymbolC,
                AnimatedSymbolD,
                AnimatedSymbolE,
                AnimatedSymbolF,
                AnimatedSymbolG,
                AnimatedSymbolH,
                AnimatedSymbolI,
                AnimatedSymbolJ,
                AnimatedSymbolK,
                AnimatedSymbolM,
                AnimatedSymbolS,
                AnimatedSymbolW
			];
           _this.params.symbolCode = new Array ("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "S","W");
            /** END OF ALL GAME TYPE TESTER **/
             
			_this.params.wheelHeight = layoutManager.params.wheelHeight;
			_this.params.wheelXInterval = layoutManager.params.wheelXInterval;
			_this.params.symbolYInterval = layoutManager.params.symbolYInterval;
			_this.params.columns = 5;
			_this.params.rows = 3;
			_this.params.symbolXRef = 0;
			_this.params.symbolYRef = 0;
            
            //wheel is no longer a display object, need a base coordinate for adding wheels
            _this.params.wheelBaseX = layoutManager.params.wheelBaseX;
            _this.params.wheelBaseY = layoutManager.params.wheelBaseY;
            
            /**
                SPIN PARAMETER. just one array now.
            - _spinParams should follow this format
            - _wheelSpinMode.SPIN_INTRO
            - _wheelSpinMode.ON_SPIN
            - _wheelSpinMode.BOUNCING - can push as many bouncing as you want to get the desired effect
            - _wheelSpinMode.BOUNCING_END - should always be last
            */
            
            var _spinParams = {};
            var _wheelSpinMode = WheelSpinMode.params();
            _this.params.spinParams[0] = {moveInterval:10, direction:2, targetY: -150, mode: _wheelSpinMode.SPIN_INTRO};
            _this.params.spinParams[1] = {moveInterval:40, direction:1, targetY: 0, mode: _wheelSpinMode.ON_SPIN};
            _this.params.spinParams[2] = {moveInterval:20, direction:1, targetY: -80, mode: _wheelSpinMode.BOUNCING};
            _this.params.spinParams[3] = {moveInterval:10, direction:2, targetY: -160, mode: _wheelSpinMode.BOUNCING};
            _this.params.spinParams[4] = {moveInterval:5, direction:1, targetY: 0, mode: _wheelSpinMode.BOUNCING_END};
           
            _this.params.spinHeight = layoutManager.params.spinHeight;
            /*
                timers parameters
                spinTime = timer for wheel spin. default is 20; - lower number smoother spin but higher cpu.
                wheelStartTime - delay for playing next wheel.
                defaultNormalStop - delay for stopping next wheel.
                defaultSuspenceStopTimer - for anticipation *no code yet.
            */
            _this.params.spinTime = 15;
            _this.params.wheelStartTime = 300;
            _this.params.defaultNormalStop = 300;
 
            /*
                Anticipation parameters
                
            */
            _this.params.anticipationTime = 1000;//length of anticipation
            _this.params.linemap = 'DC'; //which line map to use. currently only has 2 values DC and CH
            
            _this.params.symbolsForDelay[0] = {code:"M",type:"LINE",minimum:2,wheelPosition:[1,2,3,4,5]};
            _this.params.symbolsForDelay[1] = { code:"S", type:"SCATTER", minimum:2, wheelPosition:[1,2,3,4,5] };//for scatter type bunos push only the wheel in which they are found
            this._super();  
        },
        setFrames: function(_frames){
           if(frames == undefined || frames == null){
                frames = _frames;
            } 
        },
        //overriden because of how i animate spin
        checkWheelEvent: function(_data){
            if(_data.type == 'ON_STOP'){
                soundManager.playSpinStop();
            }
            this._super(_data);
        },
        animateStackWild: function(_winData, _stackContainer){
            var stackMatrix = _winData.matrix;
            var stackContainer = _stackContainer;
            var wildrow = new Array();
            var targetMCs = new Array();
            var targetX;
            var targetY;
            
            for(var col=0; col<5; col++){
                for(var rw=0; rw<3; rw++){
                    _animW = this.params.allWheels[col];
                    targetData = _animW.getItemAt(rw);
                    codeIndex = targetData.codeIndex;
                    if (stackMatrix[col][rw] == 1 || stackMatrix[col][rw] == 2)
					{
                        if(wildAnims[col]==2) continue;
                        
                        if(codeIndex==13){
                            wildrow =[];
                            for (var rowCheck = 0; rowCheck < 3; rowCheck++) {
                                var wildTarget=_animW.getItemAt(rowCheck);
								if (wildTarget.codeIndex == 13) wildrow.push(rowCheck)	
							}
                            
                            targetMCs[targetMCs.length] = new AnimatedStack(slotTheme, stackContainer); //will use object pooling here
                            wildAnims[col]=2;
                            
                            if (wildrow.length==2) 
							{
                                targetX = (col * (_this.params.wheelXInterval-layoutManager.getValue("stackWildXOffset"))) + _this.params.wheelBaseX;
                                targetY = (_this.params.symbolYInterval * wildrow[0]) + _this.params.wheelBaseY;
                                targetMCs[targetMCs.length-1].animate2Stacks(targetX, targetY);
                            }else if(wildrow.length==3){
                                targetX = (col * (_this.params.wheelXInterval-layoutManager.getValue("stackWildXOffset"))) + _this.params.wheelBaseX;
                                targetY = (_this.params.symbolYInterval * wildrow[0]) + _this.params.wheelBaseY;
                                targetMCs[targetMCs.length-1].animate3Stacks(targetX, targetY);
                            }
                            
                        }
                    }
                }
            }  
        },
         
        removeStackWild: function(_stackContainer){
            var stackContainer = _stackContainer;
            wildAnims = [1, 1, 1, 1, 1];
            _stackContainer.removeAllChildren(); 
        },
         
        /*
        ANTICIPATION
            _params values:
              - code - symbol code
              - positions - array containing the positions of symbol per wheel. 
                 - 0 = top, 1=mid,2=bottom, -1 = none found(-1 only applicable for scatter type).
                 
                playWheelAnimation
              - wheelIndex - which wheel will anticipate
              - willPlay - boolean. 
                   - true wheel will anticipate. 
                   - false wheel will not anticipate.
        */
        anticipationFound: function(_params){
            frames.showAnticipationFrame(_params);
        },
        anticipationLost: function(_params){
            frames.removeAnticipationFrame(_params);
        },
        playWheelAnimation: function(_params){
            if(_params.willPlay == false){
                frames.removeAllAnticipation();
            }else{
                frames.showAnticipationWheel(_params.wheelIndex);
            }
        },
        
    });
	
    return SubSlotReel;
});