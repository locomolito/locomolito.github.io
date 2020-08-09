using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using com.pacifica.slot.core;

namespace com.pacifica.slot.objects{
/*! \brief 
 *         
 * WHAT IT DOES:
 * -
 * 
 * REQUIREMENTS:
 * - 
 */

	public class SlotTheme : MonoBehaviour {
		protected	SlotView		slotView;

		public 		BetInfo 		betInfo;
		public 		SlotReel 		slotReel;
		public 		Paylines 		paylines;
		public 		LineNumbers 	lineNumbers;
		public 		BetControls		slotControls;
		public 		Gamble			gamble;
		public 		Paytable		paytable;

		public 		SoundManager	soundManager;
		protected 	List<string> 	animationOrder;

		protected	float 			autoSpinInterval 	= 1f;
		protected	float 			winBeforeBonus 		=0;
		protected	float 			fsTotalPayout;
		protected	bool 			onFreeSpin;
		
		public void SetView(SlotView view){
			slotView = view;
			slotControls.SetView (view);
		}
		/*
		 * MAIN GAMEPLAY
		 * */

		public virtual void UpdateBetInfo(){
			CancelInvoke ();
			slotReel.StopWinningAnimation ();
			betInfo.UpdateBetInfo (slotView);
			paylines.HideAllLines ();
			if(slotView.FreeCount>0){
				onFreeSpin=true;
				slotControls.DisableAllButtons();
				lineNumbers.DisableAllButtons();
			}
		}
		public virtual void UpdateWonAmount(){
			betInfo.UpdateWonAmount (slotView);
		}

		public virtual void LineChange(){
			CancelInvoke ();
			slotReel.StopWinningAnimation ();
			paylines.ShowActiveLines (slotView.ActiveLines);
			lineNumbers.UpdateActiveLines (slotView.ActiveLines);
		}

		public virtual void UpdateJackpot(){
			slotReel.StopWinningAnimation ();
			betInfo.updateJackpot (slotView);
		}

		public virtual void UpdateButtonStatus(){

		}

		public virtual void UpdateResultSymbols(){
			slotReel.UpdateResultSymbols(slotView);
			slotReel.serverResponded = true;
		}
		public virtual void StartSpin(){
			CancelInvoke ();
			paylines.HideAllLines ();
			lineNumbers.DisableAllButtons ();
			betInfo.ClearWinning ();
			slotReel.Spin ();

		}
		public virtual void EndSpin(){
			CancelInvoke ();
			if(!slotView.OnAutoSpin){
				lineNumbers.UpdateActiveLines (slotView.ActiveLines);
			}
		}

		public virtual void StartAutoSpin(){
			EventManager.instance.OnUserInput(UserInput.START_SPIN);
		}

		public virtual void StopAutoSpin(){
			lineNumbers.UpdateActiveLines (slotView.ActiveLines);
			slotControls.UpdateStateByValues ();
		}
		/*
		 * WINNING ANIMATIONS
		 * */

		/*
		 * GAMBLE
		 * */
		public virtual void StartGamble(){
			slotControls.DisableAllButtons ();
			gamble.AnimIn (slotView.Payout);
		}
		public virtual void ShowGambleResult(){
			gamble.ShowResult (slotView.GambleResults);
		}

		public virtual void ShowGambleSummary(){
			betInfo.UpdateWonAmount (slotView);
		}

		public virtual void EndGamble(){

		}
		/*
		 * BONUS
		 * */
		protected void GetPrizes(){
			EventManager.instance.OnUserInput (UserInput.START_BONUS);
		}
		public virtual void StartBonus(){

		}

		public virtual void EndBonus(){

		}


		/*
		 * PAYTABLE
		 * */
		public virtual void OpenPaytable(){
			slotControls.DisableAllButtons ();
			paytable.AnimIn (slotView);
		}
	}
}
