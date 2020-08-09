
define([], function() {
    
    var _assets;
    var _callBack;//function to call on loading complete
    
    var _params = {};
    
    var onComplete;
    var onError;
    var onFileload;
    var onProgress;
    
    var maxProgressWidth;//got data from maxWidth in #progressBar
    
    //created this array to hold spritesheets that are already created so that it wont keep creating new intance of the same sheet.
    var _allSpritesheet;
    
    //created this array to hold animations that are already created so that it wont keep creating new intance of the same animation.
    var _allAnimations;
    
    Object.defineProperty(_params, "assets", {
        set: function(_value) {
            _assets = _value;
        },
		get: function() {
            return _assets;
		}
    });
    
    var AssetManager = Class.extend({
        init: function(_files,callBack){
            this.params = this.getParams();
            console.log('ASSETS CREATED');
            _allSpritesheet = {};
            _allAnimations = {};
            onComplete = this.onComplete;
            onError = this.onError;
            onFileload = this.onFileload;
            onProgress = this.onProgress;
            _callBack = callBack;
            this.loadAssets(_files);
        },
        getParams: function(){
            return _params;
        }, 
        onComplete: function(){
            //console.log('ASSETS COMPLETEdfdf');

            _assets.off("complete", onComplete, this);
            _assets.off("error", onError, this);
            _assets.off("fileload", onFileload, this);
            _assets.off("progress", onProgress, this);
            _callBack();    
        },
        onError: function(evt){
            console.log('LOADING ERROR:'+evt);   
        },
        onFileload: function(event){
            /*var itemData = event.item;
            var extension = itemData.src.split('.').pop().toLowerCase();
            if( extension== 'mp3' ||extension == 'ogg' ||extension == 'wav'){
                console.log('SOUND:'+itemData.id + '  ' +extension);
                createjs.Sound.registerSound(src: itemData.src, id: itemData.id);
                createjs.Sound.play(itemData.id);
            }*/
            
            //console.log(fileName.split('.').pop())
        },
        getCssValue: function(target, hyphenProp){
            var val = typeof(window.getComputedStyle) != "undefined" && window.getComputedStyle(target, null).getPropertyValue(hyphenProp);
            if (!val && target.currentStyle){
                val = target.currentStyle[hyphenProp.replace(/([a-z])\-([a-z])/, function(a,b,c){ return b + c.toUpperCase();})] || target.currentStyle[hyphenProp];
            }
            return val;
        },
        loadAssets: function(_files){
            _assets = new createjs.LoadQueue();
            _assets.installPlugin(createjs.Sound);
            _assets.on("complete", onComplete, this);
            _assets.on("error", onError, this);
            _assets.on("fileload", onFileload, this);
            _assets.on("progress", onProgress, this);
            
            if(_files == undefined){
                _callBack();
                return;
            }
            for(var i = 0; i<_files.length; i++){
                _assets.loadFile(_files[i],false);
            }
            
            
            //call css value to show and start with 0
            document.getElementById("progressBar").style.width = '0px';
            document.getElementById('preloadTxtPerc').innerHTML = '0%';
            
            //show progress bar
            document.getElementById("preloadWrapper").style.visibility = 'visible';
            
            //standard message for all
            document.getElementById('preloadTxtMsg').innerHTML = 'Loading Game';
            
            
            //using set interval to make sure that css is completely loaded before proceeding with next step. if css is not loaded, progressbar wont work because there wont be maxProgressWidth
            getCssValue = this.getCssValue;
            var checkCss = setInterval(function(){
                maxProgressWidth = getCssValue(document.getElementById('progressBar'),"max-width").split('px')[0];
                if(maxProgressWidth != undefined && maxProgressWidth != null && maxProgressWidth != 'none'){
                    clearInterval(checkCss);
                    _assets.load();
                }
            },100);
            
            
            /*var element = document.getElementById('progressBar');
            var style = window.getComputedStyle(element,null);
            //maxProgressWidth = style.getPropertyValue('maxWidth');
            //maxProgressWidth = window.getComputedStyle(element,null).getPropertyValue("max-width")
            //maxProgressWidth = window.getComputedStyle(element,null).maxWidth;
            
            console.log('+++++++++++');
            console.log(window.getComputedStyle(document.getElementById('progressBar'))['borderCollapse']);
            console.log(window.getComputedStyle(document.getElementById('progressBar'))['maxWidth']);
            /*
            setInterval(function(){
                console.log(window.getComputedStyle(document.getElementById('progressBar'))['maxWidth']);
            },1000);*/
            
            //console.log(style['max-width']);
            //console.log(style['max-height']);
            
            /*console.log(maxProgressWidth);
            console.log(element);
            console.log(window.currentStyle["max-width"]);
            console.log(window.currentStyle.maxWidth);
            console.log(window.getComputedStyle["max-width"]);
            console.log(window.getComputedStyle.maxWidth);
            console.log(window.currentStyle["max-width"]);
            console.log(window.currentStyle.maxWidth);
            console.log(window.getComputedStyle.maxWidth);
            console.log(window.getPropertyValue("max-width"));
            console.log(window.getComputedStyle.maxWidth);
            console.log(window.getPropertyValue("max-width"));
            console.log(window.currentStyle.maxWidth);
            console.log(window.getComputedStyle["max-width"]);
            console.log(window.getPropertyValue("max-width"));
            console.log(window.getComputedStyle.maxWidth);
            console.log(window.getComputedStyle["max-width"]);
            console.log(window.getPropertyValue("max-width"));
            console.log(window.getComputedStyle.maxWidth);*/
            //console.log(this.getCssValue(element,"maxWidth"));
            //console.log($('progressBar').css('maxWidth'));
            //console.log('------------');
            
            //_assets.load();
        },
        onProgress: function(evt){
            var perc = (parseFloat(evt.loaded) / parseFloat(evt.total)).toFixed(2);
            
            //some weird reason some games exceed 100% dont know why everything seems correct
            if(perc > 1){
                perc = 1;
            }
            
            var percStr = parseInt(maxProgressWidth * perc) + 'px';//value came from css base on calculating how long the progressbar is.
            document.getElementById("progressBar").style.width = percStr;
            
            
            
            //update progress percent
            document.getElementById('preloadTxtPerc').innerHTML = parseInt(perc * 100) + '%';
        },
        getSpriteSheetJSON: function(_file,_img){
            var loadedSheets;
            
            //reusing spritesheets for optimal memory.
            //check if sheet is already created
            if(_allSpritesheet[_file] != undefined){
                loadedSheets = _allSpritesheet[_file];
            }else {
                //if not create a new one.
                //need to use the preloaded image for this to work.
                var loadedData = {
                    "images": [_assets.getResult(_img)],
                    "frames": _assets.getResult(_file).frames,
                    "animations": _assets.getResult(_file).animations
                };
                loadedSheets = new createjs.SpriteSheet(loadedData);
                _allSpritesheet[_file] = loadedSheets;
            }
            return loadedSheets;
        },
        //will retrieve animation base base on spritesheet
        getSpriteSheetANIMATION: function(_file,_img,_sequence){
            var loadedAnimation;
            
            //reusing animation for optimal memory.
            //check if animation is already created
            if(_allAnimations[_sequence] != undefined ){
                loadedAnimation = _allAnimations[_sequence];
            }else{
                //if not create a new one.
                var filteredAnimation = {};
                var filteredFrames = new Array();
                var currentCount = 0;
                for(var anim in _assets.getResult(_file).animations){
                    if(anim.indexOf(_sequence) === -1){
                        //none found
                    }else {
                        filteredAnimation[anim] = _assets.getResult(_file).animations[anim];
                        filteredFrames.push(_assets.getResult(_file).frames[currentCount]);
                    }
                    currentCount++;
                }
                var loadedAnimationData = {
                        "images": [_assets.getResult(_img)],
                        "frames": filteredFrames,
                        "animations": filteredAnimation
                    };
                loadedAnimation = new createjs.SpriteSheet(loadedAnimationData);
                _allAnimations[_sequence] = loadedAnimation;
            }
            return loadedAnimation;
        },
        playSound: function(_file,_data){
            return createjs.Sound.play(_file,_data);   
           
        },
        getAsset: function(_file){
            return _assets.getResult(_file);
        },
    });
    return AssetManager;
});