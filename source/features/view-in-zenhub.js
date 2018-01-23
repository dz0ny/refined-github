import delegate from 'delegate';
import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { h } from 'dom-chef';

// When user checks todo item, new comment is created with text of todo.
export default function () {
	select('#partial-discussion-header .gh-header-actions').prepend(
		<a href={`https://app.zenhub.com/workspace/o/${pageDetect.getCleanPathname()}`} class="btn btn-sm float-left" target="_blank">
		View in ZenHub
		</a>
	);
}
