export const API_URL = "http://localhost:8080";

export async function getAPI(url, params) {
  console.log(url, params);
  const res = await fetch(url, params);
  console.log(res, "----res");
  if (!res.ok) throw new Error("에러");
  return res.json();
}
