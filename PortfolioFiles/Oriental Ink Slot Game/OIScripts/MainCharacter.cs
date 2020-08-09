using UnityEngine;
using System.Collections;

public class MainCharacter : MonoBehaviour {
	Animator anim;

	// Use this for initialization
	void Start () {
		anim = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void AnimEnd(){
		anim.SetInteger ("AnimState", 0);
	}

	public void ChangeAnimation(){
		int num = Random.Range (1, 3);
		anim.SetInteger ("AnimState", num);

	}
}
