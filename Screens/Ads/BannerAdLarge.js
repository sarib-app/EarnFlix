import react from "react";
import { BannerAd, BannerAdSize, TestIds, } from 'react-native-google-mobile-ads';

const bannerId ="ca-app-pub-8470925379014713/9975808116"
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