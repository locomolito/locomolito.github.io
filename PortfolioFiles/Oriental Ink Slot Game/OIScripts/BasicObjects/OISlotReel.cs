using UnityEngine;
using System.Collections;
using com.pacifica.slot.objects;
using com.pacifica.slot.utils;

public class OISlotReel : SlotReel {

	override protected void Init(){
		rows			= 3;
		cols 			= 5;
		rowInterval 	= 1.27f;
		colInterval 	= 1.27f;
		wheelInterval	= 0.2F;	//DELAY(in seconds) BETWEEN EACH WHEEL BEFORE SPINNING.
		reelHeight = rowInterval * rows;
		symbolCode = new string[]{"A","B","C","D","E","F","G","H","S","W","X","M"};

		base.Init ();
	}

	override public void AnimateSymbols(string positions){
		string[] symbolPositions = positions.Split ('|');
		
		ClearAnimation ();
		
		for(int columnNumber=0; columnNumber<symbolPositions.Length; columnNumber++){
			int rowNumber = int.Parse(symbolPositions[columnNumber]);
			
			GameObject symbol = ObjectPool.instance.GetObjectForType (wheels[columnNumber].ResultObject[rowNumber].name , false);
			symbol.transform.parent = winHolder.transform;
			symbol.transform.position = wheels[columnNumber].ResultObject[rowNumber].transform.position;
			symbol.GetComponent<Renderer>().sortingLayerName = winHolder.GetComponent<Renderer>().sortingLayerName;
			symbol.SetActive (true); 
			currentWinningSymbol.Add(symbol.name);
			
			GameObject winBox = ObjectPool.instance.GetObjectForType ("WinBox" , false);
			winBox.transform.parent = winHolder.transform;
			winBox.transform.position = symbol.transform.position;
			winBox.GetComponent<Renderer>().sortingLayerName = symbol.GetComponent<Renderer>().sortingLayerName;
			winBox.SetActive (true); 
			
			iTween.ScaleTo(symbol, iTween.Hash("scale", new Vector3(1.3f,1.3f), "easetype", "spring", "time", 0.1f));
			iTween.ScaleTo(winBox, iTween.Hash("scale", new Vector3(1.3f,1.3f), "easetype", "spring", "time", 0.1f));
			
			iTween.ScaleTo(symbol, iTween.Hash("scale", new Vector3(1f,1f), "easetype", "easeOutBack", "time", 0.2f, "delay", 0.1f));
			iTween.ScaleTo(winBox, iTween.Hash("scale", new Vector3(1f,1f), "easetype", "easeOutBack", "time", 0.2f, "delay", 0.1f));
			
			Invoke("CallNextAnim", 2f);
		}
	}

	override public void AnimateScatter(string positions){
		
		string[] symbolPositions = positions.Split ('|');
		char[] pos;
		int columnNumber;
		int rowNumber;
		
		ClearAnimation ();
		
		for(int i=0; i<symbolPositions.Length; i++){
			pos= symbolPositions[i].ToCharArray();
			
			columnNumber = int.Parse(pos[0].ToString());
			rowNumber = int.Parse(pos[1].ToString());
			
			GameObject symbol = ObjectPool.instance.GetObjectForType (wheels[columnNumber].ResultObject[rowNumber].name , false);
			symbol.transform.parent = winHolder.transform;
			symbol.transform.position = wheels[columnNumber].ResultObject[rowNumber].transform.position;
			symbol.GetComponent<Renderer>().sortingLayerName = winHolder.GetComponent<Renderer>().sortingLayerName;
			symbol.SetActive (true);
			currentWinningSymbol.Add(symbol.name);
			
			GameObject winBox = ObjectPool.instance.GetObjectForType ("WinBox" , false);
			winBox.transform.parent = winHolder.transform;
			winBox.transform.position = symbol.transform.position;
			winBox.GetComponent<Renderer>().sortingLayerName = symbol.GetComponent<Renderer>().sortingLayerName;
			winBox.SetActive (true); 
			
			iTween.ScaleTo(symbol, iTween.Hash("scale", new Vector3(1.3f,1.3f), "easetype", "spring", "time", 0.1f));
			iTween.ScaleTo(winBox, iTween.Hash("scale", new Vector3(1.3f,1.3f), "easetype", "spring", "time", 0.1f));
			
			iTween.ScaleTo(symbol, iTween.Hash("scale", new Vector3(1f,1f), "easetype", "easeOutBack", "time", 0.2f, "delay", 0.1f));
			iTween.ScaleTo(winBox, iTween.Hash("scale", new Vector3(1f,1f), "easetype", "easeOutBack", "time", 0.2f, "delay", 0.1f));
			
			Invoke("CallNextAnim", 2f);
		}
	}

	override protected void ClearAnimation(){
		currentWinningSymbol.Clear ();
		do {	
			foreach (Transform child in winHolder.transform) {
				ObjectPool.instance.PoolObject (child.gameObject);
			}	
		} while(winHolder.transform.childCount>0);
	}
	override public void StopWinningAnimation(){
		CancelInvoke ();
		ClearAnimation ();
	}

	void CallNextAnim(){
		CancelInvoke ();
		slotTheme.NextWinAnimation ();
	}
}
