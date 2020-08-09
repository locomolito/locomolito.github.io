using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class SoundManager : MonoBehaviour {
	public GameObject audioPlayer;

	public AudioClip mainBGM;			//BGMs
	public AudioClip fsBGM;
	public AudioClip infoBGM;
	public AudioClip gambleBGM;
	public AudioClip bonusBGM;

	public AudioClip normalWin;			//WIN SOUNDS
	public AudioClip scatterWin;
	public AudioClip jackpotWin;
	public AudioClip gambleWin;
	public AudioClip bonusWin;

	public AudioClip normalClick;		//CLICKS
	public AudioClip gambleClick;
	public AudioClip gambleBet;
	public AudioClip bonusMachineClick;
	public AudioClip bonusSymbolClick;
	public AudioClip spinClick;

	public AudioClip spinningLoop;		//OTHERS
	public AudioClip anticipation;
	public AudioClip resultSummary;
	public AudioClip tatooMachine;
	public AudioClip coins;
	
	GameObject BGM;
	GameObject btnClick;
	GameObject winSounds;
	
	void Awake(){
		BGM = Instantiate (audioPlayer) as GameObject;
		btnClick = Instantiate (audioPlayer) as GameObject;
		winSounds = Instantiate (audioPlayer) as GameObject;
	}

	void Start () {

	}

	public void PlayBGM(string name){
		switch(name){
		case "MAIN":
			BGM.GetComponent<AudioSource>().clip = mainBGM;
			break;
		case "FS":
			BGM.GetComponent<AudioSource>().clip = fsBGM;
			break;
		case "INFO":
			BGM.GetComponent<AudioSource>().clip = infoBGM;
			break;
		case "GAMBLE":
			BGM.GetComponent<AudioSource>().clip = gambleBGM;
			break;
		}
		BGM.GetComponent<AudioSource>().Play ();
	}

	public void PlayButtonSound(string name=""){
		switch(name){
		case "GAMBLE":
			btnClick.GetComponent<AudioSource>().clip = gambleClick;
			break;
		case "GAMBLE_SELECT":
			btnClick.GetComponent<AudioSource>().clip = gambleBet;
			break;
		case "BONUS_MACHINE":
			btnClick.GetComponent<AudioSource>().clip = spinClick;
			break;
		case "BONUS_SYMBOL":
			btnClick.GetComponent<AudioSource>().clip = spinClick;
			break;
		case "SPIN":
			btnClick.GetComponent<AudioSource>().clip = spinClick;
			break;
		default:
			btnClick.GetComponent<AudioSource>().clip = normalClick;
			break;
		}

		btnClick.GetComponent<AudioSource>().Play ();
	}

	public void PlayWinSound(string name){
		switch(name){
		case "JACKPOT":
			winSounds.GetComponent<AudioSource>().clip = mainBGM;
			break;
		case "SCATTER":
			winSounds.GetComponent<AudioSource>().clip = fsBGM;
			break;
		case "BONUSGAME":
			winSounds.GetComponent<AudioSource>().clip = infoBGM;
			break;
		case "GAMBLE_WIN":
			winSounds.GetComponent<AudioSource>().clip = infoBGM;
			break;
		default:
			winSounds.GetComponent<AudioSource>().clip = normalWin;
			break;
		}
		
		winSounds.GetComponent<AudioSource>().Play ();
	}

	public void PlaySpinLoop(){
		winSounds.GetComponent<AudioSource>().clip = spinningLoop;
		winSounds.GetComponent<AudioSource>().Play ();
	}

	public void PlayAnticipation(){
		winSounds.GetComponent<AudioSource>().clip = anticipation;
		winSounds.GetComponent<AudioSource>().Play ();
	}
	public void PlayResultSummary(){
		winSounds.GetComponent<AudioSource>().clip = resultSummary;
		winSounds.GetComponent<AudioSource>().Play ();
	}
	public void PlayTatooMachine(){
		winSounds.GetComponent<AudioSource>().clip = tatooMachine;
		winSounds.GetComponent<AudioSource>().Play ();
	}

	public void PlayCoinSound(){
		winSounds.GetComponent<AudioSource>().clip = coins;
		winSounds.GetComponent<AudioSource>().Play ();
	}
}