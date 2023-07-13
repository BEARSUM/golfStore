export const API_URL = 'http://kdt-sw-5-team06.elicecoding.com';

export async function getAPI(url, params) {
  console.log(url, params);
  const res = await fetch(url, params);
  console.log(res, '----res');
  if (!res.ok) throw new Error('에러');
  return res.json();
}
