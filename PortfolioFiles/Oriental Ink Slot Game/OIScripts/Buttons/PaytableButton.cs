using UnityEngine;
using System.Collections;
using com.pacifica.slot.objects;

public class PaytableButton : MonoBehaviour {

	public Sprite overState;
	public Sprite normalState;
	public Sprite disableState;
	public Sprite downStateState;

	public Texture2D handCursor;
	public Vector2 cursorHotSpot;
	
	public SoundManager soundManager;

	public Paytable paytable;
	
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
		case "btnPrev":
			paytable.PrevPage();
			soundManager.PlayButtonSound();
			break;
		case "btnNext":
			paytable.NextPage();
			soundManager.PlayButtonSound();
			break;
		case "btnBackToGame":
			paytable.AnimOut();
			soundManager.PlayButtonSound();
			break;
		}

	}
	
	
	void OnMouseEnter(){
		if(isEnabled){
			if(handCursor) Cursor.SetCursor(handCursor, cursorHotSpot, CursorMode.Auto);
			if(overState) spriteRenderer.sprite = overState;
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
