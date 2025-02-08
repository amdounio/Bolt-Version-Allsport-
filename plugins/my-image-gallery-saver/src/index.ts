import { registerPlugin } from '@capacitor/core';

export interface ImageGallerySaverPlugin {
  saveImageToGallery(options: { fileName: string }): Promise<{ saved: boolean }>;
}

const ImageGallerySaver = registerPlugin<ImageGallerySaverPlugin>('ImageGallerySaver');

export { ImageGallerySaver };
