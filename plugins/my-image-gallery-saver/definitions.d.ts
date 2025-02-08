declare module '@capacitor/core' {
    interface PluginRegistry {
      Plugins: {
        ImageGallerySaver: {
          saveImageToGallery(options: { fileName: string }): Promise<{ saved: boolean }>;
        };
      };
    }
  }