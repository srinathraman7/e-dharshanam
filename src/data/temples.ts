import templeMeenakshi from "@/assets/temple-meenakshi.jpg";
import templeTirupati from "@/assets/temple-tirupati.jpg";
import templeKedarnath from "@/assets/temple-kedarnath.jpg";
import templeGolden from "@/assets/temple-golden.jpg";
import templeVaranasi from "@/assets/temple-varanasi.jpg";

export interface Temple {
  id: string;
  name: string;
  location: string;
  state: string;
  image: string;
  deity: string;
  deityCategory: "Vishnu" | "Shiva" | "Shakti" | "Other";
  rating: number;
  timings: string;
  description: string;
  history: string;
  coordinates: { lat: number; lng: number };
  ticketPrice: number;
  vipPrice: number;
}

export const temples: Temple[] = [
  {
    id: "meenakshi-amman",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    state: "Tamil Nadu",
    image: templeMeenakshi,
    deity: "Goddess Meenakshi",
    deityCategory: "Shakti",
    rating: 4.9,
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    description: "One of the oldest and most important temples in India, dedicated to Goddess Meenakshi, a form of Parvati.",
    history: "Built by Kulasekara Pandya over 2000 years ago, this temple is a masterpiece of Dravidian architecture. The temple complex houses 14 magnificent gateway towers (gopurams), the tallest being the southern tower at 170 feet. The temple attracts 15,000 visitors a day and around 25,000 during festivals.",
    coordinates: { lat: 9.9195, lng: 78.1193 },
    ticketPrice: 50,
    vipPrice: 500,
  },
  {
    id: "tirupati-balaji",
    name: "Tirumala Venkateswara Temple",
    location: "Tirupati, Andhra Pradesh",
    state: "Andhra Pradesh",
    image: templeTirupati,
    deity: "Lord Venkateswara",
    deityCategory: "Vishnu",
    rating: 4.8,
    timings: "2:30 AM - 1:30 AM (22 hours)",
    description: "The richest and most visited Hindu temple in the world, dedicated to Lord Venkateswara.",
    history: "The temple is believed to be where Lord Vishnu came to reside, during the Kali Yuga. The Tirumala hills are part of the Seshachalam Hills, and these seven peaks represent the seven heads of Adisesha.",
    coordinates: { lat: 13.6833, lng: 79.3500 },
    ticketPrice: 300,
    vipPrice: 1500,
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    location: "Kedarnath, Uttarakhand",
    state: "Uttarakhand",
    image: templeKedarnath,
    deity: "Lord Shiva",
    deityCategory: "Shiva",
    rating: 4.9,
    timings: "4:00 AM - 12:00 PM, 3:00 PM - 9:00 PM",
    description: "One of the holiest Hindu temples dedicated to Lord Shiva, located in the Himalayan range.",
    history: "Built by the Pandavas and later rebuilt by Adi Shankaracharya in the 8th century, this temple stands at an altitude of 3,583 meters above sea level. It is one of the 12 Jyotirlingas and part of the Char Dham pilgrimage.",
    coordinates: { lat: 30.7352, lng: 79.0669 },
    ticketPrice: 0,
    vipPrice: 2500,
  },
  {
    id: "golden-temple",
    name: "Harmandir Sahib (Golden Temple)",
    location: "Amritsar, Punjab",
    state: "Punjab",
    image: templeGolden,
    deity: "Guru Granth Sahib",
    deityCategory: "Other",
    rating: 5.0,
    timings: "Open 24 Hours",
    description: "The holiest Gurdwara and the most important pilgrimage site of Sikhism.",
    history: "Founded in 1577 by Guru Ram Das, the fourth Sikh Guru. The temple was rebuilt several times and was covered in gold foil in 1830 by Maharaja Ranjit Singh. The temple serves free meals (langar) to over 100,000 people daily.",
    coordinates: { lat: 31.6200, lng: 74.8765 },
    ticketPrice: 0,
    vipPrice: 0,
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    image: templeVaranasi,
    deity: "Lord Shiva",
    deityCategory: "Shiva",
    rating: 4.8,
    timings: "3:00 AM - 11:00 PM",
    description: "One of the most famous Hindu temples dedicated to Lord Shiva, located in the spiritual capital of India.",
    history: "The original temple was destroyed and rebuilt multiple times. The current structure was built in 1780 by Ahilyabai Holkar. It is one of the 12 Jyotirlingas. The Kashi Vishwanath Corridor was inaugurated in 2021, transforming the temple complex.",
    coordinates: { lat: 25.3109, lng: 83.0107 },
    ticketPrice: 0,
    vipPrice: 1500,
  },
];

export const states = [...new Set(temples.map((t) => t.state))];
export const deityCategories = ["All", "Vishnu", "Shiva", "Shakti", "Other"] as const;
