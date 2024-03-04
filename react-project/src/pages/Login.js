import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [pwdVisible, setPwdVisible] = useState(false);

  function labelUp(e) {
    e.target.parentElement.classList.add("label-up");
  }

  function labelDown(e) {
    if (e.target.value == "") {
      e.target.parentElement.classList.remove("label-up");
    }
  }

  function pwdToggle(e) {
    setPwdVisible(!pwdVisible);
  }

  const send = (e) => {
    e.preventDefault();
    let body = new URLSearchParams(new FormData(e.target));
    fetch("http://localhost:8081/login", { method: "POST", body })
      .then((rs) => rs.text())
      .then((text) => {
        if (text == "success") {
          navigate("/");
        } else if (text == "fail") {
          alert("존재하지 않는 계정입니다.");
        } else if (text == "pwd-fail") {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert("오류가 발생했습니다.");
        }
      });
  };

  return (
    <section className='login-section'>
      <div className='container'>
        <div className='header'>
          <h2 className='logo'>LOGO</h2>
          <i className='bi bi-x-lg' onClick={() => navigate("/")}></i>
        </div>
        <div className='main'>
          <h2>LOG IN</h2>
          <form id='login-form' onSubmit={send}>
            <div className='input-form'>
              <div className='wrapper'>
                <label htmlFor='email' className='label'>
                  Email
                </label>
                <input type='text' id='email' name='email' className='input' autoComplete='on' onFocus={(e) => labelUp(e)} onBlur={(e) => labelDown(e)} required />
              </div>
              <div className='wrapper'>
                <label htmlFor='pwd' className='label'>
                  Password
                </label>
                <input type={pwdVisible ? "text" : "password"} id='pwd' name='pwd' className='input' autoComplete='off' onFocus={(e) => labelUp(e)} onBlur={(e) => labelDown(e)} required />
                <i className={pwdVisible ? "bi-eye" : "bi-eye-slash"} id='pwd-toggle' onClick={(e) => pwdToggle(e)}></i>
                <p id='capslock-alert'>
                  <strong>CapsLock</strong>이 켜져있습니다.
                </p>
              </div>
              <p className='error' id='both-empty'>
                <strong>이메일</strong>과 <strong>비밀번호</strong>를 입력해주세요.
              </p>
              <p className='error' id='email-empty'>
                <strong>이메일</strong>을 입력해주세요.
              </p>
              <p className='error' id='pwd-empty'>
                <strong>비밀번호</strong>를 입력해주세요.
              </p>
              <div className='buttons'>
                <button type='submit' id='sign-in' className='sign-in'>
                  로그인
                </button>
                <button type='button' className='create'>
                  회원가입
                </button>
              </div>
              <div className='forgot'>
                <a href='#'>비밀번호 찾기</a>
              </div>
              <div className='sign-in-google'>
                <p>or</p>
                <button type='button'>
                  <i className='bi bi-google'></i>
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
