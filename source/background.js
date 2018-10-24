import OptionsSync from 'webext-options-sync';

// Define defaults
new OptionsSync().define({
	defaults: {
		disabledFeatures: '',
		customCSS: '',
		sprintList: '{"WooCart Sprint #5":"/niteoweb/woocart/releases"}\n{"EBN Sprint #35":"/niteoweb/easyblognetworks/releases"}\n{"Niteo Sprint #2":"/niteoweb/operations/releases"}',
		logging: false
	},
	migrations: [
		// Migration example:
		options => {
		},
		OptionsSync.migrations.removeUnused
	]
});

function requestProcessor(details) {
	var headers = details.responseHeaders;
	for (var j = 0, jLen = headers.length; j !== jLen; ++j) {
		var header = headers[j];
		var name = header.name.toLowerCase();
		if (name !== "content-security-policy" &&
			name !== "content-security-policy-report-only" &&
			name !== "x-webkit-csp") {
			continue;
		}
		header.value = header.value.replace("media-src", "media-src *");
	}
	return { responseHeaders: headers };
}

chrome.webRequest.onHeadersReceived.addListener(requestProcessor, {
	urls: ["https://github.com/*/*/issues/*"],
	types: ["main_frame"]
}, ["blocking", "responseHeaders"]);
