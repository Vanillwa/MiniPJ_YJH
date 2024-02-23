// 닉네임 유효성 검사
function nicknameChecking() {
    let nickname = $("#nickname").val();
    let data = { nickname };

    $(".nickname-alert").addClass("show").css("color", "red");

    if (nickname == "") {
        $(".nickname-alert").html("<strong>닉네임</strong>을 입력해주세요.");
        $("#nickname").focus();
        return;
    } else {
        fetch("/updateNicknameCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((rs) => rs.text())
            .then((text) => {
                $(".nickname-alert").css("color", "red");
                if (text == "available") {
                    nicknameCheck = true;
                    $(".nickname-alert")
                        .html("사용 가능한 <strong>닉네임</strong>입니다.")
                        .css("color", "blue");
                } else if (text == "used") {
                    $(".nickname-alert").html(
                        "이미 사용중인 <strong>닉네임</strong>입니다."
                    );
                    $("#nickname").focus();
                } else {
                    $(".nickname-alert").html(
                        "<strong>닉네임</strong> 형식이 올바르지 않습니다."
                    );
                    $("#nickname").focus();
                }
            });
    }
}

// 닉네임 변경이 세션 삭제
$("#nickname").change(function () {
    fetch('/delUpdateNicknameCheck', {method : 'post'})
    $(".nickname-alert").removeClass("show");
});

// 비밀번호 유효성 검사
$("#pwd").change(function () {
    let pwd = $("#pwd").val();
    let data = { pwd };

    $(".pwd-alert").addClass("show").css("color", "red");

    if (pwd == "") {
        $(".pwd-alert").removeClass("show");
    } else {
        fetch("/updatePwdCheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((rs) => rs.text())
            .then((text) => {
                if (text == "available") {
                    $(".pwd-alert")
                        .html("사용 가능한 <strong>비밀번호</strong>입니다.")
                        .css("color", "blue");
                } else {
                    $(".pwd-alert").html(
                        "6~15자 / 영대소문자, 숫자, 특문 포함"
                    );
                }
            });
    }
});

// 비밀번호 보이기 토글
$("#pwd-toggle").on("click", function () {
    $(this).toggleClass("bi-eye bi-eye-slash");

    if ($("#pwd").prop("type") == "password") {
        $("#pwd").prop("type", "text");
    } else {
        $("#pwd").prop("type", "password");
    }
});

// capslock-alert
$("#pwd").on("keydown keyup", function (e) {
    if (e.originalEvent.getModifierState("CapsLock")) {
        $("#capslock-alert").addClass("show");
        $(".pwd-alert").css("margin-top", "15px");
    } else {
        $("#capslock-alert").removeClass("show");
        $(".pwd-alert").css("margin-top", "0px");
    }
});

// pwd input에서 blur시 capslock-alert 제거
$("#pwd").on("blur", function () {
    $("#capslock-alert").removeClass("show");
});

function send(f){
    let body = new URLSearchParams(new FormData(f));

    fetch("/updateUser", { method: "put", body })
        .then((rs) => rs.text())
        .then((text) => {
            switch (text) {
                case "success":
                    alert("회원정보 업데이트 성공");
                    location.href = "/member/"+f.id.value;
                    break;
                case "nickname-fail":
                    alert("닉네임 중복이 확인되지 않았습니다.");
                    $("#nickname").focus();
                    break;
                case "pwd-fail":
                    alert("비밀번호가 올바르지 않습니다.");
                    $("#pwd").focus();
                    break;
                default:
                    alert("오류가 발생했습니다.");
                    break;
            }
        });
}