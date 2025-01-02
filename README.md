# Inconsistent Error Handling in Expo Linking.openURLAsync

This repository demonstrates an issue with the Expo `Linking.openURLAsync` function.  When attempting to open a URL that requires an external application which is not installed, the error handling is inconsistent across platforms and Expo versions.

## Problem

The `Linking.openURLAsync` promise sometimes rejects with an error indicating the app is not installed, while other times it rejects with a more generic error or even silently fails.

## Solution

The solution involves handling potential errors more robustly by checking for the existence of the external app before attempting to open the URL or by providing more specific error handling. This example shows both methods and utilizes a timeout to resolve the inconsistency.

## Reproduction

1. Clone this repository.
2. Run `expo start`.
3. Try opening a URL that requires an external app not installed on the device.
4. Observe the inconsistent error behavior.