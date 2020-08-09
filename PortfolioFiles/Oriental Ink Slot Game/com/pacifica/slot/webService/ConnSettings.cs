using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.webService{
	public class ConnSettings {
		static ConnSettings instance;

		private string host;
		public string Host { get; set; }

		private string dommain = "http://172.17.10.114:8080/joeSlot/servlet/WebServerRNG";
		public string Domain { get; set; }

		private int port;
		public int Port { get; set; }

		private string gameFile;
		public string GameFile { get; set; }

		public static ConnSettings getInstance(){
			if (instance==null) {
				instance = new ConnSettings();
			}

			return instance;
		}

	}
}
