using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using com.pacifica.slot.utils;

public class BonusSummary : MonoBehaviour {
	public OIBonusGame bonusGame;
	public Text youWon;
	public Text FSText;
	public Text FMText;
	
	public BonusButton btnContinue;
	public GameObject bg;

	Color tempcolor;
	// Use this for initialization
	void Start () {
		Hide ();
	}

	public void AnimateIn(string fsWon, string fmWon){
		SetUp ();
		FSText.text = fsWon + " FREE SPINS!";
		FMText.text = "X" + fmWon + " MULTIPLIER!";

		gameObject.SetActive (true);
		//iTween.FadeTo (bg, 1f, 1f); 
		//iTween.FadeTo (btnContinue.gameObject, 1f, 1f); 
		iTween.FadeTo(btnContinue.gameObject, 1f, 1.5f);
		iTween.FadeTo(bg, 1f, 1.5f);
		iTween.ValueTo(gameObject, iTween.Hash("from", 0, "to", 1f, "onUpdate", "UpdateTextAlpha", "time", 1.5f));
	}

	void UpdateTextAlpha(float alpha){
		tempcolor.a = alpha;
		gameObject.GetComponent<Renderer>().material.color = tempcolor;
		youWon.material.color = tempcolor;
		FSText.material.color = tempcolor;
		FMText.material.color = tempcolor;
	}

	void SetUp(){
		tempcolor = gameObject.GetComponent<Renderer>().material.color;
		tempcolor.a = 0;
		btnContinue.gameObject.GetComponent<Renderer>().material.color = tempcolor;
		bg.GetComponent<Renderer>().material.color = tempcolor;
		youWon.material.color = tempcolor;
		FSText.material.color = tempcolor;
		FMText.material.color = tempcolor;
		youWon.enabled = true;
		FSText.enabled = true;
		FMText.enabled = true;
	}

	public void Hide(){
		gameObject.SetActive (false);
		youWon.enabled = false;
		FSText.enabled = false;
		FMText.enabled = false;
	}
}
