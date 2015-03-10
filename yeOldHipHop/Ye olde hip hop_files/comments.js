function submitform() {

	if (document.comments_form.author.value == "") {
		alert("You need a name.");
		document.comments_form.author.focus();
		return false;
	}
	else if (document.comments_form.email.value == "") {
		alert("Provide a valid email address you must if you wish to post.");
		document.comments_form.email.focus();
		return false;
	}
	else if (!emailCheck(document.comments_form.email.value)) {
		alert("Provide a valid email address you must if you wish to post.");
		document.comments_form.email.focus();
		return false;
	}
	else if (document.comments_form.text.value == "") {
		alert("Your comments have a value of NULL. Please correct.");
		document.comments_form.text.focus();
		return false;
	}
	else {
		if (document.comments_form.bakecookie.checked) {
			rememberMe();
		}
		else {
			forgetMe();
		}
		document.comments_form.post.value = 'Thanks!';
		document.comments_form.post.disabled = true;
		return true;
	}
}

function fillinhttp() {
	if (document.comments_form.url.value == "")	{
		document.comments_form.url.value = "http://";
	}
}

function getridofhttp() {
	if (document.comments_form.url.value == "http://") {
		document.comments_form.url.value = "";
	}
}