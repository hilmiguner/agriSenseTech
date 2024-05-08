import { Image } from "react-native";
import FastImage from "react-native-fast-image";

function preloadImages() {
    const images = [
      require("../assets/images/background.jpg"),
      require("../assets/images/miniLogo.png"),
    ];
  
    const uris = images.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));
  
    FastImage.preload(uris);
}

export default preloadImages;