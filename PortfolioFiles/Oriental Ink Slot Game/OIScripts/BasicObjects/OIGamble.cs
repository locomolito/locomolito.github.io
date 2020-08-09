using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using com.pacifica.slot.objects;
using com.pacifica.slot.dataTypes;
using com.pacifica.slot.utils;

public class OIGamble : Gamble {
	public BetControls controls;
	public Text txtBankMoney;
	public Text txtDoubleTo;
	public Text summaryWon;
	public Text summaryLabelWon;

	public GambleButtons koi;
	public GambleButtons om;
	public GambleButtons collect;
	public GambleButtons btnContinue;

	public GameObject summaryBG;
	string selected;
	
	void Start () {
		type = FULL;
	}
	//MAIN GAMEPLAY
	public void SendGamble(string _selected){
		selected = _selected;
		DisableButtons ();
		getGambleResult ();
	}
	
	public override void ShowResult(GambleResults gambleResults){
		base.ShowResult (gambleResults);
		
		gambleAmount = results.WonAmount * 2;
		bankMoney = results.WonAmount;

		StartCoroutine ("AnimateResult");		
	}

	//ANIMATIONS
	public void animIn(float payout){
		baseMoney = payout;
		bankMoney = payout;
		gambleAmount = bankMoney * 2;

		txtBankMoney.text = bankMoney.ToString ();
		txtDoubleTo.text = gambleAmount.ToString ();

		summaryBG.transform.localScale = Vector2.zero;
		btnContinue.transform.localScale = Vector2.zero;
		summaryWon.transform.localScale = Vector2.zero;
		summaryLabelWon.transform.localScale = Vector2.zero;

		gameObject.SetActive (true);

		StartCoroutine ("MoveDown");

	}

	public void AnimOut(){
		Collect ();
		StartCoroutine ("MoveUp");
	}

	IEnumerator AnimateResult(){
		yield return new WaitForSeconds (2f);
		txtBankMoney.text = bankMoney.ToString ();
		txtDoubleTo.text = gambleAmount.ToString ();

		if(won){
			EnableButtons ();
		}else{
			yield return new WaitForSeconds (2f);
			AnimOut();
		}
	}

	public void ShowSummary(){
		DisableButtons ();
		summaryWon.text = bankMoney.ToString ();
		if(baseMoney == bankMoney){
			AnimOut();
		}else{
			iTween.ScaleTo(summaryBG, iTween.Hash("scale", new Vector3(1f,1f,1f), "easetype", "easeOutElastic", "time", 1f));
			iTween.ScaleTo(btnContinue.gameObject, iTween.Hash("scale", new Vector3(1f,1f,1f), "easetype", "easeOutElastic", "time", 1f));
			iTween.ValueTo(gameObject, iTween.Hash("from", Vector2.zero, "to", new Vector2(0.007274f,0.007274f), "onUpdate", "UpdateGUIScale", "easeType", "easeOutElastic", "time", 1f));
		}
	}

	void UpdateGUIScale(Vector2 GUIScale){
		summaryWon.transform.localScale = GUIScale;
		summaryLabelWon.transform.localScale = GUIScale;
	}

	IEnumerator MoveDown(){
		while(Vector2.Distance(transform.position, Vector2.zero) > 0.001f){
			transform.position = Vector2.Lerp(transform.position, Vector2.zero, Time.deltaTime + 0.1f);
			yield return null;
		}
		EnableButtons ();
		StopCoroutine ("MoveDown");

	}
	IEnumerator MoveUp(){
		StopCoroutine ("MoveDown");
		while(Vector2.Distance(transform.position, new Vector2(0, 8f)) > 0.001f){
			transform.position = Vector2.Lerp(transform.position, new Vector2(0, 8f), Time.deltaTime + 0.15f);
			yield return null;
		}
		controls.UpdateStateByValues ();
		gameObject.SetActive (false);
	}

	void DisableButtons(){
		koi.Disable ();
		om.Disable ();
		collect.Disable ();
	}

	void EnableButtons(){
		CancelInvoke ();
		koi.Enable ();
		om.Enable ();
		collect.Enable ();
	}



}
