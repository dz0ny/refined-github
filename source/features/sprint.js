import delegate from 'delegate';
import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { h } from 'dom-chef';
import { getUsername, flatZip } from '../libs/utils';

export default function () {
	let user = getUsername();
	let sprint = function () {
		var start = new Date(2018, 2, 7);
		return Math.ceil((((new Date() - start) / 86400000) + start.getDay() + 1) / 14) + 18;
	}()

	select('.HeaderMenu .d-flex ul').append(
		<li>
			<a href={`https://github.com/issues?utf8=✓&q=milestone%3A"Sprint+%23${sprint}"+assignee%3A${user}+is%3Aissue+is%3Aopen+sort%3Aupdated-desc+org%3Aniteoweb`} class="js-selected-navigation-item HeaderNavlink px-2">My Sprint</a>
		</li>
	)
}
