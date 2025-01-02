// bug.js
import * as Linking from 'expo-linking';

async function openURL(url) {
  try {
    const result = await Linking.openURLAsync(url);
    console.log('URL opened successfully:', result);
  } catch (error) {
    console.error('Error opening URL:', error);
  }
}

// bugSolution.js
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

async function openURL(url) {
  try {
    // Check if the app is installed (implementation depends on your app)
    const appInstalled = await checkAppInstalled(url);
    if (!appInstalled) {
      console.warn('App not installed, handling fallback...');
      // Open in browser or show an alert
      await Linking.openURLAsync(url); // or handle differently
      return; 
    }
    const result = await Promise.race([
      Linking.openURLAsync(url),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout opening URL')), 5000)), // Timeout after 5 seconds
    ]);
    console.log('URL opened successfully:', result);
  } catch (error) {
    if (error.message === 'Timeout opening URL') {
      console.error('Timeout opening URL, probably not installed');
    } else {
      console.error('Error opening URL:', error);
    }
  }
}

async function checkAppInstalled(url) {
  // Implementation to check if the app associated with the URL is installed
  // This will vary greatly based on your specific URL schemes
  // For example, you might check for a specific bundle ID on iOS or package name on Android
  // For web URLs, you don't need to check installation
  if(Platform.OS === 'ios' && url.includes('myapp://')) {
      return false; // Replace with actual check
  } else if (Platform.OS === 'android' && url.includes('myapp://')) {
      return false; // Replace with actual check
  }
  return true; // Or implement your check logic
}
