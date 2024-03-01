export async function getPrefectureName({ latitude, longitude }, mapboxToken) {
    if (latitude === null & longitude === null) {
        return "";
    }
    const AddressURL = "https://api.mapbox.com/search/searchbox/v1/reverse";
    const fetchAddressURL = `${AddressURL}?longitude=${longitude}&latitude=${latitude}&language=ja&types=prefecture&access_token=${mapboxToken}`;

    console.log(fetchAddressURL);
    const res = await fetch(fetchAddressURL);
    const data = await res.json();
    return data.features[0].properties.name;
}