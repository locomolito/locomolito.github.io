using UnityEngine;
using System.Collections;

public class HoriWin : MonoBehaviour {

	Animator anim;
	
	// Use this for initialization
	void Start () {
		anim = GetComponent<Animator>();
		gameObject.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void AnimEnd(){
		anim.SetInteger ("state", 0);
		gameObject.SetActive (false);
	}
	
	public void ChangeAnimation(int num){
		gameObject.SetActive (true);
		anim.SetInteger ("state", num);
	}
}
