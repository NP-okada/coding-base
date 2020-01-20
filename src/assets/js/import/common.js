import * as g from './global.js';

export function common() {
	// 高さ揃え
	(() => {
		var $target = $('.js-mh');

		if ($target.length) {
			$target.each(function() {
				var $this = $(this);
				var mhTargetArr = $this.data('mhTarget').split(',');

				for (var i = 0; i < mhTargetArr.length; i++) {
					$this.find(mhTargetArr[i].trim()).matchHeight();
				}
			});
		}
	})();
}
