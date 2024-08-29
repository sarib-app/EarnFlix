import react from "react";
import { BannerAd, BannerAdSize, TestIds, } from 'react-native-google-mobile-ads';

const bannerId ="ca-app-pub-3440105356857943/5992630767"
const adUnitId = __DEV__ ? TestIds.BANNER : bannerId;
function BannerAdSmall(){
    return(

<BannerAd 
        unitId={adUnitId}
      
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />

    )
}

export default BannerAdSmall