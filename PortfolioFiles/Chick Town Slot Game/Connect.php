<?php
    header('Access-Control-Allow-Origin: *'); 
	function CURLPostTrxn($url,$data)
    {
        $ch = curl_init();
        $ret = curl_setopt($ch, CURLOPT_POST, 1);
        $ret = curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $ret = curl_setopt($ch, CURLOPT_URL,$url);
        $ret = curl_setopt($ch, CURLOPT_HEADER,         0);
        $ret = curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
        $ret = curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $ret = curl_setopt($ch, CURLOPT_TIMEOUT, 30);


        $str = curl_exec($ch);
        return $str;
    }


	if(isset($_POST)) {
		$strreq = '';
		foreach($_POST as $key=>$value){
			//echo $key, ' => ', $value, "<br/>n";
			if($key != 'WebDomain'){
				$strreq .= $key.'='.$value.'&';
			}
		}
        $strreq = substr($strreq, 0, -1);
       
        $responseinit = CURLPostTrxn($_POST['WebDomain'], $strreq);
		$resp =    str_replace("<?xml version=\"1.0\"?>", "", $responseinit);
		$xml = simplexml_load_string($resp);
		
		$json = json_encode($xml);
		$array = json_decode($json,TRUE);
		echo($json);
	}
?>
