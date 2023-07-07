import AWS from "aws-sdk";
import fs from "fs";

export const guidelinesArr = [
  {
    title: "Photo size",
    text: "Standard format: 2 x 2 inches (or 51 x 51 mm) in size (White Background)",
  },
  {
    title: "Width of face",
    text: "Between 16 mm and 20 mm from ear to ear.",
  },
  {
    title: "Length of face",
    text: "Ages 11 and above: between 26 mm and 30 mm from chin to crown.",
    img: "length-of-face",
    errors: ["other side not visible", "not centeralized"],
  },
  {
    title: "Quality of photo",
    list: [
      "colour photo",
      "true likeness and no more than six months old when the application is submitted",
      "natural representation",
      "sharp image, with sufficient contrast and detail",
      "undamaged",
      "not a reproduction (copy)",
      "unaltered by computer software",
      "printed on high-quality, smooth photo paper",
      "minimum 400 dpi resolution",
    ],
    img: "quality-of-photo",
    errors: ["blurry image", "too little contrast"],
  },
  {
    title: "Glasses",
    list: [
      "eyes fully visible",
      "fully transparent lenses",
      "no glare on the glasses",
      "no shadow",
    ],
    img: "glasses",
    errors: ["blurry image", "too little contrast"],
  },
];

export const guidelines2 = [
  {
    title: "Lightning",
    list: [
      "even",
      "not overexposed or underexposed",
      "no shadow on the face or in the background",
      "no reflection on the face",
      "no reflection caused by accessories",
    ],
    img: "lightning",
    errors: ["non-uniform color"],
  },
  {
    title: "Position",
    list: [
      "head facing forward",
      "eyes horizontally aligned",
      "head not tilted",
      "shoulders straight",
    ],
    img: "position",
    errors: ["head tilted"],
  },
  {
    title: "Background",
    list: [
      "White",
      "plain",
      "all one colour",
      "uniform colour (no fade)",
      "sufficient contrast with head",
    ],
    img: "background",
    errors: ["head tilted"],
  },
];

export const boysHostels = [
  "Eni Njoku",
  "King Jaja",
  "Mariere",
  "Saburi Biobaku",
  "Sodeinde",
  "The El Kanemi",
];

export const girlsHostels = [
  "Fagunwa",
  "Kofo Ademola",
  "Madam Tinubu",
  "Honours",
  "Queen Amina",
  "Makama-Bida",
  "Queen Moremi",
];

export function numberWithCommas(x) {
  var parts = x?.toString()?.split(".");
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const convertDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  var hour;
  if (hours > 12) {
    hour = hours - 12;
  } else {
    hour = hours;
  }
  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year} ${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${hours > 12 ? `PM` : `AM`}`;
};
function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export async function convertImg(imageUrl) {
  // const baseUrl = process.env.IMAGE_URL
  const baseUrl =
    "https://studentportalbeta.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo=";
  try {
    const response = await fetch(baseUrl + imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
}

export const facialRecogntion = (img1, img2) => {
  // Set up AWS credentials and region
  AWS.config.update({ region: "YOUR_AWS_REGION" });

  // Create an instance of the Rekognition service
  const rekognition = new AWS.Rekognition();

  // Base64-encoded images
  const image1Base64 = img1;
  const image2Base64 = img2;

  // Helper function to convert base64 to binary data
  const base64ToBuffer = (base64String) => {
    const binaryString = Buffer.from(base64String, "base64");
    return binaryString;
  };
  // Convert base64 images to binary data
  const image1Buffer = base64ToBuffer(image1Base64);
  const image2Buffer = base64ToBuffer(image2Base64);
  // Perform facial comparison
  // const compareFaces = () => {
  const params = {
    SimilarityThreshold: 90,
    SourceImage: {
      Bytes: image1Buffer,
    },
    TargetImage: {
      Bytes: image2Buffer,
    },
  };

  return new Promise((resolve, reject) => {
    rekognition.compareFaces(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  // };
};
export const imageToBase64 = (URL) => {
  let image;
  image = new Image();
  image.crossOrigin = 'Anonymous';
  image.addEventListener('load', function() {
    console.log()
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      try {
        console.log(canvas.toDataURL('image/png'))
          localStorage.setItem('saved-image-example', canvas.toDataURL('image/png'));
      } catch (err) {
          console.error(err)
      }
  });
  image.src = URL;
};


export function imageTo64(
  url: string, 
  callback: (path64: string | ArrayBuffer) => void
): void {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();

  xhr.onload = (): void => {
    const reader = new FileReader();
    reader.readAsDataURL(xhr.response);
    reader.onloadend = (): void => callback(reader.result);
  }
}


export const getColor = (status) => {
  var statusNew = status.toLowerCase()
  switch (statusNew) {
    case "approved":
      return {
        bg: "#ECFDF3",
        text: "#027A48"
      }

    case "pending":
      return {
        bg: "#FFF8E2",
        text: "#F79009",
      }
    case "rejected":
      return {
        bg: "#FFECEF",
        text: "#DD6262"
      }
    case "reversed":
      return {
        bg: "#EEEEEE",
        text: "#000000"
      }
    default:
      return {
        bg: "#FEFEFE",
        text: "#000000"
      }
  }
}