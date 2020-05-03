'use strict';

// log('Script injected');

window.addEventListener('load', async () => {
	// log('Window loaded');

	// log('Starting to look for the chest container');
	const chestContainer = await getChestContainer(10, 1500);

	if (chestContainer) {
		// log('Chest container found');

		const chest = chestContainer.lastElementChild.firstElementChild;
		// log('This is the chest element:', chest);

		const observer = new MutationObserver(observeChest);
		observer.observe(chest, { attributes: true, attributeOldValue: true });

		if (chest.classList.contains('tw-transition__fade--enter-done')) {
			// log('The chest was preloaded, gonna grab that');

			collectChest(chest);
		}

		function observeChest(mutationList) {
			// log('These are all the mutations:', mutationList);

			mutationList.forEach((mutation) => {
				if (!mutation.oldValue.includes('tw-transition__fade--enter-active')) return;

				// log('This is the mutation that got after the check(loaded):', mutation);

				collectChest(mutation.target);
			});
		}

		function collectChest(target) {
			// log('The collect chest function triggered, gonna set the timeout');

			setTimeout(() => {
				// log('The timeout function triggered, gonna grab the chest');

				if (!target.classList.contains('tw-transition__fade--enter-done')) {
					// log('The chest was already clicked');
					return;
				}

				// log("The chest wasn't clicked, gonna grab it");

				target.querySelector('button').click();
			}, Math.floor(Math.random() * 6 + 5) * 1000);
		}
	} else {
		// log('Chest container not found');
	}
});

setTimeout(() => {
	window.location.reload();
}, 20 * 60 * 1000);
// log('Page reloading after x mins set');

async function getChestContainer(maxTries, timeForEachRepetition) {
	while (maxTries) {
		const temp = document.querySelector('[data-test-selector="community-points-summary"]');

		if (temp) return temp;

		// log(`Didn't find it this time...${maxTries}`);
		maxTries--;
		await wait(timeForEachRepetition);
	}
	return null;
}

// function log(string, data = '') {
// 	console.log(`(${new Date().toUTCString()}) Twitch Auto-Chest-Collecter: ${string}`, data);
// }

function wait(ms) {
	return new Promise((res) => {
		setTimeout(res, ms);
	});
}
