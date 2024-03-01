//アドレスを受け取り、緯度と経度のリストを返します。
export const geocoding = async(addres,mapboxToken) => {
    const AddressURL = "https://api.mapbox.com/search/geocode/v6/forward"
    const fetchAddressURL = `${AddressURL}?q=${addres}&access_token=${mapboxToken}`;

    const res = await fetch(fetchAddressURL);
    const data = await res.json();
    const [longitude,latitude]=data["features"][0]["geometry"]["coordinates"]

    return [longitude,latitude];
};
