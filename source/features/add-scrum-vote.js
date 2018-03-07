import delegate from 'delegate';
import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { h } from 'dom-chef';


export default function () {
	const toolbar = select('.timeline-new-comment .timeline-comment .toolbar-commenting div:nth-child(4)')
	if (toolbar) {
		toolbar.prepend(
			<div class="toolbar-item dropdown js-menu-container">
				<button type="button" tabindex="-1" class="js-menu-target menu-target tooltipped tooltipped-n" aria-label="Add vote" aria-expanded="false" aria-haspopup="true">
					🕛&nbsp;
					<span class="dropdown-caret"></span>
				</button>

				<div class="dropdown-menu-content js-menu-content">
					<ul class="dropdown-menu dropdown-menu-s">
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 1</details>">1️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 2</details>">2️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 3</details>">3️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 5</details>">5️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 8</details>">8️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 13</details>">1️⃣3️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 20</details>">2️⃣0️⃣</button>
						<button type="button" class="js-toolbar-item dropdown-item btn-vote-scrum" data-prefix="<details><summary>Click to see estimation</summary>SP: 100</details>">1️⃣0️⃣0️⃣</button>
					</ul>
				</div>
			</div>
		);
	}
	const header = select('h1.gh-header-title')
	if (header && header.innerHTML.indexOf("[vote]") === -1){
		for (const summary of select.all(`.comment-body details summary`)) {
			const detail = summary.parentNode;
			if (detail.innerHTML.indexOf("SP: 100") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-100');
			}
			else if (detail.innerHTML.indexOf("SP: 20") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-20');
			}
			else if (detail.innerHTML.indexOf("SP: 13") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-13');
			}
			else if (detail.innerHTML.indexOf("SP: 1") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-1');
			}
			else if (detail.innerHTML.indexOf("SP: 2") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-2');
			}
			else if (detail.innerHTML.indexOf("SP: 3") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-3');
			}
			else if (detail.innerHTML.indexOf("SP: 5") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-5');
			}
			else if (detail.innerHTML.indexOf("SP: 8") > 0) {
				detail.classList.add("scrum-sp");
				detail.classList.add('sp-8');
			}
		}
	}
}
