const $ = require('jquery');

$(() => {
	var $w = $(window);
	var bp = 640;
	var init = () => {
		console.log('initialized');
	};

	$(init);

	// レスポンシブ対応用イベントトリガー
	(() => {
		var size_base;

		$(() => {
			size_base = (window.innerWidth <= bp) ? 'sp' : 'notSp';

			if (size_base === 'sp') {
				$w.trigger('_size.sp');
			} else {
				$w.trigger('_size.notSp');
			}
		});
		$w.on('resize', () => {
			var size = (window.innerWidth <= bp) ? 'sp' : 'notSp';

			if (size !== size_base) {
				if (size === 'sp') {
					$w.trigger('_size.sp');
				} else {
					$w.trigger('_size.notSp');
				}
				size_base = size;
			}
		});
	})();
});
