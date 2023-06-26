let submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", validateform);

function validateform() {
	console.log("******");
	var password = document.register.pass.value;
	var rePassword = document.register.repass.value;
	var email = document.register.email.value;
	var atposition = x.indexOf("@");
	var dotposition = x.lastIndexOf(".");

	if (password == null || rePassword == "" || email == "") {
		alert("لطفا همه ی فیلد ها را پر کنید");
		return false;
	} else if (password.length < 6) {
		alert("رمز عبور باید از 6 کاراکتر بیشتر باشد");
		location.reload();
		return false;
	}
	if (password != rePassword) {
		alert("رمز عبور وارد شده با تکرار ان مطابقت ندارد");
		return false;
	}
	if (
		atposition < 1 ||
		dotposition < atposition + 2 ||
		dotposition + 2 >= x.length
	) {
		alert(
			"لطفا یک ادرس ایمیل معتبر وارد کنید \n atpostion:" +
				atposition +
				"\n dotposition:" +
				dotposition
		);
		return false;
	}
}
