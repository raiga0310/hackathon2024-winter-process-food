export const fetchMapImage = async(mapboxToken, address) => {
    const AddressURL = "https://api.mapbox.com/search/v1/permanent/forward";
    if(address == null){
        address="東京都";
    }
    const fetchAddressURL = `${AddressURL}/${address}?language=ja&access_token=${mapboxToken}`;

    const res = await fetch(fetchAddressURL);
    const data = await res.json();
    const location = data["features"][0]["geometry"]["coordinates"];

    const ImageURL = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static";
    const fetchImageURL = `${ImageURL}/${location[0]},${location[1]},10,0/700x500?access_token=${mapboxToken}`;

    return fetchImageURL;
};
