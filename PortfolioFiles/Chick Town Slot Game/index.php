<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<title>Slot Game</title>
	<link rel="stylesheet" href="css/standard.css">
        
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://code.createjs.com/createjs-2014.12.12.min.js"></script>
    <script src="https://code.createjs.com/preloadjs-0.6.0.min.js"></script>
    <script src="https://code.createjs.com/tweenjs-0.6.0.min.js"></script>
    <script src="https://code.createjs.com/soundjs-0.6.0.min.js"></script>
    <script src="js/libs/proton-1.0.0.min.js"></script>
    <script src="js/libs/spp.min.js"></script>
    <script src="js/libs/Filter.js"></script>
	<script src="js/libs/ColorFilter.js"></script>
	<script src="js/libs/BitmapFontExperiment.js"></script>
    
    <script src="js/class.js"></script>
    <script src="js/require.js" data-main="js/src/main.js"></script>
    
   <?php 
        $parameters = '';
        if(isset($_POST['account_id']) && isset($_POST['game_id'])){
            $userId = $_POST['account_id'];
            $gameID = $_POST['game_id'];
            $parameters = '\''.$userId.'\''.','.$gameID;
        }
    ?>
        
    <script>
		//fix for init issue
        var checkTimer;
        checkJs = function(){
            if(checkTimer != undefined){
                clearTimeout(checkTimer);
            }
            if (typeof init == 'function') { 
                init(<?php print_r($parameters); ?>); 
            }else{
               checkTimer = setTimeout(checkJs,100);
            } 
            
        }
    </script>
</head>
<body onload="checkJs();">
     <div id="preloadWrapper">
        <div id="preloadDimmer"></div>
        <div id="preloadAlign">
            <div id="preloaderContainer">
                <div id="preloadElements">
                    <div id="preloadLogo"></div>
                    <div id="progressWrapper">
                        <div id="progressBar"></div>
                    </div>
                    <div id="preloadMessageWrapper">
                        <h1 id="preloadTxtMsg"></h1>
                        <h1 id="preloadTxtPerc"></h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="canvasWrapper"> 
        <div id="canvasAlign">
            <div id="canvasScale">
                <div id="canvasContainer">
                    <!--Add all your canvases here required by base, so that they can be scaled and position properly on the window-->
                    <div id='staticWrapper'></div>
                    <div id='betInfoWrapper'></div><!--base needs this-->
                    <div id='controlsWrapper'></div><!--base needs this-->
                    <div id='headerWrapper'></div>
                    <div id='wheelWrapper'></div><!--base needs this-->
                    <div id='messageWrapper'></div>
                    <div id='animatedWrapper'></div>
                    <div id='stackWildWrapper'></div>
                    <div id='anticipationWrapper'></div>
                    <div id='paylineWrapper'></div>
                    <div id='paytableWrapper'></div>
                    <div id='bonusGameWrapper'></div>
                    <div id='bonusDressWrapper'></div>
                    <div id='bonusTopWrapper'></div>
                    <div id='fsWrapper'></div>
                    <div id='fsSumWrapper'></div>
                    <div id='jackpotWrapper'></div>
                    
                    <div id='controlPopUpWrapper'></div><!--base needs this-->
                    <div id='errorWrapper'></div><!--base needs this-->
                </div>
            </div>
        </div>
    </div>
    <div id="playLandscapeContainer"></div>
    
   
    
</body>
</html> 