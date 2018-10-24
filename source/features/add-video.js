import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { h } from 'dom-chef';
import { getOwnerAndRepo } from '../libs/page-detect';
import OptionsSync from 'webext-options-sync';

const currentRepo = getOwnerAndRepo();
const options = new OptionsSync().getAll();

function injectUpload(demosURL) {
	const demo = select("#discussion_bucket > div.discussion-timeline.js-quote-selection-container > div.js-discussion.js-socket-channel > div.timeline-comment-wrapper.js-comment-container.mt-0")
	if (demo && demo.innerText.search("User story") > 0) {
		let title = document.querySelector(".gh-header-title span").innerText.trim().toLowerCase().replace(new RegExp(" ", 'g'), "-");
		let number = document.querySelector(".gh-header-title span.gh-header-number").innerText.replace("#", "");
		demo.parentNode.insertBefore(
			<div class="demoContainer">
				<div class="demoDependency">
					<span class="default position-relative text-center">

						<svg height="32" class="octicon octicon-arrow-down v-align-middle text-gray-light" viewBox="0 0 10 16" version="1.1" width="20" aria-hidden="true"><path fill-rule="evenodd" d="M7 7V3H3v4H0l5 6 5-6H7z"></path></svg>&nbsp;
					Attach a video(<code>{currentRepo.repoName}-{number}-{title}</code>) by uploading it to <a href={demosURL}>Project Release</a> and link to it as last comment to this Issue.

					</span>
				</div>
			</div>
			, demo.nextSibling);
	}
}

function injectVideo(video) {

	const demo = select("#discussion_bucket > div.discussion-timeline.js-quote-selection-container > div.js-discussion.js-socket-channel > div.timeline-comment-wrapper.js-comment-container.mt-0")
	if (demo && demo.innerText.search("User story") > 0) {
		demo.parentNode.insertBefore(
			<div class="demoContainer">
				<div class="demoDependency">
					<h3>User story demo</h3>
					<video src={video} controls style="width: 100%;" />
					<a href={video}>Download</a>
				</div>
			</div>
			, demo.nextSibling);
	}
}

export default async function () {

	if (!pageDetect.isIssue()) {
		return;
	}

	let videos = select.all("td.comment-body a");
	videos.push(...select.all(".task-list-item a"))
	let demosURL = "";
	if (select.exists("#partial-discussion-sidebar a.milestone-name")) {
		const { sprintList } = await options;
		let sprintName = select("#partial-discussion-sidebar a.milestone-name").getAttribute("title");
		for (const jsonData of sprintList.split("\n")) {
			let data = JSON.parse(jsonData);
			let sprint = Object.keys(data)[0];
			console.log(sprint, sprintName);
			if (sprintName == sprint) {
				demosURL = data[sprint];
			}
		}

	}
	console.log(videos);
	if (videos.length) {
		let links = videos.map(i => i.href).filter(l => l.endsWith(".mp4") || l.endsWith(".mov") || l.endsWith(".mkv"));
		if (links.length) {
			injectVideo(links[links.length-1]);
		} else {
			injectUpload(demosURL);
		}
	} else {
		injectUpload(demosURL);
	}

}
