using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using com.pacifica.slot.core;
using com.pacifica.slot.dataTypes;

namespace com.pacifica.slot.objects{
/*! \brief 
 *         
 * WHAT IT DOES:
 * -
 * 
 * REQUIREMENTS:
 * - 
 */
	public class SlotWheel : MonoBehaviour {
		float startBounceHeight=1f;
		float startBounceSpeed= 0.05f;
		float endBounceHeight=0.1f;
		float endBounceSpeed=0.0005f;


		int rows;
		float YInterval;
		string[] symbolCodes;
		List<string> result;
		List<GameObject> resultObject;

		float reelHeight;
		float spinSpeed;

		GameObject wheelStrip1;
		GameObject wheelStrip2;
		GameObject resultStrip;

		GameObject stripPointer1;	//DYNAMIC CONTAINER. CONTAINS WHICH STRIP ARE MOVING. THERE ARE 3 STRIPS.
		GameObject stripPointer2;

		GameObject dummyBeforeResult;

		int serverResponse = 0;
		int wheelStatus;

		bool initSpin;
		bool startStopping;
		bool bounced;

		public List<GameObject> ResultObject { get {return resultObject;}}
		public List<string> Result { get {return result;} set {result = value;}}	

		public void CreateStrips(int _rows, float _YInterval, string[] _symbolCode, List<string> _result, float _reelHeight, float _spinSpeed){
			rows = _rows;
			YInterval = _YInterval;
			symbolCodes = _symbolCode;
			result = _result;

			reelHeight = _reelHeight;
			spinSpeed = _spinSpeed;

			wheelStrip1 = new GameObject ();
			wheelStrip2 = new GameObject ();
			resultStrip = new GameObject ();

			FillReelStrip (resultStrip);

			wheelStrip1.transform.parent=this.transform;
			wheelStrip1.transform.localPosition = new Vector2(0, reelHeight);
			wheelStrip2.transform.parent=this.transform;
			wheelStrip2.transform.localPosition = new Vector2(0, reelHeight);
			resultStrip.transform.parent=this.transform;
			resultStrip.transform.localPosition = Vector2.zero;
		}


		public void Spin(){
			initSpin = false;
			startStopping = false;
			bounced = false;
			resultObject = new List<GameObject>();
			wheelStatus = WheelSpinStatus.BEGIN_SPIN;
			FillReelStrip (wheelStrip1);
			FillReelStrip (wheelStrip2);
			stripPointer1 = wheelStrip1;
			stripPointer2 = wheelStrip2;

			stripPointer2.transform.position = new Vector2(stripPointer2.transform.position.x, -(reelHeight + YInterval));
		}
		public void Stop(){
			startStopping = true;
		}

		void FillReelStrip(GameObject strip, bool isResult=false){
			emptyStrip (strip);
			
			int tempRow = rows;

			if(isResult){
				if(resultObject.Count>0){
					resultObject.Clear();
				}
				for (int i=0; i< 3; i++) {
					tempRow--;
					string symbolCode= result[i];
					GameObject symbol = ObjectPool.instance.GetObjectForType ("SymbolStatic" + symbolCode, false);
					symbol.transform.parent = strip.transform;
					symbol.transform.localPosition = new Vector2 (0, tempRow * YInterval);
					symbol.GetComponent<Renderer>().sortingLayerName = GetComponent<Renderer>().sortingLayerName;
					symbol.SetActive (true);

					resultObject.Add(symbol);
				}
			}else{
				for (int i=0; i< 3; i++) {
					tempRow--;
					string symbolCode= result[i];
					GameObject symbol = ObjectPool.instance.GetObjectForType ("SymbolStatic" + symbolCode, false);
					symbol.transform.parent = strip.transform;
					symbol.transform.localPosition = new Vector2 (0, tempRow * YInterval);
					symbol.GetComponent<Renderer>().sortingLayerName = GetComponent<Renderer>().sortingLayerName;
					symbol.SetActive (true);
				}
			}


			strip.transform.parent=this.transform;
			strip.transform.localPosition = new Vector2(0, reelHeight);
		}

		public void MoveWheel(){
			switch (wheelStatus){
			case WheelSpinStatus.FULL_STOP:
				return;
				break;
			case WheelSpinStatus.BEGIN_SPIN:
				if(resultStrip.transform.localPosition.y < startBounceHeight && !bounced){
					resultStrip.transform.Translate(Vector2.up * (Time.deltaTime + startBounceSpeed));
					stripPointer2.transform.Translate(Vector2.up * (Time.deltaTime + startBounceSpeed));
				}else{
					bounced = true;
					resultStrip.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed));
					stripPointer2.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed));
					if(stripPointer2.transform.position.y <= -(reelHeight + YInterval)){
						stripPointer2.transform.position = new Vector2(stripPointer2.transform.position.x, (reelHeight*0.5f) + (YInterval*0.5f));
						wheelStatus = WheelSpinStatus.SPINNING;
						bounced = false;
					}

				}
				break;
			case WheelSpinStatus.SPINNING:
				if (resultStrip.transform.childCount>0){
					if(resultStrip.transform.position.y>-(reelHeight+YInterval)){
						resultStrip.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed));
					}else{
						emptyStrip(resultStrip);
					}
				}

				stripPointer1.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
				if(initSpin){
					stripPointer2.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
				}

				if(stripPointer1.transform.position.y <= -YInterval && initSpin==false){
					GameObject temp = stripPointer2;
					stripPointer2 = stripPointer1;
					stripPointer1 =temp;
					initSpin=true;
				}

				if(stripPointer2.transform.position.y < -(reelHeight + YInterval)){
					initSpin=false;
					stripPointer2.transform.position = new Vector2(stripPointer2.transform.position.x, (reelHeight*0.5f) + (YInterval*0.5f));
					if(startStopping){
						wheelStatus = WheelSpinStatus.STOPPING;
					}else{
						//fillstrip random
					}
				}

				dummyBeforeResult = stripPointer1;
				break;
			case WheelSpinStatus.BEGIN_STOP:
				break;
			case WheelSpinStatus.STOPPING:
				if(stripPointer2.transform.position.y > -(reelHeight + YInterval)){
					stripPointer2.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
					emptyStrip(stripPointer2);
				}

				stripPointer1.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
				if(dummyBeforeResult.transform.position.y < reelHeight){

					if(resultStrip.transform.childCount<=0){
						FillReelStrip(resultStrip, true);
						resultStrip.transform.position = new Vector2(resultStrip.transform.position.x, (reelHeight*0.5f) + (YInterval*0.5f));
					}

					if(resultStrip.transform.position.y-spinSpeed > -YInterval){
						resultStrip.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
					}else{
						stripPointer1.transform.position = new Vector2(stripPointer1.transform.position.x, (reelHeight*0.5f) + (YInterval*0.5f) + (spinSpeed * 0.5f)); 
						wheelStatus= WheelSpinStatus.BOUNCING;
					}
				}

				break;
			case WheelSpinStatus.BOUNCING:
				if(resultStrip.transform.localPosition.y > -(endBounceHeight) && !bounced){
					resultStrip.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
					stripPointer1.transform.Translate(-Vector2.up * (Time.deltaTime + spinSpeed)); 
				}else{
					bounced=true;
					if(resultStrip.transform.localPosition.y<0){
						resultStrip.transform.Translate(Vector2.up * (Time.deltaTime + endBounceSpeed));
						stripPointer1.transform.Translate(Vector2.up * (Time.deltaTime + endBounceSpeed));
					}else{
						emptyStrip(stripPointer1);
						EventManager.instance.OnUserInput(UserInput.WHEEL_STOP);
						resultStrip.transform.localPosition = new Vector2(resultStrip.transform.localPosition.x, 0);
						wheelStatus= WheelSpinStatus.FULL_STOP;
					}
				}


				break;
			}

		}
		void emptyStrip(GameObject strip){
			do {														
				foreach (Transform child in strip.transform) {
					ObjectPool.instance.PoolObject (child.gameObject);
					
				}			
			} while(strip.transform.childCount>0);

		}
	}
}
