'use strict';

window.addEventListener('load', () => {
	const chestContainer = document.querySelector(
		'[data-test-selector="community-points-summary"]'
	);

	if (chestContainer) {
		const chest = chestContainer.lastElementChild.firstElementChild;

		const observer = new MutationObserver(observeChest);
		observer.observe(chest, { attributes: true, attributeOldValue: true });

		if (chest.classList.contains('tw-transition__fade--enter-done')) {
			collectChest(chest);
		}

		function observeChest(mutationList) {
			mutationList.forEach((mutation) => {
				if (!mutation.oldValue.includes('tw-transition__fade--enter-active')) return;

				collectChest(mutation.target);
			});
		}

		function collectChest(target) {
			setTimeout(() => {
				if (!target.classList.contains('tw-transition__fade--enter-done')) return;

				target.querySelector('button').click();
			}, Math.floor(Math.random() * 6 + 5) * 1000);
		}
	}
});
