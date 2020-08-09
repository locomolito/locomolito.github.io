

define(["../../html5_baseclass/Utils/AppUtils"], function(AppUtils) {
    var canvas;
    var context;
    var particleSystem;
    var boundary;
    var mouse;
    var gravity;
    var texture;
    var spriteSheet;
    var spriteSheetData;
    var assets;
    var timer;
    var _this;
    var _alpha;
    var p;
    var brownianForce;
    var coin;
    var particle;
    
    var layoutManager;

    var SubParticle = Class.extend({
        init: function(_slotTheme, stage, _type) {
            mouse = {};
            timer = null;
            _alpha = 0;
             particle = _type;
            layoutManager = _slotTheme.params.layoutManager;
            assets = _slotTheme.getAssetManager();
            _this = this;
            $(document).ready(function()
            {
                init2();
            });
            
            
            function init2()
            {
                particleSystem = new SPP.ParticleSystem();
                gravity = particleSystem.createForce(SPP.Force);
                gravity.init(0, 1);
                initStatsBar();
                createjs.Ticker.setFPS(30);
                createjs.Ticker.addEventListener("tick", animate);
                particleSystem.start();
                
                timer = setInterval(function() {
                    if(particle == "coin"){
                        buildParticle(layoutManager.getValue("particleParam"), 50, particle);
                    }
                    else if(particle == "star"){
                        buildParticle(layoutManager.getValue("particleParam"), 50, particle);
                    }
                
                }, 50);
                setTimeout(_this.stopParticle, 4000);
            }

            function animate(event)
            {
                try {
                    particleSystem.render();
                }
                catch (e)
                {
                }
            }
            animationPool = {
                _coins: [],
                get: function()
                {
                    if (this._coins.length > 0)
                    {
                        return this._coins.pop();
                    }
                    console.log("particle: "+particle)
                    if(particle=="coin"){
                        return new createjs.Sprite(assets.getSpriteSheetANIMATION('coinsJSON', 'coins', 'coin.'));
                    }
                    else{
                        return new createjs.Sprite(assets.getSpriteSheetANIMATION('coinsJSON', 'coins', 'coin.'));
                    }
                    
                },
                recycle: function(obj)
                {
                    console.log("KILL");
                    obj.stop();
                    obj.alpha = 1;
                    obj.scaleX = obj.scaleY = 1;
                    this._coins.push(obj);
                }
            };
            function buildParticle(x, y, particle)
            {
                var randomX = Math.floor(Math.random() * (x));
                var p = particleSystem.createParticle(SPP.Particle);
                p.init(randomX, -y);
                p.damp.reset(0.05, 0.05);
                p.velocity.y = -10;
                p.addForce("g", gravity);
                var brownianForce = particleSystem.createForce(SPP.Brownian);
                brownianForce.init(0.3, 0.8);
                brownianForce.target = p;
                p.addForce("brownianForce", brownianForce);

                var sprite = animationPool.get();
                sprite.regX = 40;
                sprite.regY = 40;
                sprite.x = -100;
                sprite.y = -100;

                p.extra.sprite = sprite;
                stage.addChild(sprite);
                sprite.play();
                p.onUpdate = spriteUpdate;

            }
            ;
            function spriteUpdate()
            {
                this.extra.sprite.x = this.position.x;
                this.extra.sprite.y = this.position.y;
                this.extra.sprite.rotation -= 5;
                
                if(particle=="star"){
                    this.extra.sprite.alpha -= 0.01;
                    this.extra.sprite.scaleX -= 0.01;
                    this.extra.sprite.scaleY -= 0.01;
                }

                if (this.extra.sprite.y >= 800)
                {
                    this.life = 0;
                    stage.removeChild(this.extra.sprite);
                    animationPool.recycle(this.extra.sprite);

                    if (stage.numChildren == 0)
                    {
                        
                        createjs.Ticker.removeEventListener("tick", animate);
                        console.log("dispose");
                        _this.dispose();
                    }
                }
            }
            ;
            function initStatsBar()
            {

            }
            ;

        },
        stopParticle: function() {
            if (timer) {
                
                clearInterval(timer);

            }
        },
        dispose: function()
        {
            canvas = null;
            context = null;
            particleSystem = null;
            boundary = null;
            mouse = null;
            gravity = null;
            texture = null;
            spriteSheet = null;
            spriteSheetData = null;
            assets = null;
            timer = null;
            _this = null;
            _alpha = 0;
            p = null;
            brownianForce = null;
            coin = null;
        }
    });
    return SubParticle;
});