import { NextApiRequest, NextApiResponse } from "next";
import { model } from "mongoose";
import { faker } from "@faker-js/faker"; // Import faker from '@faker-js/faker'
import { User } from "@/lib/models";
import {
  arts,
  education,
  engineering,
  environmental_science,
  faculties,
  law,
  medical_sciences,
  science,
  social_sciences,
} from "@/utils/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // function generateUniqueNumber() {
  //   var min: 160403001, max: 160403090;
  //   let number = faker.random.number({ min, max });
  //   while (usedNumbers.has(number)) {
  //     number = faker.random.number({ min, max });
  //   }
  //   usedNumbers.add(number);
  //   return number;
  // }

  function generateUniqueNumber() {
    const min = 170403501;
    const max = 170403530;
    const usedNumbers = new Set();
    let number = faker.number.int({ min, max });

    while (usedNumbers.has(number) || String(number).length !== 9) {
      number = faker.number.int({ min, max });
    }

    usedNumbers.add(number);
    return number;
  }

  const getHostel = (gender) => {
    if (gender === "male") {
      return faker.helpers.arrayElement([
        "Eni Njoku",
        "King Jaja",
        "Mariere",
        "Saburi Biobaku",
        "Sodeinde",
        "The El Kanemi",
      ]);
    } else {
      return faker.helpers.arrayElement([
        "Fagunwa",
        "Kofo Ademola",
        "Madam Tinubu",
        "Honours",
        "Queen Amina",
        "Makama-Bida",
        "Queen Moremi",
      ]);
    }
  };

  const getDepartment = (faculty) => {

    switch (faculty) {
      case "arts":
        return faker.helpers.arrayElement(arts);

      case "medical_sciences":
        return faker.helpers.arrayElement(medical_sciences);

      case "education":
        return faker.helpers.arrayElement(education);

      case "engineering":
        return faker.helpers.arrayElement(engineering);

      case "law":
        return faker.helpers.arrayElement(law);

      case "environmental_science":
        return faker.helpers.arrayElement(environmental_science);

      case "science":
        return faker.helpers.arrayElement(science);

      case "social_sciences":
        return faker.helpers.arrayElement(social_sciences);
        
        default:
        return faker.helpers.arrayElement(engineering);
    }
  };

  try {
    const createdSamples = [];

    for (let i = 0; i < 20; i++) {
      const matricNo = generateUniqueNumber();

      const surname = faker.person.lastName();
      const password = surname.toLowerCase();
      const gender = faker.helpers.arrayElement(["male", "female"]);
      const hostel = getHostel(gender);
      const faculty = faker.helpers.arrayElement([
        "arts",
        "education",
        "engineering",
        "environmental_science",
        "law",
        "management_sciences",
        "medical_sciences",
        "science",
        "social_sciences",
      ]);
      const department = getDepartment(faculty);

      const sampleData = {
        firstName: faker.person.firstName(),
        lastName: surname,
        otherNames: faker.person.firstName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.past().toLocaleDateString(),
        gender: faker.helpers.arrayElement(["male", "female"]),
        newStudent: faker.helpers.arrayElement([true, false]),
        firstLogin: faker.helpers.arrayElement([true, false]),
        title: faker.helpers.arrayElement(["Mr", "Mrs", "Miss"]),
        department,
        faculty,
        hostel,
        yearOfAdmission: faker.helpers.arrayElement([
          "2016/2017",
          "2017/2018",
          "2018/2019",
        ]),
        matricNo,
        password,
        address: faker.location.streetAddress(),
        status: faker.helpers.arrayElement(["single", "married", "divorced"]),
      };

      const createdSample = await User.create(sampleData);
      createdSamples.push(createdSample);
    }

    res.status(200).json({
      message: "Users created successfully",
      users: createdSamples,
    });
  } catch (error) {
    console.error("Error creating samples:", error);
    res.status(500).json({ error: "Server error" });
  }
}
