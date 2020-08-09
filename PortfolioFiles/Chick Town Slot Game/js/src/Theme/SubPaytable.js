

define(["../../html5_baseclass/View/Paytable/Paytable"], function(Paytable) {
    var rootContainer, paytableContainer, paytableBG;
    var btnNext, btnPrev, btnClose;
    var pageContainers;//an array of containers
    var paytableSpriteSheet;
    var _this,_stage;
    var _nextPage,_prevPage,_close,_mouseD,_mouseM,_mouseC,_disableButtons,_enableButtons, _buttonOver,_buttonOut; //functions
    var currentPage,isTweening,mouseOffset,moveDirection,pageToMoveWith;
    var swipeOffset = 812; //the higher the number the shorter it is you need to swipe to change page
    var pageMoveOffset = 1024; //the offset of the pagetomovewith.
    var layoutManager;
 
    var SubPaytable = Paytable.extend({
        init: function(_slotTheme,_rootContainer){
            this._super(_slotTheme);
            layoutManager = _slotTheme.params.layoutManager;
            _this=this;
            _stage = layoutManager.createCanvas('paytable_Canvas').stage;
            this.contentStage = _stage
            _stage.enableMouseOver(10);
            _stage.mouseMoveOutside = true;
            _nextPage=this.nextPage;
            _prevPage=this.prevPage;
            _close=this.close;
            _mouseD = this.mouseD;
            _mouseM = this.mouseM;
            _mouseC=this.mouseC;
            _disableButtons=this.disableButtons;
            _enableButtons=this.enableButtons;
            _buttonOver=this.buttonOver;
            _buttonOut=this.buttonOut;
            currentPage =0;
            isTweening=false;
            createjs.Touch.enable(_stage);
            currentPage=0;
            swipeOffset=layoutManager.getValue("swipeOffset");
            
            rootContainer=_stage;
            paytableContainer = new createjs.Container();
            rootContainer.addChild(paytableContainer);
            
            paytableSpriteSheet=new createjs.Sprite(this.params.slotTheme.getAssetManager().getSpriteSheetJSON('PaytableJSON','Paytable'));
            
            pageContainers=new Array();
            paytableBG=new Array();
             
            for(var i=0; i<6; i++){
                //create containers for each page
                pageContainers[i] =new createjs.Container(); 
                paytableContainer.addChild(pageContainers[i]);
                pageContainers[i].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 1024, 748));
                pageContainers[i].x=1024;
                layoutManager.setPosition("pageContainer", pageContainers[i]);
                //add page contents
                paytableBG[i]=paytableSpriteSheet.clone();
                paytableBG[i].gotoAndStop('paytableBG');
                pageContainers[i].addChild(paytableBG[i]);
                var content = paytableSpriteSheet.clone();
                content.gotoAndStop('page' + (i +1));
                layoutManager.setPosition("page" + i, content);
                pageContainers[i].addChild(content);
                
                //add listener
                pageContainers[i].on("mousedown", _mouseD);
                pageContainers[i].on("pressmove", _mouseM);
                pageContainers[i].on("click",_mouseC);
            }
            
            btnNext = paytableSpriteSheet.clone();
            btnNext.gotoAndStop("next_mouseout");
            btnNext.name="next";
            layoutManager.setPosition("btnNext", btnNext);
            btnNext.cursor='pointer';
            btnNext.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 115, 33));
            paytableContainer.addChild(btnNext);
            
            btnPrev = paytableSpriteSheet.clone();
            btnPrev.gotoAndStop("prev_mouseout");
            btnPrev.name="prev";
            layoutManager.setPosition("btnPrev", btnPrev);
            btnPrev.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 122, 33));
            btnPrev.cursor='pointer';
            paytableContainer.addChild(btnPrev);
            
            btnClose = paytableSpriteSheet.clone();
            btnClose.gotoAndStop("close_mouseout");
            btnClose.name="close";
            layoutManager.setPosition("btnClose", btnClose);
            btnClose.cursor='pointer';
            paytableContainer.addChild(btnClose);
            
            btnPrev.on("click", _prevPage, this);
            btnNext.on("click", _nextPage, this);
            btnClose.on("click", _close, this);
            
            btnPrev.on("mouseover", _buttonOver, this);
            btnNext.on("mouseover", _buttonOver, this);
            btnClose.on("mouseover", _buttonOver, this);
            
            btnPrev.on("mouseout", _buttonOut, this);
            btnNext.on("mouseout", _buttonOut, this);
            btnClose.on("mouseout", _buttonOut, this);
             
            paytableContainer.alpha=0; //commented for testing
            
            pageMoveOffset = layoutManager.getValue("moveOffset");
            _this.animateIn();
            createjs.Ticker.addEventListener("tick", this.contentStage);
            createjs.Ticker.setFPS(30);
        },
        
        animateIn: function(){
            pageContainers[currentPage].x=0;
            createjs.Tween.get(paytableContainer, {override:true}).to({alpha:1}, 300);
            btnPrev.mouseEnabled=false;
            btnPrev.gotoAndStop("prev_disabled");
            
            btnNext.mouseEnabled=true;
            btnClose.mouseEnabled=true;
        },
        
        mouseD:function(e){
            mouseOffset=e.currentTarget.x-e.stageX;
            pageToMoveWith=currentPage;
        },
        mouseM:function(e){
            
            if(e.target.x <0) {
                pageToMoveWith=currentPage+1;
                moveDirection ="left";
                
                if(pageToMoveWith>5)return;
                pageContainers[pageToMoveWith].x=e.target.x+pageMoveOffset;
            }
            else if(e.target.x >0) {
                pageToMoveWith=currentPage-1;
                moveDirection ="right";
                
                if(pageToMoveWith<0)return;
                
                pageContainers[pageToMoveWith].x=e.target.x-pageMoveOffset;
            }
            
            e.target.x=(e.stageX+mouseOffset) / _stage.scaleX;
        },
        mouseC:function(e){
            
            if(pageToMoveWith<0 || pageToMoveWith>5) {
                createjs.Tween.get(pageContainers[currentPage], {override:true}).to({x:0}, 600, createjs.Ease.backOut).call(_enableButtons, null,_this);
                return;
            }
            
            if(currentPage==0 && moveDirection=="right") return;
            if(currentPage==5 && moveDirection=="left") return;
            if(moveDirection==undefined) return;
           
            _this.disableButtons();
            
            if(moveDirection=="right") {
                if(pageContainers[pageToMoveWith].x>-swipeOffset){
                    currentPage--;
                    pageToMoveWith=currentPage+1;
                    createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:pageMoveOffset}, 600, createjs.Ease.backOut);
                }else{
                    createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:-pageMoveOffset}, 600, createjs.Ease.backOut);
                }
                
                createjs.Tween.get(pageContainers[currentPage], {override:true}).to({x:0}, 600, createjs.Ease.backOut).call(_enableButtons, null,_this);
                
            }
            else if(moveDirection=="left") {
                if(pageContainers[pageToMoveWith].x<swipeOffset) {
                    currentPage++;
                    pageToMoveWith=currentPage-1;
                    createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:-pageMoveOffset}, 600, createjs.Ease.backOut);
                }else{
                    createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:pageMoveOffset}, 600, createjs.Ease.backOut);
                }
                createjs.Tween.get(pageContainers[currentPage], {override:true}).to({x:0}, 600, createjs.Ease.backOut).call(_enableButtons, null,_this);
            }  
        },
        
        buttonOver:function(e){
            if(!e.currentTarget.mouseEnabled) return;
            e.target.gotoAndStop(e.target.name + "_mouseover");
        },
        
        buttonOut:function(e){
            if(!e.target.mouseEnabled) return;
            e.target.gotoAndStop(e.target.name + "_mouseout");
        },
        
        nextPage:function(){
            if(currentPage>4) return; 
            _this.disableButtons();
            
            
            currentPage++;
            pageToMoveWith=currentPage-1;
            createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:-pageMoveOffset}, 800, createjs.Ease.sineOut);
            createjs.Tween.get(pageContainers[currentPage], {override:true}).to({x:0}, 800, createjs.Ease.sineOut).call(_enableButtons, null,_this);
        },
        prevPage:function(){
            if(currentPage==0) return; 
            _this.disableButtons();
            
            
            currentPage--;
            pageToMoveWith=currentPage+1;
            
            createjs.Tween.get(pageContainers[pageToMoveWith], {override:true}).to({x:pageMoveOffset}, 800, createjs.Ease.sineOut);
            createjs.Tween.get(pageContainers[currentPage], {override:true}).to({x:0}, 800, createjs.Ease.sineOut).call(_enableButtons, null,_this);
        },
        
        disableButtons:function(){
            for(var i=0;i<pageContainers.length;i++){
                pageContainers[i].mouseEnabled=false;
            }
            btnClose.mouseEnabled=false;
            btnNext.mouseEnabled=false;
            btnPrev.mouseEnabled=false;
            
            btnClose.gotoAndStop("close_disabled");
            btnNext.gotoAndStop("next_disabled");
            btnPrev.gotoAndStop("prev_disabled");
        },
        enableButtons:function(){
            moveDirection=undefined;
            for(var i=0;i<pageContainers.length;i++){
                pageContainers[i].mouseEnabled=true;
            }
            btnClose.mouseEnabled=true;
            btnNext.mouseEnabled=true;
            btnPrev.mouseEnabled=true;
            
            btnClose.gotoAndStop("close_mouseout");
            btnNext.gotoAndStop("next_mouseout");
            btnPrev.gotoAndStop("prev_mouseout");
            
            if (currentPage == 5){
                btnNext.mouseEnabled=false;
                btnNext.gotoAndStop("next_disabled");
            }else if(currentPage==0){
                btnPrev.mouseEnabled=false;
                btnPrev.gotoAndStop("prev_disabled");
            }
        },
        close:function(){
            createjs.Tween.get(paytableContainer, {override:true}).to({alpha:0}, 200).call(_this.completeAnimOut, null, this);
        },
        completeAnimOut:function(){
            this.contentStage.autoClear = true;
            this.contentStage.removeAllChildren(); 
            createjs.Ticker.removeEventListener("tick", this.contentStage);
            this.contentStage.update(); 
            
            document.getElementById("paytable_Canvas").style.display = 'none';
            document.getElementById("paytable_Canvas").remove();
            
            this.closePaytable();
        },
              
    });
	
    return SubPaytable;
});