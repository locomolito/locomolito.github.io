using UnityEngine;
using System.Collections;
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
	public class Gamble : MonoBehaviour {
		protected const 		string 	FULL="FULL"; 	// Will use ALL of bankMoney
		protected const 		string 	HALF="HALF"; 	//Will use HALF of bankMoney.

		protected	string	type;
		protected 	float 	bankMoney;		//Total winning from gamble.
		protected 	float	gambleAmount;	//Amount that the user wants to gamble. Half or full amount of bankMoney.
		protected	float	baseMoney;		//Amount of money the user has upon entering gamble.

		protected GambleResults results;

		protected bool won;


		// Use this for initialization
		void Start () {
			gameObject.SetActive (false);
		}
		public void AnimIn(float payout){
		}

		//SEND REQUEST TO CONTROLLER TO GAMBLE. CALL WHEN USER CLICK A BUTTON
		protected virtual void getGambleResult(){
			EventManager.instance.OnUserInput(UserInput.GAMBLE, new string[]{type});
		}

		//SENDD REQUEST TO CONTROLLER TO END GAMBLE. OR END GAMBLE GAME WITHOUT DISPATCHING IF USER DID NOT GAMBLE AND CLICKED THE COLLECT INSTEAD.
		protected virtual void Collect(){
			if(baseMoney != bankMoney){
				EventManager.instance.OnUserInput(UserInput.COLLECT_GAMBLE, new string[]{type});
			}else{
				EventManager.instance.OnUserInput(UserInput.GAMBLE_CANCEL, new string[]{type});
			}

		}

		//CALLED WHEN SERVER RESPONDED.
		public virtual void ShowResult(GambleResults gambleResults){
			results = gambleResults;
			if (results.Result == 1) {
				won = true;
			} else {
				won = false;
			}

		}

		//EXIT ANIMATION HERE.
		public virtual void ExitGamble(){
			
		}

		public virtual void ShowSummary(){

		}
	}
}
