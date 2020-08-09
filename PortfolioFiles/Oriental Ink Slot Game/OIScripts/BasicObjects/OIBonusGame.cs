using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using com.pacifica.slot.core;
using com.pacifica.slot.dataTypes;
using com.pacifica.slot.utils;

public class OIBonusGame : MonoBehaviour {
	public List<BonusButton> designs;
	public List<BonusButton> machines;

	public List<Text> designTexts;
	public List<Text> machineTexts;

	public BonusSummary summary;
	public GameObject round1Text;
	public GameObject round2Text;

	public Text resultInfo;
	
	public OISlotTheme slotTheme;
	

	List<BonusPrize> freeSpinPrizes;
	List<BonusPrize> multiplierPrizes;

	BonusPrize fsPicked; 
	BonusPrize fmPicked;  

	int selected;
	int pickCount;

	float roundDelay = 4f;

	// Use this for initialization
	void Awake(){
		gameObject.SetActive (false);
		foreach(BonusButton btn in designs){
			btn.Enable();
		}

	}
	void Start () {
	
	}
	void SetUpDisplay(){
		foreach(BonusButton obj in designs){
			obj.ResetPos();
		}
		foreach(BonusButton obj in machines){
			obj.gameObject.SetActive(false);
			obj.ResetPos();
		}
		foreach(Text txt in designTexts){
			txt.enabled=false;
		}
		foreach(Text txt in machineTexts){
			txt.enabled=false;
		}

		resultInfo.text = "";
		round1Text.SetActive (false);
		round2Text.SetActive (false);
		//summary.gameObject.SetActive (false);

		for(int i=0; i<6; i++){
			designTexts[i].text = freeSpinPrizes[i].Value;
			machineTexts[i].text = multiplierPrizes[i].Value;
		}

	}


	public void AnimateIn(List<BonusPrize> prizes, int canPick){
		freeSpinPrizes = new List<BonusPrize>();
		multiplierPrizes = new List<BonusPrize>();
		ParsePrizes (prizes);
		pickCount = canPick;

		gameObject.SetActive (true);
		SetUpDisplay ();

		iTween.MoveTo (gameObject, iTween.Hash ("position", Vector3.zero, "time", 1.5f, "oncomplete", "AnimInComplete"));
	}
	public void AnimateOut(){
		iTween.MoveTo (gameObject, iTween.Hash ("position",new Vector3(0f, 7.1f, 0), "time", 1.5f, "oncomplete", "AnimOutComplete"));
	}

	void AnimInComplete(){
		foreach(BonusButton btn in designs){
			btn.Enable();
		}
		//Debug.Log ("complete");
	}
	void AnimOutComplete(){
		slotTheme.BonusClosed ();
		gameObject.SetActive (false);
		summary.Hide ();
	}

	public void CollectWinning(){
		EventManager.instance.OnUserInput(UserInput.BONUS_COLLECT, new string[] {fsPicked.Index, fmPicked.Index});
	}

	public void Select(string buttonPressed){
		if(pickCount==2){
			for(int i=0; i<designs.Count; i++){
				if(designs[i].gameObject.name == buttonPressed){
					selected=i;
				}
			}
			designs[selected].Animate("designNumber", selected+1);
			fsPicked = freeSpinPrizes[selected];
		}else if(pickCount==1){
			for(int i=0; i<machines.Count; i++){
				if(machines[i].name == buttonPressed){
					selected=i;
				}
			}
			machines[selected].Animate("machineNumber", selected+1);
			fmPicked=multiplierPrizes[selected];
		}


		AnimateResult ();

	}
	void AnimateResult(){
		if(pickCount==2){
			foreach(BonusButton btn in designs){
				btn.Disable();
			}
			designs[selected].gameObject.GetComponent<Renderer>().sortingOrder = 10;
			iTween.MoveTo (designs[selected].gameObject , iTween.Hash ("position",new Vector3(3.44f, 1.71f, 0), "time", 1f));
			//Debug.Log("showresss");
		}else if(pickCount==1){
			foreach(BonusButton btn in machines){
				btn.Disable();
			}
			machines[selected].gameObject.GetComponent<Renderer>().sortingOrder = 10;
			iTween.MoveTo (machines[selected].gameObject , iTween.Hash ("position",new Vector3(3.44f, 1.71f, 0), "time", 1f));
		}
		Invoke ("ShowResult", 1f);

	}
	void ShowResult(){
		CancelInvoke ();
		resultInfo.enabled = true;
		//Debug.Log ("count" + pickCount);
		if(pickCount==2){
			resultInfo.text = "YOU WON " + fsPicked.Value + " FREE SPINS!";
		}else if(pickCount==1){
			resultInfo.text = "YOU WON X" + fmPicked.Value + " MULTIPLIER!";
		}

		StartCoroutine(ShowOtherText());
		Invoke ("ExitRound", roundDelay);
	}

	void ExitRound(){
		CancelInvoke ();
		resultInfo.text = "";
		//Debug.Log("pick " + pickCount);
		if(pickCount==2){
			FlyOut(designs[selected].gameObject, new Vector3(7.09f, 1.68f,0), 0);
			for(int i=0; i<designs.Count; i++){
				designTexts[i].enabled=false;
				FlyOut(designs[i].gameObject, new Vector3(7.09f, 1.68f,0), i*0.3f + 0.3f);
			}

			Invoke("ShowRound2", 2f);
		}else if(pickCount==1){
			FlyOut(machines[selected].gameObject, new Vector3(7.09f, 1.68f,0), 0);
			for(int i=0; i<machines.Count; i++){
				machineTexts[i].enabled=false;
				FlyOut(machines[i].gameObject, new Vector3(7.09f, 1.68f,0), i*0.3f + 0.3f);

			}
			Invoke("ShowSummay", 2f);
		}

		pickCount--;
	}
	void ShowRound2(){
		CancelInvoke ();
		Color tempcolor;
		tempcolor = machines[0].gameObject.GetComponent<Renderer>().material.color;
		tempcolor.a = 0;

		for(int i=0;i<machines.Count; i++){
			machines[i].gameObject.GetComponent<Renderer>().material.color = tempcolor;
			machines[i].gameObject.SetActive(true);
			machines[i].Enable();
			AlphaIn(machines[i].gameObject, i * 0.3f);
		}
	}

	void ShowSummay(){
		CancelInvoke ();
		summary.AnimateIn (fsPicked.Value, fmPicked.Value);
	}

	void ParsePrizes(List<BonusPrize> prizes){
		foreach(BonusPrize bonus in prizes){
			if(bonus.Type=="FS"){
				freeSpinPrizes.Add(bonus);
			}else if(bonus.Type=="FM"){
				multiplierPrizes.Add(bonus);
			}
		}

		//add 1 more on each list since i have 6 selections and only have 5 each
		int rnd = Random.Range (0,4);
		freeSpinPrizes.Add(freeSpinPrizes[rnd]);
		multiplierPrizes.Add(multiplierPrizes[rnd]);

	}

	IEnumerator ShowOtherText(){
		int i=0;
		while(i<6){
			if(i==selected) {
				i++;
				continue;
			}
			if(pickCount==2){
				designTexts[i].enabled=true;
			}else{
				machineTexts[i].enabled=true;
			}
			yield return new WaitForSeconds(0.4f);
			i++;
		}
	}

	void FlyOut(GameObject obj, Vector3 flyTo, float secDelay){
		obj.GetComponent<Renderer>().sortingOrder = 10;
		iTween.MoveTo (obj , iTween.Hash ("position", flyTo, "time", 1f, "delay", secDelay));
	}

	void AlphaIn(GameObject obj, float secDelay){
		iTween.FadeTo (obj, iTween.Hash("alpha", 1, "time", 0.3f, "delay", secDelay)); 
	}

}
