using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
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
	public class BetInfo : MonoBehaviour {
		public Text 		coinValue;
		public Text 		activeLines;
		public Text 		lineBet;
		public Text 		totalBet;
		public Text			wonAmount;
		public Text 		info;

		public Text 		grandJackpot;
		public Text 		majorJackpot;
		public Text 		minorJackpot;
		public Text 		miniackpot;

		public GameObject	miniSymbolHolder;
		public Vector2 		miniSymbolSize;
		public float		miniSymbolXpadding;
		public float		miniSymbolTextpadding;
		float				miniXInterval;


		public void UpdateBetInfo(SlotView view){
			coinValue.text = view.CoinValue.ToString();
			activeLines.text = view.ActiveLines.ToString();
			lineBet.text = SlotString.InsertComma((view.LineBet * view.CoinValue).ToString());
			totalBet.text = SlotString.InsertComma (view.BetAmount);
		}

		public void updateJackpot(SlotView view){
			grandJackpot.text = SlotString.InsertComma (view.GrandJackpot);
			majorJackpot.text = SlotString.InsertComma (view.MajorJackpot); 
			minorJackpot.text = SlotString.InsertComma (view.MinorJackpot);
			miniackpot.text = SlotString.InsertComma (view.MiniJackpot);
		}

		public void UpdateWonAmount(SlotView view){
			if (view == null)
				return;
			if (view.Payout > 0) {
				wonAmount.text = SlotString.InsertComma (view.Payout);
			} else {
				wonAmount.text ="0";
			}
		}

		public void SetMessage(string message){
			ClearMiniSymbol ();
			info.text = message;
			info.rectTransform.sizeDelta = new Vector2(info.preferredWidth, info.preferredHeight);
			info.transform.position = new Vector3(miniSymbolHolder.transform.position.x , miniSymbolHolder.transform.position.y);
		}

		public void SetMessage(string amount, string lineNumber, List<string> winningsymbols){
			ClearMiniSymbol ();
			info.text = "Line " + lineNumber + " won " + SlotString.InsertComma(amount);

			miniXInterval = 0f;
			info.rectTransform.sizeDelta = new Vector2(info.preferredWidth, info.preferredHeight);
			for (int i = 0; i < winningsymbols.Count ; i++){
				GameObject minisymbol = ObjectPool.instance.GetObjectForType (winningsymbols[i] , false);
				minisymbol.transform.localScale = miniSymbolSize;
				minisymbol.transform.parent = miniSymbolHolder.transform;
				info.transform.position = new Vector3(miniSymbolHolder.transform.position.x + miniXInterval + miniSymbolTextpadding, miniSymbolHolder.transform.position.y);
				minisymbol.transform.position = new Vector3(miniSymbolHolder.transform.position.x + miniXInterval, miniSymbolHolder.transform.position.y);
				miniXInterval += minisymbol.transform.GetComponent<Renderer>().bounds.size.x + miniSymbolXpadding;
				minisymbol.GetComponent<Renderer>().sortingLayerName = miniSymbolHolder.GetComponent<Renderer>().sortingLayerName;
				minisymbol.SetActive (true); 
			}
		}

		void ClearMiniSymbol(){
			do {	
				foreach (Transform child in miniSymbolHolder.transform) {
					ObjectPool.instance.PoolObject (child.gameObject);
				}	
			} while(miniSymbolHolder.transform.childCount>0);
		}

		public void ClearWinning(){
			wonAmount.text ="0";
		}
	}
}
