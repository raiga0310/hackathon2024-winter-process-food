import { loadPrtmiesToken } from "./loadToken";
import { fetchPrefectureId } from "./fetchPrefecture";
import { fetchRelease } from "./fetchReleases";
import { fetchReleaseLocation } from "./fetchReleaseLocation";

//都道府県名を入力するとその都道府県に該当するプレスリリースの会社の住所をキーとした連想配列を取得します
export const fetchApiData=async(prefecture_name)=>{
    const prefectureId=await fetchPrefectureId(prefecture_name,loadPrtmiesToken())
    const releases=await fetchRelease(prefectureId,loadPrtmiesToken())
    const releaseAddres = {};

    for (const key in releases) {
      const releaseLocation=await fetchReleaseLocation(releases[key]["company_id"],loadPrtmiesToken())
      if (releaseLocation in releaseAddres) {
        releaseAddres[releaseLocation].push(releases[key])
        const uniqueRelease=Array.from(
          new Map(releaseAddres[releaseLocation].map((relseseObj) => [relseseObj.body, relseseObj])).values()
        );
        releaseAddres[releaseLocation]=uniqueRelease
      }else{
        releaseAddres[releaseLocation]=[releases[key]]
      }
    }
    return releaseAddres
  }
