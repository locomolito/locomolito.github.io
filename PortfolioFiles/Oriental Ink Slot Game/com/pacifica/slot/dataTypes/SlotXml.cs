using UnityEngine;
using System.Collections;
using System.Collections.Generic;
/*
 * TO DO: A CUSTOM DATA TYPE TO STORE XML
 * RESTRICTION: CAN ONLY BE USE IN XML FROM SERVER WHERE THE ATTRIBUTES ARE KNOWN. MUST ADD NEW PROPERTY IN SLOTXML FOR EACH NEW ATTRIBUTE.
 * */
namespace com.pacifica.slot.dataTypes{
	public class SlotXml {
		public string			RespCode		{ get; set;}	//DEFAULT ATTRIBUTES
		public string			RespMessage		{ get; set;}

		public string			SConn			{ get; set;}	//PLAYER_AUTHENTICATIOIN ATTRIBUTES
		public string			WConn			{ get; set;}
		public string			SPort			{ get; set;}
		public string			GameFile		{ get; set;}

		public string			UserID			{ get; set;}	//SetPlayerInfo ATTRIBUTES
		public string			AgentID			{ get; set;}
		public string			UserName		{ get; set;}
		public string			SessionID		{ get; set;}
		public string			Balance			{ get; set;}

		public string			GrandJackpot	{ get; set;}	//OnGameInfo ATTRIBUTES
		public string			MajorJackpot	{ get; set;}
		public string			MinorJackpot	{ get; set;}
		public string			MiniJackpot		{ get; set;}
		public string			FSCount			{ get; set;}			
		public string			FSMultiplier	{ get; set;}
		public string			FSLineBet		{ get; set;}
		public string			FSActiveLines	{ get; set;}
		public string			FSCoin			{ get; set;}
		public bool				HasJackpot		{ get; set;}
		public bool				HasFreeSpin		{ get; set;}


		
		public string			BetRefID		{ get; set;}	//onSlotBet ATTRIBUTES
		public string			AfterCredit		{ get; set;}
		public string			WonAmount		{ get; set;}
		public string			NextPlayType	{ get; set;}
		public string[]			ReelSymbols 	{ get; set;}
		public List<LineWin>	LineWins		{ get; set;}
		public List<BonusWin>	BonusWins		{ get; set;}


		public string			GambleResult	{ get; set;}	//OnDoubleUp ATTRIBUTES
		public string 			GambleMultiplier{ get; set;}
		public string			GambleLastRound	{ get; set;}
		public string			GambleWonAmount	{ get; set;}

		public List<BonusPrize>	BonusPrizeList	{ get; set;}	//OnBonus ATTRIBUTES
		public List<BonusPrize>	BonusGameWins	{ get; set;}
	}
}
