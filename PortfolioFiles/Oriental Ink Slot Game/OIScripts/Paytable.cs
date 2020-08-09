using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using com.pacifica.slot.core;

public class Paytable : MonoBehaviour {
	public List<GameObject> pages;

	public PaytableButton next;
	public PaytableButton prev;

	public OISlotTheme slotTheme;

	public List<WinBox> winboxes1;
	public List<WinBox> winboxes2;

	List<string> allWinnings;
	//string[] allWinnings2;

	int currentPage = 0;

	// Use this for initialization
	void Start () {
		//AnimIn ();
		gameObject.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	public void AnimIn(SlotView view){
		allWinnings = ParseWinnings (view);
		if(allWinnings.Count>0){
			AnimateWinBox1();
			//Debug.Log (allWinnings[0]);
		}

		currentPage = 0;
		gameObject.SetActive (true);
		UpdatePage ();
	}

	public void NextPage(){
		if(currentPage < pages.Count-1){
			currentPage++;
			UpdatePage();
		}

	}

	public void PrevPage(){
		if(currentPage > 0){
			currentPage--;
			UpdatePage();
		}

	}

	public void AnimOut(){
		gameObject.SetActive (false);
		RemoveAnimations ();
		slotTheme.ClosePaytable ();
	}

	void UpdatePage(){
		for(int i=0; i<pages.Count; i++){
			if (i!=currentPage) {
				pages[i].SetActive(false);
			}else{
				pages[i].SetActive(true);
			}
		}

		if(currentPage==pages.Count-1){
			next.Disable();
			prev.Enable();
		}else if(currentPage==0){
			next.Enable();
			prev.Disable();
		}else{
			next.Enable();
			prev.Enable();
		}

	}


	//WIN ANIMATIONS
	List<string> ParseWinnings(SlotView view){
		List<string> str= new List<string>();
		string temp;
		if(view.LineWins!=null){
			for(int i=0; i< view.LineWins.Count;i++){
				temp = view.LineWins[i].SymbolCode +  view.LineWins[i].SymbolCount.Split('|').Length;
				str.Add(temp);
			}
		}

		if(view.JackpotWinning!=null){
			temp = "M" + view.JackpotWinning.SymbolCount.Split('|').Length;
			str.Add(temp);
		}

		if(view.ScatterWinning!=null){
			temp = "SCATTER" + view.ScatterWinning.Position.Split('|').Length;
			str.Add(temp);
		}

		if(view.BonusWins!=null){
			temp = "X";
			str.Add(temp);
		}
		
		return str;
	}

	void AnimateWinBox1(){

		for(int i=0; i<allWinnings.Count;i++){

			foreach(WinBox box in winboxes1){
				if(box.name == allWinnings[i]){
					box.Animate();
					continue;
				}else{
					foreach(WinBox box2 in winboxes2){
						if(box2.name == allWinnings[i]){
							box2.Animate();
							continue;
						}
					}
				}
			}
		}
	}

	void RemoveAnimations(){
		foreach (WinBox box in winboxes1) {
			box.HideBox();
		}
		foreach (WinBox box2 in winboxes2) {
			box2.HideBox();
		}
	}

}
