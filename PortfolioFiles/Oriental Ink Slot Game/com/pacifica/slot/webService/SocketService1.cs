using UnityEngine;
using System.Collections;
using System.Net.Sockets;
using System.IO;
using System;

namespace com.pacifica.slot.webService{
	public class SocketService {
		public bool		socketReady;

		ConnSettings 	connSettings;

		TcpClient 		socket;
		NetworkStream 	netStream;
		StreamWriter	writer;
		StreamReader	reader;

		public void setupSocket() {
			connSettings = ConnSettings.getInstance ();

			try {
				socket = new TcpClient(connSettings.Host, connSettings.Port);
				netStream =  socket.GetStream();
				writer = new StreamWriter(netStream);
				reader = new StreamReader(netStream);
				socketReady = true;
			}
			catch (Exception e) {
				Debug.Log("Socket error:" + e);
			}
		}
		
		public string readSocket() {

			if (!socketReady)
				return "";
			if (netStream.DataAvailable)
				return reader.ReadLine();
			return "";

		}
		
		public void closeSocket() {
			if (!socketReady)
				return;
			writer.Close();
			reader.Close();
			socket.Close();
			socketReady = false;
		}
	}
}
