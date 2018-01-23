import { h } from 'dom-chef';
import select from 'select-dom';
import * as pageDetect from '../libs/page-detect';
import { getUsername } from '../libs/utils';

const repoUrl = pageDetect.getRepoURL();

export default function () {
    if (select.exists('.refined-github-filter')) {
        return;
    }
    const nav = select('.subnav-search-context .js-navigation-item:last-child');
    nav.before(
        <a
            href={`/${repoUrl}/issues?utf8=✓&q=is%3Aissue+is%3Aopen+%28AC%29+in%3Abody+sort%3Aupdated-desc+assignee%3A${getUsername()}`}
            class="select-menu-item js-navigation-item refined-github-filter">
            <div class="select-menu-item-text">
                My User Stories
            </div>
        </a>
    );
    nav.before(
        <a
            href={`/${repoUrl}/issues?utf8=✓&q=is%3Aissue+is%3Aopen+%28AC%29+in%3Abody`}
            class="select-menu-item js-navigation-item refined-github-filter">
            <div class="select-menu-item-text">
                User Stories
            </div>
        </a>
    );
    const menuItem = select(`#user-links > li:nth-child(3) > details > ul .dropdown-divider`);
    menuItem.after(
        <li>
            <a class="dropdown-item" href={`/search?q=is%3Aissue+is%3Aopen+%28AC%29+in%3Abody+sort%3Aupdated-desc+assignee%3A${getUsername()}+milestone%3A"Sprint+%2315"&type=Issues`}>Your Sprint User Stories</a>
        </li>
    );

    menuItem.after(
        <li>
            <a class="dropdown-item" href={`/search?q=is%3Aissue+is%3Aopen+%28AC%29+in%3Abody+sort%3Aupdated-desc+assignee%3A${getUsername()}+milestone%3A"Sprint+%2315"&type=Issues`}>Your User Stories</a>
        </li>
    );
}
