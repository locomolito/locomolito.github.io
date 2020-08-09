using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using com.pacifica.slot.objects;
using com.pacifica.slot.utils;

public class OISlotTheme : SlotTheme {
	//SlotModel slotModel;

	public MainCharacter	character;
	public OIBonusGame		bonusGame;
	public JackpotAnimation	jackpotAnimation;
	public FreeSpinMode		freeSpinMode;

	public HoriPeek horiPeek;
	public HoriWin horiWin;
	int currentOrder = 0;
	int lineWinCounter=0;

	bool doneJackpot;
	bool doneBonus;


	void Start(){
		soundManager.PlayBGM ("MAIN");
		animationOrder = new List<string>{"M","LINE","S","X"};
	}

	/*
	 * PUBLIC FUNCTIONS CALLED BY MAIN
	 * */
	override public void UpdateBetInfo(){
		base.UpdateBetInfo ();

		if(onFreeSpin){
			StartFreeSpin();
		}
	}

	override public void UpdateResultSymbols(){
		if(onFreeSpin){
			freeSpinMode.UpdateInfo(slotView.FreeCount);
		}

		base.UpdateResultSymbols ();
	}

	override public void StartSpin(){
		currentOrder = 0;
		lineWinCounter = 0;
		doneJackpot = false;
		character.ChangeAnimation ();

		betInfo.SetMessage ("Good Luck!");

		if(onFreeSpin){
			horiPeek.StartAnimation();
		}
		base.StartSpin ();
	}
	override public void EndSpin(){
		base.EndSpin();

		if(slotView.BonusWins!=null || onFreeSpin){
			slotControls.DisableAllButtons ();
			lineNumbers.DisableAllButtons();

		}
		if (slotView.LineWins == null && slotView.BonusWins  == null && slotView.ScatterWinning==null) {
			//Debug.Log("NO WINNING");
			if(slotView.OnAutoSpin || slotView.FreeCount>0){
				Invoke("StartAutoSpin", autoSpinInterval);
			}else{
				if(onFreeSpin){
					freeSpinMode.ShowSummary(fsTotalPayout, winBeforeBonus);
				}
				betInfo.SetMessage ("Press Spin to start!");
			}
			return;
		}

		if(onFreeSpin){
			fsTotalPayout += slotView.Payout;
		}

		if(!slotView.OnAutoSpin && slotView.BonusWins.Count==null && !onFreeSpin){
			lineNumbers.UpdateActiveLines (slotView.ActiveLines);
		}

		AnimateWinningOrder ();
	}

	override public void StartGamble(){
		base.StartGamble ();
		soundManager.PlayBGM ("GAMBLE");
	}

	override public void EndGamble(){
		soundManager.PlayBGM ("MAIN");
	}

	public void ClosePaytable(){
		slotControls.UpdateStateByValues ();
	}

	/*
	 * WINNING ANIMATIONS
	 * */
	void AnimateWinningOrder(){
		CancelInvoke ();

		if(currentOrder>=animationOrder.Count){
			if(slotView.OnAutoSpin || slotView.FreeCount>0){
				Invoke("StartAutoSpin", autoSpinInterval);
				return;
			}else{
				currentOrder= 0;
				lineWinCounter=0;
				if(onFreeSpin){
					freeSpinMode.ShowSummary(fsTotalPayout, winBeforeBonus);
					return;
				}
			}
		}

		if(animationOrder[currentOrder] == "M" && slotView.JackpotWinning!=null){
			currentOrder++;
			AnimateJackpot();
			return;
		}else if(animationOrder[currentOrder] == "S" && slotView.ScatterWinning!=null){
			currentOrder++;
			AnimateScatterWin();
			return;
		}else if(animationOrder[currentOrder] == "X" && slotView.BonusWins != null){
			currentOrder++;
			AnimateBonus();
			return;
		}else if(animationOrder[currentOrder] == "LINE" && slotView.LineWins!=null){
			currentOrder++;
			AnimateLine();
		}else{
			currentOrder++;
			AnimateWinningOrder();
		}
	}
	void AnimateJackpot(){

		slotReel.AnimateSymbols (slotView.JackpotWinning.SymbolCount);
		paylines.ShowLine (int.Parse (slotView.JackpotWinning.LineNumber) - 1);
		betInfo.SetMessage("JACKPOT WON " + SlotString.InsertComma(slotView.JackpotWinning.WonAmount).ToString());
		if(!doneJackpot){
			slotControls.DisableAllButtons();
			doneJackpot = true;
			//do jackpotAnimation here
			jackpotAnimation.gameObject.SetActive (true);
			jackpotAnimation.PlayAnimation(slotView.JackpotWinning.WonAmount);
			horiWin.ChangeAnimation (1);
		}else{
			Invoke("AnimateWinningOrder", 2f);
		}
	}

	void AnimateLine(){
		CancelInvoke ("AnimateLine");

		paylines.ShowLine (int.Parse (slotView.LineWins[lineWinCounter].LineNumber) - 1);
		slotReel.AnimateSymbols (slotView.LineWins[lineWinCounter].SymbolCount);
		betInfo.SetMessage(slotView.LineWins[lineWinCounter].WonAmount, slotView.LineWins[lineWinCounter].LineNumber, slotReel.currentWinningSymbol);

		if(lineWinCounter < slotView.LineWins.Count -1 ){
			lineWinCounter++;
			Invoke("AnimateLine", 2f);
		}else{
			Invoke("AnimateWinningOrder", 2f);
		}

	}

	void AnimateBonus(){
		Invoke ("GetPrizes", 2f); //will change to call after symbol finish playing
		paylines.HideAllLines ();
		slotReel.AnimateScatter (slotView.BonusWins[0].Position);

	}
	override public void StartBonus(){
		CancelInvoke ();
		if(onFreeSpin){
			Invoke("StartAutoSpin", autoSpinInterval);
		}else{
			winBeforeBonus = slotView.Payout;
			bonusGame.AnimateIn (slotView.BonusPrizes, 2);
		}
	}
	override public void EndBonus(){
		bonusGame.AnimateOut ();
	}

	public void BonusClosed(){
		StartFreeSpin ();
	}
	void StartFreeSpin(){
		fsTotalPayout = 0;
		freeSpinMode.AnimateIn (slotView.FreeCount, slotView.FreeMultiplier);
		onFreeSpin = true;
		Invoke("AnimateWinningOrder", 2f);
	}
	void AnimateScatterWin(){
		paylines.HideAllLines ();
		slotReel.AnimateScatter (slotView.ScatterWinning.Position);
		Invoke("AnimateWinningOrder", 2f);

	}

	public void EndFreeSpin(){
		onFreeSpin = false;
		winBeforeBonus = 0;
		fsTotalPayout = 0;
		if (slotView.OnAutoSpin) {
			Invoke("StartAutoSpin", autoSpinInterval);
		}else{
			slotControls.UpdateStateByValues();
			Invoke("AnimateWinningOrder", 2f);
			lineNumbers.UpdateActiveLines(slotView.ActiveLines);
		}
	}
	public void JackpotFinish(){
		AnimateWinningOrder();
		slotControls.UpdateStateByValues ();
		horiWin.ChangeAnimation (2);
	}
	public void NextWinAnimation(){
		//AnimateWinningOrder ();
	}

	void AutoSpinInvoker(){
		
	}

}
