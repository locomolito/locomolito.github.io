using UnityEngine;
using System.Collections;
//! Main game logic classes. MVC model.
namespace com.pacifica.slot.core{
	public class EventManager : MonoBehaviour{
		public static EventManager instance;	//FOR EASY REFERENCE NO NEED TO CREATE A NEW INSTANCE
		
		public delegate void GameEvents(string eventType, string[] data);
		public static event GameEvents onWebDataRetrieve;		//RAISED BY WEBSERVICE AFTER RECIEVING RESPONSE FROM SERVER. BEFORE XML PARSING
		public static event GameEvents onGameClientEvent;		//RAISED BY CLIEN UPON RESIZE/CLOSE/MUTE/SETSOUND
		public static event GameEvents onPlaySettingsUpdate;	//RAISED BY SLOTMODEL AFTER CHANGING ITS VARIABLES. AFTER PARSING XML GIVEN BY SERVER
		public static event GameEvents onUserInput;				//RAISED BY SLOTVIEW/THEME TO CHANGE DISPLAY/SCENE. UPON USER INSTERACTION 

		void Awake(){
			instance = this;
		}

		public void OnWebDataRetrieve(string eventType, string[] data = null){	//	CALL THESE FUNCTIONS TO DISPATCH EVENTS
			if (onWebDataRetrieve != null)
				onWebDataRetrieve (eventType, data);
		}

		public void OnPlaySettingsUpdate(string eventType, string[] data = null){
			if (onPlaySettingsUpdate != null)
				onPlaySettingsUpdate (eventType, data);
		}
		public void OnUserInput(string eventType, string[] data = null){
			if (onUserInput != null)
				onUserInput (eventType, data);
		}

	}


	//ALL EVENTS AVAILABLE IN THE GAME

	public class WebDataRetrieve{
		public const string PLAYER_AUTHENTICATIOIN = "AuthPlayer";
		public const string GAME_INFO = "GameInfo";
		public const string SLOT_BET = "SlotBet";
		public const string BONUS = "GetBonusBoxes";
		public const string DOUBLE_UP = "DoubleUp";
		public const string COLLECT_DOUBLE_UP = "CollectDoubleUp";
		public const string COLLECT_BONUS = "CollectWinning";
	}

	public class PlaySettingsUpdate{
		public const string USER_INFO = "UserInfo";
		public const string BET_INFO = "BetInfo";
		public const string SPIN_RESULT = "SpinResult";
		public const string GAMBLE_RESULT = "GambleResult";
		public const string GAMBLE_TOTAL_RESULT = "GambleTotalResult";
		public const string BONUS_PRIZES = "BonusPrizes";
		public const string BONUS_COLLECTED = "BonusCollected";
	}

	public class UserInput{
		public const string START_SPIN = "StartSpin";
		public const string END_SPIN = "EndSpin";
		public const string LINE_CHANGE = "LineChange";
		public const string BET_CHANGE = "BetChange";
		public const string COIN_CHANGE = "CoinChange";
		public const string BET_MAX = "BetMax";
		public const string GAMBLE_START = "GambleStart";
		public const string GAMBLE = "Gamble";
		public const string COLLECT_GAMBLE = "CollectGamble";
		public const string GAMBLE_END = "GambleEnd";
		public const string GAMBLE_CANCEL = "GambleCancel";
		public const string AUTO_SPIN = "AutoSpin";
		public const string STOP_AUTO_SPIN = "StopAutoSpin";
		public const string START_BONUS = "StartBonus";
		public const string BONUS_COLLECT = "CollectBonus";

		public const string WHEEL_STOP = "WheelStop";
		public const string OPEN_PAYTABLE = "OpenPaytable";
		public const string PAYTABLE_CLOSED = "PaytableClosed";
	}
}


