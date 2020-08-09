





define([], function() {
   var AppUtils = ({
        toNumeric: function(_str){
            _str = _str.toString();
           while (_str.search(",") >= 0) {
                _str = (_str + "").replace(',', '');
            }
            return parseFloat(_str); 
        },
       insertComma: function(_str){
           return _str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       },
       findAllIndexInArray: function(value, arr) {
			/*will return all matches from the array, null if none is found*/
			var allFound = new Array();
			for (var i=0; i < arr.length; i++) {
				if (arr[i] == value) {
					allFound.push(i);
				}
			}
			if (allFound.length == 0) {
				allFound = null;
			}
           return allFound;
		}
    });
	
    return AppUtils;
});