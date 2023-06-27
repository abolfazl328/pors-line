const form = document.getElementById("registration-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const emailInput = document.getElementById("email");
	const passwordInput = document.getElementById("password");
	const confirmPasswordInput = document.getElementById("confirm-password");

	let errorMessage = "";

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(emailInput.value)) {
		errorMessage = "لطفا یک ادرس ایمیل معتبر وارد کنید\n";
	}

	if (passwordInput.value.length < 6) {
		errorMessage = "رمز عبور باید از 6 کاراکتر بیش تر باشد\n";
	}

	if (passwordInput.value.length > 32) {
		errorMessage = "رمز عبور باید از 32 کاراکتر کمتر باشد\n";
	}

	if (confirmPasswordInput.value !== passwordInput.value) {
		errorMessage = "رمز عبور وارد شده با تکرار ان مطابقت ندارد\n";
	}

	if (errorMessage !== "") {
		alert(errorMessage);
	} else {
		form.submit();
	}
});

// function validateform() {
// 	var password = document.register.pass.value;
// 	var rePassword = document.register.repass.value;
// 	var email = document.register.email.value;

// 	if (password == null || rePassword == "" || email == "") {
// 		alert("لطفا همه ی فیلد ها را پر کنید");
// 		// return false;
// 	} else if (password.length < 6) {
// 		alert("رمز عبور باید از 6 کاراکتر بیشتر باشد");
// 		// return false;
// 	} else if (password.length > 32) {
// 		alert("رمز عبور نباید از 32 کاراکتر بیشتر باشد");
// 		// return false;
// 	} else if (password != rePassword) {
// 		alert("رمز عبور وارد شده با تکرار ان مطابقت ندارد");
// 		// return false;
// 	}
// }
// let submitButton = document.register.submit;
// submitButton.addEventListener("click", validateform);
