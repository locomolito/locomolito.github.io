using UnityEngine;
using System.Collections;
using com.pacifica.slot.utils;

public class WinBox : MonoBehaviour {

	// Use this for initialization
	void Start () {
		gameObject.SetActive (false);
	}

	public void Animate(){
		iTween.FadeTo (gameObject, iTween.Hash("alpha", 0, "time", 0.3f, "looptype", "pingPong", "name", "AlphaLoop")); 
		gameObject.SetActive (true);
	}

	public void HideBox(){
		iTween.StopByName ("AlphaLoop");

		Color tempcolor = gameObject.GetComponent<Renderer>().material.color;
		tempcolor.a = 1f;
		gameObject.GetComponent<Renderer>().material.color = tempcolor;

		gameObject.SetActive (false);
	}

}
