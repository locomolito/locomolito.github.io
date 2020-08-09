



define([], function() {
     
    var _MAX_VALUE;
    var _GROWTH_VALUE;
	var _counter;
	var _counterA;
	var _counterB;
	var _counterC;
	var _counterD;
	var _counterE;
	var _counterF;
	var _counterG;
	var _counterH;
	var _counterI;
	var _counterJ;
	var _counterK;
	var _counterS;
	var _counterW;
	var _counterM;
	var _counterX;
	var _counterY;
	var _counterZ;
		
	var _pool;
	var _symbols;
	var _fillers;
	var _currentSprite;
	var _currentImage;
	var _currentMc;
		
	var _poolA;
	var _poolB;
	var _poolC;
	var _poolD;
	var _poolE;
	var _poolF;
	var _poolG;
	var _poolH;
	var _poolI;
	var _poolJ;
	var _poolK;
	var _poolX;
	var _poolS;
	var _poolW;
	var _poolM;
	var _poolY;
	var _poolZ;
		
    //for animated movieclips
	var _animPoolA;
	var _animPoolB;
	var _animPoolC;
	var _animPoolD;
	var _animPoolE;
	var _animPoolF;
	var _animPoolG;
	var _animPoolH;
	var _animPoolI;
	var _animPoolJ;
	var _animPoolK;
	var _animPoolX;
	var _animPoolS;
	var _animPoolW;
	var _animPoolM;
	var _animPoolY;
	var _animPoolZ;
	var _animCounterA;
	var _animCounterB;
	var _animCounterC;
	var _animCounterD;
	var _animCounterE;
	var _animCounterF;
	var _animCounterG;
	var _animCounterH;
	var _animCounterI;
	var _animCounterJ;
	var _animCounterK;
	var _animCounterS;
	var _animCounterW;
	var _animCounterM;
	var _animCounterX;
	var _animCounterY;
	var _animCounterZ;
    
    var that = this;
    
    var _params = {};
    
    //OBJECTS
    Object.defineProperty(_params, "poolA", {
        set: function(_value) {
            _poolA = _value;
        },
		get: function() {
            return _poolA;
		}
    });
    Object.defineProperty(_params, "poolB", {
        set: function(_value) {
            _poolB = _value;
        },
		get: function() {
            return _poolB;
		}
    });
    Object.defineProperty(_params, "poolC", {
        set: function(_value) {
            _poolC = _value;
        },
		get: function() {
            return _poolC;
		}
    });
    Object.defineProperty(_params, "poolD", {
        set: function(_value) {
            _poolD = _value;
        },
		get: function() {
            return _poolD;
		}
    });
    Object.defineProperty(_params, "poolE", {
        set: function(_value) {
            _poolE = _value;
        },
		get: function() {
            return _poolE;
		}
    });
    Object.defineProperty(_params, "poolF", {
        set: function(_value) {
            _poolF = _value;
        },
		get: function() {
            return _poolF;
		}
    });
    Object.defineProperty(_params, "poolG", {
        set: function(_value) {
            _poolG = _value;
        },
		get: function() {
            return _poolG;
		}
    });
    Object.defineProperty(_params, "poolH", {
        set: function(_value) {
            _poolH = _value;
        },
		get: function() {
            return _poolH;
		}
    });
    Object.defineProperty(_params, "poolI", {
        set: function(_value) {
            _poolI = _value;
        },
		get: function() {
            return _poolI;
		}
    });
    Object.defineProperty(_params, "poolJ", {
        set: function(_value) {
            _poolJ = _value;
        },
		get: function() {
            return _poolJ;
		}
    });
    Object.defineProperty(_params, "poolK", {
        set: function(_value) {
            _poolK = _value;
        },
		get: function() {
            return _poolK;
		}
    });
    Object.defineProperty(_params, "poolX", {
        set: function(_value) {
            _poolX = _value;
        },
		get: function() {
            return _poolX;
		}
    });
    Object.defineProperty(_params, "poolS", {
        set: function(_value) {
            _poolS = _value;
        },
		get: function() {
            return _poolS;
		}
    });
    Object.defineProperty(_params, "poolW", {
        set: function(_value) {
            _poolW = _value;
        },
		get: function() {
            return _poolW;
		}
    });
    Object.defineProperty(_params, "poolM", {
        set: function(_value) {
            _poolM = _value;
        },
		get: function() {
            return _poolM;
		}
    });
    Object.defineProperty(_params, "poolY", {
        set: function(_value) {
            _poolY = _value;
        },
		get: function() {
            return _poolY;
		}
    });
    Object.defineProperty(_params, "poolZ", {
        set: function(_value) {
            _poolZ = _value;
        },
		get: function() {
            return _poolZ;
		}
    });
    
    Object.defineProperty(_params, "animPoolA", {
        set: function(_value) {
            _animPoolA = _value;
        },
		get: function() {
            return _animPoolA;
		}
    });
    Object.defineProperty(_params, "animPoolB", {
        set: function(_value) {
            _animPoolB = _value;
        },
		get: function() {
            return _animPoolB;
		}
    });
    Object.defineProperty(_params, "animPoolC", {
        set: function(_value) {
            _animPoolC = _value;
        },
		get: function() {
            return _animPoolC;
		}
    });
    Object.defineProperty(_params, "animPoolD", {
        set: function(_value) {
            _animPoolD = _value;
        },
		get: function() {
            return _animPoolD;
		}
    });
    Object.defineProperty(_params, "animPoolE", {
        set: function(_value) {
            _animPoolE = _value;
        },
		get: function() {
            return _animPoolE;
		}
    });
    Object.defineProperty(_params, "animPoolF", {
        set: function(_value) {
            _animPoolF = _value;
        },
		get: function() {
            return _animPoolF;
		}
    });
    Object.defineProperty(_params, "animPoolG", {
        set: function(_value) {
            _animPoolG = _value;
        },
		get: function() {
            return _animPoolG;
		}
    });
    Object.defineProperty(_params, "animPoolH", {
        set: function(_value) {
            _animPoolH = _value;
        },
		get: function() {
            return _animPoolH;
		}
    });
    Object.defineProperty(_params, "animPoolI", {
        set: function(_value) {
            _animPoolI = _value;
        },
		get: function() {
            return _animPoolI;
		}
    });
    Object.defineProperty(_params, "animPoolJ", {
        set: function(_value) {
            _animPoolJ = _value;
        },
		get: function() {
            return _animPoolJ;
		}
    });
    Object.defineProperty(_params, "animPoolK", {
        set: function(_value) {
            _animPoolK = _value;
        },
		get: function() {
            return _animPoolK;
		}
    });
    Object.defineProperty(_params, "animPoolX", {
        set: function(_value) {
            _animPoolX = _value;
        },
		get: function() {
            return _animPoolX;
		}
    });
    Object.defineProperty(_params, "animPoolS", {
        set: function(_value) {
            _animPoolS = _value;
        },
		get: function() {
            return _animPoolS;
		}
    });
    Object.defineProperty(_params, "animPoolW", {
        set: function(_value) {
            _animPoolW = _value;
        },
		get: function() {
            return _animPoolW;
		}
    });
    Object.defineProperty(_params, "animPoolM", {
        set: function(_value) {
            _animPoolM = _value;
        },
		get: function() {
            return _animPoolM;
		}
    });
    Object.defineProperty(_params, "animPoolY", {
        set: function(_value) {
            _animPoolY = _value;
        },
		get: function() {
            return _animPoolY;
		}
    });
    Object.defineProperty(_params, "animPoolZ", {
        set: function(_value) {
            _animPoolZ = _value;
        },
		get: function() {
            return _animPoolZ;
		}
    });
    
    Object.defineProperty(_params, "counterA", {
        set: function(_value) {
            _counterA = _value;
        },
		get: function() {
            return _counterA;
		}
    });
    Object.defineProperty(_params, "counterB", {
        set: function(_value) {
            _counterB = _value;
        },
		get: function() {
            return _counterB;
		}
    });
    Object.defineProperty(_params, "counterC", {
        set: function(_value) {
            _counterC = _value;
        },
		get: function() {
            return _counterC;
		}
    });
    Object.defineProperty(_params, "counterD", {
        set: function(_value) {
            _counterD = _value;
        },
		get: function() {
            return _counterD;
		}
    });
    Object.defineProperty(_params, "counterE", {
        set: function(_value) {
            _counterE = _value;
        },
		get: function() {
            return _counterE;
		}
    });
    Object.defineProperty(_params, "counterF", {
        set: function(_value) {
            _counterF = _value;
        },
		get: function() {
            return _counterF;
		}
    });
    Object.defineProperty(_params, "counterG", {
        set: function(_value) {
            _counterG = _value;
        },
		get: function() {
            return _counterG;
		}
    });
    Object.defineProperty(_params, "counterH", {
        set: function(_value) {
            _counterH = _value;
        },
		get: function() {
            return _counterH;
		}
    });
    Object.defineProperty(_params, "counterI", {
        set: function(_value) {
            _counterI = _value;
        },
		get: function() {
            return _counterI;
		}
    });
    Object.defineProperty(_params, "counterJ", {
        set: function(_value) {
            _counterJ = _value;
        },
		get: function() {
            return _counterJ;
		}
    });
    Object.defineProperty(_params, "counterK", {
        set: function(_value) {
            _counterK = _value;
        },
		get: function() {
            return _counterK;
		}
    });
    Object.defineProperty(_params, "counterX", {
        set: function(_value) {
            _counterX = _value;
        },
		get: function() {
            return _counterX;
		}
    });
    Object.defineProperty(_params, "counterS", {
        set: function(_value) {
            _counterS = _value;
        },
		get: function() {
            return _counterS;
		}
    });
    Object.defineProperty(_params, "counterW", {
        set: function(_value) {
            _counterW = _value;
        },
		get: function() {
            return _counterW;
		}
    });
    Object.defineProperty(_params, "counterM", {
        set: function(_value) {
            _counterM = _value;
        },
		get: function() {
            return _counterM;
		}
    });
    Object.defineProperty(_params, "counterY", {
        set: function(_value) {
            _counterY = _value;
        },
		get: function() {
            return _counterY;
		}
    });
    Object.defineProperty(_params, "counterZ", {
        set: function(_value) {
            _counterZ = _value;
        },
		get: function() {
            return _counterZ;
		}
    });
    
    Object.defineProperty(_params, "animCounterA", {
        set: function(_value) {
            _animCounterA = _value;
        },
		get: function() {
            return _animCounterA;
		}
    });
    Object.defineProperty(_params, "animCounterB", {
        set: function(_value) {
            _animCounterB = _value;
        },
		get: function() {
            return _animCounterB;
		}
    });
    Object.defineProperty(_params, "animCounterC", {
        set: function(_value) {
            _animCounterC = _value;
        },
		get: function() {
            return _animCounterC;
		}
    });
    Object.defineProperty(_params, "animCounterD", {
        set: function(_value) {
            _animCounterD = _value;
        },
		get: function() {
            return _animCounterD;
		}
    });
    Object.defineProperty(_params, "animCounterE", {
        set: function(_value) {
            _animCounterE = _value;
        },
		get: function() {
            return _animCounterE;
		}
    });
    Object.defineProperty(_params, "animCounterF", {
        set: function(_value) {
            _animCounterF = _value;
        },
		get: function() {
            return _animCounterF;
		}
    });
    Object.defineProperty(_params, "animCounterG", {
        set: function(_value) {
            _animCounterG = _value;
        },
		get: function() {
            return _animCounterG;
		}
    });
    Object.defineProperty(_params, "animCounterH", {
        set: function(_value) {
            _animCounterH = _value;
        },
		get: function() {
            return _animCounterH;
		}
    });
    Object.defineProperty(_params, "animCounterI", {
        set: function(_value) {
            _animCounterI = _value;
        },
		get: function() {
            return _animCounterI;
		}
    });
    Object.defineProperty(_params, "animCounterJ", {
        set: function(_value) {
            _animCounterJ = _value;
        },
		get: function() {
            return _animCounterJ;
		}
    });
    Object.defineProperty(_params, "animCounterK", {
        set: function(_value) {
            _animCounterK = _value;
        },
		get: function() {
            return _animCounterK;
		}
    });
    Object.defineProperty(_params, "animCounterX", {
        set: function(_value) {
            _animCounterX = _value;
        },
		get: function() {
            return _animCounterX;
		}
    });
    Object.defineProperty(_params, "animCounterS", {
        set: function(_value) {
            _animCounterS = _value;
        },
		get: function() {
            return _animCounterS;
		}
    });
    Object.defineProperty(_params, "animCounterW", {
        set: function(_value) {
            _animCounterW = _value;
        },
		get: function() {
            return _animCounterW;
		}
    });
    Object.defineProperty(_params, "animCounterM", {
        set: function(_value) {
            _animCounterM = _value;
        },
		get: function() {
            return _animCounterM;
		}
    });
    Object.defineProperty(_params, "animCounterY", {
        set: function(_value) {
            _animCounterY = _value;
        },
		get: function() {
            return _animCounterY;
		}
    });
    Object.defineProperty(_params, "animCounterZ", {
        set: function(_value) {
            _animCounterZ = _value;
        },
		get: function() {
            return _animCounterZ;
		}
    });
    
    
	var ImagePool = Class.extend({
        init: function(maxPoolSize, growthValue, symbolList, symbolCodes, movieList,slotTheme){
            this.params = this.getParams();
            
             _MAX_VALUE = maxPoolSize;
			_GROWTH_VALUE = growthValue;
			_counter = maxPoolSize;
			_symbols = symbolList;
			
			var i = maxPoolSize;
			var idx;
			_pool = new Array(_MAX_VALUE);
            
            while (--i > -1)
			{
				idx = Math.floor(Math.random() * symbolList.length);
				_pool[i] = symbolList[idx].clone();
			}
            
             for (var j = 0; j < symbolCodes.length; j++)
			 {
				i = 15;// 8 normal
				switch (symbolCodes[j])
				{
					case "A": 
						_counterA = i;
						_poolA = new Array(i);
						_animCounterA = i;
						_animPoolA = new Array(i);
						while (--i > -1)
						{
							_poolA[i] = _symbols[j].clone();
							_animPoolA[i] = new movieList[j](slotTheme);
						}
						break;
                    case "B": 
						_counterB = i;
						_poolB = new Array(i);
						_animCounterB = i;
						_animPoolB = new Array(i);
						while (--i > -1)
						{
							_poolB[i] = _symbols[j].clone();
							_animPoolB[i] = new movieList[j](slotTheme);
						}
						break;
                    case "C": 
						_counterC = i;
						_poolC = new Array(i);
						_animCounterC = i;
						_animPoolC = new Array(i);
						while (--i > -1)
						{
							_poolC[i] = _symbols[j].clone();
							_animPoolC[i] = new movieList[j](slotTheme);
						}
						break;
                    case "D": 
						_counterD = i;
						_poolD = new Array(i);
						_animCounterD = i;
						_animPoolD = new Array(i);
						while (--i > -1)
						{
							_poolD[i] = _symbols[j].clone();
							_animPoolD[i] = new movieList[j](slotTheme);
						}
						break;
                    case "E": 
						_counterE = i;
						_poolE = new Array(i);
						_animCounterE = i;
						_animPoolE = new Array(i);
						while (--i > -1)
						{
							_poolE[i] = _symbols[j].clone();
							_animPoolE[i] = new movieList[j](slotTheme);
						}
						break;
                    case "F": 
						_counterF = i;
						_poolF = new Array(i);
						_animCounterF = i;
						_animPoolF = new Array(i);
						while (--i > -1)
						{
							_poolF[i] = _symbols[j].clone();
							_animPoolF[i] = new movieList[j](slotTheme);
						}
						break;
                    case "G": 
						_counterG = i;
						_poolG = new Array(i);
						_animCounterG = i;
						_animPoolG = new Array(i);
						while (--i > -1)
						{
							_poolG[i] = _symbols[j].clone();
							_animPoolG[i] = new movieList[j](slotTheme);
						}
						break;
                    case "H": 
						_counterH = i;
						_poolH = new Array(i);
						_animCounterH = i;
						_animPoolH = new Array(i);
						while (--i > -1)
						{
							_poolH[i] = _symbols[j].clone();
							_animPoolH[i] = new movieList[j](slotTheme);
						}
						break;
                    case "I": 
						_counterI = i;
						_poolI = new Array(i);
						_animCounterI = i;
						_animPoolI = new Array(i);
						while (--i > -1)
						{
							_poolI[i] = _symbols[j].clone();
							_animPoolI[i] = new movieList[j](slotTheme);
						}
						break;
                    case "J": 
						_counterJ = i;
						_poolJ = new Array(i);
						_animCounterJ = i;
						_animPoolJ = new Array(i);
						while (--i > -1)
						{
							_poolJ[i] = _symbols[j].clone();
							_animPoolJ[i] = new movieList[j](slotTheme);
						}
						break;
                    case "K": 
						_counterK = i;
						_poolK = new Array(i);
						_animCounterK = i;
						_animPoolK = new Array(i);
						while (--i > -1)
						{
							_poolK[i] = _symbols[j].clone();
							_animPoolK[i] = new movieList[j](slotTheme);
						}
						break;
                    case "M": 
						_counterM = i;
						_poolM = new Array(i);
						_animCounterM = i;
						_animPoolM = new Array(i);
						while (--i > -1)
						{
							_poolM[i] = _symbols[j].clone();
							_animPoolM[i] = new movieList[j](slotTheme);
						}
						break;
                    case "S": 
						_counterS = i;
						_poolS = new Array(i);
						_animCounterS = i;
						_animPoolS = new Array(i);
						while (--i > -1)
						{
							_poolS[i] = _symbols[j].clone();
							_animPoolS[i] = new movieList[j](slotTheme);
						}
						break;
                    case "W": 
						_counterW = i;
						_poolW = new Array(i);
						_animCounterW = i;
						_animPoolW = new Array(i);
						while (--i > -1)
						{
							_poolW[i] = _symbols[j].clone();
							_animPoolW[i] = new movieList[j](slotTheme);
						}
						break;
                    case "X": 
						_counterX = i;
						_poolX = new Array(i);
						_animCounterX = i;
						_animPoolX = new Array(i);
						while (--i > -1)
						{
							_poolX[i] = _symbols[j].clone();
							_animPoolX[i] = new movieList[j](slotTheme);
						}
						break;
                    case "Y": 
						_counterY = i;
						_poolY = new Array(i);
						_animCounterY = i;
						_animPoolY = new Array(i);
						while (--i > -1)
						{
							_poolY[i] = _symbols[j].clone();
							_animPoolY[i] = new movieList[j](slotTheme);
						}
						break;
                    case "Z": 
						_counterZ = i;
						_poolZ = new Array(i);
						_animCounterZ = i;
						_animPoolZ = new Array(i);
						while (--i > -1)
						{
							_poolZ[i] = _symbols[j].clone();
							_animPoolZ[i] = new movieList[j](slotTheme);
						}
						break;
                }
             }  
        },
        getParams: function(){
            return _params;
        },
        
        getImage: function()
		{
			if (_counter > 0)
			{
				_counter--;
				_currentSprite = _pool[_counter];
				_pool.splice(_counter, 1);
				return _currentSprite;
			}
		},
        disposeImage: function(disposedImage)
		{
			_counter++;
			_pool.unshift(disposedImage);
		},
        getStaticImage: function(symbolCode)
		{
            this.params["counter" + symbolCode] -= 1;
            _currentImage = this.params['pool'+symbolCode][this.params['counter'+symbolCode]];
            return _currentImage;
		},
        disposeStaticImage: function(disposeImage, symbolCode)
		{
			this.params["pool" + symbolCode][(this.params["counter" + symbolCode])] = disposeImage;
			this.params["counter" + symbolCode] += 1;
		},
        
        getAnimatedMc: function(symbolCode){
			this.params["animCounter" + symbolCode] -= 1;
            _currentMc = this.params["animPool" + symbolCode][(this.params["animCounter" + symbolCode])];
            return _currentMc;
		},
        disposeAnimatedMc: function(disposedMc, symbolCode){
			disposedMc.resetAnimation();
			this.params["animPool" + symbolCode][(this.params["animCounter" + symbolCode])] = disposedMc;
			this.params["animCounter" + symbolCode] += 1;
		},
	});


	return ImagePool;
});