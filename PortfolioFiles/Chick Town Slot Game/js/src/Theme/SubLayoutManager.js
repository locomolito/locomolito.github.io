define(["../../html5_baseclass/View/Theme/LayoutManager"], function(LayoutManager) {

    var assets;
    var assetSize;
    var _slotTheme;

    //spritesheets
    var mainSpriteSheets;
    var animatedSymbolSheets;
    var paylineSpriteSheets;
    var bonusSpriteSheet;
    var jpAnimSpriteSheets;
    var coinsSpriteSheep;
    var paytableSprites;

    var _params = {};
    
    /* wheel/symbol datas for slot reel and frames*/
    var _spinHeight;
    var _wheelHeight;
    var _wheelXInterval;
    var _symbolYInterval;
    var _wheelBaseX;
    var _wheelBaseY;
    var _bigAnticipationX;
    var _bigAnticipationY;
    
     
    var _this;
     
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
    Object.defineProperty(_params, "bigAnticipationX", {
        set: function(_value) {
            _bigAnticipationX = _value;
        },
        get: function() {
            return _bigAnticipationX;
        }
    });
    Object.defineProperty(_params, "bigAnticipationY", {
        set: function(_value) {
            _bigAnticipationY = _value;
        },
        get: function() {
            return _bigAnticipationY;
        }
    });
    
    Object.defineProperty(_params, "wheelColumn", {
        set: function(_value) {
            _wheelColumn = _value;
        },
        get: function() {
            return _wheelColumn;
        }
    });
    Object.defineProperty(_params, "wheelRow", {
        set: function(_value) {
            _wheelRow = _value;
        },
        get: function() {
            return _wheelRow;
        }
    });
    Object.defineProperty(_params, "symbolXRef", {
        set: function(_value) {
            _symbolXRef = _value;
        },
        get: function() {
            return _symbolXRef;
        }
    });
    Object.defineProperty(_params, "symbolYRef", {
        set: function(_value) {
            _symbolYRef = _value;
        },
        get: function() {
            return _symbolYRef;
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
    Object.defineProperty(_params, "spinParams", {
        set: function(_value) {
            _spinParams = _value;
        },
        get: function() {
            return _spinParams;
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
    Object.defineProperty(_params, "defaultNormalStop", {
        set: function(_value) {
            _defaultNormalStop = _value;
        },
        get: function() {
            return _defaultNormalStop;
        }
    });
    Object.defineProperty(_params, "anticipationTime", {
        set: function(_value) {
            _anticipationTime = _value;
        },
        get: function() {
            return _anticipationTime;
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
    Object.defineProperty(_params, "symbolsForDelay", {
        set: function(_value) {
            _symbolsForDelay = _value;
        },
        get: function() {
            return _symbolsForDelay;
        }
    });
    
    Object.defineProperty(_params, "Symbol_A", {
        set: function(_value) {
            Symbol_A = _value;
        },
        get: function() {
            return Symbol_A;
        }
    });
    Object.defineProperty(_params, "Symbol_B", {
        set: function(_value) {
            Symbol_B = _value;
        },
        get: function() {
            return Symbol_B;
        }
    });
    Object.defineProperty(_params, "Symbol_C", {
        set: function(_value) {
            Symbol_C = _value;
        },
        get: function() {
            return Symbol_C;
        }
    });
    Object.defineProperty(_params, "Symbol_D", {
        set: function(_value) {
            Symbol_D = _value;
        },
        get: function() {
            return Symbol_D;
        }
    });
    Object.defineProperty(_params, "Symbol_E", {
        set: function(_value) {
            Symbol_E = _value;
        },
        get: function() {
            return Symbol_E;
        }
    });
    Object.defineProperty(_params, "Symbol_F", {
        set: function(_value) {
            Symbol_F = _value;
        },
        get: function() {
            return Symbol_F;
        }
    });
    Object.defineProperty(_params, "Symbol_G", {
        set: function(_value) {
            Symbol_G = _value;
        },
        get: function() {
            return Symbol_G;
        }
    });
    Object.defineProperty(_params, "Symbol_H", {
        set: function(_value) {
            Symbol_H = _value;
        },
        get: function() {
            return Symbol_H;
        }
    });
    Object.defineProperty(_params, "Symbol_I", {
        set: function(_value) {
            Symbol_I = _value;
        },
        get: function() {
            return Symbol_I;
        }
    });
    Object.defineProperty(_params, "Symbol_J", {
        set: function(_value) {
            Symbol_J = _value;
        },
        get: function() {
            return Symbol_J;
        }
    });
    Object.defineProperty(_params, "Symbol_M", {
        set: function(_value) {
            Symbol_M = _value;
        },
        get: function() {
            return Symbol_M;
        }
    });
    Object.defineProperty(_params, "Symbol_S", {
        set: function(_value) {
            Symbol_S = _value;
        },
        get: function() {
            return Symbol_S;
        }
    });
    Object.defineProperty(_params, "Symbol_W", {
        set: function(_value) {
            Symbol_W = _value;
        },
        get: function() {
            return Symbol_W;
        }
    });
    Object.defineProperty(_params, "Symbol_X", {
        set: function(_value) {
            Symbol_X = _value;
        },
        get: function() {
            return Symbol_X;
        }
    });
    Object.defineProperty(_params, "Symbol_Y", {
        set: function(_value) {
            Symbol_Y = _value;
        },
        get: function() {
            return Symbol_Y;
        }
    });
    Object.defineProperty(_params, "Symbol_Z", {
        set: function(_value) {
            Symbol_Z = _value;
        },
        get: function() {
            return Symbol_Z;
        }
    });
    
    Object.defineProperty(_params, "jackpotAnimationData", {
        set: function(_value) {
            _jackpotAnimationData = _value;
        },
        get: function() {
            return _jackpotAnimationData;
        }
    });
    var SubLayoutManager = LayoutManager.extend({
        init: function(_slotThemeVal) {
            //console.log('LAYOUT MANAGER INITIALIZE');  
            assetSize = _slotThemeVal.params.assetSize;
            assets = _slotThemeVal.getAssetManager();
            _slotTheme =_slotThemeVal;
            this.params = this.getParams();
            
            switch (assetSize) {
                case 'BIG':
                    _wheelHeight = 492;
                    _spinHeight = 492;
                    _wheelXInterval = 187;
                    _symbolYInterval = 167;
                    _wheelBaseX = 0;
                    _wheelBaseY = 0;
                    _bigAnticipationX = 0;
                    _bigAnticipationY = 0;
                    break;
                case 'SMALL':
                    _wheelHeight = 213;
                    _spinHeight = 214;
                    _wheelXInterval = 83;
                    _symbolYInterval = 72;
                    _wheelBaseX = 0;
                    _wheelBaseY = 0;
                    _bigAnticipationX = 3;
                    _bigAnticipationY = 5;
                    break;
            }
            this._super(_slotTheme);
            
            _this=this;
            
            //----------------------BIG version
            _this.reelBG_BIG = new createjs.Point(0,0);                 //SLOT THEME     
            _this.title_BIG = new createjs.Point(381,10);
            _this.fsModeFsTxt_BIG = new createjs.Point(198,44);
            _this.fsModeFmTxt_BIG = new createjs.Point(198,101);
            
            _this.infoMessageBG_BIG = new createjs.Point(19,644);       //BET INFO
            _this.infoMessage_BIG = new createjs.Point(400,30);   
            _this.left_linesBG_BIG = new createjs.Point(10,244);   
            _this.right_linesBG_BIG = new createjs.Point(965,244);   
            _this.txtLinesRight_BIG = new createjs.Point(20,33);   
            _this.txtLinesLeft_BIG = new createjs.Point(20,33); 
            
            _this.grandBG_BIG = new createjs.Point(34,59);              //JACKPOT DISPLAY
            _this.mmmBG_BIG = new createjs.Point(733,0);
            _this.txtGrand_BIG = new createjs.Point(260,93);
            _this.txtMajor_BIG = new createjs.Point(908,29);
            _this.txtMinor_BIG = new createjs.Point(908,62);
            _this.txtMini_BIG = new createjs.Point(908,95);
            
            
            _this.paylineX_BIG = 0;                                   //PAYLINE
            _this.paylineY_BIG = [184,0,355,0,0,0,202,0,0,0,0,0,199,0,214,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0];
            
            _this.fsSumContainer_BIG = new createjs.Point(126,-490);    //FREE SPIN SUMMARY
            _this.fsSumTxtAmount_BIG = new createjs.Point(400,280);      
            _this.fsSumbtnContinue_BIG = new createjs.Point(264,342);
            
            
            
            _this.jpSumContainer_BIG = new createjs.Point(101,-354);     //JACKPOTANIMATION
            _this.jpBtnContinue_BIG = new createjs.Point(297,300);     
            _this.jpTxtAmount_BIG = new createjs.Point(420,255);     
            _this.jpYouWon_BIG = new createjs.Point(258,-120); 
            _this.jpGrand_BIG = new createjs.Point(171,51); 
            _this.jpMajor_BIG = new createjs.Point(176,22); 
            _this.jpMinor_BIG = new createjs.Point(176,53); 
            _this.jpMini_BIG = new createjs.Point(268,51); 
            
            _this.dress0_BIG = new createjs.Point(23,296);              //BONUS GAME
            _this.dress1_BIG = new createjs.Point(167,248); 
            _this.dress2_BIG = new createjs.Point(318,235); 
            _this.dress3_BIG = new createjs.Point(464,244); 
            _this.dress4_BIG = new createjs.Point(626,283); 
            _this.lady_BIG = new createjs.Point(1032,161); 
            _this.bonusFSLabel_BIG = new createjs.Point(202,665); 
            _this.bonusFSBG_BIG = new createjs.Point(205,692); 
            _this.bonusFMLabel_BIG = new createjs.Point(454,665); 
            _this.bonusFMBG_BIG = new createjs.Point(459,691); 
            _this.bonusMessage_BIG = new createjs.Point(42,-149); 
            _this.bonusFSTxt_BIG = new createjs.Point(287,723); 
            _this.bonusFMTxt_BIG = new createjs.Point(537,721); 
            _this.bonusAmtX_BIG = [91,235,385,544,700];                 //BONUS GAME TEXT FOR EACH BONUS ITEM
            _this.bonusAmtY_BIG = [374,314,304,362,382];
            _this.bonusTypeX_BIG = [90,237,386,544,699];
            _this.bonusTypeY_BIG = [403,343,333,393,410];
            _this.bonusSum_BIG = new createjs.Point(-769,186); 
            _this.bonusSumTxtA_BIG = new createjs.Point(388,230); 
            _this.bonusSumTxtB_BIG = new createjs.Point(389,275); 
            _this.bonusSumTxtC_BIG = new createjs.Point(389,332); 
            _this.bonusSumContinue_BIG = new createjs.Point(261,363); 
            
            _this.lady2_BIG = new createjs.Point(-338,15);              //STACK WILD ANIMATION. 2 stacks
            _this.stackBG2_BIG = new createjs.Point(-92,0);
            _this.introBG2_BIG = new createjs.Point(28,30);
            _this.star2_BIG = new createjs.Point(10,0);
            
            _this.lady3_BIG = new createjs.Point(-472,20);              //STACK WILD ANIMATION. 3 stacks
            _this.stackBG3_BIG = new createjs.Point(-161,0);
            _this.introBG3_BIG = new createjs.Point(0,22);
            _this.star3_BIG = new createjs.Point(13,0);
            
            _this.starClone_BIG = new createjs.Point(78,78);              //SYMBOL CONTROLLER
            
            _this.btnNext_BIG = new createjs.Point(823,26);                  //PAYTABLE
            _this.btnPrev_BIG = new createjs.Point(600,26);
            _this.btnClose_BIG = new createjs.Point(972,0);
            _this.pageContainer_BIG = new createjs.Point(1024,0);
            _this.page0_BIG = new createjs.Point(30,30);
            _this.page1_BIG = new createjs.Point(85,83);
            _this.page2_BIG = new createjs.Point(27,37);
            _this.page3_BIG = new createjs.Point(23,47);
            _this.page4_BIG = new createjs.Point(11,42);
            _this.page5_BIG = new createjs.Point(27,56);
            
            _this.anticipateContainer_BIG = new createjs.Point(18,19);      //ANTICIPATION CONTAINER
            
            //----------------SMALL VERSION
            //BIG version
            _this.reelBG_SMALL = new createjs.Point(10,0);                 //SLOT THEME     
            _this.title_SMALL = new createjs.Point(173,0);
            _this.fsModeFsTxt_SMALL = new createjs.Point(90,23);
            _this.fsModeFmTxt_SMALL = new createjs.Point(89,48);
            
            _this.infoMessageBG_SMALL = new createjs.Point(31,277);       //BET INFO
            _this.infoMessage_SMALL = new createjs.Point(160,11);   
            _this.left_linesBG_SMALL = new createjs.Point(0,103);   
            _this.right_linesBG_SMALL = new createjs.Point(458,103);   
            _this.txtLinesRight_SMALL = new createjs.Point(9,9);   
            _this.txtLinesLeft_SMALL = new createjs.Point(9,9); 
            
            _this.grandBG_SMALL = new createjs.Point(19,23);              //JACKPOT DISPLAY
            _this.mmmBG_SMALL = new createjs.Point(337,0);
            _this.txtGrand_SMALL = new createjs.Point(116,38);
            _this.txtMajor_SMALL = new createjs.Point(413,13);
            _this.txtMinor_SMALL = new createjs.Point(413,27);
            _this.txtMini_SMALL = new createjs.Point(413,41);
            
            
            _this.paylineX_SMALL = 25;                                   //PAYLINE
            _this.paylineY_SMALL = [69,0,140,0,0,0,71,0,0,0,0,0,70,0,68,0,70,0,0,0,0,0,0,0,0,0,0,0,0,0];
            
            _this.fsSumContainer_SMALL = new createjs.Point(59,-238);    //FREE SPIN SUMMARY
            _this.fsSumTxtAmount_SMALL = new createjs.Point(185,135);      
            _this.fsSumbtnContinue_SMALL = new createjs.Point(99,170);
            
            _this.jpSumContainer_SMALL = new createjs.Point(50,-181);     //JACKPOTANIMATION
            _this.jpBtnContinue_SMALL = new createjs.Point(126,142);     
            _this.jpTxtAmount_SMALL = new createjs.Point(205,106);     
            _this.jpYouWon_SMALL = new createjs.Point(130,-49); 
            _this.jpGrand_SMALL = new createjs.Point(122,13); 
            _this.jpMajor_SMALL = new createjs.Point(126,3); 
            _this.jpMinor_SMALL = new createjs.Point(128,14); 
            _this.jpMini_SMALL = new createjs.Point(151,14); 
            
            _this.dress0_SMALL = new createjs.Point(8,92);              //BONUS GAME
            _this.dress1_SMALL = new createjs.Point(81,84); 
            _this.dress2_SMALL = new createjs.Point(158,81); 
            _this.dress3_SMALL = new createjs.Point(227,82); 
            _this.dress4_SMALL = new createjs.Point(306,93); 
            _this.lady_SMALL = new createjs.Point(484,76); 
            _this.bonusFSLabel_SMALL = new createjs.Point(52,268); 
            _this.bonusFSBG_SMALL = new createjs.Point(45,287); 
            _this.bonusFMLabel_SMALL = new createjs.Point(300,268); 
            _this.bonusFMBG_SMALL = new createjs.Point(295,287); 
            _this.bonusMessage_SMALL = new createjs.Point(31,-66); 
            _this.bonusFSTxt_SMALL = new createjs.Point(106,308); 
            _this.bonusFMTxt_SMALL = new createjs.Point(360,308); 
            _this.bonusAmtX_SMALL = [36,107,189,263,343];                 //BONUS GAME TEXT FOR EACH BONUS ITEM
            _this.bonusAmtY_SMALL = [135,105,115,145,125];
            _this.bonusTypeX_SMALL = [39,110,191,266,346];
            _this.bonusTypeY_SMALL = [159,129,139,169,149];
            _this.bonusSum_SMALL = new createjs.Point(-370,55); 
            _this.bonusSumTxtA_SMALL = new createjs.Point(177,112); 
            _this.bonusSumTxtB_SMALL = new createjs.Point(177,133); 
            _this.bonusSumTxtC_SMALL = new createjs.Point(176,157); 
            _this.bonusSumContinue_SMALL = new createjs.Point(104,170); 
            
            _this.lady2_SMALL = new createjs.Point(-338,15);              //STACK WILD ANIMATION. 2 stacks
            _this.stackBG2_SMALL = new createjs.Point(-45,0);
            _this.introBG2_SMALL = new createjs.Point(15,23);
            _this.star2_SMALL = new createjs.Point(-2,0);
            
            _this.lady3_SMALL= new createjs.Point(-472,20);              //STACK WILD ANIMATION. 3 stacks
            _this.stackBG3_SMALL = new createjs.Point(-65,0); 
            _this.introBG3_SMALL = new createjs.Point(3,27);
            _this.star3_SMALL = new createjs.Point(-2,0);
            
            _this.starClone_SMALL = new createjs.Point(34,34);             //SYMBOL CONTROLLER
            
            _this.btnNext_SMALL = new createjs.Point(387,8);                  //PAYTABLE
            _this.btnPrev_SMALL = new createjs.Point(276,8);
            _this.btnClose_SMALL = new createjs.Point(457,0);
            _this.pageContainer_SMALL = new createjs.Point(480,0);
            _this.page0_SMALL = new createjs.Point(22,8);
            _this.page1_SMALL = new createjs.Point(28,32);
            _this.page2_SMALL = new createjs.Point(14,12);
            _this.page3_SMALL = new createjs.Point(17,20);
            _this.page4_SMALL = new createjs.Point(14,16);
            _this.page5_SMALL = new createjs.Point(11,27);
            
             _this.anticipateContainer_SMALL = new createjs.Point(0,0);                    //ANTICIPATION CONTAINER
             
            
        },
        getParams: function() {
            return _params;
        },
        
        
        //CUSTOM FUNCTIONS FOR LAYOUT
        
        //SETTING X AND Y OF OBJECTS
        setPosition:function(_prefixName, _target, data){
            switch (_prefixName){
                case "payline":
                        var paylineYArray = _this["paylineY_"+assetSize];
                        _target.x=_this["paylineX_" +assetSize]; 
                        _target.y = paylineYArray[parseInt(data)];
                    return;
                    break;
                    
                case "bonusAmtTxt":
                        var bonusAmtX = _this["bonusAmtX_"+assetSize];
                        var bonusAmtY = _this["bonusAmtY_"+assetSize];
                        _target.x = bonusAmtX[parseInt(data)];
                        _target.y = bonusAmtY[parseInt(data)];
                    return;
                    break;
                    
                case "bonusTypeTxt":
                        var bonusTypeX = _this["bonusTypeX_"+assetSize];
                        var bonusTypeY = _this["bonusTypeY_"+assetSize];
                        _target.x = bonusTypeX[parseInt(data)];
                        _target.y = bonusTypeY[parseInt(data)];
                    return;
                    break;
            }
            
            _target.x = _this[_prefixName + "_" +assetSize].x;  
            _target.y = _this[_prefixName + "_" +assetSize].y; 
        },
        
        //SET FONT SIZE FOR SMALL VERSION
        setFont:function(_name, _target, data){
            if(assetSize=="BIG") return;
            
            switch(_name){
                case "mainUI":
                       _target.font="10px Moderna";
                    break;
                    
                case "jpAnimation":
                        _target.font="40px Moderna";
                    break;
                case "bonusGameWin":
                        _target.font="19px Moderna";
                    break;
                case "bonusAmtTxt":
                        _target.font="20px Moderna";
                    break;
                case "bonusTypeTxt":
                        _target.font="13px Moderna";
                    break;
                case "bonusSumTxtAC":
                        _target.font="25px Moderna";
                    break;
                case "bonusSumTxtB":
                        _target.font="18px Moderna";
                    break;
                case "fsModeFsTxt":
                        _target.font="22px Moderna";
                    break; 
                case "fsSumAmount":
                        _target.font="37px Moderna";
                    break; 
                
                
            }
        },
        
        //GET NUMBER VALUES RELATED TO ANIMATIONS
        getValue:function(_name){
            
            switch(_name){
                case "moveOffset":
                    if(assetSize=="BIG") return 1024;
                    else return 480;
                    break;
                case "youWonY":
                    if(assetSize=="BIG") return 120;
                    else return 70;
                    break;
                case "jpSumY":
                    if(assetSize=="BIG") return 203;
                    else return 109;
                    break;
                case "anticipateOffsetX":
                    if(assetSize=="BIG") return 3;
                    else return 2;
                    break;
                case "anticipateOffsetY":
                    if(assetSize=="BIG") return 0;
                    else return 2;
                    break;
                case "antiBaseOffsetX":
                    if(assetSize=="BIG") return 11;
                    else return 0;
                    break;
                case "antiBaseOffsetY":
                    if(assetSize=="BIG") return 13;
                    else return 9;
                    break;
                case "antiRectOffsetX":
                    if(assetSize=="BIG") return 4;
                    else return 1;
                    break;
                case "antiRectOffsetY":
                    if(assetSize=="BIG") return 2;
                    else return 4;
                    break;
                case "ladyX":
                    if(assetSize=="BIG") return 792;
                    else return 374;
                    break;
                case "fsSumY":
                    if(assetSize=="BIG") return 149;
                    else return 50;
                    break;
                case "stackWildXOffset":
                    if(assetSize=="BIG") return 5;
                    else return 2;
                    break;
                case "maskXOffset":
                    if(assetSize=="BIG") return 87;
                    else return 40;
                    break;
                 case "starTo3Stack":
                    if(assetSize=="BIG") return 350;
                    else return 135;
                    break;
                 case "introMaskTo3Stack":
                    if(assetSize=="BIG") return 19;
                    else return 40;
                    break;
                 case "ladyTo3Stack":
                    if(assetSize=="BIG") return 167;
                    else return 55;
                    break;
                 case "ladyLoop3Stack":
                    if(assetSize=="BIG") return 197;
                    else return 80;
                    break;
                case "ladyLoop3Stack2":
                    if(assetSize=="BIG") return 167;
                    else return 55;
                    break;
                case "starTo2Stack":
                    if(assetSize=="BIG") return 190;
                    else return 64;
                    break;
                case "introMaskTo2Stack":
                    if(assetSize=="BIG") return 19;
                    else return 40;
                    break;
                case "ladyTo2Stack":
                    if(assetSize=="BIG") return 68;
                    else return 18;
                    break;
                case "ladyLoop2Stack":
                    if(assetSize=="BIG") return 108;
                    else return 55;
                    break;
                case "ladyLoop2Stack2":
                    if(assetSize=="BIG") return 68;
                    else return 18;
                    break;
                case "introMask2Stack":
                    if(assetSize=="BIG") return 274;
                    else return 150;
                    break;
                case "introMask3Stack":
                    if(assetSize=="BIG") return 467;
                    else return 225;
                    break;
                case "particleParam"://see subParticle
                    if(assetSize=="BIG") return 1024;
                    else return 480;
                    break;
                 case "swipeOffset"://see subParticle
                    if(assetSize=="BIG") return 1010;
                    else return 470;
                    break;
                case "spacingInfo"://see subParticle
                    if(assetSize=="BIG") return 90;
                    else return 2;
                    break;
            }
        },
        
        //RETURN PROPPER HIT AREAS FOR BUTTONS
        setHitArea:function(_name, _target){
            if(assetSize=="SMALL") return;
            switch(_name){
                case "dress0":
                    if(assetSize=="BIG") _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(10, 38, 105, 295));
                    else _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 71, 222));
                    break;
                    
                case "dress1":
                    if(assetSize=="BIG") _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(22, 26, 96, 243));
                    else _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(9, 19, 49, 117));
                    break;
                    
                case "dress2":
                    if(assetSize=="BIG") _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(21, 9, 96, 257));
                    else _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(9, 31, 49, 100));
                    break;
                    
                case "dress3":
                    if(assetSize=="BIG") _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(32, 29, 97, 251));
                    else _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(10, 31, 61, 109));
                    break;
                    
                case "dress4":
                    if(assetSize=="BIG") _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(30, 25, 96, 277));
                    else _target.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(13, 32, 58, 118));
                    break;
            
            }
        },
        
        //DRAWING SHAPES, use in stack wild mask
        createShape:function(_name, _target){
             switch(_name){
                case "stackMask2":
                    if(assetSize=="BIG") _target.graphics.beginFill("#000000").drawRect(0, 0, 174, 324);
                    else _target.graphics.beginFill("#000000").drawRect(0, 0, 78, 143);
                    break;
                     
                case "stackMask3":
                    if(assetSize=="BIG") _target.graphics.beginFill("#000000").drawRect(0, 0, 174, 490);
                    else _target.graphics.beginFill("#000000").drawRect(0, 0, 78, 214);
                    break;
             }
        },
        
        createCanvas: function(_target){
            /*
                - for canvas plan out how your going to seperate your games.
                - only use the minimum canvas width and height required. lesser rendering when updating the stage
                - for canvas that keeps being updated avoid using big dimensions.
                - store elements that will never move/change/animated in 1 canvas.
            */
            var newCanvas;
            var newStage;
            var canvasData = {canvas:newCanvas,stage:newStage};
            newCanvas = document.createElement('canvas');
            switch (_target) {
                case "theme_Canvas":
                    newCanvas.id     = "theme_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth;
                        newCanvas.height = 680;
                    } else {
                        newCanvas.width  = _slotTheme.params.dimensionWidth;
                        newCanvas.height = 320;
                    }
                    document.getElementById("staticWrapper").appendChild(newCanvas);
                    break;
                case "animated_Canvas":
                    newCanvas.id     = "animated_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 910;
                        newCanvas.height = 493;
                    } else {
                        newCanvas.width  = 408;
                        newCanvas.height = 216;
                    }
                    document.getElementById("animatedWrapper").appendChild(newCanvas);
                    break;
                case "payline_Canvas":
                    newCanvas.id     = "payline_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 809;
                        newCanvas.height = 396;
                    } else {
                        newCanvas.width  = 347;
                        newCanvas.height = 156;
                    }
                    document.getElementById("paylineWrapper").appendChild(newCanvas);
                    break;
                case "txtLinesRight_Canvas":
                    newCanvas.id     = "txtLinesRight_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 40;
                        newCanvas.height = 39;
                    } else {
                        newCanvas.width  = 17;
                        newCanvas.height = 11;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtLinesLeft_Canvas":
                    newCanvas.id     = "txtLinesLeft_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 40;
                        newCanvas.height = 39;
                    } else {
                        newCanvas.width  = 17;
                        newCanvas.height = 11;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "header_Canvas":
                    newCanvas.id     = "txtLinesLeft_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth;
                        newCanvas.height = 650;
                    } else {
                        newCanvas.width  = 21;
                        newCanvas.height = 11;
                    }
                    document.getElementById("canvasContainer").appendChild(newCanvas);
                    break;
                case "txtInfoMessage_Canvas":
                    newCanvas.id     = "txtInfoMessage_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 757;
                        newCanvas.height = 36;
                    } else {
                        newCanvas.width  = 320;
                        newCanvas.height = 15;
                    }
                    document.getElementById("messageWrapper").appendChild(newCanvas);
                    break;
                case "stackWild_Canvas":
                    newCanvas.id     = "stackWild_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 910;
                        newCanvas.height = 493;
                    } else {
                        newCanvas.width  = 408;
                        newCanvas.height = 216;
                    }
                    document.getElementById("stackWildWrapper").appendChild(newCanvas);
                    break;
                case "anticipation_Canvas":
                    newCanvas.id     = "anticipation_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 946;
                        newCanvas.height = 537;
                    } else {
                        newCanvas.width  = 417;
                        newCanvas.height = 224;
                    }
                    document.getElementById("anticipationWrapper").appendChild(newCanvas);
                    break;
                case "paytable_Canvas":
                    newCanvas.id     = "paytable_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth - 5;
                        newCanvas.height = _slotTheme.params.dimensionHeight-5;
                    } else {
                        newCanvas.width  = 480;
                        newCanvas.height = 320;
                    }
                    document.getElementById("paytableWrapper").appendChild(newCanvas);
                    break;
                case "bonusGame_Canvas":
                    newCanvas.id     = "bonusGame_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth-5;
                        newCanvas.height = _slotTheme.params.dimensionHeight-5;
                    } else {
                        newCanvas.width  = 480;
                        newCanvas.height = 320;
                    }
                    document.getElementById("bonusGameWrapper").appendChild(newCanvas);
                    break;
                case "fs_Canvas":
                    newCanvas.id     = "fs_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = 390;
                        newCanvas.height = 129;
                    } else {
                        newCanvas.width  = 182;
                        newCanvas.height = 50;
                    }
                    document.getElementById("fsWrapper").appendChild(newCanvas);
                    break;
                case "fsSum_Canvas":
                    newCanvas.id     = "fsSum_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth;
                        newCanvas.height = 650;
                    } else {
                        newCanvas.width  = 480;
                        newCanvas.height = 320;
                    }
                    document.getElementById("fsSumWrapper").appendChild(newCanvas);
                    break;
                case "jackpot_Canvas":
                    newCanvas.id     = "jackpot_Canvas";
                    if (assetSize == 'BIG') {
                        newCanvas.width  = _slotTheme.params.dimensionWidth-5;
                        newCanvas.height = _slotTheme.params.dimensionHeight-5;
                    } else {
                        newCanvas.width  = 480;
                        newCanvas.height = 320;
                    }
                    document.getElementById("jackpotWrapper").appendChild(newCanvas);
                    break;
                
            }
            newStage = new createjs.Stage(newCanvas);
                        
            canvasData.canvas = newCanvas;
            canvasData.stage = newStage;
            
            return canvasData;
        },
        
        getStageCanvas:function(_canvasName){

        },
        
    });
    
    

    return SubLayoutManager;
});