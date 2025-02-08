import { Plugins } from '@capacitor/core';

interface ImageGallerySaverPlugin {
  saveImageToGallery(options: { fileName: string }): Promise<{ saved: boolean }>;
}

declare const ImageGallerySaver: ImageGallerySaverPlugin & {
  register: (
    pluginName: 'ImageGallerySaver',
    plugin: {
      ios: string; // Replace with the actual path to your iOS implementation (e.g., 'ios/Plugin')
    }
  ) => void;
};

export { ImageGallerySaver };