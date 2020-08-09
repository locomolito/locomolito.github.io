using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace com.pacifica.slot.objects{
/*! \brief 
 *         
 * WHAT IT DOES:
 * -
 * 
 * REQUIREMENTS:
 * - 
 */
	public class Paylines : MonoBehaviour {
		public List<PaylineGraphic> lines;
		float delayBeforeHide = 2f;

		void Start () {
			HideAllLines ();
		}
		
		public void HideAllLines(){
			CancelInvoke ("HideAllLines");

			for(int i=0; i<lines.Count; i++){
				lines[i].Hide();
			}
		}

		public void ShowLine(int LineNumber){
			HideAllLines ();
			lines [LineNumber].Show ();
		}

		public void ShowActiveLines(int ActiveLines){
			for(int i=0; i<lines.Count; i++){
				if(i<ActiveLines){
					lines[i].Show();
				}else{
					lines[i].Hide();
				}

			}
			CancelInvoke ("HideAllLines");
			Invoke ("HideAllLines", delayBeforeHide);
		}

	}
}
