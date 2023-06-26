let question_num = 1;

let textQuestion = document.querySelector("#textButton");
textQuestion.addEventListener("click", addTextQuestion);

let multiQuestion = document.querySelector("#multi-button");
multiQuestion.addEventListener("click", addMultiQuestion);

let uploadQuestion = document.querySelector("#upload-button");
uploadQuestion.addEventListener("click", addUploadQuestion);

function addTextQuestion() {
	var element = `
    <fieldset>
		<legend>متنی با پاسخ کوتاه</legend>
        <div id="txt-question">
        <div class="row">
            <!-- text qustion -->
            <div class="col-lg-6 right-side">
                <label for="q${question_num}-txt">متن سوال:</label><br />
                <input
                    type="text"
                    name="q${question_num}-txt"
                    id="q${question_num}-txt"
                /><br /><br />
                <label for="ans${question_num}-txt"></label>
                <textarea
                    class="right-side pad_right_5"
                    name="ans${question_num}-txt"
                    id="ans${question_num}-txt"
                    cols="105"
                    rows="2"
                    disabled
                ></textarea>
            </div>
        </div>
        </div>
    </fieldset>
`;
	document.querySelector("#form-maker").innerHTML += element;
	question_num += 1;
}

function addMultiQuestion() {
	var element = `
    <fieldset>
    <legend>چند گزینه ای</legend>
    <div id="multi-question">
    <div class="row">
        <!-- multi choise question -->
        <div class="col-lg-6 right-side">
            <label for="q${question_num}-multi">متن سوال:</label><br />
            <input
                type="text"
                name="q${question_num}-multi"
                id="q${question_num}-multi"
            /><br /><br />

            <!-- options: -->
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 right-side">
            <label for="ans${question_num}-multi_1">گزینه اول</label><br />
            <input
                type="text"
                name="ans${question_num}-multi_1"
                id="ans${question_num}-multi_1"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="ans${question_num}-multi_2">گزینه دوم</label><br />
            <input
                type="text"
                name="ans${question_num}-multi_2"
                id="ans${question_num}-multi_2"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="ans${question_num}-multi_3">گزینه سوم</label><br />
            <input
                type="text"
                name="ans${question_num}-multi_3"
                id="ans${question_num}-multi_3"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="ans${question_num}-multi_4">گزینه چهارم</label><br />
            <input
                type="text"
                name="ans${question_num}-multi_4"
                id="ans${question_num}-multi_4"
            /><br /><br />
        </div>
    </div>
    </div>
    </fieldset>`;

	document.querySelector("#form-maker").innerHTML += element;
	question_num += 1;
}

function addUploadQuestion() {
	var element = `
    <fieldset>
    <legend>آپلود فایل</legend>
    <div id="upload-question">
    <div class="row">
        <!-- upload file -->
        <div class="col-lg-4 right-side">
            <label for="q${question_num}-upload">متن سوال:</label><br />
            <input
                type="text"
                name="q${question_num}-upload"
                id="q${question_num}-upload"
            /><br /><br />

            <form action="/action_page.php">
                <input
                    type="file"
                    id="ans${question_num}-upload"
                    name="ans${question_num}-upload"
                /><br />
            </form>
        </div>
    </div>
    </div>
    </fieldset>`;

	document.querySelector("#form-maker").innerHTML += element;
	question_num += 1;
}
