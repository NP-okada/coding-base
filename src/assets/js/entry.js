import * as g from './import/global.js';
import {common} from './import/common.js';
import {component} from './import/component.js';
import {project} from './import/project.js';
import {other} from './import/other.js';

(($) => {
	var init = () => {
		common();
		component();
		project();
		other();
		console.log('initialized');
	};

	$(init);

	// レスポンシブ対応用イベントトリガー
	(() => {
		var baseSize;

		$(() => {
			baseSize = (window.innerWidth <= g.breakPoint) ? 'sp' : 'notSp';

			if (baseSize === 'sp') {
				g.$w.trigger('_size.sp');
			} else {
				g.$w.trigger('_size.notSp');
			}
		});
		g.$w.on('resize', () => {
			var size = (window.innerWidth <= g.breakPoint) ? 'sp' : 'notSp';

			if (size !== baseSize) {
				if (size === 'sp') {
					g.$w.trigger('_size.sp');
				} else {
					g.$w.trigger('_size.notSp');
				}
				baseSize = size;
			}
		});
	})();
})(jQuery);
