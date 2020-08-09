using UnityEngine;
using System.Collections;
using com.pacifica.slot.dataTypes;
using com.pacifica.slot.core;

public class Main : SlotMain {

	// Use this for initialization
	void Start () {
		
		//GAME TYPE IS C
		gameInfo = new GameInfo ();	//normal game
		gameInfo.GameID = "103";
		gameInfo.MaxLine = 25;
		gameInfo.MaxLineBet = 10;
		gameInfo.CoinList = new float[] {.01f, .05f, .10f, .20f, .50f, 1f};
		
		//		tempGameInfo = new GameInfo ();	//chinese
		//		tempGameInfo.GameID = "100"; //114, 100
		//		tempGameInfo.MaxLine = 25;
		//		tempGameInfo.MaxLineBet = 10;
		//		tempGameInfo.CoinList = new float[] {.01f, .05f, .10f, .20f, .50f, 1f};
		
		
		playerInfo = new PlayerInfo (); //for local testing
		playerInfo.UserID = "101"; //normal
		//playerInfo.UserID = "106"; //jp
		//playerInfo.UserID = "506"; //SCATTER
		//playerInfo.UserID = "500"; //line 1 win
		//playerInfo.UserID = "103";	//BONUS
		playerInfo.UserName = "petekca";
		//tempPlayerInfo.SessionID = "1111100";
		playerInfo.SessionID = "54321000"; //CHINESE
		playerInfo.AgentID = "1";
		playerInfo.LicenseeID = "testLicensee";
		playerInfo.Balance = 1000f;

		base.Init ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
