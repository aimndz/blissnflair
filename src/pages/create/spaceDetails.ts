import React from "react";
import { CloudSun, LampWallUp, Sofa } from "lucide-react";
import privateRoomImg from "../../images/private_room.jpg";
import alFrescoImg from "../../images/al_fresco.jpg";
import functionHallImg from "../../images/function_hall.jpg";

const eventServices = [
  {
    id: 1,
    name: "Lounge Hall",
    value: "lounge hall",
    image: privateRoomImg,
    floorLevel: "Ground Floor",
    floorArea: "78",
    capacity: "20 to 40",
    icon: React.createElement(Sofa, { className: "mx-auto", size: 50 }),
    rates: {
      title: "4 Hours Venue Usage",
      "mon-thurs": 8500,
      "fri-sun": 10500,
      additionalVAT: 0.12,
      additionalPerHour: 1000,
      cleaningFee: 0,
      corkageFee: 3000,
    },
    packages: null,
    inclusions: [
      "Versatile Space with Classic Interior",
      "Floor Mounted Air Conditioner",
      "Tables and Chairs (w/out decorative setup)",
      "Platforms",
      "Private Room [3 Hours]",
      "Projector w/ Screen",
      "Speaker w/ 2 Microphones",
      "Comfort Room",
      "Accent Chairs",
      "Free Parking Space w/ Marshal",
    ],
    note: [
      "The air conditioning will be available 30 minutes before the event.",
      "50% Downpayment - Non Refundable",
      "Rebooking is permitted up to two times but is subject to availability of dates.",
    ],
    additionalNote: [
      {
        title: "Ingress",
        description: "3 hours before the event",
      },
      {
        title: "Egress",
        description: "3 hours after the event",
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Private Room",
  //   value: "private room",
  //   image: privateRoomImg,
  //   floorLevel: "Ground Floor",
  //   floorArea: "0",
  //   capacity: "2",
  //   icon: React.createElement(DoorClosed, { className: "mx-auto", size: 50 }),
  //   rates: null,
  //   packages: {
  //     packageRates: [
  //       {
  //         title: "Package 1",
  //         Description: "3 Hours Stay",
  //         price: 400,
  //       },
  //       {
  //         title: "Package 2",
  //         Description: "6 Hours Stay",
  //         price: 700,
  //       },
  //       {
  //         title: "Package 3",
  //         Description: "12 Hours Stay",
  //         price: 1000,
  //       },
  //       {
  //         title: "Package 4",
  //         Description: "22 Hours Stay",
  //         price: 1350,
  //       },
  //     ],
  //     additionalHead: 200,
  //     additionalHour: 200,
  //   },
  //   inclusions: [
  //     "Queen-size Bed",
  //     "Wifi",
  //     "Smart Wall Mounted Smart Television",
  //     "Hot & Cold Shower w/ Basic Toiletries",
  //     "Netflix",
  //     "Air Conditioned",
  //     "Private Comfort Room",
  //     "Vanity Mirror",
  //     "Cabinet",
  //     "Wall Clock",
  //     "Small Console Table w/ Lamp",
  //     "Free Parking Space",
  //   ],
  //   note: [
  //     "This is a NON-SMOKING room. A cleaning fee of PHP 5,000 will be imposed for any smoking violations to cover the cost of overall cleaning and restoration of the room.",
  //   ],
  //   additionalNote: [],
  // },
  {
    id: 3,
    name: "Function Hall",
    value: "function hall",
    image: functionHallImg,
    floorLevel: "2nd Floor",
    floorArea: "277",
    capacity: "150 to 200",
    icon: React.createElement(LampWallUp, { className: "mx-auto", size: 50 }),
    rates: {
      title: "4 Hours Venue Usage",
      "mon-thurs": 15000,
      "fri-sun": 17000,
      additionalVAT: 0.12,
      additionalPerHour: 5000,
      cleaningFee: 1500,
      corkageFee: 3000,
    },
    packages: null,
    inclusions: [
      "Versatile Space with Classic Interior",
      "Floor Mounted Air Conditioner",
      "Platforms",
      "Tables and Chairs (w/out decorative setup)",
      "Projector w/ Screen",
      "Speaker w/ 2 Microphones",
      "4 Comfort Rooms",
      "Accent Chairs",
      "Free Parking Space w/ Marshal",
    ],
    note: [
      "The air conditioning will be available 30 minutes before the event.",
      "50% Downpayment - Non Refundable",
      "Rebooking is permitted up to two times but is subject to availability of dates.",
    ],
    additionalNote: [
      {
        title: "Ingress",
        description: "3 hours before the event",
      },
      {
        title: "Egress",
        description: "3 hours after the event",
      },
    ],
  },

  {
    id: 4,
    name: "Al Fresco",
    value: "al fresco",
    image: alFrescoImg,
    floorLevel: "3rd Floor",
    floorArea: "0",
    capacity: "40 to 50",
    icon: React.createElement(CloudSun, { className: "mx-auto", size: 50 }),
    rates: {
      title: "3 Hours Venue Usage",
      "mon-thurs": 4500,
      "fri-sun": 5500,
      additionalVAT: 0,
      additionalPerHour: 0,
      cleaningFee: 0,
      corkageFee: 0,
    },
    packages: null,
    inclusions: [
      "Tables and Chairs (w/out decorative setup)",
      "Stage",
      "2 Comfort Rooms",
      "Free Parking Space w/ Marshal",
      "1 Industrial Fan",
    ],
    note: [],
    additionalNote: [],
  },
];

export default eventServices;
