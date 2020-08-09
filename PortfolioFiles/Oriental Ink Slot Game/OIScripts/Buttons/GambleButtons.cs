using UnityEngine;
using System.Collections;

public class GambleButtons : MonoBehaviour {
	public OIGamble oiGamble;

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
		case "Collect":
			oiGamble.ShowSummary();
			break;
		case "Om":
			oiGamble.SendGamble("Om");
			break;
		case "Koi":
			oiGamble.SendGamble("Koi");
			break;
		case "Continue":
			oiGamble.AnimOut();
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
		}
	}
	public void Enable(){
		if(normalState){
			isEnabled=true;
			spriteRenderer.sprite = normalState;
		}
	}
}
