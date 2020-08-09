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

	public class LineNumbers : MonoBehaviour {
		public List<LineNumberButton> linenumbers;
		SlotModel slotModel;

		public void UpdateActiveLines(int ActiveLines){
			for(int i=0; i<linenumbers.Count; i++){
				if(i<ActiveLines){
					linenumbers[i].OnEnable();
				}else{
					linenumbers[i].OnDeactivate();
				}	
			}
		}

		public void DisableAllButtons(){
			for (int i=0; i<linenumbers.Count; i++) {
				linenumbers[i].OnDisable();
			}
		}
	}
}
