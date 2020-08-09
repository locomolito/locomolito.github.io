using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using com.pacifica.slot.utils;

public class JackpotAnimation : MonoBehaviour {
	public ParticleSystem 	coins;
	public GameObject 		jackpotTxt;
	public GameObject		ribbon;
	public Text 			wonAmount;
	public OISlotTheme		slotTheme;

	float	txtScaleX;
	float	txtScaleY;

	// Use this for initialization
	void Start () {
		coins.Stop ();
		
		//PlayAnimation (395f);
		jackpotTxt.transform.localScale = Vector2.zero;
		ribbon.transform.localScale = Vector2.zero;

		wonAmount.transform.localScale = Vector2.zero;
		gameObject.SetActive (false);
	}

	public void PlayAnimation(string jackpotAmount = "0"){
		CancelInvoke ("PlayAnimation");
		Invoke ("StopEmision", 4f);
		
		coins.Play ();

		wonAmount.text = SlotString.InsertComma (jackpotAmount);
		iTween.ScaleTo(jackpotTxt, iTween.Hash("scale", new Vector3(1f,1f,1f), "easetype", "easeOutElastic", "time", 1.5f));
		iTween.ScaleTo(ribbon, iTween.Hash("scale", new Vector3(1f,1f,1f), "easetype", "easeOutElastic", "time", 1.5f, "delay", .3f));
		//iTween.ScaleTo(wonAmount, iTween.Hash("scale", new Vector3(1f,1f,1f), "easetype", "easeOutElastic", "time", 1.5f, "delay", .3f));
		iTween.ValueTo(gameObject, iTween.Hash("from", Vector2.zero, "to", new Vector2(0.007274f,0.007274f), "onUpdate", "UpdateGUIScale", "easeType", "easeOutElastic", "time", 1.5f, "delay", .3f));
		//iTween.ValueTo(gameObject, iTween.Hash("from", 0, "to", 1, "onUpdate", "UpdateGUIScaleY", "easeType", "easeOutElastic"));

	}
	

	void UpdateGUIScale(Vector2 GUIScale){
		wonAmount.transform.localScale = GUIScale;
	}
//	void UpdateGUIScaleY(float GUIScaleY){
//		wonAmount.transform.localScale.x = GUIScaleY;
//	}
	void StopEmision(){
		CancelInvoke ("StopEmision");
		iTween.ScaleTo(jackpotTxt, iTween.Hash("scale", Vector3.zero, "easetype", "easeInBack", "time", 1f, "delay", .5f));
		iTween.ScaleTo(ribbon, iTween.Hash("scale", Vector3.zero, "easetype", "easeInBack", "time", 1f));
		iTween.ValueTo(gameObject, iTween.Hash("from", new Vector2(0.007274f,0.007274f), "to", Vector2.zero, "onUpdate", "UpdateGUIScale", "easeType", "easeInBack", "time", 1f));

		coins.Stop ();
		Invoke ("EndJackpotAnim", 2f);
	}

	void EndJackpotAnim(){
		//disable the game object here
		gameObject.SetActive (false);
		slotTheme.JackpotFinish ();
	}
}
