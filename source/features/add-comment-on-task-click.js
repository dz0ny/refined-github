import delegate from 'delegate';
import select from 'select-dom';

// When user checks todo item, new comment is created with text of todo.
export default function () {
	delegate('.js-discussion:first-child .task-list-item-checkbox', 'click', event => {
		const textarea = select('#new_comment_field');
		const text = event.target.parentElement.textContent.replace(/^\s+|\s+$/g, '');
		if (event.target.checked && !textarea.value.includes('Ticked')) {
			textarea.value = 'Ticked `' + text + '`\n' + textarea.value;
			select('#partial-new-comment-form-actions button:first-child').focus();
		}
	});
}
