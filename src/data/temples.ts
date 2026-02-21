import templeMeenakshi from "@/assets/temple-meenakshi.jpg";
import templeTirupati from "@/assets/temple-tirupati.jpg";
import templeKedarnath from "@/assets/temple-kedarnath.jpg";
import templeGolden from "@/assets/temple-golden.jpg";
import templeVaranasi from "@/assets/temple-varanasi.jpg";
import templeJagannath from "@/assets/temple-jagannath.jpg";
import templeSomnath from "@/assets/temple-somnath.jpg";
import templeAkshardham from "@/assets/temple-akshardham.jpg";
import templeBrihadeeswara from "@/assets/temple-brihadeeswara.jpg";
import templeRamanathaswamy from "@/assets/temple-ramanathaswamy.jpg";

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
  bestTimeToVisit: string;
  dressCode: string;
  guidelines: string[];
  nearbyAttractions: string[];
  tatkalAvailable: boolean;
}

export interface PujaItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "flowers" | "lamps" | "prasad" | "essentials";
  description: string;
}

export const pujaItems: PujaItem[] = [
  { id: "flowers-rose", name: "Rose Garland", price: 100, image: "🌹", category: "flowers", description: "Fresh rose garland for deity offering" },
  { id: "flowers-marigold", name: "Marigold Bundle", price: 60, image: "🌼", category: "flowers", description: "Sacred marigold flowers bundle" },
  { id: "flowers-lotus", name: "Lotus Offering", price: 150, image: "🪷", category: "flowers", description: "Fresh lotus for special puja" },
  { id: "coconut", name: "Sacred Coconut", price: 40, image: "🥥", category: "essentials", description: "Whole coconut for temple offering" },
  { id: "oil-lamp", name: "Oil Lamp (Diya)", price: 30, image: "🪔", category: "lamps", description: "Traditional brass oil lamp with oil" },
  { id: "camphor-pack", name: "Camphor Pack", price: 50, image: "🔥", category: "lamps", description: "Pure camphor for aarti" },
  { id: "incense", name: "Incense Sticks", price: 25, image: "🧘", category: "essentials", description: "Fragrant agarbatti pack" },
  { id: "prasad-laddoo", name: "Prasad Laddoo Kit", price: 200, image: "🍬", category: "prasad", description: "Traditional laddoo prasad box" },
  { id: "prasad-peda", name: "Peda Prasad Box", price: 180, image: "🍡", category: "prasad", description: "Premium milk peda for offering" },
  { id: "kumkum-set", name: "Kumkum & Turmeric Set", price: 35, image: "🔴", category: "essentials", description: "Sindoor, kumkum, and haldi" },
  { id: "betel-leaves", name: "Betel Leaves & Nuts", price: 45, image: "🍃", category: "essentials", description: "Paan and supari for puja" },
  { id: "full-puja-kit", name: "Complete Puja Kit", price: 500, image: "🕉️", category: "prasad", description: "All-in-one puja essentials basket" },
];

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
    bestTimeToVisit: "October to March (Winter season). The Chithirai Festival in April is spectacular.",
    dressCode: "Traditional attire preferred. No shorts or sleeveless tops. Footwear must be removed before entry.",
    guidelines: ["Photography restricted inside sanctum", "Mobile phones on silent", "Follow queue discipline", "No food items inside temple"],
    nearbyAttractions: ["Thirumalai Nayakkar Palace", "Gandhi Memorial Museum", "Alagar Koil", "Vaigai Dam"],
    tatkalAvailable: true,
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
    bestTimeToVisit: "September to February. Avoid summer months due to extreme heat.",
    dressCode: "Men: Dhoti or formal pants with shirt. Women: Saree or salwar kameez. No jeans or western wear.",
    guidelines: ["Head tonsure available at dedicated centers", "Laddu prasadam can be pre-booked", "Carry valid ID proof", "Special darshan requires advance booking"],
    nearbyAttractions: ["Sri Padmavathi Temple", "Silathoranam", "Talakona Waterfalls", "Chandragiri Fort"],
    tatkalAvailable: true,
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
    bestTimeToVisit: "May to June and September to October. Temple closes November to April due to snow.",
    dressCode: "Warm, comfortable clothing. Layered dressing recommended due to extreme cold.",
    guidelines: ["Trek of 16 km from Gaurikund required", "Helicopter services available", "Carry warm clothing and rain gear", "Medical fitness certificate recommended"],
    nearbyAttractions: ["Badrinath Temple", "Chorabari Glacier", "Vasuki Tal", "Gaurikund"],
    tatkalAvailable: false,
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
    bestTimeToVisit: "October to March. Baisakhi (April) and Guru Nanak Jayanti are special.",
    dressCode: "Head must be covered at all times. Remove shoes before entry. Modest clothing required.",
    guidelines: ["Free langar available for all visitors", "No smoking or alcohol", "Maintain silence in prayer halls", "Sarovar (holy pool) available for bathing"],
    nearbyAttractions: ["Jallianwala Bagh", "Wagah Border", "Partition Museum", "Durgiana Temple"],
    tatkalAvailable: false,
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
    bestTimeToVisit: "October to March. Maha Shivaratri in February/March is the grandest celebration.",
    dressCode: "Traditional Indian attire. No leather items allowed inside. Remove footwear.",
    guidelines: ["Ganga Aarti at Dashashwamedh Ghat is a must-see", "Electronic items may be restricted", "Special darshan passes available online", "Dress modestly"],
    nearbyAttractions: ["Dashashwamedh Ghat", "Sarnath", "Ramnagar Fort", "Banaras Hindu University"],
    tatkalAvailable: true,
  },
  {
    id: "jagannath-puri",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    state: "Odisha",
    image: templeJagannath,
    deity: "Lord Jagannath",
    deityCategory: "Vishnu",
    rating: 4.7,
    timings: "5:00 AM - 11:00 PM",
    description: "One of the Char Dham pilgrimage destinations, famous for the annual Rath Yatra festival.",
    history: "Built in the 12th century by King Anantavarman Chodaganga Deva, the temple stands 214 feet tall. The flag atop the temple always flies in the opposite direction of the wind. The Mahaprasad is cooked in earthen pots and can feed 100,000 people.",
    coordinates: { lat: 19.8048, lng: 85.8181 },
    ticketPrice: 0,
    vipPrice: 500,
    bestTimeToVisit: "October to February. Rath Yatra in June/July is the most iconic festival.",
    dressCode: "Traditional Indian attire mandatory. Non-Hindus are not permitted inside.",
    guidelines: ["Only Hindus allowed inside the temple", "Mahaprasad is a must-try", "Photography prohibited inside", "Remove all leather items before entering"],
    nearbyAttractions: ["Puri Beach", "Konark Sun Temple", "Chilika Lake", "Raghurajpur Heritage Village"],
    tatkalAvailable: true,
  },
  {
    id: "somnath",
    name: "Somnath Temple",
    location: "Veraval, Gujarat",
    state: "Gujarat",
    image: templeSomnath,
    deity: "Lord Shiva",
    deityCategory: "Shiva",
    rating: 4.8,
    timings: "6:00 AM - 9:30 PM",
    description: "The first among the 12 Jyotirlingas, believed to have been created by the Moon God himself.",
    history: "Destroyed and rebuilt 17 times throughout history, symbolizing the resilience of Indian culture. The present temple was reconstructed in 1951 under Sardar Vallabhbhai Patel. The evening Sound & Light show narrates its incredible history.",
    coordinates: { lat: 20.8880, lng: 70.4012 },
    ticketPrice: 0,
    vipPrice: 200,
    bestTimeToVisit: "October to March. Maha Shivaratri and Kartik Purnima are grand celebrations.",
    dressCode: "Modest clothing. Traditional attire preferred. Footwear must be removed.",
    guidelines: ["Evening light & sound show is highly recommended", "Free darshan available", "Photography allowed in the complex but not inside sanctum", "Sea-view from temple is breathtaking"],
    nearbyAttractions: ["Bhalka Tirth", "Triveni Sangam", "Panch Pandav Gufa", "Junagadh"],
    tatkalAvailable: true,
  },
  {
    id: "akshardham",
    name: "Swaminarayan Akshardham",
    location: "New Delhi, Delhi",
    state: "Delhi",
    image: templeAkshardham,
    deity: "Swaminarayan",
    deityCategory: "Other",
    rating: 4.9,
    timings: "9:30 AM - 6:30 PM (Closed Mondays)",
    description: "A stunning cultural complex showcasing millennia of Indian art, culture, and architecture.",
    history: "Inaugurated in 2005, the complex was built by 11,000 artisans and volunteers. It holds the Guinness World Record for being the World's Largest Comprehensive Hindu Temple. The main monument is 141 feet high, 316 feet wide, and 370 feet long, made of Rajasthani pink sandstone and Italian Carrara marble.",
    coordinates: { lat: 28.6127, lng: 77.2773 },
    ticketPrice: 0,
    vipPrice: 350,
    bestTimeToVisit: "October to March. The evening water show is a must-see attraction.",
    dressCode: "Modest clothing covering knees and shoulders. No sleeveless or short clothing.",
    guidelines: ["All electronic items must be deposited at the entrance", "No cameras or phones allowed inside", "Boat ride and exhibitions are ticketed separately", "Musical fountain show in evening"],
    nearbyAttractions: ["India Gate", "Red Fort", "Humayun's Tomb", "Lotus Temple"],
    tatkalAvailable: false,
  },
  {
    id: "brihadeeswara",
    name: "Brihadeeswara Temple",
    location: "Thanjavur, Tamil Nadu",
    state: "Tamil Nadu",
    image: templeBrihadeeswara,
    deity: "Lord Shiva",
    deityCategory: "Shiva",
    rating: 4.7,
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    description: "A UNESCO World Heritage Site and one of the greatest examples of Chola architecture, known as the 'Big Temple.'",
    history: "Built by Raja Raja Chola I between 1003-1010 AD, the temple's vimana (tower) rises to 216 feet, making it one of the tallest in the world. The 80-ton granite capstone at the top was moved using a 6km inclined plane. The Nandi bull at the entrance weighs 25 tons.",
    coordinates: { lat: 10.7828, lng: 79.1318 },
    ticketPrice: 0,
    vipPrice: 100,
    bestTimeToVisit: "November to February. The temple's anniversary in February sees grand celebrations.",
    dressCode: "Traditional clothing recommended. Remove footwear before entering the temple.",
    guidelines: ["UNESCO Heritage Site – maintain cleanliness", "Guided tours available", "Best visited during sunrise or sunset", "Photography allowed in outer areas"],
    nearbyAttractions: ["Thanjavur Palace", "Saraswathi Mahal Library", "Gangaikonda Cholapuram", "Kumbakonam"],
    tatkalAvailable: true,
  },
  {
    id: "ramanathaswamy",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram, Tamil Nadu",
    state: "Tamil Nadu",
    image: templeRamanathaswamy,
    deity: "Lord Shiva",
    deityCategory: "Shiva",
    rating: 4.8,
    timings: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
    description: "One of the Char Dham pilgrimage sites, famous for its magnificent corridors – the longest in any Hindu temple.",
    history: "According to legend, this is where Lord Rama worshipped Lord Shiva to absolve himself of the sin of killing Ravana. The temple's corridor is the longest in India at 1,220 meters. It has 22 sacred wells (theerthams), each with water of different taste and temperature.",
    coordinates: { lat: 9.2881, lng: 79.3174 },
    ticketPrice: 0,
    vipPrice: 300,
    bestTimeToVisit: "October to April. Maha Shivaratri is the grandest festival here.",
    dressCode: "Traditional Indian attire. Men should wear dhoti or pants. Women should wear saree or salwar.",
    guidelines: ["Holy bath in all 22 theerthams is a sacred ritual", "Carry extra clothes for theertham bath", "Pamban Bridge crossing is a scenic experience", "No leather items inside"],
    nearbyAttractions: ["Pamban Bridge", "Dhanushkodi", "Adam's Bridge", "Kothandaramaswamy Temple"],
    tatkalAvailable: true,
  },
];

export const states = [...new Set(temples.map((t) => t.state))];
export const deityCategories = ["All", "Vishnu", "Shiva", "Shakti", "Other"] as const;
