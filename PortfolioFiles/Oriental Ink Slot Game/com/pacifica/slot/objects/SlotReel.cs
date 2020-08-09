using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using com.pacifica.slot.core;
using com.pacifica.slot.utils;

namespace com.pacifica.slot.objects{
/*! \brief 
 *         
 * WHAT IT DOES:
 * -
 * 
 * REQUIREMENTS:
 * - 
 */
	public class SlotReel : MonoBehaviour {
		public List<SlotWheel> 			wheels;
		public float 					spinSpeed 		= 0.001f;
		public GameObject				winHolder;
		public OISlotTheme 				slotTheme;

		public List<string> 			currentWinningSymbol;
		public bool						serverResponded = false;//START STPINCE WHEN THIS IS TRUE

		protected int 					rows			= 3;
		protected int 					cols 			= 5;
		protected float 				wheelInterval	= 0.2F;	//DELAY(in seconds) BETWEEN EACH WHEEL BEFORE SPINNING.
		protected float 				reelHeight;
		protected float 				rowInterval;
		protected float					colInterval;

		protected List<List<string>>	resultList;

		protected string[] 				symbolCode;
		protected bool 					allWheelStop;	
		protected int					stopIndex;				//NUMBER OF THE WHEEL TO START STPPING
		protected int					wheelStopCount;			//NUMBERS OF THE WHEEL THAT HAS FINISHED STOPPING
		protected int					wheelToSpin;			//USE TO ADD DELAY BEFORE EACH WHEEL TO SPIN



		void Start () {
			Init ();
		}

		protected virtual void Init(){
			allWheelStop = false;
			DefaultResult ();
			
			for(int i=0; i<wheels.Count; i++){
				wheels[i].CreateStrips(rows, rowInterval, symbolCode, resultList[i], reelHeight, spinSpeed);
			}
			
			EventManager.onUserInput += UserInputHandler;
		}
		
		public virtual void Spin(){
			ClearAnimation ();
			CancelInvoke ();
			stopIndex = 0;
			wheelToSpin = 0;
			for (int i=0; i<cols; i++) {
				wheels [i].Spin ();
			}
			StartCoroutine ("SpinReels");
			InvokeRepeating ("StopAWheel", 0, 0.5f);
			InvokeRepeating ("AddWheelToSpin", wheelInterval, wheelInterval);
		}

		public void UpdateResultSymbols(SlotView view){
			for(int i=0; i<wheels.Count; i++){
				wheels[i].Result = view.ReelSymbols[i];
			}
		}

		public virtual void AnimateSymbols(string positions){


		}

		public virtual void AnimateScatter(string positions){

		}
		public virtual void StopWinningAnimation(){
		
		}
		protected virtual void ClearAnimation(){
			
		}

		IEnumerator SpinReels(){
			while (!allWheelStop) {
				for (int i=0; i<wheelToSpin; i++) {
					wheels [i].MoveWheel ();
				}
				yield return null;
			}
		}

		void StopAWheel(){
			if (!serverResponded) {
				return;
			}

			if(stopIndex >= cols){
				stopIndex=0;
				return;
			}
			wheels [stopIndex].Stop ();
			stopIndex++;
		}
		void AddWheelToSpin(){
			if(wheelToSpin < wheels.Count){
				wheelToSpin++;
			}else{
				CancelInvoke("AddWheelToSpin");
			}

		}
		void DefaultResult()
		{
			List<string> fill1 = new  List<string>{"A", "G", "C", "E"};
			List<string> fill2 = new  List<string>{"F", "B", "D"};
			List<List <string>> _res = new List<List<string>>();
			for(int i=0; i < wheels.Count; i++){
				List<string> temp;
				if(i%2==0){
					temp = new List<string>(fill1);
				}else
				{
					temp = new List<string>(fill2);
				}

				List<string> collectedArr = new List<string>();
				for(int j=0; j< rows; j++){
					int rnd= Random.Range(0, temp.Count);
					collectedArr.Add(temp[rnd]);
					temp.RemoveAt(rnd);
				}
				_res.Add(collectedArr);
			}

			resultList = _res;
		}
		void UserInputHandler(string type, string[] data){
			if(type == UserInput.WHEEL_STOP){
				wheelStopCount ++;
				if(wheelStopCount==cols){
					StopCoroutine("SpinReels");
					CancelInvoke("StopAWheel");
					serverResponded=false;
					wheelStopCount=0;
					EventManager.instance.OnUserInput(UserInput.END_SPIN);
				}
			}
		}
	}
}
