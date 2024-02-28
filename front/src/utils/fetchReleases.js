//非同期関数なので使用する場合はasync関数の中で使う
export const fetchRelease = async(prefecture_id, prtimesToken) => {
    const BASE_URL = "https://hackathon.stg-prtimes.net/api";
    const url = `${BASE_URL}/prefectures/${prefecture_id}/releases`;
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
