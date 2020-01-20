import * as g from './import/global.js';
import {common} from './import/common.js';
import {component} from './import/component.js';
import {project} from './import/project.js';
import {page} from './import/page.js';

(() => {
	var init = () => {
		common();
		component();
		project();
		page();
		console.log('initialized');
	};

	$(init);

	// レスポンシブ対応用イベントトリガー
	(() => {
		var size;

		$(() => {
			size = (window.innerWidth <= g.breakPoint) ? 'sp' : 'notSp';

			g.$w.trigger(`_size.${size}`);
		});
		g.$w.on('resize', () => {
			var curSize = (window.innerWidth <= g.breakPoint) ? 'sp' : 'notSp';

			if (curSize !== size) {
				g.$w.trigger(`_size.${curSize}`);
				size = curSize;
			}
		});
	})();
})();
