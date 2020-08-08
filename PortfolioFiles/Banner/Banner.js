(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Banner_atlas_", frames: [[0,0,613,265],[217,434,42,35],[173,487,6,6],[261,455,49,19],[173,434,42,35],[231,471,17,15],[181,487,6,6],[261,434,49,19],[615,0,265,252],[0,434,171,107],[0,267,585,165],[587,267,222,337],[250,471,8,30],[0,543,272,56],[173,471,56,14]]}
];


// symbols:



(lib.CachedTexturedBitmap_38 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_40 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_42 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_43 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_44 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_45 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_46 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_47 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_48 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_49 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_50 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_51 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_53 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_54 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_55 = function() {
	this.initialize(ss["Banner_atlas_"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.skull = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_53();
	this.instance.parent = this;
	this.instance.setTransform(18.35,29.85,0.1626,0.1626);

	this.instance_1 = new lib.CachedTexturedBitmap_51();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,0.1626,0.1626);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,36.1,54.8);


(lib.mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_55();
	this.instance.parent = this;
	this.instance.setTransform(-0.45,-0.45,0.1626,0.1626);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.4,-0.4,9.1,2.3);


// stage content:
(lib.Banner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_49();
	this.instance.parent = this;
	this.instance.setTransform(375.7,90.95,0.5,0.5);

	this.instance_1 = new lib.CachedTexturedBitmap_48();
	this.instance_1.parent = this;
	this.instance_1.setTransform(468.95,24.35,0.5,0.5);

	this.instance_2 = new lib.mouth("single",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(534.7,172.35,3.0748,3.0748,0,0,0,4.1,0.7);

	this.instance_3 = new lib.CachedTexturedBitmap_47();
	this.instance_3.parent = this;
	this.instance_3.setTransform(547.55,115.95,0.5,0.5);

	this.instance_4 = new lib.CachedTexturedBitmap_46();
	this.instance_4.parent = this;
	this.instance_4.setTransform(555.25,131.8,0.5,0.5);

	this.instance_5 = new lib.CachedTexturedBitmap_45();
	this.instance_5.parent = this;
	this.instance_5.setTransform(554,130.45,0.5,0.5);

	this.instance_6 = new lib.CachedTexturedBitmap_44();
	this.instance_6.parent = this;
	this.instance_6.setTransform(547.4,123.35,0.5,0.5);

	this.instance_7 = new lib.CachedTexturedBitmap_43();
	this.instance_7.parent = this;
	this.instance_7.setTransform(495,115.95,0.5,0.5);

	this.instance_8 = new lib.CachedTexturedBitmap_42();
	this.instance_8.parent = this;
	this.instance_8.setTransform(508.65,131.8,0.5,0.5);

	this.instance_9 = new lib.CachedTexturedBitmap_45();
	this.instance_9.parent = this;
	this.instance_9.setTransform(504.2,130.45,0.5,0.5);

	this.instance_10 = new lib.CachedTexturedBitmap_40();
	this.instance_10.parent = this;
	this.instance_10.setTransform(498.35,123.35,0.5,0.5);

	this.instance_11 = new lib.skull("single",0);
	this.instance_11.parent = this;
	this.instance_11.setTransform(533.45,124.9,3.0748,3.0748,0,0,0,18.1,24.3);

	this.instance_12 = new lib.CachedTexturedBitmap_50();
	this.instance_12.parent = this;
	this.instance_12.setTransform(116.65,72.35,0.5,0.5);

	this.instance_13 = new lib.CachedTexturedBitmap_38();
	this.instance_13.parent = this;
	this.instance_13.setTransform(92.55,50.2,0.5,0.5);

	this.instance_14 = new lib.CachedTexturedBitmap_54();
	this.instance_14.parent = this;
	this.instance_14.setTransform(465.8,114.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(452.6,144.4,149.19999999999993,74.29999999999998);
// library properties:
lib.properties = {
	id: '11F2C79D77D2324CA6EFFF5B937AA60B',
	width: 720,
	height: 240,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Banner_atlas_.png?1596829603245", id:"Banner_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['11F2C79D77D2324CA6EFFF5B937AA60B'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;