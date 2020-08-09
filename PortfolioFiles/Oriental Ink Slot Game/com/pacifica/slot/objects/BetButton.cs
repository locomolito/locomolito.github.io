using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using com.pacifica.slot.core;
//! Script components that needs to be added to slot elements to work. All derived from MonoBehavior. Inherit then modify them if needed. These are all the basic elements needed to create the slot game.
namespace com.pacifica.slot.objects{
/*! \brief Add this as a component to a GameObject to act as a button.
 *        
 * WHAT IS DOES:
 * - Dispatch events based on the name of the button where it is attacched to.
 * 
 * REQUIREMENTS:
 * - GameObject should have collider
 * - GameObject should have a name similar to any of the switch cases. Override if need to add a different name.
 */
	public class BetButton : MonoBehaviour {
		public Sprite overState;
		public Sprite normalState;
		public Sprite disableState;
		public Sprite downStateState;

		public Texture2D handCursor;
		public Vector2 cursorHotSpot;

		public SoundManager soundManager;

		bool isEnabled = true;

		SpriteRenderer spriteRenderer;
		BoxCollider2D boxCollider;

		void Awake(){
			spriteRenderer = GetComponent<SpriteRenderer> ();

			boxCollider = GetComponent<BoxCollider2D> ();

		}

		public void OnMouseDown(){
			if(!isEnabled){
				return;
			}

			switch (this.name){
			case "btnCoinUp":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.COIN_CHANGE, new string[] {"1"});
				break;
			case "btnCoinDown":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.COIN_CHANGE, new string[] {"-1"});
				break;
			case "btnStartAutoSpin":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.AUTO_SPIN, new string[] {"-1"});
				break;
			case "btnStopAutoSpin":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.STOP_AUTO_SPIN);
				break;
			case "btnLineDown":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.LINE_CHANGE, new string[] {"-1"});
				break;
			case "btnLineUp":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.LINE_CHANGE, new string[] {"+1"});
				break;
			case "btnBetDown":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.BET_CHANGE, new string[] {"-1"});
				break;
			case "btnBetUp":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.BET_CHANGE, new string[] {"1"});
				break;
			case "btnSpin":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.START_SPIN);
				break;
			case "btnMaxBet":
				soundManager.PlayButtonSound();
				EventManager.instance.OnUserInput(UserInput.BET_MAX, new string[] {"1"});
				break;
			case "btnGamble":
				soundManager.PlayButtonSound("GAMBLE");
				EventManager.instance.OnUserInput(UserInput.GAMBLE_START);
				break;
			case "btnPaytable":
				EventManager.instance.OnUserInput(UserInput.OPEN_PAYTABLE);
				break;
			default:
				Debug.Log("NO ACTION TAKEN. BUTTON NAME IS: " + this.name);
				break;
			}
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

		public void Disable(){
			if(disableState){
				isEnabled=false;
				spriteRenderer.sprite = disableState;
				boxCollider.enabled=false;
			}
		}
		public void Enable(){
			if(normalState){
				isEnabled=true;
				spriteRenderer.sprite = normalState;
				boxCollider.enabled=true;
			}
		}
	}
}
