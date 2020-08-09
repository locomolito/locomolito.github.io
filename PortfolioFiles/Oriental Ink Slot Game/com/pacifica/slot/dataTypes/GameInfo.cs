using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.dataTypes{
	public class GameInfo{
		private string gameID;
		public string GameID{ get; set; }

		private int maxLine;
		public int MaxLine{ get; set; }

		private int maxLineBet;
		public int MaxLineBet{ get; set; }

		private float[] coinList;
		public float[] CoinList{ get; set; }
	}
}
