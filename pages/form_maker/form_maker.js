let textQuestion = document.querySelector("#textButton");
textQuestion.addEventListener("click", addTextQuestion);

let multiQuestion = document.querySelector("#multi-button");
multiQuestion.addEventListener("click", addMultiQuestion);

let uploadQuestion = document.querySelector("#upload-button");
uploadQuestion.addEventListener("click", addUploadQuestion);

function addTextQuestion() {
	console.log("****");
	var element = `<div id="txt-question">
    <div class="row">
        <!-- text qustion -->
        <div class="col-lg-6 right-side">
            <label for="q1-txt">متن سوال:</label><br />
            <input
                type="text"
                name="q1-txt"
                id="q1-txt"
            /><br /><br />
            <label for="ans1-txt"></label>
            <textarea
                class="right-side pad_right_5"
                name="ans1-txt"
                id="ans1-txt"
                cols="105"
                rows="2"
                disabled
            ></textarea>
        </div>
    </div>
</div>
`;
	document.querySelector("#form-maker").innerHTML += element;
}

function addMultiQuestion() {
	console.log("44444");
	var element = `<div id="multi-question">
    <div class="row">
        <!-- multi choise question -->
        <div class="col-lg-6 right-side">
            <label for="q1-multi">متن سوال:</label><br />
            <input
                type="text"
                name="q1-multi"
                id="q1-multi"
            /><br /><br />

            <!-- options: -->
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 right-side">
            <label for="q1-multi_1">گزینه اول</label><br />
            <input
                type="text"
                name="q1-multi_1"
                id="q1-multi_1"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="q1-multi_2">گزینه دوم</label><br />
            <input
                type="text"
                name="q1-multi_2"
                id="q1-multi_2"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="q1-multi_3">گزینه سوم</label><br />
            <input
                type="text"
                name="q1-multi_3"
                id="q1-multi_3"
            /><br /><br />
        </div>

        <div class="col-lg-3 right-side">
            <label for="q1-multi_4">گزینه چهارم</label><br />
            <input
                type="text"
                name="q1-multi_4"
                id="q1-multi_4"
            /><br /><br />
        </div>
    </div>
</div>`;
	document.querySelector("#form-maker").innerHTML += element;
}

function addUploadQuestion() {
	console.log("555");
    var element = `<div id="upload-question">
    <div class="row">
        <!-- upload file -->
        <div class="col-lg-4 right-side">
            <label for="q1-upload">متن سوال:</label><br />
            <input
                type="text"
                name="q1-upload"
                id="q1-upload"
            /><br /><br />

            <form action="/action_page.php">
                <input
                    type="file"
                    id="myFile"
                    name="upload-file"
                /><br />
            </form>
        </div>
    </div>
</div>`
    document.querySelector("#form-maker").innerHTML += element;
}
