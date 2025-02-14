import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.2points.allsports',
  appName: 'All Sports',
  webDir: 'www',
  server: {
    allowNavigation: ['srv620695.hstgr.cloud'],
    iosScheme: 'allsports', // This is your custom scheme
  },
  ios: {
    minVersion: '14.0', // Optional: Define the minimum iOS version
  },
  plugins: {
    'capacitor-social-login': {
      apple: {
        clientId: 'connect.com.2points.allsports', // Apple Service ID
        scopes: ['email', 'name'], // Define required scopes
      },
      google: {
        serverClientId: "50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com", // Google OAuth Server Client ID
        androidClientId: "50674324828-ttsgqtanevguj8etpop5ikmmc0b2mqmj.apps.googleusercontent.com", // Google OAuth Android Client ID
        iosClientId: "50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com", // Google OAuth iOS Client ID
        forceCodeForRefreshToken: true, // Forces the use of a refresh token for all OAuth logins
        scopes: ['profile', 'email'], // Scopes for Google Sign-In
      },
    },
    'my-image-gallery-saver': {}, // Your custom plugin configuration here
  },
};

export default config;
