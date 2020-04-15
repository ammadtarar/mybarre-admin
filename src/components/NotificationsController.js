export function showNotification(type, msg) {
	document.getElementById('notificationMsg').innerHTML = msg
	if (type === "success") {
		document.getElementById('notificationBar').style.background = "#4caf50";
	} else if (type === "danger" || type === "info") {
		document.getElementById('notificationBar').style.background = "#ef5350";
	} else if (type === "warning") {
		document.getElementById('notificationBar').style.background = "#ffb74d";
	}
	document.getElementById('notificationBar').style.display = 'table';

	function myTimer() {
		document.getElementById('notificationBar').style.display = 'none';
	};
	window.setTimeout(myTimer, 5000);
}



export function showErrorNotification(error) {

	document.getElementById('notificationBar').style.background = "#ffb74d";
	var msg = error;
	let response = error.response;
	if (response !== null && response !== undefined) {
		let data = response.data;
		if (data !== null && data !== undefined) {
			let message = data.message;
			if (message !== null && message !== undefined && message !== "") {
				msg = message;
			}
		}
	}
	document.getElementById('notificationMsg').innerHTML = msg
	document.getElementById('notificationBar').style.display = 'table';

	function myTimer() {
		document.getElementById('notificationBar').style.display = 'none';
	};
	window.setTimeout(myTimer, 5000);
}

export function hideNotification() {
	document.getElementById('notificationBar').style.display = 'none';
}

export function showActivityIndicator() {
	// document.getElementById('loadingDiv').style.height = document.body.scrollHeight + "px"
	document.getElementById('loadingDiv').style.visibility = 'visible'
}

export function hideActivityIndicator() {
	document.getElementById('loadingDiv').style.visibility = 'hidden'
}
