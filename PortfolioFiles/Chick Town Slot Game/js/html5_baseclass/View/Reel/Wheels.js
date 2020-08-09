

define(["./WheelSpinMode"], function(WheelSpinMode) {
    
    
    var Wheel = Class.extend({
        init: function(param1, param2, _spinHeight, param3, param4, param5, param6, param7, param8, param9, param10,_slotThemeValue,_slotReelValue){
            
            this.slotTheme = _slotThemeValue;
            //this.stage = this.slotTheme.params.stage;
            this.slotReel = _slotReelValue;
            
            this.rows = param1;
            this.spinHeight = _spinHeight;
			this.windowHeight = param2;
			this.windowWidth = param3;
			this.symbolYInterval = param4;
			this.xRef = param5;
			this.yRef = param6;
			this.codes = param8;
			this.imagePool = param9;
			this.wheelIndex = param10;
            
            
        },
       
        setDefaults: function(_x,_y){
            /*create a new canvas*/
            /*this.newCanvas = document.createElement('canvas');
            this.newCanvas.id     = "wheel"+this.wheelIndex;
            this.newCanvas.width  = this.windowWidth;
            this.newCanvas.height = this.windowHeight;
            document.getElementById("canvasContainer").appendChild(this.newCanvas);
            
            this.stage = new createjs.Stage(this.newCanvas);
            
            createjs.Ticker.setFPS(30);
            this.baseX = 0;
            this.baseY = 0;
            */
            
            /*var createdCanvas = this.slotTheme.params.layoutManager.createStandardCanvas("wheel"+this.wheelIndex);
            this.newCanvas = createdCanvas.canvas;
            this.newCanvas.width  = this.windowWidth;
            this.newCanvas.height = this.windowHeight;
            this.stage = createdCanvas.stage;
            this.baseX = _x;
            this.baseY = _y;*/
            ////////////////////////////////////////
            
            /*1 CANVAS*/
            this.stage = this.slotReel.params.stageWheel;
            this.baseX = _x;
            this.baseY = _y;
            ///////////////////////////////////////////
            
            
            this.mask = new createjs.Shape();
            this.mask.x = this.baseX;
            this.mask.y = this.baseY;
            this.mask.graphics.beginStroke("#FF0").setStrokeStyle(5).drawRect(0, this.baseY,this.windowWidth, this.spinHeight).closePath();
            
            this.container = new createjs.Container();
            this.container.x = this.baseX;
            this.container.y = this.baseY;
            this.container.mouseEnabled = false;
            this.container.mask = this.mask;
            
            
            this.resultContainer = new createjs.Container();
            this.container.addChild(this.resultContainer);
            
            this.spinReel1 = new createjs.Container();
            this.spinReel2 = new createjs.Container();
            
            this.WheelSpinMode = WheelSpinMode.params();
            
            this.stage.addChild(this.container);
            
            this.setNextSpinParam(this.spinParams[this.spinParams.length - 1]);//set to last which is stop
            this.spinParamsCount = 0;
            
            this.showPictures();
            this.resultContainer.y = -this.symbolYInterval  + this.baseY;
            
            this.stage.update();
        },
        
        updateResult: function(_resultArray)
		{
			this.resultList = _resultArray;
		},
        
        showPictures: function(){
            while(this.resultContainer.numChildren  > 0){
                this.resultContainer.removeChildAt(0);  
            }
            
            this.wheelResultList = this.resultList;
            this.wheelResultList = this.wheelResultList;
            this.wheelItems = new Array();
            
            var item;
			
            //add top filler for bounce effect
			this.fillSpinReel(this.resultContainer, "top");
            for (var i = 0; i <= this.resultList.length - 1; i++)
			{
                var index = 0;
				var _y;
				for (var j = 0; j < this.codes.length; j++)
				{
					if (this.codes[j] == this.resultList[i])
					{
						index = j;
						break;
					}
				}
				item = this.imagePool.getStaticImage(this.resultList[i]);
				_y = this.yRef + (i + 1) * this.symbolYInterval;
				item.y = _y;
				item.x = this.xRef;
                this.wheelItems.push(new Array(item, index));
                this.resultContainer.addChildAt(item, (i + 1));
			}
            
            //add bottom filler for bounce effect
			this.fillSpinReel(this.resultContainer, "bottom");
            
            this.resultContainer.y = -(this.resultContainer.numChildren * this.symbolYInterval) + this.baseY;
            
            //this.stage.update();
		},
        destroyResult: function(){
			if (this.resultContainer.numChildren > 0)
			{
                var _target;
                
                //destroy top and bottom filler first
                _target = this.resultContainer.getChildAt(this.resultContainer.numChildren - 1),
                this.imagePool.disposeImage(_target);
                this.resultContainer.removeChildAt(this.resultContainer.numChildren - 1);
                
                _target = this.resultContainer.getChildAt(0),
                this.imagePool.disposeImage(_target);
                this.resultContainer.removeChildAt(0);
                
                var i = this.wheelResultList.length;
                while (--i >= 0)
				{
                    _target = this.resultContainer.getChildAt(i),
                    
					this.imagePool.disposeStaticImage(_target, this.wheelResultList[i]);
                    this.resultContainer.removeChildAt(i);
				}
			}
			this.wheelItems = null;
            
             this.slotReel.checkWheelEvent({type:'ON_RESULT_OUT',wheelIndex:this.wheelIndex});
		},
        showDefaultResult: function(){
			this.destroyResult();
			this.showPictures();
			this.reelStatus = this.WheelSpinMode.FULL_STOP;
            this.resultContainer.y = -(this.symbolYInterval) + this.baseY;
			this.activeReel2.visible = false;
			this.activeReel1.visible = false;
			this.slotReel.checkWheelEvent({type:'ON_STOP',wheelIndex:this.wheelIndex});
		},
        getItemAt: function(index){
			var _m;
			if (index < this.wheelItems.length)
			{
				_m = {object: this.wheelItems[index][0], codeIndex: this.wheelItems[index][1], x:this.baseX, y:parseFloat((index * this.symbolYInterval) + this.baseY) };
			}
			return _m;
		},
        getResultList: function(){
            return this.resultList;
        },
        
        // SPIN PARAMETERS
        updateSpinParams: function(_spinParams){
            this.spinParams = _spinParams;
            this.spinParamsCount = 0;//which _spinParams is target
		},
        setNextSpinParam: function(){
            var _nextSpinParams = this.spinParams[this.spinParamsCount];
            if (_nextSpinParams == undefined || _nextSpinParams == null) {
				return;
			}
			if (_nextSpinParams.moveInterval) {
				this.moveInterval = _nextSpinParams.moveInterval;
			}
			if (_nextSpinParams.direction) {
				this.direction = _nextSpinParams.direction;
			}
			if (_nextSpinParams.targetY != null) {
				this.targetY = _nextSpinParams.targetY;
			}
			if(_nextSpinParams.mode != undefined || _nextSpinParams.mode != null){
			 this.reelStatus = _nextSpinParams.mode;
            }  
        },
        
        //SPIN CODES
        onSpin: function(){
            var _target;
            while (this.spinReel1.numChildren > 0)
			{
                _target = this.spinReel1.getChildAt(0);
				this.imagePool.disposeImage(_target);
                this.spinReel1.removeChildAt(0);
			}
			while (this.spinReel2.numChildren > 0)
			{
                _target = this.spinReel2.getChildAt(0);
				this.imagePool.disposeImage(_target);
                this.spinReel2.removeChildAt(0);
			}
			this.spinReel1.visible = true;
			this.spinReel2.visible = true;
			
			this.reelStatus = this.WheelSpinMode.SPIN_INTRO;
			
			this.fillSpinReel(this.spinReel1);
			this.fillSpinReel(this.spinReel2);
			
			this.activeReel1 = this.spinReel1;
			this.activeReel2 = this.spinReel2;
			
			this.spinReel1.visible = true;
            
            this.spinParamsCount = 0;
            this.setNextSpinParam();
            
            this.initSpin = false;
            
            
            //createjs.Ticker.timingMode = createjs.Ticker.RAF;
            //createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
            //createjs.Ticker.maxDelta = 30;
            
            /*FINAL*/
            //createjs.Ticker.setFPS(60);
            //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            //createjs.Ticker.addEventListener("tick", this.stage);
        },
        fillSpinReel: function(r, isFiller)
		{
            
			//isFiller, dummy value at the top of the result for bounce effect
            if(isFiller == undefined){
                isFiller = "";
            }
            
			var count = this.rows;
			var s;
			var i;
			var _y;
			var _target;
			if (isFiller == "")
			{
				while (r.numChildren > 0)
				{
                    _target = r.getChildAt(0);
                    this.imagePool.disposeImage(_target);
                    r.removeChildAt(0);
					
				}
				for (i = 0, _y = 0; i < count; i++)
				{
					s = this.imagePool.getImage();
					_y = this.yRef + i * this.symbolYInterval;
					s.y = _y;
					s.x = this.xRef;
                    r.addChild(s);
				}
				r.y = -(r.numChildren * this.symbolYInterval);
                if(this.container.contains(r) == false){
                    this.container.addChild(r);
                }
			}
			else
			{
				//if result is out add filler on top and bottom for bounce effect
				s = this.imagePool.getImage();
				
				s.visible = true;
				s.x = this.xRef;
				
				if (isFiller == "top") {
					//top
					s.y = this.yRef + 0 * this.symbolYInterval;
					r.addChildAt(s, 0);
				}else {
					//bottom
					s.y = this.yRef + r.numChildren * this.symbolYInterval;
					r.addChildAt(s, r.numChildren);
				}
			}
		},
        stopWheel: function(mode)
		{
			if (mode == this.WheelSpinMode.BEGIN_STOP)
			{
				this.showPictures();
				this.reelStatus = mode;
			}
			else
			{
				this.reelStatus = mode;
			}
		},
        moveWheel: function()
		{
            
            //seperated spin into parts for easier override by subclass if needed
            
            /*if(this.container.alpha < 1 || this.container.visible == false){
                //probably hidden by subclass on expanding. no need to waste resources
                this.container.visible = true;
                this.container.alpha = 0.5;
                //console.log('OVERRIDE');
                return;
            }*/
            
			//do intro spin if there is, by checking if theres targetY value
			if (this.reelStatus == this.WheelSpinMode.SPIN_INTRO) {
				if (this.targetY != 0) {
					//has intro spin
					//since its intro animation might only be result. if not, override this function :D
					if (this.resultContainer != null || this.resultContainer != undefined) {
						this.moveWheelIntro();
					}
				}else {
					//no intro spin
                    //console.log('NO INTRO');
					this.reelStatus = this.WheelSpinMode.ON_SPIN;
				}
			}else if (this.reelStatus == this.WheelSpinMode.ON_SPIN || this.reelStatus == this.WheelSpinMode.BEGIN_STOP) {
				this.moveWheelSpin();
			}else if (this.reelStatus == this.WheelSpinMode.STOPPING) {
				//check if theres a bounce on stop
				if (this.targetY != 0) {
					this.reelStatus = this.WheelSpinMode.BOUNCING;
				}else {
                    this.spinParamsCount++;
                    this.setNextSpinParam();
				}
			}else if (this.reelStatus == this.WheelSpinMode.BOUNCING) {
				this.moveWheelEndBounce();
			}else if (this.reelStatus == this.WheelSpinMode.BOUNCING_END) {
				this.moveWheelEnd();
			}
            //this.stage.update();
		},
        
        moveWheelIntro: function()
		{	
			if (this.direction == 1) {
				//down
				if (this.resultContainer) {
					if((this.resultContainer.y + this.moveInterval) < this.targetY){
						this.resultContainer.y += this.moveInterval;
					}else {
                        this.spinParamsCount++;
                        this.setNextSpinParam();
					}
				}
			}else if (this.direction == 2) {
				//up
				if (this.resultContainer.numChildren > 0) {
					if((this.resultContainer.y - this.moveInterval) > this.targetY){
						this.resultContainer.y -= this.moveInterval;
					}else {
                        this.spinParamsCount++;
                        this.setNextSpinParam();
					}
				}
			}
		},
        moveWheelSpin: function()
		{
			if (this.direction == 1) {
				//down
				if (this.resultContainer.numChildren > 0 && this.reelStatus <= this.WheelSpinMode.ON_SPIN) {
					if(this.resultContainer.y < this.windowHeight) {
						this.resultContainer.y += this.moveInterval;
						if (this.resultContainer.y < 0) {
							//dont move filler reels until result y coordinate is at 0
							return;
						}
					}else {
						this.destroyResult();
					}
				}
				
				this.activeReel1.y += this.moveInterval;
				
				if (this.initSpin) {
					this.activeReel2.y += this.moveInterval;
				}
                
				if (this.activeReel1.y >= 0 && this.initSpin == false) {
                    this.temp = this.activeReel2;
					this.activeReel2 = this.activeReel1;
					this.activeReel1 = this.temp;
					this.initSpin = true;
					
					//for those having a gap interval in spin, use this to fix it. caused by cpu or memory.
					//this.activeReel1.y = this.activeReel2.y - (this.symbolYInterval * 3);
                    this.activeReel1.y = this.activeReel2.y - (this.symbolYInterval * 3);
				}
				
				if (this.activeReel2.y >= this.windowHeight) {
					this.initSpin = false;
					if (this.reelStatus == this.WheelSpinMode.BEGIN_STOP) {
						this.activeReel2.visible = false;
                        this.spinParamsCount++;
                        this.setNextSpinParam();
					} else {
                        this.fillSpinReel(this.activeReel2);
						this.activeReel2.y = -(this.activeReel2.numChildren * this.symbolYInterval);
					}
				}
			}else {
                //i dont think theres gonna be an upward spin   
            }
		},
        moveWheelEndBounce: function()
		{
            if (this.direction == 1) {
				//down
				this.activeReel1.y += this.moveInterval;
				
				if (this.activeReel2.y > 0 && this.activeReel1.y < this.windowHeight) {
					this.activeReel2.y += this.moveInterval;
				}
				
				//dont move result until active reel y is > 0
				if (this.activeReel1.y < 0) {
					return;
				}
				
                if(this.activeReel2.y != this.windowHeight){
                    this.activeReel2.y = this.windowHeight;
                    this.activeReel2.visible = false;
                }
				
				if (this.resultContainer != null) {
					if (this.resultContainer.y == -(this.resultContainer.numChildren * this.symbolYInterval)) {
                        //some games are having a gap in spaces. use this as fix
						this.resultContainer.y = this.activeReel1.y - (this.resultContainer.numChildren * this.symbolYInterval);
					}
					//bounce if required
					if(this.targetY != 0){
						if((this.resultContainer.y + this.moveInterval) < this.targetY){
							this.resultContainer.y += this.moveInterval;
						}else {
                            this.spinParamsCount++;
                            this.setNextSpinParam();
						}
					}
				}
			}else {
                //up - only results can bounce up
                if (this.resultContainer != null) {
                      if(this.targetY != 0){
						if((this.resultContainer.y - this.moveInterval) > this.targetY){
							this.resultContainer.y -= this.moveInterval;
						}else {
                            this.spinParamsCount++;
                            this.setNextSpinParam();
						}
					} 
                }
            }
		},
        moveWheelEnd: function()
		{	
			this.activeReel2.visible = false;
			if (this.activeReel1.y < this.windowHeight) {
				this.activeReel1.y += this.moveInterval;
			}
			if (this.direction == 1) {
				//down
				if((this.resultContainer.y + this.moveInterval) < -(this.symbolYInterval) ){
					this.resultContainer.y += this.moveInterval;
				}else {
					this.reelStatus = this.WheelSpinMode.FULL_STOP;
					this.resultContainer.y = -(this.symbolYInterval) + this.baseY;
					this.activeReel2.visible = false;
					this.activeReel1.visible = false;
					this.slotReel.checkWheelEvent({type:'ON_STOP',wheelIndex:this.wheelIndex});
                    //createjs.Ticker.removeEventListener("tick", this.stage);
                    //this.stage.update();
				}
			}else if (this.direction == 2) {
				//up
				if((this.resultContainer.y - this.moveInterval) > -(this.symbolYInterval)){
					this.resultContainer.y -= this.moveInterval;
				}else {
					this.reelStatus = this.WheelSpinMode.FULL_STOP;
					this.resultContainer.y = -(this.symbolYInterval) + this.baseY;
					this.activeReel2.visible = false;
					this.activeReel1.visible = false;
					this.slotReel.checkWheelEvent({type:'ON_STOP',wheelIndex:this.wheelIndex});
                    //createjs.Ticker.removeEventListener("tick", this.stage);
                    //this.stage.update();
				}
			}
		},
    });
	
    return Wheel;
});