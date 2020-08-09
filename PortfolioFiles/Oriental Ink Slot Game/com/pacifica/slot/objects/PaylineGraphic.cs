using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.objects{
/*! \brief 
 *         
 * WHAT IT DOES:
 * -
 * 
 * REQUIREMENTS:
 * - 
 */
	public class PaylineGraphic : MonoBehaviour {

		public void Hide(){
			this.GetComponent<Renderer>().enabled = false;
		}
		public void Show(){
			this.GetComponent<Renderer>().enabled = true;
		}
	}
}
