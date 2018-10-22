import * as g from './import/global.js';
import {common} from './import/common.js';
import {module} from './import/module.js';
import {component} from './import/component.js';
import {other} from './import/other.js';

;(($) => {
	(() => {
		var init = () => {
			common();
			module();
			component();
			other();
			console.log('initialized');
		};

		$(init);

		// レスポンシブ対応用イベントトリガー
		(() => {
			var size_base;

			$(() => {
				size_base = (window.innerWidth <= g.bp) ? 'sp' : 'notSp';

				if (size_base === 'sp') {
					g.$w.trigger('_size.sp');
				} else {
					g.$w.trigger('_size.notSp');
				}
			});
			g.$w.on('resize', () => {
				var size = (window.innerWidth <= g.bp) ? 'sp' : 'notSp';

				if (size !== size_base) {
					if (size === 'sp') {
						g.$w.trigger('_size.sp');
					} else {
						g.$w.trigger('_size.notSp');
					}
					size_base = size;
				}
			});
		})();
	})();
})(jQuery);
