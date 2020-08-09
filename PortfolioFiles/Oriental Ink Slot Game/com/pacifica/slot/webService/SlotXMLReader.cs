using UnityEngine;
using System.Collections;
using System.Collections.Generic;
/*
 * NEED TO OPTIMIZE, GETVALUE OF THE NODE DIRECTLY DO NOT ALWAYS CALL ROOT NODE
 * */
using com.pacifica.slot.dataTypes;
using com.pacifica.slot.webService.dataParser;


namespace com.pacifica.slot.webService{
	public class SlotXMLReader{
		const int COLUMNS = 5;

		public static SlotXml ReadXML(string data){
			
			XMLParser parser = new XMLParser ();
			XMLNode xmlDoc = parser.Parse (data);

			SlotXml slotXML = new SlotXml ();


			slotXML.RespCode = xmlDoc.GetValue ("CSResponse>0>RespHeader>0>RespCode>0>_text");							//DEFAULT ATTRIBUTES
			if(slotXML.RespCode == null){
				slotXML.RespCode = xmlDoc.GetValue (">CSResponse>0>RespHeader>0>RespCode>0>_text");
			}
			slotXML.RespMessage = xmlDoc.GetValue ("CSResponse>0>RespHeader>0>RespMessage>0>_text");

			//XMLNodeList connSettings = xmlDoc.GetNodeList ("CSResponse>0>ConnSetting");
			XMLNode connSettings = xmlDoc.GetNode ("CSResponse>0>ConnSetting>0");										//SOCKET AND CASINO SIM. ON USER AUTHENTICATION
			if(connSettings!=null){
				slotXML.SConn = connSettings.GetValue("SConn>0>_text");
				slotXML.WConn = connSettings.GetValue("WConn>0>_text");
				slotXML.SPort = connSettings.GetValue("SPort>0>_text");
				slotXML.GameFile = connSettings.GetValue("GameFile>0>_text");
			}

			XMLNode playerInfo = xmlDoc.GetNode ("CSResponse>0>PlayerInfo>0");										
			if(connSettings!=null){
				slotXML.UserID = playerInfo.GetValue("PlayerID>0>_text");
				slotXML.AgentID = playerInfo.GetValue("AgentID>0>_text");
				slotXML.UserName = playerInfo.GetValue("Username>0>_text");
				slotXML.SessionID = playerInfo.GetValue("SessionID>0>_text");
				slotXML.Balance = playerInfo.GetValue("Balance>0>_text");
			}

			XMLNodeList jackpotNodeList = xmlDoc.GetNodeList ("CSResponse>0>JackpotInfo>0>Jackpot");					//ONGAMEINFO
			if(jackpotNodeList!=null){
				slotXML.HasJackpot=true;
				foreach(XMLNode node in jackpotNodeList){
					string type = node.GetValue("Type>0>_text");

					switch(type){
					case "GRAND":
						slotXML.GrandJackpot = node.GetValue ("PotPrize>0>_text"); 	
						break;
					case "MAJOR":
						slotXML.MajorJackpot = node.GetValue ("PotPrize>0>_text");
						break;
					case "MINOR":
						slotXML.MinorJackpot = node.GetValue ("PotPrize>0>_text");
						break;
					case "MINI":
						slotXML.MiniJackpot = node.GetValue ("PotPrize>0>_text");
						break;
					}
				}
			}

			
			XMLNodeList gameCredit = xmlDoc.GetNodeList ("CSResponse>0>SlotBet>0>GameCredit");
			if(gameCredit!=null){
				slotXML.NextPlayType = xmlDoc.GetValue ("CSResponse>0>SlotBet>0>GameCredit>0>NextPlayType>0>_text");	//FOR SLOTBET
				slotXML.BetRefID = xmlDoc.GetValue ("CSResponse>0>SlotBet>0>GameCredit>0>BetRefID>0>_text");
				slotXML.WonAmount = xmlDoc.GetValue ("CSResponse>0>SlotBet>0>GameCredit>0>WonAmount>0>_text");
				slotXML.AfterCredit = xmlDoc.GetValue ("CSResponse>0>SlotBet>0>GameCredit>0>AfterCredit>0>_text");
			}

			XMLNodeList winningLines = xmlDoc.GetNodeList ("CSResponse>0>SlotBet>0>SpinResult>0>Line");
			if(winningLines!=null){
				slotXML.LineWins = new List<LineWin>();
				foreach(XMLNode node in winningLines){
					LineWin lineWin = new LineWin();
					lineWin.SymbolCode=node.GetValue("@type");
					lineWin.LineNumber=node.GetValue("@line_no");
					lineWin.WonAmount=node.GetValue("@won_amount");
					lineWin.SymbolCount=node.GetValue("@symbol_count");
					lineWin.hasWild=node.GetValue("@has_wild");

					slotXML.LineWins.Add(lineWin);
				}
			}

			XMLNode fsInfo = xmlDoc.GetNode ("CSResponse>0>FreeSpin>0");
			if(fsInfo!=null){
				slotXML.HasFreeSpin =true;
				slotXML.FSCount = fsInfo.GetValue("FSCount>0>_text");
				slotXML.FSMultiplier = fsInfo.GetValue("Multiplier>0>_text");
				slotXML.FSLineBet = fsInfo.GetValue("LineBet>0>_text");
				slotXML.FSActiveLines = fsInfo.GetValue("TotalLines>0>_text");
				slotXML.FSCoin = fsInfo.GetValue("CoinValue>0>_text");

			}

			XMLNode fsInfobet = xmlDoc.GetNode ("CSResponse>0>SlotBet>0>FreeSpin>0");
			if(fsInfobet!=null){
				slotXML.HasFreeSpin =true;
				slotXML.FSCount = fsInfobet.GetValue("FSCount>0>_text");
				slotXML.FSMultiplier = fsInfobet.GetValue("Multiplier>0>_text");
			}

			XMLNodeList bonusWins = xmlDoc.GetNodeList ("CSResponse>0>SlotBet>0>BonusWin>0>Bonus");
			if(bonusWins!=null){
				slotXML.BonusWins= new List<BonusWin>();
				foreach(XMLNode bonusNode in bonusWins){
					BonusWin bonusWin = new BonusWin();
					bonusWin.Type =bonusNode.GetValue("@type");
					bonusWin.Position = bonusNode.GetValue("@position");
					bonusWin.WonAmount = bonusNode.GetValue("@won_amount");

					slotXML.BonusWins.Add(bonusWin);
				}
			}

			XMLNodeList reelSymbols = xmlDoc.GetNodeList ("CSResponse>0>SlotBet>0>ReelSymbols>0>Reel");
			if(reelSymbols!=null){
				slotXML.ReelSymbols = new string[COLUMNS];
				for(int i=0; i<COLUMNS; i++){
					slotXML.ReelSymbols[i] = xmlDoc.GetValue ("CSResponse>0>SlotBet>0>ReelSymbols>0>Reel>" + i + ">@symbols");
				}
			}



			XMLNodeList gambleNode =  xmlDoc.GetNodeList ("CSResponse>0>DoubleUp");										//FOR GAMBLE
			if(gambleNode!=null){
				slotXML.GambleResult = xmlDoc.GetValue ("CSResponse>0>DoubleUp>0>@result");								
				slotXML.GambleMultiplier = xmlDoc.GetValue ("CSResponse>0>DoubleUp>0>@multiplier");
				slotXML.GambleLastRound = xmlDoc.GetValue ("CSResponse>0>DoubleUp>0>@end_of_game");
				slotXML.GambleWonAmount = xmlDoc.GetValue ("CSResponse>0>DoubleUp>0>@total_winning");
			}

			XMLNodeList bonusPrizeList = xmlDoc.GetNodeList ("CSResponse>0>BonusGame>0>PrizeList>0>Prize");										//FOR BONUS
			if(bonusPrizeList != null){
				slotXML.BonusPrizeList = new List<BonusPrize>();
				
				foreach(XMLNode prizeNode in bonusPrizeList){
					BonusPrize prize = new BonusPrize();
					prize.Type = prizeNode.GetValue("@type");
					prize.Value = prizeNode.GetValue("@value");
					prize.Index = prizeNode.GetValue("@index");
					slotXML.BonusPrizeList.Add(prize);
				}
			}

			XMLNodeList bonusGameWinnings = xmlDoc.GetNodeList ("CSResponse>0>CollectWinning");										//FOR BONUS END
			
			if(bonusGameWinnings != null){
				slotXML.BonusGameWins = new List<BonusPrize>();
				
				foreach(XMLNode fgNode in bonusGameWinnings){
					BonusPrize fgPrize = new BonusPrize();
					fgPrize.Type = fgNode.GetValue("PrizeType>0>_text");
					fgPrize.Value = fgNode.GetValue("PrizeValue>0>_text");
					fgPrize.Index = fgNode.GetValue("BaseWinning>0>_text");
					slotXML.BonusGameWins.Add(fgPrize);
				}
			}

			return slotXML;
		}
	}
}
