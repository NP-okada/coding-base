import * as g from './global.js';

export function common() {
	// 高さ揃え
	(() => {
		var $target = $('.js-mh');

		if ($target.length) {
			g.$w.on('load', function() {
				$target.each(function() {
					var $this = $(this);
					var mhTargetArray = $this.data('mhTarget').split(' ');

					for (var i = 0; i < mhTargetArray.length; i++) {
						$this.find(mhTargetArray[i]).matchHeight();
					}
				});
			});
		}
	})();
}
