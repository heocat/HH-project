import { API_BASE_URL } from "../app-config";

//로그인에 관련되지 않은 모든 API콜은 call메서드를 통해 이뤄짐, 따라서 반복을 피하려면
//call에 토큰이 존재하는 경우 헤더에 추가하는 로직을 작성
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  //로컬스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer" + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch(error => {
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = "/login"; //redirect
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then(response => {
    if (response.token) {
      console.log(response.token);
      //로컬 스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      //토큰이 존재하는 경우 todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}
