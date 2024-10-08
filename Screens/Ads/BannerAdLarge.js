import react from "react";
import { BannerAd, BannerAdSize, TestIds, } from 'react-native-google-mobile-ads';

const bannerId ="ca-app-pub-3440105356857943/5992630767"
const adUnitId = __DEV__ ? TestIds.BANNER : bannerId;
function BannerAdLarge(){
    return(

<BannerAd 
        unitId={adUnitId}
      
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />

    )
}

export default BannerAdLarge