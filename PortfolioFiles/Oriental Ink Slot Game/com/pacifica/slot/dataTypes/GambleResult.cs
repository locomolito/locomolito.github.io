using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.dataTypes{
	public class GambleResults {

		private int result;
		public int Result{ get; set; }

		private float multiplier;
		public float Multiplier{ get; set; }

		private int lastRound;
		public int LastRound{ get; set; }

		private float wonAmount;
		public float WonAmount{ get; set; }
	}
}
