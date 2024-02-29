//非同期関数なので使用する場合はasync関数の中で使う
//company_idとrelease_idはfetchRelease関数で取ってきたDataにあります。
export const fetchRelease = async(company_id,release_id,prtimesToken) => {
    const BASE_URL = "https://hackathon.stg-prtimes.net/api";
    const url = `${BASE_URL}/companies/${company_id}/releases/${release_id}/locations`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${prtimesToken}`,
    };

    return fetch(url, { headers }) // return を追加
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
