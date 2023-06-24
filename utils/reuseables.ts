import cogotoast from "@/components/toaster";

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

export async function convertImg(imageUrl) {
  // const baseUrl = process.env.IMAGE_URL
  const baseUrl = 'https://studentportal.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo='
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
    console.error('Error converting image to base64:', error);
    throw error;
  }
}
