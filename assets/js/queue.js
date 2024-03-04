let permissionGranted = false;

const getPermission = async () => {
	const permissions = await Notification.requestPermission();
	console.log(permissions);
	permissionGranted = permissions === 'granted';
	if (permissionGranted) {
		document.settings.notification.checked = true;
	}
};
getPermission();

const checkNotificationPermission = (source) => {
	if (!source.checked) {
		return;
	}
	getPermission();
	if (permissionGranted) {
		return;
	}

	alert('You have to enable notification permissions to enable this feature!');
	source.checked = false;
};

const popQueue = () => {
	document.querySelector('div.overlay').style.display = '';
	let notification;
	console.log('queue popped!', document.settings.notification.checked);
	if (document.settings.notification.checked) {
		notification = new Notification('Live Draft', {
			body: 'Match found',
			icon: './player_files/Aatrox.png',
		});
	}

	const audio = new Audio('assets/sound/match_found.mp3');
	audio.load();
	audio
		.play()
		.then(() => {})
		.catch((error) => {
			console.error(error);
		});
	const progressBar = document.getElementById('progressbar');
	setTimeout(() => {
		const interval = setInterval(() => {
			progressBar.value += 0.095;
		}, 10);
		setTimeout(() => {
			document.querySelector('div.overlay').style.display = 'none';
			progressBar.value = 0;
			clearInterval(interval);
		}, 13500);
	}, 2000);

	if (notification) {
		notification.onclick = () => {
			window.focus();
		};

		setTimeout(() => {
			notification.close();
		}, 10000);
	}
};

const queue = () => {
	const timeout = Math.random() * 4000 + 3000;
	console.log('popping queue in ', timeout, 'seconds');
	setTimeout(() => {
		popQueue();
	}, timeout);
};
