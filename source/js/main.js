const VALID_SYMBOLS = /^\d+$/;

const phoneInput = document.querySelector('#phone');

const isValidPhone = (item) => {
	return item !== '' && !(item.match(VALID_SYMBOLS));
};

phoneInput.addEventListener('input', () => {
	if (isValidPhone(phoneInput.value)) {
		phoneInput.setCustomValidity('Номер телефона должен состоять из цифр');
	} else {
		phoneInput.setCustomValidity('');
	}
	
	phoneInput.reportValidity();
})
