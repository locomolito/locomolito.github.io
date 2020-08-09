using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using com.pacifica.slot.dataTypes;
using com.pacifica.slot.webService;

namespace com.pacifica.slot.core{
	public class SlotModel{
		//PRIVATE VARIABLES
		GameInfo 			gameInfo;														
		string 				gameID;
		int 				maxLine;
		int					maxLineBet;
		float[] 			coinList;
		
		PlayerInfo 			playerInfo;
		string 				userID;
		string 				userName;
		string 				sessionID;
		string 				agentID;
		string 				licenseeID;
		float 				balance;
			
		WebService			webService;					
		ConnSettings		connSettings;	
		GambleResults		gambleResults;

		float				payout;
		float				endBalance;
		float				betAmount;
		float				coinValue;
		float				bonusCredit;

		int					freeCount;
		int					freeMultiplier;
		int					activeLines;
		int					lineBet;

		bool				doneGamble;
		bool				doneBonus;
		bool				isSpinning;	
		bool				onAutoSpin;	

		LineWin				jackpotWinning;
		BonusWin			scatterWinning;

		List<List<string>>	reelSymbols;
		List<LineWin>		lineWins;
		List<BonusWin>		bonusWins;
		List<BonusPrize> 	bonusPrizes;

		string				spinType;
		string				betRefID;
		string				grandJackpot;
		string				majorJackpot;
		string				minorJackpot;
		string				miniJackpot;

		const string 		SUCCESS = "0";

		//PUBLIC PROPERTIES
		public GameInfo 			GameInfo		{ get {return gameInfo;}}					
		public PlayerInfo 			PlayerInfo		{ get {return playerInfo;}}
		public GambleResults		GambleResults	{ get {return gambleResults;}}	
		public int 					ActiveLines		{ get {return activeLines;}}
		public int					LineBet			{ get {return lineBet;}}
		public int					FreeCount		{ get {return freeCount;}}
		public int					FreeMultiplier	{ get {return freeMultiplier;}}
		public float				CoinValue		{ get {return coinValue;}}
		public float				BetAmount		{ get {return betAmount;}}
		public float[]				CoinList		{ get {return coinList;}}

		public float				Payout			{ get {return payout;}}
		public List<List<string>> 	ReelSymbols		{ get {return reelSymbols;}}
		public List<LineWin>		LineWins		{ get {return lineWins;}}
		public List<BonusWin>		BonusWins		{ get {return bonusWins;}}
		public List<BonusPrize>		BonusPrizes		{ get {return bonusPrizes;}}
		public LineWin				JackpotWinning	{ get {return jackpotWinning;}}
		public BonusWin				ScatterWinning	{ get {return scatterWinning;}}

		public string				GrandJackpot    { get {return grandJackpot;}}
		public string				MajorJackpot    { get {return majorJackpot;}}
		public string				MinorJackpot    { get {return minorJackpot;}}
		public string				MiniJackpot   	{ get {return miniJackpot;}}

		public bool					DoneGamble   	{ get {return doneGamble;}}
		public bool					DoneBonus   	{ get {return doneBonus;}}
		public bool					IsSpinning   	{ get {return isSpinning;}}
		public bool					OnAutoSpin   	{ get {return onAutoSpin;}}

		public SlotModel(GameInfo _gameInfo, PlayerInfo _playerInfo, WebService _webService){
			this.gameInfo = _gameInfo;
			this.gameID = _gameInfo.GameID;
			this.maxLine = _gameInfo.MaxLine;
			this.maxLineBet = _gameInfo.MaxLineBet;
			this.coinList = _gameInfo.CoinList;
			this.coinValue = _gameInfo.CoinList[0];
			this.spinType = "RS";

			this.playerInfo = _playerInfo;
			this.userID = _playerInfo.UserID;
			this.userName = _playerInfo.UserName;
			this.sessionID = _playerInfo.SessionID;
			this.agentID = _playerInfo.AgentID;
			this.licenseeID = _playerInfo.LicenseeID;
			this.balance = _playerInfo.Balance;

			this.webService = _webService;
			this.connSettings = ConnSettings.getInstance ();

			isSpinning = false;

			setToMax ();
			init ();
		}

		void init(){
			EventManager.onWebDataRetrieve += OnWebRetrieveHandler;
		}

		/*
		 * EVENT HANDLERS. TRIGGERED WHEN RECIEVING SERVER RESPONCE 
		 * */
		void OnWebRetrieveHandler(string type, string[] data){

			switch(type){
			case WebDataRetrieve.PLAYER_AUTHENTICATIOIN:
					SetConnInfo(data);
					SetPlayerInfo(data);
				break;
			case WebDataRetrieve.GAME_INFO:
					OnGameInfo(data);
				break;
			case WebDataRetrieve.SLOT_BET:
					OnSlotBet(data);
				break;
			case WebDataRetrieve.BONUS:
					OnBonus(data);
				break;
			case WebDataRetrieve.DOUBLE_UP:
					OnDoubleUp(data);
				break;
			case WebDataRetrieve.COLLECT_DOUBLE_UP:
					OnCollectDoubleUp(data);
				break;
			case WebDataRetrieve.COLLECT_BONUS:
					OnCollectBonusWin(data);
				break;
			}
		}

		void SetPlayerInfo(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);
			if (response.RespCode == SUCCESS) {
				if(response.UserID !=null)		{ userID = response.UserID;}
				if(response.AgentID !=null)		{ agentID = response.AgentID; }
				if(response.UserName !=null)	{ userName = response.UserName; }
				if(response.SessionID !=null)	{ sessionID = response.SessionID; }
				if(response.Balance !=null)		{ balance = float.Parse(response.Balance); }

				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.USER_INFO); //BROADCAST EVENT THAT USER INFO HAS CHANGED
			}

		}
		void SetConnInfo(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);
			if(response.RespCode == SUCCESS){
				if(response.SConn !=null)		{ connSettings.Host = response.SConn;}
				if(response.WConn !=null)		{ connSettings.Domain = response.WConn;}
				if(response.SPort !=null)		{ connSettings.Port = int.Parse(response.SPort);}
			}
		}

		void OnGameInfo(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);
			if(response.RespCode==SUCCESS){
				if(response.HasFreeSpin){
					if(response.FSCount != null)		{freeCount=int.Parse(response.FSCount);}
					if(response.FSMultiplier != null)	{freeMultiplier=int.Parse(response.FSMultiplier);}
					if(response.FSCoin != null)			{coinValue=float.Parse(response.FSCoin);}
					if(response.FSLineBet != null)		{lineBet=Mathf.RoundToInt(float.Parse(response.FSLineBet));}
					if(response.FSActiveLines != null)	{activeLines=int.Parse(response.FSActiveLines);}
					betAmount = activeLines * lineBet * coinValue;
					spinType = "FS";
				}else{
					betAmount=maxLine * maxLineBet * coinValue;
				}
				if(response.HasJackpot){
					grandJackpot = response.GrandJackpot;
					majorJackpot = response.MajorJackpot;
					minorJackpot = response.MinorJackpot;
					miniJackpot = response.MiniJackpot;
				}
				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.BET_INFO); //BROADCAST EVENT THAT BET INFO HAS CHANGED
			}
		}
		void OnSlotBet(string[] data){

			SlotXml response = SlotXMLReader.ReadXML (data [0]);
			if(response.NextPlayType !=null){
				spinType = response.NextPlayType;
			}
			if(response.RespCode==SUCCESS){

				if(response.ReelSymbols !=null){						//SYMBOLS TO DISPLAY IN REEL
					foreach(string symbolCode in response.ReelSymbols){
						reelSymbols.Add(symbolCode.Split('|').ToList());
					}
				}

				if(response.LineWins != null){							//WINNING SYMBOLS
					foreach(LineWin win in response.LineWins){
						if(lineWins==null){
							lineWins = new List<LineWin>();
						}

						if(win.SymbolCode == "M"){						//JACKPOT
							jackpotWinning = win;
						}else{
							lineWins.Add(win);
						}
					}
				}

				if(response.BonusWins != null){
					foreach(BonusWin bonus in response.BonusWins){
						if(bonus.Type == "SCATTER"){
							scatterWinning = bonus;
						}else{
							if(bonusWins == null){
								bonusWins = new List<BonusWin>();
							}
							bonusWins.Add(bonus);
						}

					}
				}

				if(response.HasFreeSpin){								//FREE SPIN
					freeCount = int.Parse(response.FSCount);
					freeMultiplier = int.Parse(response.FSMultiplier);
					//add fs operations here. not sure if still needed
				}else{
					freeCount=0;
					freeMultiplier=0;
				}

				payout = float.Parse(response.WonAmount);
				endBalance = float.Parse(response.AfterCredit);
				betRefID = response.BetRefID;

				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.SPIN_RESULT); //BROADCAST EVENT THAT SPIN RESULT HAS BEEN PARSED AND READY TO BE DISPLAYED
			}
		}
		void OnDoubleUp(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);
			gambleResults = new GambleResults ();

			if (response.RespCode == SUCCESS) {
				if(response.GambleResult == "1"){
					payout=float.Parse(response.GambleWonAmount);

					gambleResults.Result= int.Parse(response.GambleResult);
					gambleResults.Multiplier = int.Parse(response.GambleMultiplier);
					gambleResults.LastRound= int.Parse(response.GambleLastRound);
					gambleResults.WonAmount=float.Parse(response.GambleWonAmount);
				}else{
					payout = 0;
				}
				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.GAMBLE_RESULT); //BROADCAST EVENT THAT GAMBLE RESULT HAS BEEN PARSED AND READY TO BE DISPLAYED
			}
		}
		void OnCollectDoubleUp(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);

			if (response.RespCode == SUCCESS) {
				if(response.GambleResult != null){
					payout=float.Parse(response.GambleWonAmount);
				}
				doneGamble = true;
				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.GAMBLE_TOTAL_RESULT); //BROADCAST EVENT THAT GAMBLE ENDED AND RESULT HAS BEEN PARSED AND READY TO BE DISPLAYED
			}
		}
		void OnBonus(string[] data){

			SlotXml response = SlotXMLReader.ReadXML (data [0]);	
			if (response.RespCode == SUCCESS) {
				if(response.BonusPrizeList != null){
					foreach(BonusPrize prize in response.BonusPrizeList){
						bonusPrizes.Add(prize);
					}
				}
				
				EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.BONUS_PRIZES); //BROADCAST EVENT THAT ALL POSSIBLE PRIZES ARE AVAILABLE FOR DISPLAY
			}
		}

		void OnCollectBonusWin(string[] data){
			SlotXml response = SlotXMLReader.ReadXML (data [0]);	
			if (response.RespCode == SUCCESS) {
				foreach(BonusPrize prize in response.BonusGameWins){
					switch (prize.Type){
					case "FS":
						Debug.Log("FS IS: " + prize.Value);
						spinType = "FS";
						freeCount = int.Parse(prize.Value);
						break;
					case "FM":
						Debug.Log("FM IS: " + prize.Value);
						freeMultiplier = int.Parse(prize.Value);
						break;
					case "CB":
						Debug.Log("CB IS: " + prize.Value);
						bonusCredit = float.Parse(prize.Value);
						break;
					}
				}	
				doneBonus=true;
			}
			EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.BONUS_COLLECTED); //BROADCAST EVENT THAT ALL POSSIBLE PRIZES ARE AVAILABLE FOR DISPLAY
		}
		/*
		 * PUBLIC FUNCTIONS. TO BE CALLED BY THE CONTROLLER
		 * */
		public void GetGameInfo(){
			webService.SendRequest (new string[]{"MessageType", "PlayerID", "SessionID", "GameID", "AgentID"},
			new string[]{"GameInfo", userID, sessionID, gameID, agentID});
		}
		public void Spin(){
			betRefID = null;
			scatterWinning = null;
			jackpotWinning = null;
			lineWins = null;
			bonusWins = null;
			reelSymbols =  new List<List<string>>();

			doneBonus = false;
			doneGamble = false;
			isSpinning = true;
			if (freeCount > 0)
				--freeCount;

			webService.SendRequest(new string[]{"MessageType", "PlayerID", "AgentID", "SessionID", "GameID", "PlayType", "CoinValue", "LineBet", "TotalLines", "BetAmount"},
			new string[] {"SlotBet", userID, agentID, sessionID, gameID, spinType, coinValue.ToString(), lineBet.ToString(), activeLines.ToString(), betAmount.ToString()});
		}

		public void EndSpin(){
			isSpinning = false;

			if (betRefID != null) {
				webService.SendRequest(new string[]{"MessageType", "PlayerID", "AgentID", "SessionID", "GameID", "BetRefID"}, 
				new string[]{"EOS", userID, agentID, sessionID, gameID, betRefID});
			}
		}

		public void GetBonus(){
			bonusPrizes = new List<BonusPrize>();

			webService.SendRequest (new string[] {"MessageType", "PlayerID", "AgentID", "SessionID", "GameID", "RoundID"}, 
			new string[]{"GetBonusBoxes", userID, agentID, sessionID, gameID, betRefID});
		}

		public void EndBonus(string[] pickedList){
			string allPicked = "";
			for(int i=0;i<pickedList.Length; i++){
				allPicked += pickedList[i] + "|";
			}

			webService.SendRequest (new string[]{"MessageType", "PlayerID", "SessionID", "GameID", "PickedPrizes", "BetRefID"},
			new string[]{"CollectWinning", userID,  sessionID, gameID, allPicked,betRefID });
		}

		public void GetGambleResult(string gambleType){
			webService.SendRequest (new string[]{"MessageType", "PlayerID", "SessionID", "GameID", "BetRefID", "Type"},
			new string[] {"DoubleUp", userID,  sessionID, gameID, betRefID, gambleType});
		}

		public void CollectGamble(){
			webService.SendRequest (new string[]{"MessageType", "PlayerID", "SessionID", "GameID", "BetRefID"},
			new string[]{"CollectDoubleUp", userID,  sessionID, gameID, betRefID});
		}

		public void setToMax(){
			activeLines = maxLine;
			lineBet = maxLineBet;
			betAmount = activeLines * lineBet * coinValue;
			EventManager.instance.OnPlaySettingsUpdate(PlaySettingsUpdate.BET_INFO); //BROADCAST EVENT THAT BET INFO HAS CHANGED. SHOULD UPDATE DISPLAY
		}
		public void SetBetSettings(int _activeLines, int _lineBet, float _coinValue){
			this.activeLines = _activeLines;
			this.lineBet = _lineBet;
			this.coinValue = _coinValue;
			this.betAmount = activeLines * lineBet * coinValue;

			EventManager.instance.OnPlaySettingsUpdate (PlaySettingsUpdate.BET_INFO);
		}

		public void CancelGamble(){
			doneGamble = true;
		}
		public void AutoSpin(bool val){
			onAutoSpin = val;
		}
	}
}
