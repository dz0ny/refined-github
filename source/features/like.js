import delegate from 'delegate';
import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { h } from 'dom-chef';


export default function () {
	if (!pageDetect.isIssue()) {
		return;
	}

	const issueTile = () => {
		return select("#partial-discussion-header > div.gh-header-show > h1 > span.js-issue-title.refined-linkified-title").textContent.trim()
	};

	const isStarred = () => {
		var liked = sessionStorage.likedIssuesList || "[]";
		liked = JSON.parse(liked);
		for (const link of liked) {
			if (document.location.href == link.url) {
				return true;
			}
		}
		return false;
	};

	const handleAdd = (e) => {
		var liked = sessionStorage.likedIssuesList || "[]";
		liked = JSON.parse(liked);
		liked.push({title: issueTile(), url: document.location.href});
		sessionStorage.likedIssuesList = JSON.stringify(liked);
	};

	const handleRemove = (e) => {
		sessionStorage.likedIssuesList = "[]";
	};

	const holder =select('#partial-discussion-header .gh-header-actions')
	if (!isStarred()) {
		holder.prepend(
			<a onClick={handleAdd} class="btn btn-sm float-left">
				➕
			</a>
		);
	} else {
		holder.prepend(
			<a onClick={handleRemove} class="btn btn-sm float-left">
				➖
			</a>
		);
	}

}
