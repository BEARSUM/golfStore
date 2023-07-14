// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "", data = {}) {
  const apiUrl = `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);

  console.log(`DELETE 요청 ${apiUrl}`);
  console.log(`DELETE 요청 데이터: ${bodyData}`);

  const res = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// 아래처럼 export하면, import * as Api 로 할 시 Api.get, Api.post 등으로 쓸 수 있음.
export { get, post, put, del as delete };

//

async function getAPI(url, params) {
  const res = await fetch(url, params);
  if (!res.ok) throw new Error("에러가 발생했습니다.");
  return res.json();
}

async function leaveUser() {
  try {
    const data = await getAPI(
      "http://kdt-sw-5-team06.elicecoding.com/users/:userId",
      { method: "DELETE" }
    );
    console.log(data);
  } catch {
    alert("에러가 발생했습니다.");
  }
}
