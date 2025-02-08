import Capacitor
import Photos

@objc(ImageGallerySaver)
public class ImageGallerySaver: CAPPlugin {

    @objc func saveImageToGallery(_ call: CAPPluginCall) {
        guard let fileName = call.getString("fileName") else {
            call.reject("FileName is required.")
            return
        }

        // 1. Get the Image Path 
        guard let imagePath = Bundle.main.path(forResource: fileName, ofType: "jpg") else { 
            call.reject("Image not found") 
            return 
        }

        // 2. Check if the image exists at the given path
        guard let image = UIImage(contentsOfFile: imagePath) else {
            call.reject("Error: Could not load image from path.")
            return
        }

        // 3. Save Image to Photo Library
        UIImageWriteToSavedPhotosAlbum(image, self, #selector(self.image(_:didFinishSavingWithError:contextInfo:)), Unmanaged.passUnretained(call).toOpaque())
    }

    @objc func image(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
        let call = Unmanaged<CAPPluginCall>.fromOpaque(contextInfo).takeUnretainedValue()
        if let error = error {
            call.reject("Error saving image: \(error.localizedDescription)")
        } else {
            call.resolve(["saved": true])
        }
    }
}