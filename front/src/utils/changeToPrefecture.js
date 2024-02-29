export const changeToPrefecture = async(latitude, longitude, mapboxToken) => {
    const PrefectureURL = "https://api.mapbox.com/search/v1/reverse";
    const fetchPrefectureURL = `${PrefectureURL}/${longitude},${latitude}?language=ja&access_token=${mapboxToken}`;
    console.log(latitude,longitude);
    const res = await fetch(fetchPrefectureURL);
    const data = await res.json();
    const location = data["features"][0]["properties"]["context"][4]["name"];

    return location;
}