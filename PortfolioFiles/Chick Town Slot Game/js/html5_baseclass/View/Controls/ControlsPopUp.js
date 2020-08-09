define([], function () {

    var _slotTheme,
        _controls,
        _stage,
        assets,
        _delayAutoSpin,
        layoutManager,
        assetSize,

        //++++popup elements++++
        //sprites
        btnStartPlay,
        btnClose,
        selCoin,
        selBet,
        selSpin,
        tabAutoplay,
        tabOption,
        toggleMusic,
        toggleSfx,
        toggleFs,

        //textfield
        txtSetting,
        txtCoin,
        txtBet,
        txtMusic,
        txtSfx,
        txtFs,
        txtSpin,
        txtCopyright,
        txtVersion,
        txtSelection,

        //shapes
        bgPopup,
        settingsBg,
        subBg,
        optionSubBg1,
        optionSubBg2,
        optionSubBg3,
        autoSubBg1,
        settingStroke,
        subBgStroke,
        headerLine,

        // Containers
        mainContainer,
        contSelCoin,
        contSelBet,
        contSelSpin,
        //++++popup elements++++

        //FOR DRAG

        currentClip,
        currentContainer,
        defaultBet = "10",
        defaultCoin = "0.01",
        defaultSpin = 10,
        defaultBetClip,
        defaultCoinClip,
        defaultSpinClip,

        //SETTING VALUES
        isMobile,
        isHidden,
        isSfx,
        isMusic,
        selectedClip,
        selectedClipName,
        selectedBetValue = "",
        selectedCoinValue = "",
        selectedSpinValue = "",
        bgW = 950,
        bgH = 650,
        selectionBoxW = 130,
        selectionBoxH = 190,
        selectionBoxX = 15,
        selectionBoxY = 15,
        txtHeight = 38,

        //STATIC
        SLIDE_BET = "BET",
        SLIDE_COIN = "COIN",
        SLIDE_SPIN = "SPIN",

        //VALUES
        isSettingInit,
        isAutoInit,
        isFullScreen = false,
        stageHeight,
        stageWidth,
        mainPosX,
        mainPosY,
        actualContPosY,
        currentClipPosY,
        currentStageY,
        minPos,
        maxPos,

        arrayCoinValue = [],
        maxLineBet,
        arrayBetLine = [],
        arraySpin = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50',
                     '55', '60', '65', '70', '75', '80', '85', '90', '95', '99'],

        _params = {},

        ControlsPopUp = Class.extend({
            init: function (_slotThemeValue) {
                ////console.log('POPUP INITIALIZE');
                this.params = this.getParams();
                _slotTheme = _slotThemeValue;
                
                layoutManager = _slotTheme.params.layoutManager;
                
                //_stage = _slotTheme.params.stage;
                _stage = layoutManager.createStandardCanvas('controlPopup_Canvas').stage;
                
                //ACTIVATE TOUCH
                createjs.Touch.enable(_stage, [singleTouch=false]  [allowDefault=true]);
                
                _controls = _slotTheme.params.controls;
                isMobile = _slotTheme.params.isMobile;
                assetSize = _slotTheme.params.assetSize;
                arrayCoinValue = _slotTheme.params.gameProps.coinList;
                maxLineBet = _slotTheme.params.gameProps.maxLineBet;
                defaultBet = _slotTheme.params.lineBet == undefined ? defaultBet : _slotTheme.params.lineBet;
                defaultCoin = _slotTheme.params.coin == undefined ? defaultCoin : _slotTheme.params.coin;
                stageHeight = _slotTheme.params.dimensionHeight / _slotTheme.params.dimensionScale;
                stageWidth = _slotTheme.params.dimensionWidth / _slotTheme.params.dimensionScale;
                ////console.log("POPUP:" + arrayCoinValue + ":" + maxLineBet);
                //init
                settingsInit();
            },

            getParams: function () {
                return _params;
            },

            openPopUp: function (_params) {
                //document.documentElement.webkitRequestFullscreen();
                    
                
                document.getElementById("controlPopUpWrapper").style.display = 'block';
                
                createjs.Ticker.setFPS(30);
                
                ////console.log('OPEN POPUP:' + _params);
                if (isHidden === true) {
                    isHidden = false;
                    _stage.addChild(bgPopup);
                    _stage.addChild(mainContainer);
                    showSettings(_params);
                    bgPopup.alpha = 0;
                    mainContainer.alpha = 0;
                    
                    createjs.Ticker.addEventListener("tick", _stage);
                    
                    createjs.Tween.get(bgPopup).to({
                        alpha: 1
                    }, 500, createjs.Ease.cubicOut);
                    createjs.Tween.get(mainContainer).to({
                        alpha: 1
                    }, 500, createjs.Ease.cubicOut).call(function(){
                        createjs.Ticker.removeEventListener("tick", _stage);                                    
                    });

                }
               
                
            },

            openPaytable: function () {

            },

            getBetValue: function () {
                return selectedBetValue;
            },
            getCoinValue: function () {
                return selectedCoinValue;
            },
            getSpinValue: function () {
                return selectedSpinValue;
            }
        }),

        /** FUNCTIONS **/

        updateBetValue = function (str) {
            //console.log("BET: " + str);
            _slotTheme.doSlotThemeEvents({
                type: 'LINEBET',
                lineBet: str
            });
        },

        updateCoinValue = function (str) {
            //console.log("COIN: " + str);
            _slotTheme.doSlotThemeEvents({
                type: 'COIN',
                coin: str
            });
        },

        updateSpinValue = function (str) {
            //console.log("SPIN: " + str);
        },

        updateMusic = function (bool) {
            //console.log("MUSIC: " + bool);
            _slotTheme.doSlotThemeEvents({
                type: 'MUSIC',
                status: bool
            });
        },

        updateSFX = function (bool) {
            //console.log("SFX: " + bool);
            _slotTheme.doSlotThemeEvents({
                type: 'SFX',
                status: bool
            });
        },

        startAutohandler = function (evt) {
            //console.log("START AUTOPLAY");
            _controls.playBtnSounds(btnStartPlay);
            if (defaultSpinClip == undefined) {
                _controls.setAutoSpinCount(parseInt(defaultSpin));
            } else {
                _controls.setAutoSpinCount(parseInt(defaultSpinClip.getChildByName('txtSelection').text));
            }
            hideSettings('AUTOPLAY');
            _stage.update();
        },

        toggleFullScreen = function () {
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            } else {
                cancelFullScreen.call(doc);
            }

            //console.log('TOGGLE FS');
        },

        exitHandler = function () {
            var doc = window.document;
            //            //console.log(doc.fullscreenElement, doc.mozFullScreenElement, doc.webkitFullscreenElement, doc.msFullscreenElement);
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                //                //console.log("EXIT FS");
                if (toggleFs.hitTest(stage.mouseX, stage.mouseY)) {
                    toggleFs.gotoAndStop("toggleOff_mouseover");
                } else {
                    toggleFs.gotoAndStop("toggleOff_mouseout");
                }
                isFullScreen = false;
            } else {
                //                //console.log("FULLSCREEN");
                if (toggleFs.hitTest(stage.mouseX, stage.mouseY)) {
                    toggleFs.gotoAndStop("toggleOn_mouseover");
                } else {
                    toggleFs.gotoAndStop("toggleOn_mouseout");
                }
                isFullScreen = true;
            }
            _stage.update();
        },

        mouseInteractionHandler = function (e) {
            ////console.log(e.type + ":" + e.currentTarget.name);
            if (e.currentTarget.mouseEnabled == false) {
                return;
            }
            var prefix;
            if (e.currentTarget.name != 'toggleMusic' && e.currentTarget.name != 'toggleSfx' && e.currentTarget.name != 'toggleFs') {
                prefix = e.currentTarget.name;
            } else {
                switch (e.currentTarget.name) {
                case 'toggleMusic':
                    if (isMusic == true) {
                        prefix = 'toggleOn';
                    } else {
                        prefix = 'toggleOff';
                    }
                    break;
                case 'toggleSfx':
                    if (isSfx == true) {
                        prefix = 'toggleOn';
                    } else {
                        prefix = 'toggleOff';
                    }
                    break;
                case 'toggleFs':
                    if (isFullScreen == true) {
                        prefix = 'toggleOn';
                    } else {
                        prefix = 'toggleOff';
                    }
                    break;
                }
            }
            e.currentTarget.gotoAndStop(prefix + '_' + e.type);
            _stage.update();
        },

        //INITIALIZE POPUP
        settingsInit = function () {
            //INITIALIZE VALUES
            for (var i = 1; i <= maxLineBet; i++) {
                arrayBetLine.push(i);
            }

            //initial settings
            isHidden = true;
            isMusic = true;
            isSfx = true;
            isSettingInit = false;
            isAutoInit = false;

            ////console.log(assetSize);
            var popupSetting = layoutManager.getPopupSettings();
            selectionBoxW = popupSetting.selectionBoxW;
            selectionBoxH = popupSetting.selectionBoxH;
            selectionBoxX = popupSetting.selectionBoxX;
            selectionBoxY = popupSetting.selectionBoxY;
            txtHeight = popupSetting.txtHeight;
            bgW = popupSetting.bgW;
            bgH = popupSetting.bgH;
            
            mainPosX = (stageWidth / 2) - (bgW / 2);
            mainPosY = (stageHeight / 2) - (bgH / 2);
            selectedPositionY = selectionBoxH / 2;

            minPos = selectedPositionY - (txtHeight / 2);
            maxPos = selectedPositionY + (txtHeight / 2);

            //SPRITES
            btnStartPlay = layoutManager.addPopUpSprite("btnStartPlay");
            btnClose = layoutManager.addPopUpSprite("btnClose");
            selCoin = layoutManager.addPopUpSprite("selCoin");
            selBet = layoutManager.addPopUpSprite("selBet");
            selSpin = layoutManager.addPopUpSprite("selSpin");
            tabAutoplay = layoutManager.addPopUpSprite("tabAutoplay");
            tabOption = layoutManager.addPopUpSprite("tabOption");
            toggleMusic = layoutManager.addPopUpSprite("toggleMusic");
            toggleSfx = layoutManager.addPopUpSprite("toggleSfx");
            toggleFs = layoutManager.addPopUpSprite("toggleFs");

            //CONTAINERS
            mainContainer = new createjs.Container();
            contSelBet = addSelectionContainer(selBet, arrayBetLine, SLIDE_BET, defaultBet, false);
            contSelCoin = addSelectionContainer(selCoin, arrayCoinValue, SLIDE_COIN, defaultCoin, true);
            contSelSpin = addSelectionContainer(selSpin, arraySpin, SLIDE_SPIN, defaultSpin, false);

            mainContainer.name = "mainContainer";
            contSelBet.name = "contSelBet";
            contSelCoin.name = "contSelCoin";
            contSelSpin.name = "contSelSpin";

            layoutManager.positionPopupLayout(mainContainer);
            layoutManager.positionPopupLayout(contSelBet);
            layoutManager.positionPopupLayout(contSelCoin);
            layoutManager.positionPopupLayout(contSelSpin);


            //SHAPES
            bgPopup = new createjs.Shape();
            settingsBg = new createjs.Shape();
            subBg = new createjs.Shape();
            optionSubBg1 = new createjs.Shape();
            optionSubBg2 = new createjs.Shape();
            optionSubBg3 = new createjs.Shape();
            autoSubBg1 = new createjs.Shape();
            settingStroke = new createjs.Shape();
            subBgStroke = new createjs.Shape();
            headerLine = new createjs.Shape();

            bgPopup.name = "bgPopup";
            settingsBg.name = "settingsBg";
            subBg.name = "subBg";
            optionSubBg1.name = "optionSubBg1";
            optionSubBg2.name = "optionSubBg2";
            optionSubBg3.name = "optionSubBg3";
            autoSubBg1.name = "autoSubBg1";
            settingStroke.name = "settingStroke";
            subBgStroke.name = "subBgStroke";
            headerLine.name = "headerLine";

            layoutManager.positionPopupLayout(bgPopup);
            layoutManager.positionPopupLayout(settingsBg);
            layoutManager.positionPopupLayout(subBg);
            layoutManager.positionPopupLayout(optionSubBg1);
            layoutManager.positionPopupLayout(optionSubBg2);
            layoutManager.positionPopupLayout(optionSubBg3);
            layoutManager.positionPopupLayout(autoSubBg1);
            layoutManager.positionPopupLayout(settingStroke);
            layoutManager.positionPopupLayout(subBgStroke);
            layoutManager.positionPopupLayout(headerLine);

            //TEXTFIELD
            txtSetting = new createjs.Text();
            txtCoin = new createjs.Text();
            txtBet = new createjs.Text();
            txtMusic = new createjs.Text();
            txtSfx = new createjs.Text();
            txtFs = new createjs.Text();
            txtSpin = new createjs.Text();
            txtCopyright = new createjs.Text();
            txtVersion = new createjs.Text();

            txtSetting.name = "txtSetting";
            txtCoin.name = "txtCoin";
            txtBet.name = "txtBet";
            txtMusic.name = "txtMusic";
            txtSfx.name = "txtSfx";
            txtFs.name = "txtFs";
            txtSpin.name = "txtSpin";
            txtCopyright.name = "txtCopyright";
            txtVersion.name = "txtVersion";

            layoutManager.positionPopupLayout(txtSetting);
            layoutManager.positionPopupLayout(txtCoin);
            layoutManager.positionPopupLayout(txtBet);
            layoutManager.positionPopupLayout(txtMusic);
            layoutManager.positionPopupLayout(txtSfx);
            layoutManager.positionPopupLayout(txtFs);
            layoutManager.positionPopupLayout(txtSpin);
            layoutManager.positionPopupLayout(txtCopyright);
            layoutManager.positionPopupLayout(txtVersion);
            
            tabAutoplay.on("click", autoHandler);
            tabOption.on("click", settingHandler);
            bgPopup.on("click", doNothing);
            settingsBg.on("click", doNothing);
            btnClose.on("click", hideSettings);
            btnStartPlay.on('click', startAutohandler);
            toggleMusic.on('mousedown', musicHandler);
            toggleSfx.on('mousedown', sfxHandler);
            toggleFs.on('mousedown', FSHandler);
            if (isMobile == null) {
                tabAutoplay.on("mouseover", mouseInteractionHandler);
                tabAutoplay.on("mouseout", mouseInteractionHandler);
                tabAutoplay.on("mousedown", mouseInteractionHandler);

                tabOption.on("mouseover", mouseInteractionHandler);
                tabOption.on("mouseout", mouseInteractionHandler);
                tabOption.on("mousedown", mouseInteractionHandler);

                btnClose.on("mouseover", mouseInteractionHandler);
                btnClose.on("mouseout", mouseInteractionHandler);
                btnClose.on("mousedown", mouseInteractionHandler);

                btnStartPlay.on('mouseover', mouseInteractionHandler);
                btnStartPlay.on('mouseout', mouseInteractionHandler);
                btnStartPlay.on('mousedown', mouseInteractionHandler);

                toggleMusic.on('mouseover', mouseInteractionHandler);
                toggleMusic.on('mouseout', mouseInteractionHandler);
                toggleSfx.on('mouseover', mouseInteractionHandler);
                toggleSfx.on('mouseout', mouseInteractionHandler);
                toggleFs.on('mouseover', mouseInteractionHandler);
                toggleFs.on('mouseout', mouseInteractionHandler);
            }

            if (document.addEventListener) {
                document.addEventListener('webkitfullscreenchange', exitHandler, false);
                document.addEventListener('mozfullscreenchange', exitHandler, false);
                document.addEventListener('fullscreenchange', exitHandler, false);
                document.addEventListener('MSFullscreenChange', exitHandler, false);
            }

            contSelCoin.mouseMoveOutside = true;
            contSelBet.mouseMoveOutside = true;
            contSelSpin.mouseMoveOutside = true;

            contSelCoin.on('mousedown', updateSelection);
            contSelBet.on('mousedown', updateSelection);
            contSelSpin.on('mousedown', updateSelection);

            toggleMusic.gotoAndStop("toggleOn_mouseout");
            toggleSfx.gotoAndStop("toggleOn_mouseout");

            _slotTheme.doSlotThemeEvents({
                type: 'MUSIC',
                status: true
            });
            _slotTheme.doSlotThemeEvents({
                type: 'SFX',
                status: true
            });
            
            _stage.update();
        },

        addTextContainer = function (str, w, h) {

            var cont = new createjs.Container(),
                bgCont = new createjs.Container(),
                txt = new createjs.Text(),
                shp = new createjs.Shape(),
                shpSelected = new createjs.Shape(),
                ypos = -(h / 2);
            txt.x = w / 2;
            txt.text = str;
            shp.graphics.beginLinearGradientFill(["rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.1)"], [0.1, 0.9], 0, ypos, 0, h).drawRect(0, ypos, w, h);
            shpSelected.graphics.beginLinearGradientFill(["#33a2ff", "#98d0ff"], [0.5, 0.3], 0, h, 0, ypos).drawRect(0, ypos, w, h);
            bgCont.addChild(shp, shpSelected);
            shpSelected.visible = false;
            shpSelected.name = "selected";
            txt.name = "txtSelection";
            layoutManager.positionPopupLayout(txt);
            bgCont.name = "bgcont";
            cont.addChild(bgCont);
            cont.addChild(txt);
            cont.cursor = 'pointer';
            return cont;
        },

        addSelectionContainer = function (contBg, arr, slideName, defValue, isDoubleDigit) {
            var container = new createjs.Container(),
                subContainer = new createjs.Container(),
                valuesContainer = new createjs.Container(),
                masker = new createjs.Shape(),
                contArr = [];
            contArr = arr;
            masker.graphics.beginFill('#FFFFFF').drawRect(selectionBoxX, selectionBoxY + 2, selectionBoxW, selectionBoxH - 2);
            subContainer.x = selectionBoxX;
            subContainer.y = selectionBoxY;
            //            container.mask = masker;
            subContainer.mask = masker;

            for (var i = 0; i < contArr.length; i++) {
                var txtContainer, tmpNum;
                tmpNum = isDoubleDigit ? arr[i].toFixed(2) : arr[i];
                txtContainer = addTextContainer(tmpNum, selectionBoxW, txtHeight);
                txtContainer.name = "txtContainer" + i;
                txtContainer.y = (txtHeight * i) + 15;
                if (txtContainer.y > minPos && txtContainer.y < maxPos) {
                    //          ABSOLUTE POSITION IS selectedPositionY
                    txtContainer.getChildByName('bgcont').getChildByName('selected').visible = true;
                }
                if (arr[i] == defValue) {
                    switch (slideName) {
                    case SLIDE_BET:
                        defaultBetClip = txtContainer;
                        break;
                    case SLIDE_COIN:
                        defaultCoinClip = txtContainer;
                        break;
                    case SLIDE_SPIN:
                        defaultSpinClip = txtContainer;
                        break;
                    }
                }
                txtContainer.mouseChildren = false;
                valuesContainer.addChild(txtContainer);

            }
            //            //console.log(slideName + ":" + defValue);
            valuesContainer.name = slideName;
            subContainer.addChild(valuesContainer);
            container.addChild(contBg, subContainer);
            return container;
        },

        updateSelection = function (evt) {
            if (evt.target.name === null ||
                evt.target.name == "selCoin" || evt.target.name == "selBet" || evt.target.name == "selSpin") return;
            currentClip = evt.target;
            currentContainer = currentClip.parent;
            selectedClipName = currentContainer.name;
            _stage.addEventListener('stagemouseup', selectionUp);
            _stage.addEventListener('stagemousemove', stageMove);
            currentClipPosY = currentClip.y;
            currentStageY = evt.stageY;
            
            createjs.Ticker.removeEventListener("tick", _stage);
            createjs.Ticker.addEventListener("tick", _stage);
        },

        moveToSelected = function (clip_param, container_param) {
            var posDiff = selectedPositionY - clip_param.y;

            for (var i = 0; i < container_param.children.length; i++) {
                container_param.getChildAt(i).getChildByName('bgcont').getChildByName('selected').visible = false;
                createjs.Tween.get(container_param.getChildAt(i)).to({
                    y: container_param.getChildAt(i).y + posDiff
                }, 500).call(upComplete);
                //            //console.log(posDiff + ":" + currentContainer.getChildAt(i).y);
            }
            clip_param.getChildByName('bgcont').getChildByName('selected').visible = true;
            
            _stage.update();
        },

        selectionUp = function (evt) {

            switch (selectedClipName) {
            case SLIDE_BET:
                updateBetValue(selectedClip.getChildByName('txtSelection').text);
                break;
            case SLIDE_COIN:
                updateCoinValue(selectedClip.getChildByName('txtSelection').text);
                break;
            case SLIDE_SPIN:
                defaultSpinClip = selectedClip;
                updateSpinValue(selectedClip.getChildByName('txtSelection').text);
                break;
            }
            //        //console.log("Up:" + selectedClipName + ":" + selectedBetValue + ":" + selectedCoinValue + ":" + selectedSpinValue);
            moveToSelected(selectedClip, currentContainer);
            _stage.removeEventListener('stagemousemove', stageMove);
            _stage.removeEventListener('stagemouseup', selectionUp);
            
        },

        upComplete = function () {
            //after swipe animation
            createjs.Ticker.removeEventListener("tick", _stage);
        },

        stageMove = function (evt) {
            //        //console.log("StageMove:" + _stage.mouseY);
            var tmpY = currentStageY - evt.stageY;
            if (currentContainer.getChildAt(0).y <= selectedPositionY && currentContainer.getChildAt(currentContainer.children.length - 1).y >= selectedPositionY) {
                for (var i = 0; i < currentContainer.children.length; i++) {
                    currentContainer.getChildAt(i).y += -tmpY;
                    if (currentContainer.getChildAt(i).y > minPos && currentContainer.getChildAt(i).y < maxPos) {
                        //                    //console.log(currentContainer.getChildAt(i).y);
                        currentContainer.getChildAt(i).getChildByName('bgcont').getChildByName('selected').visible = true;
                        selectedClip = currentContainer.getChildAt(i);
                    } else {
                        currentContainer.getChildAt(i).getChildByName('bgcont').getChildByName('selected').visible = false;
                    }
                }
            } else {
                for (var j = 0; j < currentContainer.children.length; j++) {
                    currentContainer.getChildAt(j).y += -tmpY;
                }
                if (currentContainer.getChildAt(0).y > selectedPositionY) {
                    currentContainer.getChildAt(0).getChildByName('bgcont').getChildByName('selected').visible = true;
                    selectedClip = currentContainer.getChildAt(0);
                }
                if (currentContainer.getChildAt(currentContainer.children.length - 1).y < selectedPositionY) {
                    currentContainer.getChildAt(currentContainer.children.length - 1).getChildByName('bgcont').getChildByName('selected').visible = true;
                    selectedClip = currentContainer.getChildAt(currentContainer.children.length - 1);
                }
                //            evt.remove();
            }
            currentStageY = evt.stageY;
            
            _stage.update();
        },

        doNothing = function (evt) {
            //for blocking mouse clicks only
        },

        musicHandler = function (evt) {
            _controls.playBtnSounds(toggleMusic);

            if (!isMusic) {
                isMusic = true;
                if (isMobile == null) {
                    toggleMusic.gotoAndStop("toggleOn_mouseover");
                } else {
                    toggleMusic.gotoAndStop("toggleOn_mouseout");
                }
            } else {
                isMusic = false;
                toggleMusic.gotoAndStop("toggleOff_mouseover");
                if (isMobile == null) {
                    toggleMusic.gotoAndStop("toggleOff_mouseover");
                } else {
                    toggleMusic.gotoAndStop("toggleOff_mouseout");
                }
                //        _slotTheme.updateStage();
            }
            updateMusic(isMusic);
            _stage.update();
        },

        sfxHandler = function (evt) {
            _controls.playBtnSounds(sfxHandler);
            if (!isSfx) {
                isSfx = true;
                if (isMobile == null) {
                    toggleSfx.gotoAndStop("toggleOn_mouseover");
                } else {
                    toggleSfx.gotoAndStop("toggleOn_mouseout");
                }
            } else {
                isSfx = false;
                toggleSfx.gotoAndStop("toggleOff_mouseover");
                if (isMobile == null) {
                    toggleSfx.gotoAndStop("toggleOff_mouseover");
                } else {
                    toggleSfx.gotoAndStop("toggleOff_mouseout");
                }
            }
            updateSFX(isSfx);
            
            _stage.update();
        },

        FSHandler = function (evt) {
            _controls.playBtnSounds(toggleFs);
            toggleFullScreen();
            
            _stage.update();
        },

        showSettings = function (value) {
            mainContainer.removeAllChildren();
            mainContainer.addChild(settingsBg, settingStroke, txtSetting, subBg, tabAutoplay, tabOption, btnClose, txtCopyright, txtVersion);
            //VALUES: SETTINGS, AUTOSPIN
            if (value == 'AUTOSPIN') {
                tabAutoplay.gotoAndStop('tabAutoplay_selected');
                tabOption.gotoAndStop('tabOption_mouseout');
                tabAutoplay.mouseEnabled = false;
                tabOption.mouseEnabled = true;
                btnStartPlay.gotoAndStop("btnStartPlay_mouseout");
                mainContainer.addChild(autoSubBg1, btnStartPlay, txtSpin, btnStartPlay, contSelSpin);
                if (!isAutoInit) {
                    isAutoInit = true;
                    moveToSelected(defaultSpinClip, defaultSpinClip.parent);
                    updateSpinValue(defaultSpin);
                }
            } else {
                tabAutoplay.gotoAndStop('tabAutoplay_mouseout');
                tabOption.gotoAndStop('tabOption_selected');
                tabAutoplay.mouseEnabled = true;
                tabOption.mouseEnabled = false;
                mainContainer.addChild(optionSubBg1, optionSubBg2, optionSubBg3, toggleMusic, toggleSfx, toggleFs,
                    txtBet, txtCoin, txtMusic, txtSfx, txtFs, contSelCoin, contSelBet);
                if (!isSettingInit) {
                    isSettingInit = true;
                    moveToSelected(defaultBetClip, defaultBetClip.parent);
                    moveToSelected(defaultCoinClip, defaultCoinClip.parent);
                    updateBetValue(defaultBet);
                    updateCoinValue(defaultCoin);
                }
            }
            mainContainer.addChild(subBgStroke, headerLine);
            
            _stage.update();
        },

        hideSettings = function (_from) {
            if (_from != 'AUTOPLAY') {
                _controls.playBtnSounds(btnClose);
            }
            
            createjs.Ticker.removeEventListener("tick", _stage);
            createjs.Ticker.addEventListener("tick", _stage);
            
            createjs.Tween.get(bgPopup).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
                _stage.removeChild(bgPopup);
            });
            createjs.Tween.get(mainContainer).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
                _stage.removeChild(mainContainer);
                isHidden = true;
                if (_from == 'AUTOPLAY') {
                    _delayAutoSpin = setTimeout(function () {
                        clearTimeout(_delayAutoSpin);
                        _controls.doAutoSpin();
                        document.getElementById("controlPopUpWrapper").style.display = 'none';
                        createjs.Ticker.removeEventListener("tick", _stage);
                    }, 1000);

                } else {
                    document.getElementById("controlPopUpWrapper").style.display = 'none';
                    createjs.Ticker.removeEventListener("tick", _stage);
                    _slotTheme.resumeAnimation();
                }
                
                
            });
            
            _stage.update();
        },


        autoHandler = function (e) {
            _controls.playBtnSounds(tabAutoplay);
            showSettings("AUTOSPIN");
        },

        settingHandler = function (e) {
            e.currentTarget.gotoAndStop('tabOption_disabled');
            tabAutoplay.gotoAndStop('tabAutoplay_mouseout');
            _controls.playBtnSounds(tabOption);
            showSettings("SETTINGS");
        };

    Object.defineProperty(_params, "slotTheme", {
        set: function (_value) {
            _slotTheme = _value;
        },
        get: function () {
            return _slotTheme;
        }
    });

    Object.defineProperty(_params, "stage", {
        set: function (_value) {
            _stage = _value;
        },
        get: function () {
            return _stage;
        }
    });

    return ControlsPopUp;
});