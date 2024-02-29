export const fetchMapImage = async(address, mapboxToken) => {
    const AddressURL = "https://api.mapbox.com/search/v1/permanent/forward";
    const fetchAddressURL = `${AddressURL}/${address}?language=ja&access_token=${mapboxToken}`;

    const res = await fetch(fetchAddressURL);
    const data = await res.json();
    const location = data["features"][0]["geometry"]["coordinates"];

    const ImageURL = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static";
    const fetchImageURL = `${ImageURL}/${location[0]},${location[1]},10,0/500x500?access_token=${mapboxToken}`;

    return fetchImageURL;
};