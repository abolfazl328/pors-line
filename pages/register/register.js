function validateform() {
	var password = document.register.pass.value;
	var rePassword = document.register.repass.value;
	var email = document.register.email.value;

	if (password == null || rePassword == "" || email == "") {
		alert("لطفا همه ی فیلد ها را پر کنید");
		// return false;
	} else if (password.length < 6) {
		alert("رمز عبور باید از 6 کاراکتر بیشتر باشد");
		// return false;
	} else if (password.length > 32) {
		alert("رمز عبور نباید از 32 کاراکتر بیشتر باشد");
		// return false;
	} else if (password != rePassword) {
		alert("رمز عبور وارد شده با تکرار ان مطابقت ندارد");
		// return false;
	}
}
let submitButton = document.register.submit;
submitButton.addEventListener("click", validateform);
