using UnityEngine;
using System.Collections;
/**
 * TO DO: CHANGE THE APPERANCE OF THE BUTTONS. ENABLE AND DISABLE BUTTON CLICK.
 * */
using com.pacifica.slot.core;

namespace com.pacifica.slot.objects{
/*! \brief Add this as a component to a GameObject that contains all bet button controls.
 *         
 * WHAT IT DOES:
 * - Disables and enables buttons based on slot status.
 * 
 * REQUIREMENTS:
 * - 
 */
	public class BetControls : MonoBehaviour {
		SlotView slotView;

		public BetButton coinDown;
		public BetButton coinUp;
		public BetButton paytable;
		public BetButton autoSpin;
		public BetButton stopAutoSpin;
		public BetButton lineDown;
		public BetButton lineUp;
		public BetButton betDown;
		public BetButton betUp;
		public BetButton spin;
		public BetButton maxBet;
		public BetButton gamble;

		public BetButton lblChooseCoin;
		public BetButton lblSelectLines;
		public BetButton lblLineBet;

		// Use this for initialization
		void Start () {
			stopAutoSpin.gameObject.SetActive (false);
		}
		
		// Update is called once per frame
		void Update () {
			
		}
		public void SetView(SlotView view){
			slotView = view;
			gamble.Disable ();
			UpdateStateByValues ();

			EventManager.onUserInput += UserInputHandler;

		}
		void UserInputHandler(string eventType, string[] data){
			switch(eventType){
			case UserInput.START_SPIN:
				DisableAllButtons();
				return;
				break;
			case UserInput.END_SPIN:
				UpdateStateByValues();
				break;
			case UserInput.LINE_CHANGE:
				if(slotView.ActiveLines == slotView.GameInfo.MaxLine){
					lineUp.Disable();
				}else{
					lineUp.Enable();
					if(slotView.ActiveLines>1){
						lineDown.Enable();
					}else{
						lineDown.Disable();
					}
				}
				break;
			case UserInput.BET_CHANGE:
				if(slotView.LineBet == slotView.GameInfo.MaxLineBet){
					betUp.Disable();
				}else{
					betUp.Enable();
					if(slotView.LineBet>1){
						betDown.Enable();
					}else{
						betDown.Disable();
					}
				}
				break;
			case UserInput.COIN_CHANGE:
				int coinIndex = 0;
				for(int i=0; i<slotView.CoinList.Length; i++){
					if(slotView.CoinList[i] == slotView.CoinValue){
						coinIndex = i;
					}
				}

				if(coinIndex == slotView.CoinList.Length-1){
					coinUp.Disable();
				}else{
					coinUp.Enable();
					if(coinIndex==0){
						coinDown.Disable();
					}else{
						coinDown.Enable();
					}
				}

				break;
			case UserInput.BET_MAX:
				maxBet.Disable();
				lineUp.Disable();
				betUp.Disable();
				break;
			case UserInput.GAMBLE:
				//slotTheme.LineChange();
				break;
			case UserInput.AUTO_SPIN:
				autoSpin.gameObject.SetActive(false);
				stopAutoSpin.gameObject.SetActive(true);
				break;	
			case UserInput.STOP_AUTO_SPIN:
				autoSpin.gameObject.SetActive(true);
				stopAutoSpin.gameObject.SetActive(false);
				break;	
			}

			if(slotView.ActiveLines == slotView.GameInfo.MaxLine && slotView.LineBet == slotView.GameInfo.MaxLineBet){
				maxBet.Disable();
			}else{
				if(!slotView.IsSpinning && !slotView.OnAutoSpin) maxBet.Enable();
			}
			//slotTheme.UpdateButtonStatus();
		}

		public void UpdateStateByValues(){
			if(slotView.OnAutoSpin || slotView.IsSpinning){
				return;
			}

			lblChooseCoin.Enable();
			lblSelectLines.Enable();
			lblLineBet.Enable();

			if(slotView.ActiveLines == slotView.GameInfo.MaxLine && slotView.LineBet == slotView.GameInfo.MaxLineBet){
				maxBet.Disable();
			}else{
				maxBet.Enable();
			}

			if(slotView.ActiveLines == slotView.GameInfo.MaxLine){
				lineUp.Disable();
			}else{
				lineUp.Enable();

			}
			if(slotView.ActiveLines>1){
				lineDown.Enable();
			}else{
				lineDown.Disable();
			}
			if(slotView.LineBet == slotView.GameInfo.MaxLineBet){
				betUp.Disable();
			}else{
				betUp.Enable();
			}

			if(slotView.LineBet>1){
				betDown.Enable();
			}else{
				betDown.Disable();
			}

			int coinIndex = 0;
			for(int i=0; i<slotView.CoinList.Length; i++){
				if(slotView.CoinList[i] == slotView.CoinValue){
					coinIndex = i;
				}
			}

			if(coinIndex == slotView.CoinList.Length-1){
				coinUp.Disable();
			}else{
				coinUp.Enable();

			}

			if(coinIndex==0){
				coinDown.Disable();
			}else{
				coinDown.Enable();
			}

			spin.Enable ();
			paytable.Enable ();
			autoSpin.Enable ();

			if(slotView.Payout>0 && !slotView.DoneGamble){
				UpdateGambleButton (true);
			}
		}

		public void UpdateGambleButton(bool state){
			if(state){
				gamble.Enable();
			}else{
				gamble.Disable();
			}
		}

		public void DisableAllButtons(){
			lblChooseCoin.Disable();
			lblSelectLines.Disable();
			lblLineBet.Disable();

			coinDown.Disable();
			coinUp.Disable();
			paytable.Disable();
			autoSpin.Disable();
			lineDown.Disable();
			lineUp.Disable();
			betDown.Disable();
			betUp.Disable();
			spin.Disable();
			maxBet.Disable();
			gamble.Disable();

		}
	}
}
