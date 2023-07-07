import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Admin App',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.0.103:3000',
    cleartext: true,
  }
};

export default config;
