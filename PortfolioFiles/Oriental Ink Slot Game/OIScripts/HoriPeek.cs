using UnityEngine;
using System.Collections;

public class HoriPeek : MonoBehaviour {

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
	
	public void StartAnimation(){
		gameObject.SetActive (true);

		int num = Random.Range (1, 3);

		if(num==1){
			anim.SetInteger ("state", num);
		}else{
			gameObject.SetActive (false);
		}

	}
}
