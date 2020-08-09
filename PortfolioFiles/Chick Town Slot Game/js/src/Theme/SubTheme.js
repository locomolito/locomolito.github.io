
define(["../../html5_baseclass/View/Theme/Theme",
       "../Controls/SubControls",
       "../Controls/SubBetInfo",
       "../Jackpot/SubJackpotDisplay",
       "../Reel/SubPaylines",
       "../Reel/SubSlotReel",
       "../Reel/ReelSymbols/AnimatedStack",
       "../../html5_baseclass/Utils/AppUtils",
       "../Theme/SubPaytable",
       "../Sound/SubSoundManager",
       "../Bonus/SubBonus",
       "../Theme/SubJackpotAnimation",
       "../Theme/SubFrames",
       "../Theme/FsSummary",
       "../Theme/SubParticle",
       "../Theme/SubBigWin",
       "../Theme/SubLayoutManager"],       function(Theme,SubControls,SubBetInfo,SubJackpotDisplay,SubPaylines,SubSlotReel,AnimatedStack,AppUtils,SubPaytable,SubSoundManager,SubBonus,SubJackpotAnimation,SubFrames,FsSummary,SubParticle,SubBigWin,SubLayoutManager) {
    
    //IMG
    var mainBG;
    var reelBG;
      
    
    //CLASS
    var controls;
    var betInfo;
    var jackpotDisplay;
    var paylines;
    var slotReel;
    var paytable = null;
    var soundManager;
    var bonus = null;
    var assets;//asset manager class. call instance by this.params.assets
    var header;
    var frames;
    var jackpotAnimation;
    var bigWinAnim = null;
    var fsSummary;
    var layoutManager;
    
    //OTHERS
    var stage;
    var elementsContainer;//container for normal elements
    var featuresContainer;//bonus,summary,paytable container
    var mainSpriteSheets;
    var _this;
    
    //Theme
    var currentWinIndex = -1;
    var allWinningLines;
    var themeTimer;
    var isAnimationLoop = false;
    var isFreeMode = false;
    
    var stackWildContainer;
    var fsTopInfo, fsText, fmText;
    var fsWonAmount=0;
    
    var stackWildStage;
    var fsInfoStage;
    var anticipateStage;
    
    var SubTheme = Theme.extend({
        init: function(){
            _this = this;
            this._super();
        },
        
        //_assets contains all assets preloaded in asset manager.
        startGame: function(){
            //console.log('THEME START GAME');
            
            /*NOTES:
                - call paramaters from baseclass using this.params.[variable name]
                - call functions from base using this.[function name]
                - call super function using this._super();
                
                - '_this' --- things that involve calling functions within the same class like timers and buttons dispatch destroys the this parameters and creates a new class object which will be pointed to ['this'] all functions and functionalities will not be accessible anymore via the new this since its a totally different class object. fix it by declaring _this and holding on to the initial this parameter; wont work with multiple instances of the same class
                
                - ASSETMANAGER from loaded id. see subView
                - getSpriteSheetJSON - get spritesheet from json. 1st param = json id, 2nd param img id
                - getAsset - get loaded image
            
                - clone() seems to be lesser in resources than constantly cropping and creating sprites.
                
                - disableAllButtons(boolean) - will disable all buttons. false if you want to disable stopAutoSpin.
                - enableAllButtons() - will enable all buttons.
                
                - you can use the AppUtils class to convert to number and insert comma. just define it first.
                ../../html5_baseclass/Utils/AppUtils
                AppUtils.toNumeric('value');
                AppUtils.insertComma('value');
                
                
                - to access objects from main Theme Class use this.params.['object list below']: 
                - this are also available even in other classes just call them using slotTheme.params.['object'].
                stage - current stage - can be called from other classes using slottheme.params.stage;
                assets - Asset Manager class
                view - View class
                controls - Controls class
                betInfo - Betinfo class
                paylines - Paylines class
                jackpotDisplay - Jackpot Display class
                slotReel - slotreel class
                soundManager - sound manager class
                line - current line count
                lineBet - current line bet
                coin - current coin
                coinList - coinList pushed from subSlotGame
                reelSymbols - symbol result from spin.
                lineWins - all line wins
                bonusWins - all bonus wins
                jackpotWinning - jackpot wins
                payout - payout of current spin.
                bonusPrize - retrieved when starting bunos. 
                freeCount - available freecount
                freeMultiplier - available multiplier
                animationOrder - animations order pushed from subTheme
                allWinningLines - all winnings lines arrange in order pushed from animationOrder
                bonusScatter - if you won bonus scatter details are here
                bonusFG - if you won bonus FG details are here
                bonusDU - if you won bonus DU details are here
                bonusFC - if you won bonus FC details are here
                bonusFS - if you won bonus FS details are here
                gameProps - default game parameters gameId,UID, maxLine, maxLineBet, coinList
                browser - browser type and version, useful for aligning text across multiple browsers
                
                - openPaytable() - called from controls, open your paytable class here.
                
                - baseclass is handling all tickers. so you dont have to redeclare another
                    createjs.Ticker.setFPS(30);
                    createjs.Ticker.addEventListener("tick", stage);
                    
                - slotReel.setSymbolAnimation - (_winData,_loseAlpha,_wonAlpha)
                
                - this.params.animatedContainer - a container on where the animated symbols will play. already initialize during init. add it to stage for layering.
                
                
                - added browser detection. Needed for aligning textfields across multiple browsers.
                        call using this.params.browser.
                - added a new function stopAllAnimations();
                        needed a way for baseclass to stop all animations and timers when line buttons are clicked.
                - added a new function resumeAnimations();
     	              needed a way for baseclass to resume animations and timers when popups are closed.
                - added a new function checkButtonStats()
		              needed a way for baseclass to check if you want to disable or enable all buttons.
                      
                - Fonts.
                    see betinfo for sample. uses css.
                    has issue with browsers. need to manually align. use slotTheme browser detection for fix.
                    
                - BigWin
                    call using this.params.bigWinningType. same as from old baseclass.
                    create a seperate class for animating your big win.
                    
                
        
            */

            //get Stage 
            stage = _this.params.stage;
            
             //same as old version
            _this.params.animationOrder[0] = {type: "JACKPOT"};
            _this.params.animationOrder[1] = {type: "LINES"};
            _this.params.animationOrder[2] = {type: "SCATTER"};
            _this.params.animationOrder[3] = {type: "BONUSFG", symbol: "S", isScatter: true};
            
             //my handler for setting positions of UI based on device being used.
            layoutManager = new SubLayoutManager(_this);
            _this.params.layoutManager = layoutManager;//call this so that base will have reference of layoutManager
            
            //ASSET MANAGER
            assets = _this.params.assets;
            
            //ASSETMANAGER from loaded id. see subView
            // getSpriteSheetJSON - get spritesheet from json. 1st param = json id, 2nd param img id
            // getAsset - get loaded image
            //getSpriteSheetANIMATION - get an animation from json based on string pushed. 1st param = json id, 2nd param img id, 3rd param keyword to look for in json - see GQ AnimatedSymbol for sample
            mainSpriteSheets = new createjs.Sprite(assets.getSpriteSheetJSON('MainElementsJSON','MainElements'));
             
            //for muticanvas
            stage = layoutManager.createCanvas('theme_Canvas').stage;
            this.params.stage = stage;
            
            //added animatedContainer where all symbol animations will play.
            _this.params.animatedSymbolStage = layoutManager.createCanvas('animated_Canvas').stage;
            _this.params.animatedSymbolStage.addChild(this.params.animatedContainer);
            
            //stackWildContainer
            stackWildStage = layoutManager.createCanvas('stackWild_Canvas').stage;
            anticipateStage = layoutManager.createCanvas('anticipation_Canvas').stage;
            
            //container for all elements
            elementsContainer = new createjs.Container();
            stage.addChild(elementsContainer);
           
            //reelBG
            reelBG = mainSpriteSheets.clone();
            reelBG.gotoAndStop('reelBG');
            layoutManager.setPosition("reelBG", reelBG);
            elementsContainer.addChild(reelBG);

            //betinfo bgs
            var messageBG = mainSpriteSheets.clone();
            layoutManager.setPosition("infoMessageBG", messageBG);
            messageBG.scaleX = 0.945;
            messageBG.gotoAndStop('messageBG');
            elementsContainer.addChild(messageBG);
            
            //linenumberBGs
            var left_linesBG = mainSpriteSheets.clone();
            left_linesBG.gotoAndStop('linesBGL');
            layoutManager.setPosition("left_linesBG", left_linesBG);
            elementsContainer.addChild(left_linesBG);
            
            var right_linesBG = mainSpriteSheets.clone();
            right_linesBG.gotoAndStop('linesBGR');
            layoutManager.setPosition("right_linesBG", right_linesBG);
            elementsContainer.addChild(right_linesBG);
            
            //jackpotDisplay
            var grandBG = mainSpriteSheets.clone();
            grandBG.gotoAndStop('grandBG');
            layoutManager.setPosition("grandBG", grandBG);
            elementsContainer.addChild(grandBG);
            
            var mmmBG = mainSpriteSheets.clone();
            mmmBG.gotoAndStop('otherJPBG');
            layoutManager.setPosition("mmmBG", mmmBG);
            elementsContainer.addChild(mmmBG);
            
            
            //logos
            header = mainSpriteSheets.clone();
            header.gotoAndStop('title');
            layoutManager.setPosition("title", header);
            elementsContainer.addChild(header);
            
            //SOUND MANAGER
            soundManager = new SubSoundManager(_this);
            _this.params.soundManager = soundManager;
            
            //BET INFO
            betInfo = new SubBetInfo(_this);
            _this.params.betInfo = betInfo;//call this so that base will have reference of betinfo

            //CONTROLS
            controls = new SubControls(_this);
            _this.params.controls = controls;//call this so that base will have reference of controls

            //JACKPOT DISPLAY
            jackpotDisplay = new SubJackpotDisplay(_this);
            _this.params.jackpotDisplay = jackpotDisplay;//call this so that base will have reference of jackpotDisplay

            //SLOTREEL
            slotReel = new SubSlotReel(_this);
            _this.params.slotReel = slotReel;//call this so that base will have reference of slotReel
            
            
            //added animatedContainer where all symbol animations will play.
            stackWildContainer = new createjs.Container();
            stackWildStage.addChild(stackWildContainer);
            
            frames = new SubFrames(this,anticipateStage);
            slotReel.setFrames(frames);
            
            featuresContainer = new createjs.Container();
            stage.addChild(featuresContainer);
            
            //PAYLINES
            paylines = new SubPaylines(_this);
            _this.params.paylines = paylines;//call this so that base will have reference of paylines            

            soundManager.playBGMSounds('Main');
            _this.setMessage('INTRO');
            
           stage.update();
            _this._super(); //test       
        },
        setBetSetting: function(){
            this._super();
            if(_this.params.freeCount > 0){
                _this.addFreeSpinElements();
                themeTimer = setTimeout(_this.runAutoSpin, 1000 );
            } 
		},  
        
        onSpinStop: function(){
            this._super();
            
            soundManager.stopSpinSound();
            
            isAnimationLoop = false;
            
            //get all winning lines from base
            allWinningLines = _this.params.allWinningLines;
            
            //update free spin look
            if(isFreeMode){
                if(fsText) {
                    fsText.text=_this.params.freeCount + " FREE SPINS";
                    fsInfoStage.update();
                }
                fsWonAmount+=parseFloat(_this.params.payout);
                console.log("won amt: " + _this.params.payout);
            }
            
            frames.removeAllAnticipation();
            //for stackWild
            if(allWinningLines!=null){
                for(var i=0; i<allWinningLines.length; i++){
                    slotReel.animateStackWild(allWinningLines[i], stackWildContainer);

                    if(allWinningLines[i].symbolType=="SCATTER" && allWinningLines[i].comboLength>2 && !isFreeMode){
                        _this.disableAllButtons(false);
                        console.log("disable");
                    }
                }
            }
            console.log("wheelstop");
            _this.animateWinnings();
        },

        onSpin: function(){
            this._super();
            soundManager.playSpinSound();
            console.log("spinnninnngg");
            currentWinIndex = -1;
            clearTimeout(themeTimer);
            allWinningLines = null;
            _this.setMessage('SPIN');
            slotReel.removeStackWild(stackWildContainer);
            
            console.log("canvas is: " + _this.params.stage.canvas.scale);
        },
        
        
        animateWinnings: function(){
            //currently just using timer to control the animation of symbol winnings.
            clearTimeout(themeTimer);   
            console.log("animatewin");
            betInfo.setMessage('PRESS SPIN TO PLAY!');
            paylines.hideAll();
            
            if(allWinningLines == undefined || allWinningLines == null || _this.params.onErrorActivated == true){
                return;
            }   
            
            currentWinIndex++;
            if (currentWinIndex < allWinningLines.length)
			{
                _this.setMessage('RESULT');
                paylines.animateWinningLine(allWinningLines[currentWinIndex].lineNo);
                slotReel.setSymbolAnimation(allWinningLines[currentWinIndex],0.3,1);
                themeTimer = setTimeout(_this.symbolFinishPlaying, 4000 );
            }else {
                isAnimationLoop = true;
                _this.setMessage('IDLE');
                _this.stopAllAnimations();
                if(_this.params.freeCount > 0){
                    if(isFreeMode == false){
                        //no freespin look yet, add ui
                        _this.addFreeSpinElements();
                        return;
                    }else {
                        //FREE Spin look already added. proceed with freespin
                        themeTimer = setTimeout(_this.runAutoSpin, 1000 );
                    }
                }else {
                    if(isFreeMode){
                        //isFreeMode mode still on, last spin of free spin. show summary remove ui.
                        if(fsWonAmount>0) _this.addFreeSpinSummary();
                        else _this.removeFreeSpinElements();
                        return;
                    }
                    if(controls.params.isAutoSpin == true){
                        //if on auto spin spin now no need to cycle.
                        themeTimer = setTimeout(_this.runAutoSpin, 1000 );
                        return;
                    }
                    if(allWinningLines.length > 0){
                        //no need to cycle if no winning
                        currentWinIndex = -1;
                        themeTimer = setTimeout(_this.animateWinnings, 5000 );
                    }
                }
            }
            
        },
        
         
        symbolFinishPlaying: function(){
            clearTimeout(themeTimer); 
            _this.stopAllAnimations();
            if(isAnimationLoop == true){
                _this.animateWinnings();    
                return;
            }
            console.log("finish animmm: " + allWinningLines[currentWinIndex].symbolType);
            switch(allWinningLines[currentWinIndex].symbolType){
                    
                    case 'M':
                        _this.jackpotAnimation();
                    break;
                    case 'BONUSFC':
                    case 'SCATTER':
                        if (allWinningLines[currentWinIndex].comboLength>2 && !isFreeMode) _this.runBunos();
                        else _this.animateWinnings();
                    break;
                    case 'BONUSFG': 
                    case 'BONUSFS':     
                    break;
                    default:
                        _this.animateWinnings();    
                    break;
            }
        },
        
        setMessage: function(_type){
            switch(_type){
                case 'INTRO':
                    betInfo.setMessage('WELCOME TO CHIC TOWN!');
                    break;
                case 'SPIN':
                    if(_this.params.freeCount > 0){
                        betInfo.setMessage('PLAYING FREE GAME.');
                    }else {
                        if(_this.params.line > 1){
                            betInfo.setMessage('PLAYING '+_this.params.line + ' LINES FOR ' + Number(_this.params.lineBet * _this.params.line * _this.params.coin).toFixed(2)+'.');
                        }else {
                            betInfo.setMessage('PLAYING '+_this.params.line + ' LINES FOR ' + Number(_this.params.lineBet * _this.params.line * _this.params.coin).toFixed(2)+'.');
                        }
                    }
                    break;
                case 'IDLE':
                    betInfo.setMessage('PRESS SPIN TO PLAY!');
                    break;
                case 'RESULT':
                    //YOU CAN ALSO PLAY YOUR SOUNDS FOR SYMBOL WINS HERE
                    switch(allWinningLines[currentWinIndex].symbolType){
                        case 'A':
                        case 'B':
                        case 'C':
                        case 'D':
                        case 'E':
                        case 'F':
                        case 'G':
                        case 'H':
                        case 'I':
                        case 'J':
                        case 'K':
                            betInfo.setMessage('LINE '+allWinningLines[currentWinIndex].lineNo + ' WINS ' + AppUtils.insertComma(AppUtils.toNumeric(allWinningLines[currentWinIndex].wonAmount).toFixed(2))+ '.');
                            break;
                        
                        case 'M':
                            var jackpotMsg = "";
                            switch(allWinningLines[currentWinIndex].comboLength) {
                                case 2:
                                    jackpotMsg = " FROM MINI JACKPOT";
                                    break;
                                case 3:
                                    jackpotMsg = " FROM MINOR JACKPOT";
                                    break;
                                case 4:
                                    jackpotMsg = " FROM MAJOR JACKPOT";
                                    break;
                                case 5:
                                    jackpotMsg = " FROM GRAND JACKPOT";
                                    break;
                            }
                            betInfo.setMessage('YOU WON ' + AppUtils.insertComma(AppUtils.toNumeric(allWinningLines[currentWinIndex].wonAmount).toFixed(2))+jackpotMsg+ '!');
                            break;
                        
                        case 'SCATTER':
                            betInfo.setMessage('SCATTER WINS ' + AppUtils.insertComma(AppUtils.toNumeric(allWinningLines[currentWinIndex].wonAmount).toFixed(2))+ '.');
                            break;
                        
                        case 'BONUSFC':
                            //add game title if any
                            betInfo.setMessage('FREE CREDIT GAME!');
                            break;
                        
                        case 'BONUSFG':
                            //add game title if any
                            betInfo.setMessage("EMILY'S DRESS UP GAME!");
                            break;
                        
                        case 'BONUSDU':
                            //add game title if any
                            betInfo.setMessage('DOUBLE UP GAME!');
                            break;
                        
                        case 'BONUSFS':
                            //add game title if any
                            betInfo.setMessage('FREE GAMES!');
                            break;
                             
                    }
                    break;
            }
        },
        
        //required by baseclass, so that it can stop all animations when line buttons are clicked. you need to clear your timers and call stopAllAnimations from reel here.
        stopAllAnimations: function(){
            paylines.hideAll();
            clearTimeout(themeTimer);
            slotReel.stopAllAnimations();
        },
        
         //my code for resuming animation, called when controls popup are closed, paytable are closed, bigwin and whenever needed.
        resumeAnimation: function(){
            _this.checkButtonStats();
            _this.animateWinnings();
        },

        checkExpanded: function(){
            return isFreeMode;
        },
        
        ////////////////////////////JACKPOT ANIMATION//////////////////////////////
        jackpotAnimation: function(){
            //2nd parameter is just a container i want to hold elements in.
            jackpotAnimation = new SubJackpotAnimation(this,featuresContainer,this.params.jackpotWinning);
            
        },
        endJackpotAnimation: function(){
            _this.resumeAnimation();
        },
        
        /////////////////////////FREESPIN / AUTOSPIN//////////////////////////
        //timer for running autospin
        runAutoSpin: function(){
            clearTimeout(themeTimer); 
            controls.doSpin();
		},
        
        //updating textfields of _freecount and multiplier while under freespin
        updateFreeSpin: function(){
        },
        
        //add summary UI after FS
        addFreeSpinSummary: function(){
            clearTimeout(themeTimer);
            _this.stopAllAnimations();
            
            fsSummary= new FsSummary(_this,featuresContainer,AppUtils.insertComma(fsWonAmount.toFixed(2)));
            fsSummary.showSummay();
        },
        closeFSSummary: function(){
            fsSummary = null;
            isFreeMode=false;
            
            _this.removeFreeSpinElements();
        },
        
        //add free spin UI
        addFreeSpinElements: function(){
            fsInfoStage = layoutManager.createCanvas('fs_Canvas').stage;
            
            _this.updateFreeSpin();
            header.visible=false;
            header.parent.parent.update();
            isFreeMode = true;
             
            fsTopInfo= new createjs.Container();
            fsInfoStage.addChild(fsTopInfo);
            
            fsText = new createjs.Text("", "48px Moderna", "#FFFF00");
            fsText.text=_this.params.freeCount + " FREE SPINS";
            fsText.textAlign = "center"; 
            layoutManager.setPosition("fsModeFsTxt", fsText);
            layoutManager.setFont("fsModeFsTxt", fsText);
            fsText.textBaseline = "alphabetic";
            fsText.shadow = new createjs.Shadow("#000000", 0, 0, 8);
            fsTopInfo.addChild(fsText);
            
            fmText = new createjs.Text("", "48px Moderna", "#FFFF00");
            fmText.text=  "x" + _this.params.freeMultiplier + " MULTIPLIER";
            fmText.textAlign = "center";
            layoutManager.setPosition("fsModeFmTxt", fmText);
            layoutManager.setFont("bonusGameWin", fmText);
            fmText.textBaseline = "alphabetic";
            fmText.shadow = new createjs.Shadow("#000000", 0, 0, 8);
            fsTopInfo.addChild(fmText);
            
            fsInfoStage.update();
            var txtDelayTimeout = setTimeout(function(){
                fsInfoStage.update();
            },1000);
            _this.animateWinnings();
        }, 
        
        //remove freespin UI
        removeFreeSpinElements: function(){
            isFreeMode = false;
            fsTopInfo.visible=false;
            fsTopInfo=null;
            
            fsInfoStage.update();
            
            header.visible=true;
            header.parent.parent.update();
            _this.resumeAnimation();
        },
        
        
        
        //////////////////////////PAYTABLE//////////////////////////////////////
        openPaytable: function(){
            paytable = new SubPaytable(_this, featuresContainer);
            _this.params.paytable = paytable// so that base will have access to paytable
        },
        closePaytable: function(){
            paytable = null;
            _this.params.paytable = null;
             _this.resumeAnimation();
        },
        
        /////////////////////////////////////BIG WIN/////////////////////////////////
        showBigWin: function(){
            bigWin = new SubBigWin(_this,featuresContainer);
        },
        closeBigWin: function(){
            bigWinAnim = null;
            _this.resumeAnimation();
        },
        
        /////////////////////////////////////BONUS/////////////////////////////////
        startBonus: function(_prizeList){
            bonus = new SubBonus(_prizeList,allWinningLines[currentWinIndex].comboLength,_this, featuresContainer);
        },
        endBonus: function()
		{
			console.log('END BONUS');
            bonus = null;
            isFreeMode = true;
            
            _this.addFreeSpinElements();
            _this.animateWinnings();
            _this.disableAllButtons(false);
		},
        
        /////////////////UTILS//////////////
        checkButtonStats: function(){
            //console.log('CHECKBUTTON STATS');
            if (_this.params.freeCount > 0 || slotReel.params.reelStillSpinning){
                _this.disableAllButtons(false);
                
                //spin button should be enabled even under freespin
                if (isFreeMode)
				{
                    controls.enableSpin();
                }else {
                    _this.disableAllButtons(false); //start of freespin UI not yet added
                }
			}else{
                if (bonus === null && bigWinAnim === null && paytable === null)
				{
                    if (isFreeMode)
					{
						_this.disableAllButtons(true); //end of freespin, show summary mode first
						return;
					}
                    if (controls.params.isAutoSpin == false){
						_this.enableAllButtons();
					}else {
						_this.disableAllButtons();
					}
				}
			}
        },
    });
	
    return SubTheme;
});