// 로그인 정보 저장
export function LoginSession(username, usernm, sub) {
// function LoginSession(username, token) {
    // token : 보안용
    // print('로그인 성공');
    sessionStorage.setItem('userid', username);
    sessionStorage.setItem('usernm', usernm);
    sessionStorage.setItem('sub', sub);
    // sessionStorage.setItem('token', token);
}

// 로그인 정보 삭제
export function LogoutSession() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('usernm');
    sessionStorage.removeItem('sub');
    // sessionStorage.removeItem('token');
}

// get
export function getLoginSession() {
    return {
        username: sessionStorage.getItem('userid'),
        usernm: sessionStorage.getItem('usernm'),
        sub: sessionStorage.getItem('sub'),
        // token: sessionStorage.getItem('token')
    };
}