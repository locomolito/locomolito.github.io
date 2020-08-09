using UnityEngine;
using System.Collections;
using com.pacifica.slot.core;

namespace com.pacifica.slot.webService{
	public class WebService : MonoBehaviour {
		//string domain = "http://172.17.10.114:8080/joeSlot/servlet/WebServerRNG";	
		//string domain = "http://172.17.10.114:8080/webstartup/servlet/WebInit";	
		string domain;
		WWW request;
		WWWForm requestData;

		public void SetDomain(string url){ //MUST CALL THIS BEFORE USING WEBSERVICE
			domain = url;
		}

		public void SendRequest(string[] _fieldNames, string[] _fieldValues){
			StartCoroutine(RequestStart(_fieldNames, _fieldValues));

		}

		IEnumerator RequestStart(string[] _fieldNames, string[] _fieldValues){
			string requestType = _fieldValues[0];

			requestData = new WWWForm ();
			for(int i=0; i<_fieldNames.Length; i++){
				//Debug.Log("field name is: " + _fieldNames[i] + " field val is: " + _fieldValues[i]);
				requestData.AddField(_fieldNames[i], _fieldValues[i]);
			}

			request = new WWW (domain, requestData);
			yield return request;

			if(request.error!=null){
				Debug.Log("NO INTERNET CONNECTION: " + request.error);
			}else{

				//if(request.text==""){
					//Debug.Log("CANNOT AUTHENTICATE IN SERVER! " + request.text);
				//}else{
					Debug.Log("SUCCESS CONNECTING TO DATABASE!" + request.text);
					EventManager.instance.OnWebDataRetrieve(requestType, new string[]{request.text});
				//}

			}

		}
	}
}
