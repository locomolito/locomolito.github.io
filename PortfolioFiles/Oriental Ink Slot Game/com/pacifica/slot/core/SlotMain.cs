using UnityEngine;
using System.Collections;
using com.pacifica.slot.objects;
using com.pacifica.slot.webService;
using com.pacifica.slot.dataTypes;

namespace com.pacifica.slot.core{
	public class SlotMain : MonoBehaviour {
		protected SlotModel 		slotModel; 
		protected SlotConroller 	slotController;
		protected SlotView			slotView;
		protected SlotTheme 		slotTheme;

		protected WebService 		web;

		protected PlayerInfo 		playerInfo;
		protected GameInfo 			gameInfo;

		protected WebService 		webForCainosSim; //TEMP WHILE NO CASINO SIM
		SocketService 	socketService;

		void Start () {
			Init ();
		}

		virtual public void Init(){
			//ADD PLAYER INFO AND GAME INFO HERE USING SUB CLASS

			web = transform.gameObject.AddComponent<WebService> ();
			web.SetDomain ("http://172.17.10.114:8080/joeSlot/servlet/WebServerRNG");
			slotModel = new SlotModel (gameInfo, playerInfo, web);
			slotController = new SlotConroller (slotModel);
			slotTheme = gameObject.GetComponent<SlotTheme> ();
			slotView = new SlotView (slotModel, slotTheme);

			//DUMMY AUTHENTICATION. WILL NEED TO MOVE THIS IN CASINO SIM
			socketService = slotView.socketService; 
	//		webForCainosSim = transform.gameObject.AddComponent<WebService> ();		//SOCKET SERVICE
	//		webForCainosSim.SetDomain ("http://172.17.10.114:8080/webstartup/servlet/WebInit"); //move this to xml when casino sim done
	//		webForCainosSim.SendRequest(new string[]{"MessageType", "UID", "GameID"}, new string[]{"AuthPlayer", tempPlayerInfo.UserID, tempGameInfo.GameID});

			slotModel.GetGameInfo ();//NO SOCKET	
			
		}

		void Update(){
			if(socketService!=null){
				if(socketService.readSocket () != ""){
					Debug.Log("SOCKET SENDS: " + socketService.readSocket ());
				}
			}
			
			
			if(Input.GetKeyDown(KeyCode.Space) && !slotModel.OnAutoSpin && !slotModel.IsSpinning){
				EventManager.instance.OnUserInput(UserInput.START_SPIN);
			}
		}
	}
}