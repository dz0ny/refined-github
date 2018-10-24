
import select from 'select-dom';
import { h } from 'dom-chef';
import { getUsername } from '../libs/utils';
import OptionsSync from 'webext-options-sync';
const options = new OptionsSync().getAll();

export default async function () {
	var urls = [];
	var links = sessionStorage.likedIssuesList || "[]";
	links = JSON.parse(links);
	for (const link of links) {
		urls.push(<a role="menuitem" class="dropdown-item" href={link.url} >{link.title}</a>);
	}

	let user = getUsername();
	const {sprintList} = await options;
	select('header > div > div.HeaderMenu > nav > ul').append(
		<li class="dropdown">
			<details class="details-overlay details-reset d-flex px-2 flex-items-center">
				<summary class="HeaderNavlink" aria-haspopup="menu">
				<span>My Scrum&nbsp;</span><span class="dropdown-caret mt-1"></span>
				</summary>
				<details-menu class="dropdown-menu dropdown-menu-sw" role="menu">

				<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=assignee%3A${user}+is%3Aissue+is%3Aopen+sort%3Aupdated-desc+org%3Aniteoweb`} >
					Assigned Issues
				</a>
				<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=[WIP]+author%3A${user}+is%3Aissue+is%3Aopen+sort%3Aupdated-desc+org%3Aniteoweb`} >
					WIP Stories
				</a>
				<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=is%3Aissue+sort%3Aupdated-desc+org%3Aniteoweb+label%3A"Priority+Lane"+is%3Aopen`} >
					All Priority Lane
				</a>
				<div class="dropdown-divider"></div>
				<div class="dropdown-header">
					<span title="niteoweb/woocart">Starred Issues</span>
				</div>
				{urls}
				</details-menu>
			</details>
		</li>
	)

	for (const jsonData of sprintList.split("\n")) {

		let data = JSON.parse(jsonData);
		let sprint = Object.keys(data)[0];
		let demosURL = data[sprint];

		let sprintSafe = encodeURIComponent(sprint).replace("#", "%23")
		select('header > div > div.HeaderMenu > nav > ul').append(
			<li class="dropdown">
				<details class="details-overlay details-reset d-flex px-2 flex-items-center">
					<summary class="HeaderNavlink" aria-haspopup="menu">
					<span><span></span>{sprint}&nbsp;</span><span class="dropdown-caret mt-1"></span>
					</summary>
					<details-menu class="dropdown-menu dropdown-menu-sw" role="menu">

					<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=milestone%3A"${sprintSafe}"+assignee%3A${user}+is%3Aissue+is%3Aopen+sort%3Aupdated-desc+org%3Aniteoweb`} >
						My Stories
					</a>
					<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=milestone%3A"${sprintSafe}"+is%3Aissue+sort%3Aupdated-desc+org%3Aniteoweb`} >
						All stories
					</a>
					<a role="menuitem" class="dropdown-item" href={`https://github.com/issues?utf8=✓&q=milestone%3A"${sprintSafe}"+is%3Aissue+sort%3Aupdated-desc+org%3Aniteoweb+label%3A"Priority+Lane"`} >
						Priority Lane
					</a>
					<a role="menuitem" class="dropdown-item" href={demosURL} >
						Demos
					</a>

					</details-menu>
				</details>
			</li>
		)
	}
}
