using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using com.pacifica.slot.webService;
using com.pacifica.slot.objects;
using com.pacifica.slot.dataTypes;

namespace com.pacifica.slot.core{
	public class SlotView{
		public SocketService 	socketService;

		SlotModel slotModel;
		SlotTheme slotTheme;

		//PUBLIC PROPERTIES
		public GameInfo 			GameInfo		{ get {return slotModel.GameInfo;}}					
		public PlayerInfo 			PlayerInfo		{ get {return slotModel.PlayerInfo;}}
		public GambleResults		GambleResults	{ get {return slotModel.GambleResults;}}	
		public int 					ActiveLines		{ get {return slotModel.ActiveLines;}}
		public int					LineBet			{ get {return slotModel.LineBet;}}
		public int					FreeCount		{ get {return slotModel.FreeCount;}}
		public int					FreeMultiplier	{ get {return slotModel.FreeMultiplier;}}
		public float				CoinValue		{ get {return slotModel.CoinValue;}}
		public float				BetAmount		{ get {return slotModel.BetAmount;}}
		public float[]				CoinList		{ get {return slotModel.CoinList;}}
		
		public float				Payout			{ get {return slotModel.Payout;}}
		public List<List<string>> 	ReelSymbols		{ get {return slotModel.ReelSymbols;}}
		public List<LineWin>		LineWins		{ get {return slotModel.LineWins;}}
		public List<BonusWin>		BonusWins		{ get {return slotModel.BonusWins;}}
		public List<BonusPrize>		BonusPrizes		{ get {return slotModel.BonusPrizes;}}
		public LineWin				JackpotWinning	{ get {return slotModel.JackpotWinning;}}
		public BonusWin				ScatterWinning	{ get {return slotModel.ScatterWinning;}}
		
		public string				GrandJackpot    { get {return slotModel.GrandJackpot;}}
		public string				MajorJackpot    { get {return slotModel.MajorJackpot;}}
		public string				MinorJackpot    { get {return slotModel.MinorJackpot;}}
		public string				MiniJackpot   	{ get {return slotModel.MiniJackpot;}}
		
		public bool					DoneGamble   	{ get {return slotModel.DoneGamble;}}
		public bool					DoneBonus   	{ get {return slotModel.DoneBonus;}}
		public bool					IsSpinning   	{ get {return slotModel.IsSpinning;}}
		public bool					OnAutoSpin   	{ get {return slotModel.OnAutoSpin;}}

		public SlotView(SlotModel model, SlotTheme theme){
			slotModel = model;
			slotTheme = theme;
			slotTheme.SetView (this);

			EventManager.onPlaySettingsUpdate += UpdateViewSettings;
			EventManager.onUserInput += UserInputHandler;
		}

		void UpdateViewSettings(string eventType, string[] data){
			switch(eventType){
			case PlaySettingsUpdate.BET_INFO:
				slotTheme.UpdateBetInfo();
				slotTheme.UpdateJackpot();
				slotTheme.UpdateButtonStatus();
				break;
			case PlaySettingsUpdate.SPIN_RESULT:
				slotTheme.UpdateResultSymbols();
				break;
				
			case PlaySettingsUpdate.USER_INFO:
				slotModel.GetGameInfo (); //NO SOCKET
				SetUpSocket ();
				break;
			case PlaySettingsUpdate.GAMBLE_RESULT:
				slotTheme.ShowGambleResult();
				break;
			case PlaySettingsUpdate.GAMBLE_TOTAL_RESULT:
				slotTheme.ShowGambleSummary();
				break;
			case PlaySettingsUpdate.BONUS_PRIZES:
				slotTheme.StartBonus();
				break;
			case PlaySettingsUpdate.BONUS_COLLECTED:
				slotTheme.EndBonus();
				break;
			}
			
		}
		void UserInputHandler(string eventType, string[] data){
			switch(eventType){
			case UserInput.START_SPIN:
				slotTheme.StartSpin();
				break;
			case UserInput.END_SPIN:
				slotTheme.UpdateWonAmount();
				slotTheme.EndSpin();
				break;
			case UserInput.LINE_CHANGE:
				slotTheme.LineChange();
				break;
			case UserInput.BET_CHANGE:
				//slotTheme.LineChange();
				break;
			case UserInput.COIN_CHANGE:
				//slotTheme.LineChange();
				break;
			case UserInput.BET_MAX:
				//slotTheme.LineChange();
				break;
			case UserInput.GAMBLE_START:
				slotTheme.StartGamble();
				break;
			case UserInput.GAMBLE_END:
				slotTheme.EndGamble();
				break;
			case UserInput.AUTO_SPIN:
				slotTheme.StartAutoSpin();
				break;	
			case UserInput.STOP_AUTO_SPIN:
				slotTheme.StopAutoSpin();
				break;
			case UserInput.OPEN_PAYTABLE:
				slotTheme.OpenPaytable();
				break;	
			}
			//slotTheme.UpdateButtonStatus();
		}
		
		void SetUpSocket(){
			socketService = new SocketService ();
			socketService.setupSocket ();
		}
	}
}
