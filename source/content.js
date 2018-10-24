import 'webext-dynamic-content-scripts';
import {h} from 'dom-chef';
import select from 'select-dom';
import domLoaded from 'dom-loaded';

import viewInZenHub from './features/view-in-zenhub';
import addSCRUM from './features/add-scrum-vote';
import addSprint from './features/sprint';
import addVideo from './features/add-video';
import like from './features/like';

import * as pageDetect from './libs/page-detect';
import {safeElementReady, enableFeature} from './libs/utils';

// Add globals for easier debugging
window.select = select;

async function init() {
	await safeElementReady('body');

	if (pageDetect.is404() || pageDetect.is500()) {
		return;
	}

	await domLoaded;
	onDomReady();
}

async function onDomReady() {
	enableFeature(addSCRUM);
	enableFeature(addSprint);
	enableFeature(viewInZenHub);
	enableFeature(addVideo);
	enableFeature(like);
}

init();
