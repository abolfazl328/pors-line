const form = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const errorContainer = document.getElementById("error-container");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	// validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(emailInput.value)) {
		showError("لطفا یک ادرس ایمیل معتبر وارد کنید\n");
		return;
	}

	// validate password
	if (passwordInput.value.length < 6) {
		showError("رمز عبور باید از 6 کاراکتر بیش تر باشد\n");
		return;
	}

	if (passwordInput.value.length > 32) {
		showError("رمز عبور باید از 32 کاراکتر کمتر باشد\n");
		return;
	}

	// validate confirm password
	if (confirmPasswordInput.value !== passwordInput.value) {
		showError("رمز عبور وارد شده با تکرار ان مطابقت ندارد\n");
		return;
	}

	// all input fields pass validation, submit the form
	form.submit();
});

function showError(errorMessage) {
	errorContainer.innerHTML = errorMessage;
	errorContainer.style.display = "block";
	errorContainer.classList.add("error");
}
