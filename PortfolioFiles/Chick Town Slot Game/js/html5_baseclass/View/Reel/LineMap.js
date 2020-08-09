

define([], function() {
    var LineMapDC = new Array( 
					new Array  (1, 1, 1, 1, 1),
					new Array  (0, 0, 0, 0, 0),
					new Array  (2, 2, 2, 2, 2),
					new Array  (0, 1, 2, 1, 0),
					new Array  (2, 1, 0, 1, 2),
					new Array  (1, 0, 0, 0, 1),
					new Array  (1, 2, 2, 2, 1),
					new Array  (0, 0, 1, 2, 2),
					new Array  (2, 2, 1, 0, 0),
					new Array  (1, 2, 1, 0, 1),
					new Array  (1, 0, 1, 2, 1),
					new Array  (0, 1, 1, 1, 0),
					new Array  (2, 1, 1, 1, 2),
					new Array  (0, 1, 0, 1, 0),
					new Array  (2, 1, 2, 1, 2),
					new Array  (1, 1, 0, 1, 1),
					new Array  (1, 1, 2, 1, 1),
					new Array  (0, 0, 2, 0, 0),
					new Array  (2, 2, 0, 2, 2),
					new Array  (0, 2, 2, 2, 0),
					new Array  (2, 0, 0, 0, 2),
					new Array  (1, 2, 0, 2, 1),
					new Array  (1, 0, 2, 0, 1),
					new Array  (0, 2, 0, 2, 0),
					new Array  (2, 0, 2, 0, 2),
					new Array  (0, 2, 1, 0, 2),
					new Array  (2, 0, 1, 2, 0),
					new Array  (1, 0, 2, 1, 2),
					new Array  (0, 2, 1, 2, 0),
					new Array  (2, 1, 0, 0, 1),
					new Array  (0, 1, 2, 2, 1),
					new Array  (1, 0, 0, 1, 2),
					new Array  (1, 2, 2, 1, 0),
					new Array  (1, 1, 0, 1, 2),
					new Array  (1, 1, 2, 1, 0),
					new Array  (0, 1, 2, 1, 1),
					new Array  (2, 1, 0, 1, 1),
					new Array  (2, 1, 0, 2, 1),
					new Array  (0, 1, 2, 0, 1),
					new Array  (0, 0, 1, 0, 0),
					new Array  (2, 2, 1, 2, 2),
					new Array  (0, 1, 1, 1, 2),
					new Array  (2, 1, 1, 1, 0),
					new Array  (2, 1, 0, 0, 0),
					new Array  (0, 1, 2, 2, 2),
					new Array  (1, 2, 0, 1, 0),
					new Array  (0, 1, 0, 2, 1),
					new Array  (2, 1, 2, 0, 1),
					new Array  (0, 2, 0, 0, 0),
					new Array  (2, 0, 2, 2, 2)
                );
    var LineMapCH = new Array( 
					new Array  (1, 1, 1, 1, 1),
					new Array  (0, 0, 0, 0, 0),
					new Array  (2, 2, 2, 2, 2),
					new Array  (1, 0, 1, 0, 1), 
					new Array  (0, 1, 0, 1, 0), 
					new Array  (2, 1, 2, 1, 2), 
					new Array  (1, 2, 1, 2, 1), 
					new Array  (0, 0, 1, 2, 2), 
					new Array  (2, 2, 1, 0, 0), 
					new Array  (1, 1, 0, 1, 1), 
					new Array  (0, 0, 2, 0, 0), 
					new Array  (2, 2, 0, 2, 2), 
					new Array  (1, 1, 2, 1, 1), 
					new Array  (0, 2, 1, 0, 0), 
					new Array  (2, 0, 1, 2, 2), 
					new Array  (1, 0, 2, 1, 0), 
					new Array  (0, 1, 1, 1, 2), 
					new Array  (2, 1, 1, 1, 0), 
					new Array  (1, 2, 0, 1, 2), 
					new Array  (0, 2, 2, 1, 0), 
					new Array  (2, 0, 0, 1, 2), 
					new Array  (0, 1, 2, 1, 0), 
					new Array  (2, 1, 0, 1, 2), 
					new Array  (0, 2, 0, 2, 0), 
					new Array  (2, 0, 2, 0, 2)
                );
    
    var LineMap = ({
        getMinimumLineNumberMatch: function(matches,type) {
            matches = matches.split(","); 
            var _map;
            switch(type){
                case 'DC':
                    _map = LineMapDC;
                    break;
                case 'CH':
                    _map = LineMapCH;
                    break;
            }
			var minimumLineNumber = -1;
			for (var i = 0; i < _map.length; i++) {
				var allMatch = true;
				for (var a = 0; a < matches.length; a++ ) {
					if (String(_map[i][a]) != String(matches[a])) {
						allMatch = false;
					}
				}
				if (allMatch) {
					minimumLineNumber = i + 1;
					i = _map.length;//force stop search
				}
			}
			if (minimumLineNumber < 0) {
				return -1;
			}
			return minimumLineNumber;
		},
    });
	
    return LineMap;
});