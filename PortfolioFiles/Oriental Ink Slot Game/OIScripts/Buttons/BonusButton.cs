using UnityEngine;
using System.Collections;
using com.pacifica.slot.utils;

public class BonusButton : MonoBehaviour {

	public OIBonusGame oiBonus;
	
	public Sprite overState;
	public Sprite normalState;
	public Sprite disableState;
	public Sprite downStateState;
	
	public Texture2D handCursor;
	public Vector2 cursorHotSpot;
	
	bool isEnabled = true;
	
	SpriteRenderer spriteRenderer;

	Vector3 initialPos;

	Animator anim;
	
	void Awake(){
		initialPos = this.transform.localPosition;
		spriteRenderer = GetComponent<SpriteRenderer> ();
		anim = GetComponent<Animator> ();
	}
	
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void OnMouseDown(){

		if(!isEnabled){
			return;
		}
		
		switch(gameObject.name){
		case "btnContinue":
			oiBonus.CollectWinning();
			break;
		
		default:
			oiBonus.Select(gameObject.name);
			if(gameObject.tag=="BonusDesigns"){

			}else if(gameObject.tag=="BonusMachines"){

			}
			break;
		}
		
	}
	void OnMouseEnter(){
		if(isEnabled){
			if(handCursor) Cursor.SetCursor(handCursor, cursorHotSpot, CursorMode.Auto);
			if(overState) spriteRenderer.sprite = overState;
			if(gameObject.name!="btnContinue"){
				iTween.MoveBy(gameObject, new Vector3(0,0.1f,0), 0.5f);
			}
		}
	}
	void OnMouseExit(){
		Cursor.SetCursor(null, cursorHotSpot, CursorMode.Auto);
		if(isEnabled){
			if(normalState) spriteRenderer.sprite = normalState;
			if(gameObject.name!="btnContinue"){
				iTween.MoveTo(gameObject, initialPos, 0.5f);
			}
		}
	}

//	void SetStaticSprite(){
//		if(normalState){
//			spriteRenderer.sprite = normalState;
//		}
//	}

	public void Disable(){
		isEnabled=false;
		if(disableState){
			spriteRenderer.sprite = disableState;
		}
	}
	public void Enable(){
//		isEnabled=true;
//		if(normalState){
//			spriteRenderer.sprite = normalState;
//		}
	}
	public void Animate(string animationVar, int animationNumber){
		anim.SetInteger(animationVar, animationNumber);
	}

	public void Hide(){
		gameObject.SetActive (false);
	}
	public void ResetPos(){
		anim.SetInteger ("designNumber", 0);
		anim.SetInteger ("machineNumber", 0);
		transform.localPosition = initialPos;
	}
}
