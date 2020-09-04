let send_in = document.querySelector('.send-in');
let send_up = document.querySelector('.send-up');
let signup_email_format = document.querySelector('.account_up');
let signup_password_format = document.querySelector('.password_up');

let signin_page = document.querySelector('.sign-in');
let signup_page = document.querySelector('.sign-up');
let signfail_page = document.querySelector('.sign-in-fail');
let signsuccess_page = document.querySelector('.sign-in-success')
let signUpsuccess_page = document.querySelector('.sign-up-success')
let signUpFail_page = document.querySelector('.sign-up-fail')
let content = document.querySelector('.content');
let reIn = document.querySelector('.send-rein');
let reup = document.querySelector('.send-reup');
let upfail_reup = document.querySelector('.upfail-reup');
let upfail_rein = document.querySelector('.upfail-rein');

let topIn = document.querySelector('.in');
let topUp = document.querySelector('.up');
let upSuccess = document.querySelector('.send-upin');
let goUp = document.querySelector('.gotoup');
let url_in = 'https://hexschool-tutorial.herokuapp.com/api/signin'
let url_up = 'https://hexschool-tutorial.herokuapp.com/api/signup'


send_in.addEventListener('click', data_not_empty);
send_up.addEventListener('click', data_not_empty_up);
reIn.addEventListener('click', gotoIn);
reup.addEventListener('click', gotoUp);
topIn.addEventListener('click', gotoIn);
topUp.addEventListener('click', gotoUp);
goUp.addEventListener('click', gotoUp);
upSuccess.addEventListener('click', gotoIn);
upfail_reup.addEventListener('click', gotoUp);
upfail_rein.addEventListener('click', gotoIn);



signup_email_format.addEventListener('blur', email_check);
signup_password_format.addEventListener('blur', password_check);
function data_not_empty() {
    let account = document.querySelector('.account').value;
    let password = document.querySelector('.password').value;
    if (account == '' || password == '') {
        alert('帳號或密碼不可空白');
        if (account == '') {
            var focus = document.querySelector('.account');
            focus.focus()
        } else {
            var focus = document.querySelector('.password');
            focus.focus()
        }
    } else {

        signin(account, password);

    }
}
function data_not_empty_up() {
    let account = document.querySelector('.account_up').value;
    let password = document.querySelector('.password_up').value;
    if (account == '' || password == '') {
        alert('帳號或密碼不可空白');
        if (account == '') {
            var focus = document.querySelector('.account_up');
            focus.focus()
        } else {
            var focus = document.querySelector('.password_up');
            focus.focus()
        }
    } else {

        signup(account, password);

    }
}
function reset() {
    document.querySelector('.account').value = '';
    document.querySelector('.password').value = '';
    document.querySelector('.account_up').value = '';
    document.querySelector('.password_up').value = '';
}
function gotoIn() {
    reset()
    signin_page.style = 'display:flex';
    topIn.classList.add('active')
    topUp.classList.remove("active");
    signup_page.style = 'display:none';
    signfail_page.style = 'display:none'
    signsuccess_page.style = 'display:none';
    signUpsuccess_page.style = 'display:none';
    signUpFail_page.style = 'display:none';
    document.querySelector('.password-alert').style = 'display:none';
    document.querySelector('.email-alert').style = 'display:none';
}


function gotoUp() {
    reset()
    signin_page.style = 'display:none';
    signup_page.style = 'display:flex';
    signfail_page.style = 'display:none';
    signsuccess_page.style = 'display:none';
    signUpsuccess_page.style = 'display:none';
    topIn.classList.remove("active")
    topUp.classList.add('active')
    signUpFail_page.style = 'display:none';
    document.querySelector('.password-alert').style = 'display:none';
    document.querySelector('.email-alert').style = 'display:none';
}

function email_check() {
    let account = document.querySelector('.account_up').value;
    let format = account.match(/[@][A-Za-z0-9]+\.[A-Za-z]+/);
    if (format == null) {
        document.querySelector('.email-alert').style = 'display:block';

        return false;
    } else {
        document.querySelector('.email-alert').style = 'display:none';
        return true;
    }

}
function password_check() {
    let password = document.querySelector('.password_up').value;
    password = password.replace(/(^[\s]*)|([\s]*$)/g, "");

    let password_len = password.length
    let formatNum = password.match(/[0-9]+/);
    let formatEng = password.match(/[a-zA-Z]+/);
    if (password_len < 8) {
        document.querySelector('.password-alert').style = 'display:block';
        document.querySelector('.password-alert').textContent = '密碼需包含至少8個字元且字母及數字至少都要一個';
        return false;
    }
    else if (formatNum == null || formatEng == null) {
        document.querySelector('.password-alert').style = 'display:block';
        document.querySelector('.password-alert').textContent = '字母及數字至少都要一個';
        return false;
    }
    else {
        document.querySelector('.password-alert').style = 'display:none';
        return true
    }

}
function signin(account, password) {
    let data = {};
    data.email = account;
    data.password = password;
    let xhr = new XMLHttpRequest;
    xhr.open('post', url_in, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    let str = JSON.stringify(data);
    xhr.send(str);
    xhr.onload = function () {
        reset();
        var state = JSON.parse(xhr.responseText).message
        console.log(state);
        if (state == '登入成功') {
            signsuccess_page.style = 'display:block';
            signin_page.style = 'display:none';
            signup_page.style = 'display:none';
            signfail_page.style = 'display:none';
            signUpFail_page.style = 'display:none';
            signUpsuccess_page.style = 'display:none';
        } else {
            signin_page.style = 'display:none';
            signup_page.style = 'display:none';
            signfail_page.style = 'display:block';
            signsuccess_page.style = 'display:none'
            signUpFail_page.style = 'display:none';
            signUpsuccess_page.style = 'display:none';
        }
    }

}

function signup(account, password) {
    let checkEmail = email_check();
    let checkpassword = password_check()

    if (checkEmail && checkpassword) {

        let data = {};
        data.email = account;
        data.password = password;
        let upxhr = new XMLHttpRequest;
        upxhr.open('post', url_up, true);

        upxhr.setRequestHeader('Content-Type', 'application/json');
        let str = JSON.stringify(data);
        upxhr.send(str);
        upxhr.onload = function () {
            reset();
            var state = JSON.parse(upxhr.responseText).message
            console.log(state);
            if (state == '帳號註冊成功') {
                signsuccess_page.style = 'display:none';
                signin_page.style = 'display:none';
                signup_page.style = 'display:none';
                signfail_page.style = 'display:none';
                signUpsuccess_page.style = 'display:block';
                signUpFail_page.style = 'display:none';
            }
            else {
                signsuccess_page.style = 'display:none';
                signin_page.style = 'display:none';
                signup_page.style = 'display:none';
                signfail_page.style = 'display:none';
                signUpsuccess_page.style = 'display:none';
                signUpFail_page.style = 'display:block';
            }
        }
    } else {
        alert('請輸入正確格式的帳號或密碼');
        if (checkEmail) {
            var focus = document.querySelector('.account_up');
            signup_password_format.focus()
        } else {

            signup_email_format.focus()
        }
    }
}
