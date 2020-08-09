using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using com.pacifica.slot.utils;

public class FreeSpinMode : MonoBehaviour {
	public GameObject mainBanner;
	public GameObject fsBanner;
	public GameObject summaryBG1; //BACKGROUND WHEN THERE IS WINNING BEFORE BONUS GAME
	public GameObject summaryBG2; //BACKGROUND WHEN THERE IS NO WINNING BEFORE BONUS GAME

	public FSButton	btnContinue;

	public Text freeSpins;
	public Text multiplier;

	public Text gameWin;
	public Text featureWin;
	public Text totalWin;
	public Text featureWin2;	//USE WHERE THERE IS NO WINNING BEFORE BONUS GAME

	public HoriWin horiWin;

	public OISlotTheme slotTheme;
	// Use this for initialization
	void Start () {
		gameObject.SetActive (false);
		//Invoke ("AnimateIn", 2f);
	}

	public void AnimateIn(int fsCount, int fsMultiplier){
		CancelInvoke ();
		gameObject.SetActive (true);
		summaryBG1.SetActive (false);
		summaryBG2.SetActive (false);
		btnContinue.gameObject.SetActive (false);
		freeSpins.enabled = true;
		multiplier.enabled = true;
		freeSpins.text = fsCount.ToString();
		multiplier.text = "X" + fsMultiplier;

//		gameWin.enabled = false;
//		featureWin.enabled = false;
//		totalWin.enabled = false;
//		featureWin2.enabled = false;

		iTween.MoveTo(mainBanner, iTween.Hash("position", new Vector3(-0.74f, 4.38f, 0), "time", 2f));
		iTween.ScaleTo (mainBanner, iTween.Hash ("scale", new Vector3(1.6f, 1.6f, 1.6f), "time", 2f));
		iTween.MoveTo(fsBanner, iTween.Hash("position", new Vector3(-0.684f, 2.773f, 0), "time", 2f, "delay", 0.3f));
		iTween.ScaleTo (fsBanner, iTween.Hash ("scale", new Vector3(1f, 1f, 1f), "time", 2f, "delay", 0.3f));

		//Invoke ("AnimateOut", 4f);
	}
	public void AnimateOut(){
		iTween.MoveTo(mainBanner, iTween.Hash("position", new Vector3(-0.74f, 2.82f, 0), "time", 2f, "delay", 0.3f, "oncomplete", "animOutComplete", "oncompletetarget", gameObject));
		iTween.ScaleTo (mainBanner, iTween.Hash ("scale", new Vector3(1f, 1f, 1f), "time", 2f, "delay", 0.3f));
		iTween.MoveTo(fsBanner, iTween.Hash("position", new Vector3(-0.74f, 4.81f, 0), "time", 2f));
		iTween.ScaleTo (fsBanner, iTween.Hash ("scale", new Vector3(1.6f, 1.6f, 1.6f), "time", 2f));
	}
	public void ShowSummary(float _featureWin, float _gameWin=0 ){
		horiWin.ChangeAnimation (1);
		btnContinue.gameObject.SetActive (true);
		if(_gameWin>0){
			summaryBG1.SetActive (true);
			gameWin.text = SlotString.InsertComma(_gameWin.ToString());
			featureWin.text = SlotString.InsertComma(_featureWin.ToString());
			totalWin.text = SlotString.InsertComma(_featureWin + _gameWin);
		}else{
			featureWin2.text = _featureWin.ToString();
			summaryBG2.SetActive (true);
		}

	}
	
	public void UpdateInfo(int fsCount){
		freeSpins.text = fsCount.ToString();
	}

	public void SummaryClosed(){
		horiWin.ChangeAnimation (2);
		AnimateOut ();
		summaryBG1.SetActive (false);
		summaryBG2.SetActive (false);
		btnContinue.gameObject.SetActive (false);
	}

	void animOutComplete(){
		slotTheme.EndFreeSpin ();
		gameObject.SetActive (false);
	}
}
