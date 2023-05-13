export const possibleResponses = (text) => {
  switch (text) {
    case "Unable to validate ID - Result Not Found":
      return "KYC Verification failed, provided ID Number was not found"

    case "Failed Enroll - Spoof Detected":
      return "KYC Verification failed, check your provided selfie and try again"

    case "Failed Enroll - No Face Match":
      return "KYC Verification failed, face doesn't match"

    case "Failed Enroll - No face detected":
      return "KYC Verification failed, face doesn't match"

    case "Failed Enroll - Possible Spoof Detected":
      return "KYC Verification failed, check your provided selfie and try again"


    default:
      return "KYC Verification failed, check ID number and try again"
  }
}