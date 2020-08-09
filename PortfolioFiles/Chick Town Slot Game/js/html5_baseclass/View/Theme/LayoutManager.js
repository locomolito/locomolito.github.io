define([], function() {
    var _slotTheme;
    var _assetSize;
    var _assets;

    var standardSpriteSheet;
    
    var _dimensionBuffer = 3;//using dimension width and height create a shift in rescaling. using this as fix
    
    var LayoutManager = Class.extend({
        init: function(_slotThemeValue) {
            _slotTheme = _slotThemeValue;

            _assetSize = _slotTheme.params.assetSize;
            _assets = _slotTheme.getAssetManager();

            standardSpriteSheet = new createjs.Sprite(_assets.getSpriteSheetJSON('StandardAssetsJSON', 'StandardAssets'));
        },

        addStandardSprite: function(_target, _data) {
            var newSprite;
            switch (_target) {
                //CONTROLS
                case "btnSpin":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnSpin_mouseout');
                        newSprite.name = 'btnSpin';
                        newSprite.cursor = 'pointer';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnSpin_mouseout');
                        newSprite.name = 'btnSpin';
                        newSprite.cursor='pointer';
                    }
                    break;
                case "btnAutoSpin":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnAutoSpin_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnAutoSpin';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnAutoSpin_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnAutoSpin';
                    }
                    break;
                case "btnStopAuto":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnStopAuto_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnStopAuto';
                        newSprite.visible = false;
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnStopAuto_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnStopAuto';
                        newSprite.visible = false;
                    }
                    break;
                case "btnInfo":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnInfo_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnInfo';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnInfo_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnInfo';
                    }
                    break;
                case "btnSettings":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnSettings_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnSettings';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnSettings_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnSettings';
                    }
                    break;
                case "btnLineUp":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnLineUp_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnLineUp';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnLineUp_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnLineUp';
                    }
                    break;
                case "btnLineDown":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnLineDown_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnLineDown';
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('btnLineDown_mouseout');
                        newSprite.cursor = 'pointer';
                        newSprite.name = 'btnLineDown';
                    }
                    break;


                    //BETINFO
                case "betInfoBG":
                    if (_assetSize == 'BIG') {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('betinfoBG');
                    } else {
                        newSprite = standardSpriteSheet.clone();
                        newSprite.gotoAndStop('betinfoBG');
                    }
                    break;
            }
            return newSprite;
        },

        positionStandardLayout: function(_target) {
            switch (_target.name) {
                //CONTROLS
                case "spinCountContainer":
                    if (_assetSize == 'BIG') {
                        _target.visible = false;
                        _target.x = 7;
                        _target.y = 23;
                    } else {
                        _target.visible = false;
                        _target.x = -3;
                        _target.y = 6;
                    }
                    break;
                case "txtSpinCount":
                    if (_assetSize == 'BIG') {
                        _target.maxWidth = 90;
                        _target.textAlign = "center";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 10;
                        _target.font = "35px Arial Bold";
                        _target.color = "#FFFFFF";
                        _target.textBaseline = "alphabetic";
                    } else {
                        _target.maxWidth = 50;
                        _target.textAlign = "center";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 10;
                        _target.font = "17px Arial Bold";
                        _target.color = "#FFFFFF";
                        _target.textBaseline = "alphabetic";
                    }
                    break;
                case "btnLineDownHit":
                    if (_assetSize == 'BIG') {
                        _target.graphics.beginFill("#000").drawRect(-25, -25, 75, 100);
                    } else {
                        _target.graphics.beginFill("#000").drawRect(-5, -10, 25, 50);
                    }
                    break;
                case "btnLineUpHit":
                    if (_assetSize == 'BIG') {
                        _target.graphics.beginFill("#000").drawRect(-25, -25, 75, 100);
                    } else {
                        _target.graphics.beginFill("#000").drawRect(-5, -10, 25, 50);
                    }
                    break;

                    //BETINFO
                case "txtCredit":
                    if (_assetSize == 'BIG') {
                        _target.maxWidth = 88;
                        _target.font = "20px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 16;
                        _target.textAlign = "center";
                        _target.textBaseline = "alphabetic";
                    } else {
                        _target.maxWidth = 38;
                        _target.font = "9px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 8;
                        _target.textAlign = "center";
                        _target.textBaseline = "alphabetic";
                    }
                    break;
                case "txtTotalBet":
                    if (_assetSize == 'BIG') {
                        _target.maxWidth = 88;
                        _target.textAlign = "center";
                        _target.font = "20px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.textBaseline = "alphabetic";
                        _target.y = 16;
                    } else {
                        _target.maxWidth = 41;
                        _target.textAlign = "center";
                        _target.font = "9px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.textBaseline = "alphabetic";
                        _target.y = 8;
                    }
                    break;
                case "txtTotalWin":
                    if (_assetSize == 'BIG') {
                        _target.maxWidth = 92;
                        _target.textAlign = "center";
                        _target.font = "20px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 16;
                        _target.textBaseline = "alphabetic";
                    } else {
                        _target.maxWidth = 43;
                        _target.textAlign = "center";
                        _target.font = "9px Arial Bold";
                        _target.color = "#FFFF00";
                        _target.x = _target.maxWidth / 2;
                        _target.y = 8;
                        _target.textBaseline = "alphabetic";
                    }
                    break;
                    
                //ALERT
                    case "txtAlertMessage":
                    if (_assetSize == 'BIG') {
                        _target.maxWidth = 350;
                        _target.x = 563;
                        _target.y = 342;
                        _target.font = "18px Arial Bold";
                        _target.color = "#FFF";
                        _target.textAlign = "center";
                        _target.textBaseline = "alphabetic"; 
                    } else {
                        _target.maxWidth = 210;
                        _target.x = 287;
                        _target.y = 152;
                        _target.font = "16px Arial Bold";
                        _target.color = "#FFFFFF";
                        _target.textAlign = "center";
                        _target.textBaseline = "alphabetic"; 
                    }
                    break;
                    
            }
        },
        
        //SETTINGS
        addPopUpSprite: function (_target) {
            //            //console.log("POPUP LOADING SPRITE: " + _target);
            var newSprite;
            switch (_target) {
            case "btnStartPlay":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('btnStartPlay_mouseout');
                newSprite.name = 'btnStartPlay';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 571;
                    newSprite.y = 434;
                } else {
                    newSprite.x = 274;
                    newSprite.y = 208;
                }
                break;
            case "btnClose":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('btnClose_mouseout');
                newSprite.name = 'btnClose';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 898;
                    newSprite.y = 11;
                } else {
                    newSprite.x = 431;
                    newSprite.y = 6;
                }
                break;
            case "selCoin":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('selection_box');
                newSprite.name = 'selCoin';
                break;
            case "selBet":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('selection_box');
                newSprite.name = 'selBet';
                break;
            case "selSpin":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('selection_box');
                newSprite.name = 'selSpin';
                break;
            case "tabAutoplay":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('tabAutoplay_mouseout');
                newSprite.name = 'tabAutoplay';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 428;
                    newSprite.y = 22;
                } else {
                    newSprite.x = 205;
                    newSprite.y = 10;
                }
                break;
            case "tabOption":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('tabOption_mouseout');
                newSprite.name = 'tabOption';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 259;
                    newSprite.y = 22;
                } else {
                    newSprite.x = 124;
                    newSprite.y = 10;
                }
                break;
            case "toggleMusic":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('toggleOff_mouseout');
                newSprite.name = 'toggleMusic';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 665;
                    newSprite.y = 431;
                } else {
                    newSprite.x = 319;
                    newSprite.y = 206;
                }
                break;
            case "toggleSfx":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('toggleOff_mouseout');
                newSprite.name = 'toggleSfx';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 665;
                    newSprite.y = 484;
                } else {
                    newSprite.x = 319;
                    newSprite.y = 232;
                }
                break;
            case "toggleFs":
                newSprite = standardSpriteSheet.clone();
                newSprite.gotoAndStop('toggleOff_mouseout');
                newSprite.name = 'toggleFs';
                newSprite.cursor = 'pointer';
                if (_assetSize == 'BIG') {
                    newSprite.x = 665;
                    newSprite.y = 537;
                } else {
                    newSprite.x = 319;
                    newSprite.y = 257;
                }
                break;
            }

            return newSprite;
        },

        positionPopupLayout: function (_target) {
            //            //console.log("POPUP SETTING: " + _target.name);
            switch (_target.name) {
                // textfield
            case "txtSetting":
                _target.text = "SETTINGS";
                _target.textAlign = "left";
                _target.color = "#FFFF00";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 35px Arial";
                    _target.x = 23;
                    _target.y = 41;
                } else {
                    _target.font = "bold 17px Arial";
                    _target.x = 11;
                    _target.y = 19;
                }
                break;
            case "txtCoin":
                _target.text = "Coin Value";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 83;
                    _target.y = 171;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 39;
                    _target.y = 82;
                }
                break;
            case "txtBet":
                _target.text = "Bet Coin";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 83;
                    _target.y = 349;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 39;
                    _target.y = 167;
                }
                break;
            case "txtMusic":
                _target.text = "Background Music";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 83;
                    _target.y = 453;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 39;
                    _target.y = 217;
                }
                break;
            case "txtSfx":
                _target.text = "Sound Effects";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 83;
                    _target.y = 507;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 39;
                    _target.y = 243;
                }
                break;
            case "txtFs":
                _target.text = "Full Screen Mode";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 83;
                    _target.y = 561;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 39;
                    _target.y = 269;
                }
                break;
            case "txtSpin":
                _target.text = "Number of Spins";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "bold 25px Arial";
                    _target.x = 180;
                    _target.y = 300;
                } else {
                    _target.font = "bold 15px Arial";
                    _target.x = 80;
                    _target.y = 144;
                }
                break;
            case "txtCopyright":
                _target.text = "Powered by Pacifica Software. Copyright (C) 2015.";
                _target.textAlign = "left";
                _target.color = "#ffffff";
                _target.textBaseline = "middle";
                if (_assetSize == "BIG") {
                    _target.font = "11px Arial";
                    _target.x = 11;
                    _target.y = 610;
                } else {
                    _target.font = "6px Arial";
                    _target.x = 5;
                    _target.y = 292;
                }
                break;
            case "txtVersion":
                _target.text = "Game Version 1.0.0";
                _target.textAlign = "right";
                _target.color = "#ffffff";
                _target.textBaseline = "alphabetic";
                if (_assetSize == "BIG") {
                    _target.maxWidth = 250;
                    _target.font = "11px Arial";
                    _target.x = 944;
                    _target.y = 610;
                } else {
                    _target.maxWidth = 100;
                    _target.font = "6px Arial";
                    _target.x = 453;
                    _target.y = 292;
                }
                break;
            case "txtSelection":
                _target.textAlign = "center";
                _target.color = "#ffffff";
                _target.shadow = new createjs.Shadow("#000000", 0, 0, 10);
                _target.textBaseline = 'middle';
                if (_assetSize == "BIG") {
                    _target.font = "bold 20px Arial";
                } else {
                    _target.font = "bold 12px Arial";
                }
                break;

                // Shapes
            case "bgPopup":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, 1024, 748);
                    _target.cache(0, 0, 1024, 748);
                } else {
                    _target.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, 480, 320);
                    _target.cache(0, 0, 480, 320);
                }
                break;
            case "settingsBg":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("#000000").drawRect(0, 0, 954, 624);
                    _target.cache(0, 0, 954, 624);
                } else {
                    _target.graphics.beginFill("#000000").drawRect(0, 0, 459, 300);
                    _target.cache(0, 0, 459, 300);
                }
                break;
            case "subBg":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("#333333").drawRect(47, 76, 868, 512);
                    _target.cache(47, 76, 868, 512);
                } else {
                    _target.graphics.beginFill("#333333").drawRect(22, 36, 417, 246);
                    _target.cache(22, 36, 417, 246);
                }
                break;
            case "optionSubBg1":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(49, 77, 866, 174);
                    _target.cache(49, 77, 866, 174);
                } else {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(23, 37, 416, 83);
                    _target.cache(23, 37, 416, 83);
                }
                break;
            case "optionSubBg2":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(49, 427, 866, 54);
                    _target.cache(49, 427, 866, 54);
                } else {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(23, 205, 416, 25);
                    _target.cache(23, 205, 416, 25);
                }
                break;
            case "optionSubBg3":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(49, 533, 866, 54);
                    _target.cache(49, 533, 866, 54);
                } else {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(23, 256, 416, 25);
                    _target.cache(23, 256, 416, 25);
                }
                break;
            case "autoSubBg1":
                if (_assetSize == 'BIG') {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(49, 174, 866, 240);
                    _target.cache(49, 184, 866, 277);
                } else {
                    _target.graphics.beginFill("rgba(37, 37, 37, 0.8)").drawRect(23, 83, 416, 115);
                    _target.cache(23, 83, 416, 115);
                }
                break;
            case "settingStroke":
                if (_assetSize == 'BIG') {
                    _target.graphics
                        .setStrokeStyle(5)
                        .beginLinearGradientStroke(["#0099FF", "#004472"], [0, 1], 853, 0, 853, 624)
                        .drawRect(0, 0, 954, 624);
                    _target.shadow = new createjs.Shadow("#00FFFF", 0, 0, 5);
                    _target.cache(-10, -10, 970, 644);
                } else {
                    _target.graphics
                        .setStrokeStyle(3)
                        .beginLinearGradientStroke(["#0099FF", "#004472"], [0, 1], 229, 0, 229, 300)
                        .drawRect(0, 0, 459, 300);
                    _target.shadow = new createjs.Shadow("#00FFFF", 0, 0, 3);
                    _target.cache(-10, -10, 470, 324);
                }
                break;
            case "subBgStroke":
                if (_assetSize == 'BIG') {
                    _target.graphics.setStrokeStyle(1).beginStroke("#FFF").drawRect(47, 76, 868, 512);
                    _target.cache(47, 76, 868, 512);
                } else {
                    _target.graphics.setStrokeStyle(1).beginStroke("#FFF").drawRect(22, 36, 417, 246);
                    _target.cache(22, 36, 417, 246);
                }
                break;
            case "headerLine":
                if (_assetSize == 'BIG') {
                    _target.graphics.setStrokeStyle(1).beginStroke("#333333").moveTo(9, 65).lineTo(945, 65);
                } else {
                    _target.graphics.setStrokeStyle(1).beginStroke("#333333").moveTo(5, 31).lineTo(455, 31);
                }
                break;

                // Container
            case "mainContainer":
                if (_assetSize == 'BIG') {
                    _target.x = 41;
                    _target.y = 60;
                } else {
                    _target.x = 9;
                    _target.y = 9;
                }
                break;
            case "contSelCoin":
                if (_assetSize == 'BIG') {
                    _target.x = 616;
                    _target.y = 82;
                } else {
                    _target.x = 296;
                    _target.y = 39;
                }
                break;
            case "contSelBet":
                if (_assetSize == 'BIG') {
                    _target.x = 616;
                    _target.y = 257;
                } else {
                    _target.x = 296;
                    _target.y = 123;
                }
                break;
            case "contSelSpin":
                if (_assetSize == 'BIG') {
                    _target.x = 534;
                    _target.y = 214;
                } else {
                    _target.x = 256;
                    _target.y = 102;
                }
                break;
            }
        },
        
        getPopupSettings: function(){
            var _data = {selectionBoxW:null,
                         selectionBoxH:null,
                         selectionBoxX:null,
                         selectionBoxY:null,
                         txtHeight:null,
                         bgW:null,
                         bgH:null};
            if (_assetSize == "BIG") {
                _data.selectionBoxW = 192;
                _data.selectionBoxH = 150;
                _data.selectionBoxX = 19;
                _data.selectionBoxY = 7;
                _data.txtHeight = 34;
                _data.bgW = 950;
                _data.bgH = 650;
            } else {
                _data.selectionBoxW = 92;
                _data.selectionBoxH = 71;
                _data.selectionBoxX = 9;
                _data.selectionBoxY = 3;
                _data.txtHeight = 15;
                _data.bgW = 459;
                _data.bgH = 300;
            }
            
            return _data;
        },
        
        
        createStandardCanvas: function(_target,_data){
            /*
                - for canvas plan out how your going to seperate your games.
                - only use the minimum canvas width and height required. lesser rendering when updating the stage
                - for canvas that keeps being updated avoid using big dimensions.
                - store elements that will never move/change/animated in 1 canvas.
                
                _data - for instances where its parameters are set by the user
            */
            //console.log(_target);
            var newCanvas;
            var newStage;
            var canvasData = {canvas:newCanvas,stage:newStage};
            
            newCanvas = document.createElement('canvas');
            switch (_target) {
                    
                    //CONTROLS
                case "btnSpin_canvas":
                    newCanvas.id = "btnSpin_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 100;
                        newCanvas.height = 90;
                    } else {
                        newCanvas.width  = 44;
                        newCanvas.height = 40;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                case "btnAuto_canvas":
                    newCanvas.id = "btnAuto_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 100;
                        newCanvas.height = 90;
                    } else {
                        newCanvas.width  = 44;
                        newCanvas.height = 40;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                case "btnInfo_canvas":
                    newCanvas.id = "btnInfo_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 50;
                        newCanvas.height = 49;
                    } else {
                        newCanvas.width  = 21;
                        newCanvas.height = 21;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                
                case "btnLineUp_canvas":
                    newCanvas.id = "btnLineUp_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 25;
                        newCanvas.height = 42;
                    } else {
                        newCanvas.width  = 11;
                        newCanvas.height = 18;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                case "btnLineDown_canvas":
                    newCanvas.id = "btnLineDown_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 25;
                        newCanvas.height = 42;
                    } else {
                        newCanvas.width  = 11;
                        newCanvas.height = 18;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                case "btnSettings_canvas":
                    newCanvas.id = "btnSettings_canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 50;
                        newCanvas.height = 49;
                    } else {
                        newCanvas.width  = 21;
                        newCanvas.height = 21;
                    }
                    document.getElementById("controlsWrapper").appendChild(newCanvas);
                    break;
                    
                    
                //POP UP CONTROLS
                case "controlPopup_Canvas":
                    newCanvas.id = "controlPopup_Canvas";
                    newCanvas.width  = _slotTheme.params.dimensionWidth - _dimensionBuffer;
                    newCanvas.height = _slotTheme.params.dimensionHeight - _dimensionBuffer;
                    document.getElementById("controlPopUpWrapper").appendChild(newCanvas);
                    break;    
                    
                    //BETINFO
                case "betInfoBG_Canvas":
                    newCanvas.id = "betInfoBG_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 650;
                        newCanvas.height = 57;
                    } else {
                        newCanvas.width  = 286;
                        newCanvas.height = 26;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtCredit_Canvas":
                    newCanvas.id = "txtCredit_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 88;
                        newCanvas.height = 21;
                    } else {
                        newCanvas.width  = 39;
                        newCanvas.height = 10;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtTotalBet_Canvas":
                    newCanvas.id = "txtTotalBet_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 88;
                        newCanvas.height = 21;
                    } else {
                        newCanvas.width  = 39;
                        newCanvas.height = 10;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtTotalWin_Canvas":
                    newCanvas.id = "txtTotalWin_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 88;
                        newCanvas.height = 21;
                    } else {
                        newCanvas.width  = 39;
                        newCanvas.height = 10;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtLinesLeft_Canvas":
                    newCanvas.id = "txtLinesLeft_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 88;
                        newCanvas.height = 21;
                    } else {
                        newCanvas.width  = 39;
                        newCanvas.height = 10;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                case "txtLinesRight_Canvas":
                    newCanvas.id = "txtLinesRight_Canvas";
                    if (_assetSize == 'BIG') {
                        newCanvas.width  = 88;
                        newCanvas.height = 21;
                    } else {
                        newCanvas.width  = 39;
                        newCanvas.height = 10;
                    }
                    document.getElementById("betInfoWrapper").appendChild(newCanvas);
                    break;
                    
                case "error_Canvas":
                    newCanvas.id = "error_Canvas";
                    newCanvas.width  = _slotTheme.params.dimensionWidth - _dimensionBuffer;
                    newCanvas.height = _slotTheme.params.dimensionHeight - _dimensionBuffer;
                    document.getElementById("errorWrapper").appendChild(newCanvas);
                    break;
                    
            }
            
            
            newStage = new createjs.Stage(newCanvas);
                        
            canvasData.canvas = newCanvas;
            canvasData.stage = newStage;
            
            
            return canvasData;
        },
        

    });

    return LayoutManager;
});