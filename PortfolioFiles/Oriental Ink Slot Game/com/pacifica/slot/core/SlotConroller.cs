using UnityEngine;
using System.Collections;
using com.pacifica.slot.dataTypes;

namespace com.pacifica.slot.core{
	public class SlotConroller {
		SlotModel slotModel;

		public SlotConroller(SlotModel model){
			slotModel = model;

			EventManager.onUserInput += UpdateViewDisplay;
		}

		void UpdateViewDisplay(string eventType, string[] data){

			switch(eventType){
			case UserInput.START_SPIN:
				Spin();
				break;
			case UserInput.END_SPIN:
				EndSpin();
				break;
			case UserInput.LINE_CHANGE:
				ChangeActiveLines(data);
				break;
			case UserInput.BET_CHANGE:

				ChangeLineBet(data);
				break;
			case UserInput.COIN_CHANGE:
				ChangeCoinValue(data);
				break;
			case UserInput.BET_MAX:
				BetMax();
				break;
			case UserInput.GAMBLE:
				Gamble(data[0]);
				break;
			case UserInput.GAMBLE_CANCEL:
				GambleCancel();
				break;
			case UserInput.COLLECT_GAMBLE:
				GambleCollect();
				break;
			case UserInput.START_BONUS:
				StartBonus();
				break;
			case UserInput.BONUS_COLLECT:
				EndBonus(data);
				break;
			case UserInput.AUTO_SPIN:
				AutoSpin(true);
				break;
			case UserInput.STOP_AUTO_SPIN:
				AutoSpin(false);
				break;
			}

		}

		void Spin(){
			if(!slotModel.IsSpinning){
				slotModel.Spin ();
			}
		}
		void EndSpin(){
			slotModel.EndSpin ();
		}
		void ChangeActiveLines(string[] data){
			int tempLines = slotModel.ActiveLines;
			if(data[0] == "+1"){
				if(tempLines < slotModel.GameInfo.MaxLine){
					tempLines++;
				}
			}else if(data[0] == "-1"){
				if(tempLines > 1){
					tempLines--;
				}
			}else{
				tempLines = int.Parse(data[0]);
				if(tempLines > slotModel.GameInfo.MaxLine || tempLines <=0){
					return;
				}
			}

			slotModel.SetBetSettings (tempLines, slotModel.LineBet, slotModel.CoinValue);
		}
		void ChangeLineBet(string[] data){
			int tempBet = slotModel.LineBet;
			if (data != null) {
				if (data [0] == "1" && tempBet < slotModel.GameInfo.MaxLineBet) {
					tempBet++;
				} else if (data [0] == "-1" && tempBet > 1) {
					tempBet--;
				}
			}
			slotModel.SetBetSettings (slotModel.ActiveLines, tempBet, slotModel.CoinValue);

		}
		void ChangeCoinValue(string[] data){
			int coinIndex = 0;
			for(int i=0; i<slotModel.CoinList.Length; i++){
				if(slotModel.CoinList[i] == slotModel.CoinValue){
					coinIndex = i;
				}
			}

			if(data!=null){
				if(data[0] == "1" && coinIndex < slotModel.CoinList.Length-1){
					coinIndex++;
				}else if(data[0] == "-1" && coinIndex>0){
					coinIndex--;
				}
			}else{
				Debug.Log("Loop the coin!");
			}
			
			slotModel.SetBetSettings (slotModel.ActiveLines, slotModel.LineBet, slotModel.CoinList[coinIndex]);
		}
		void AutoSpin(bool val){
			slotModel.AutoSpin (val);
		}
		void Gamble(string type){
			if (!slotModel.DoneGamble) {
				slotModel.GetGambleResult (type);
			}
		}
		void GambleCollect(){
			slotModel.CollectGamble ();
		}
		void GambleCancel(){
			slotModel.CancelGamble ();
		}
		void BetMax(){
			slotModel.setToMax ();
		}
		void StartBonus(){
			if(!slotModel.DoneBonus){
				slotModel.GetBonus ();
			}

		}
		void EndBonus(string[] data){
			slotModel.EndBonus (data);
		}
	}
}
