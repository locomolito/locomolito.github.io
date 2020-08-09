using UnityEngine;
using System.Collections;
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
	public class LineNumberButton : MonoBehaviour {
		public Sprite overState;
		public Sprite normalState;
		public Sprite disableState;
		public Sprite downStateState;

		public Texture2D handCursor;
		public Vector2 cursorHotSpot;

		public int lineNumber = 1;
		bool isEnabled = true;

		SpriteRenderer spriteRenderer;
		void Awake(){
			spriteRenderer = GetComponent<SpriteRenderer> ();
		}
		void OnMouseEnter(){
			if(isEnabled){
				if(handCursor) Cursor.SetCursor(handCursor, cursorHotSpot, CursorMode.Auto);
				if (overState) spriteRenderer.sprite = overState;
			}
		}
		void OnMouseExit(){
			Cursor.SetCursor(null, cursorHotSpot, CursorMode.Auto);
			if(normalState && isEnabled){
				spriteRenderer.sprite = normalState;
			}
		}
		public void OnDisable(){
		
			isEnabled = false;
			if(disableState){
				spriteRenderer.sprite=disableState;
			}
		}
		
		public void OnEnable(){

			isEnabled = true;
			if(normalState){
				spriteRenderer.sprite=normalState;
			}
		}
		public void OnDeactivate(){
			if(normalState){
				spriteRenderer.sprite=disableState;
			}
		}
		
		public void OnPress(){
			
		}

		void OnMouseDown(){
			if(isEnabled){
				EventManager.instance.OnUserInput(UserInput.LINE_CHANGE, new string[] {lineNumber.ToString()});
			}

		}
	}
}
