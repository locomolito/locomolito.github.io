

var canvas;
(function() {

	canvas = (function() {

		var c = {},

			view = document.getElementsByTagName("canvas")[0],
			_vw, _vh, _scale = 1;


		c.view = view;
		
		Object.defineProperty(c, "width", {
			set: function(w) {
                _vw = w;
				this.scale = _scale;
			},
			get: function() {
				return _vw;
			}
		});
		Object.defineProperty(c, "height", {
			set: function(h) {
                _vh = h;
				this.scale = _scale;
			},
			get: function() {
				return _vh;
			}
		});
		Object.defineProperty(c, "scale", {
			set: function(s) {
				_scale = s;
				this.view.width = _vw * s;
				this.view.height = _vh * s;
                
			},
			get: function() {
				return _scale;
			}
		});

		c.scale = _scale;

		return c;
	})();
})();