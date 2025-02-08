import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.2points.allsports',
  appName: 'All Sports',
  webDir: 'www',
  "ios": {
    "minVersion": "14.0" // Optional: Define the minimum iOS version
  },
  plugins: {

    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com",
      "androidClientId" : "50674324828-ttsgqtanevguj8etpop5ikmmc0b2mqmj.apps.googleusercontent.com",
      "iosClientId" : "50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    },
    "my-image-gallery-saver": {} // Add your plugin here

  }
};

export default config;
