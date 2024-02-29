export const fetchPrefecture = async(prefecture_name, prtimesToken) => {
    const BASE_URL = "https://hackathon.stg-prtimes.net/api";
    const url = `${BASE_URL}/prefectures`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${prtimesToken}`,
    };

    return fetch(url, { headers }) // return を追加
      .then((response) => response.json())
      .then((data) => {
        const filterData=data.filter(Element=>Element["name"]===prefecture_name)
        return filterData[0]["id"]
      })
      .catch((error) => console.error("Error fetching data:", error));
  };