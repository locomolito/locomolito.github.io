using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.dataTypes{
	public class PlayerInfo {
		private string userID;
		public string UserID{ get; set; }

		private string userName;
		public string UserName{ get; set; }

		private string sessionID;
		public string SessionID{ get; set; }

		private string agentID;
		public string AgentID{ get; set; }

		private string licenseeID;
		public string LicenseeID{ get; set; }

		private float balance;
		public float Balance{ get; set; }

	}
}
