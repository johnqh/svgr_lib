export interface SvgrAppConfig {
  apiUrl: string;
  appName: string;
  appDomain: string;
  companyName: string;
  firebase: FirebaseConfig;
  revenueCat?: RevenueCatConfig;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface RevenueCatConfig {
  apiKeyApple?: string;
  apiKeyGoogle?: string;
  offerId: string;
  entitlementId: string;
}
