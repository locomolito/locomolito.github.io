using UnityEngine;
using System.Collections;

//! Collections of classes that acts as containers for data. Classes with getter and setter only; no complicated functions.
namespace com.pacifica.slot.dataTypes{
	public class BonusPrize {
		public string Type { get; set;}
		public string Value { get; set;}
		public string Index { get; set;}
	}
}
