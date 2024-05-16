import { Image } from "react-native";
import FastImage from "react-native-fast-image";

function preloadImages() {
    const images = [
      require("../assets/images/miniLogo.png"),
      require("../assets/images/robot.png")
    ];
  
    const uris = images.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));
  
    FastImage.preload(uris);
}

export default preloadImages;