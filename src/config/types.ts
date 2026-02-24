/**
 * Top-level configuration for an SVGR application instance.
 *
 * Contains API connection details, branding information,
 * and optional third-party service configurations.
 */
export interface SvgrAppConfig {
  /** The base URL for the SVGR API (e.g., `'https://api.svgr.app'`). */
  apiUrl: string;
  /** The display name of the application. */
  appName: string;
  /** The primary domain of the application. */
  appDomain: string;
  /** The name of the publishing company. */
  companyName: string;
  /** Firebase configuration for authentication and other Firebase services. */
  firebase: FirebaseConfig;
  /** Optional RevenueCat configuration for in-app purchases and credits. */
  revenueCat?: RevenueCatConfig;
}

/**
 * Firebase project configuration required for Firebase SDK initialization.
 *
 * All fields except `measurementId` are required for Firebase Authentication.
 */
export interface FirebaseConfig {
  /** The Firebase API key. */
  apiKey: string;
  /** The Firebase Auth domain (e.g., `'myproject.firebaseapp.com'`). */
  authDomain: string;
  /** The Firebase project ID. */
  projectId: string;
  /** The Firebase Cloud Storage bucket. */
  storageBucket: string;
  /** The Firebase Cloud Messaging sender ID. */
  messagingSenderId: string;
  /** The Firebase app ID. */
  appId: string;
  /** Optional Google Analytics measurement ID for Firebase Analytics. */
  measurementId?: string;
}

/**
 * RevenueCat configuration for managing in-app purchases and credits.
 *
 * Platform-specific API keys are optional since a single app instance
 * only targets one platform at a time.
 */
export interface RevenueCatConfig {
  /** RevenueCat API key for Apple App Store (iOS/macOS). */
  apiKeyApple?: string;
  /** RevenueCat API key for Google Play Store (Android). */
  apiKeyGoogle?: string;
  /** The offer identifier for the subscription/credit product. */
  offerId: string;
  /** The entitlement identifier that grants access to premium features. */
  entitlementId: string;
}
