using UnityEngine;
using System.Collections;

namespace com.pacifica.slot.utils{
	public class SlotString {
		public static string InsertComma(string stringToParse){
			string str;
			str = string.Format ("{0:n}", float.Parse(stringToParse));

			return str;
		}

		public static string InsertComma(float floatToParse){
			string str;
			str = string.Format ("{0:n}", floatToParse);

			
			return str;
		}
	}
}
