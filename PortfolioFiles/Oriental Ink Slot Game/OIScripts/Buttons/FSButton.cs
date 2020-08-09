using UnityEngine;
using System.Collections;

public class FSButton : MonoBehaviour {
	public FreeSpinMode fsMode;
	
	public Sprite overState;
	public Sprite normalState;
	public Sprite disableState;
	public Sprite downStateState;
	
	public Texture2D handCursor;
	public Vector2 cursorHotSpot;
	
	bool isEnabled = true;
	
	SpriteRenderer spriteRenderer;
	
	void Awake(){
		spriteRenderer = GetComponent<SpriteRenderer> ();
	}
	void OnMouseDown(){
		if(!isEnabled){
			return;
		}

		fsMode.SummaryClosed ();
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
		}
	}
	public void Enable(){
		if(normalState){
			isEnabled=true;
			spriteRenderer.sprite = normalState;
		}
	}
}
