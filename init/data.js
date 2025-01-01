const sampleVehicles = [
  {
      type: "Car",
      brand: "Toyota",
      model: "Corolla",
      year: 2021,
      description: "Comfortable sedan with excellent mileage, perfect for city and highway travel.",
      image:{
        url: "https://imgd.aeplcdn.com/227x128/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-72.jpeg?isig=0&q=80",
        filename:"listingImage",
      },
      pricePerDay: 4600, // Approx ₹
      location: "New York",
      country: "USA",
      features: ["Air Conditioning", "GPS", "Bluetooth"],
      availability: true,
      rating: 4.7
  },
  {
      type: "Car",
      brand: "Honda",
      model: "Civic",
      year: 2020,
      description: "Sleek and reliable sedan, great for families and solo travelers.",
      image: {
        url :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybvtN3r_wEkDcGBpbqLXbKAdE5TI77M8JWw&s",
        filename:"listingImage",
      },
      pricePerDay: 3600, // Approx ₹
      location: "San Francisco",
      country: "USA",
      features: ["Cruise Control", "Backup Camera", "Bluetooth"],
      availability: true,
      rating: 4.5
  },
  {
      type: "Bike",
      brand: "Royal Enfield",
      model: "Classic 350",
      year: 2022,
      description: "Stylish bike for adventurous rides through cities and countryside.",
      image: {
        url:"https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
        filename:"listingImage",
      },
      pricePerDay: 2500, // Approx ₹
      location: "Bangalore",
      country: "India",
      features: ["ABS", "Fuel Efficient", "Electric Start"],
      availability: true,
      rating: 4.8
  },
  {
      type: "Bike",
      brand: "Yamaha",
      model: "R15",
      year: 2021,
      description: "Sport bike with great handling and performance for thrilling rides.",
      image:{
        url: "https://shop.yamaha-motor-india.com/cdn/shop/files/blue_600x.png?v=1702465199",
        filename:"listingImage",
      },
      pricePerDay: 2800, // Approx ₹
      location: "Mumbai",
      country: "India",
      features: ["Disc Brakes", "LED Headlights", "Digital Display"],
      availability: true,
      rating: 4.6
  },
  {
      type: "Car",
      brand: "Tesla",
      model: "Model 3",
      year: 2023,
      description: "Premium electric sedan with cutting-edge technology and a smooth ride.",
      image: {
        url:"https://imgd.aeplcdn.com/1920x1080/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80&q=80",
        filename:"listingImage",
      },
      pricePerDay: 9600, // Approx ₹
      location: "Los Angeles",
      country: "USA",
      features: ["Autopilot", "Electric", "Panoramic Sunroof"],
      availability: true,
      rating: 4.9
  },
  {
      type: "Bike",
      brand: "Harley-Davidson",
      model: "Iron 883",
      year: 2021,
      description: "Iconic cruiser bike for long and scenic rides with style.",
      image: {
        url:"https://imgd.aeplcdn.com/1056x594/n/cw/ec/145595/sportster-s-right-side-view-2.jpeg?isig=0&q=80",
        filename:"listingImage",
      },
      pricePerDay: 6500, // Approx ₹
      location: "Chicago",
      country: "USA",
      features: ["Comfortable Seats", "Powerful Engine", "Customizable"],
      availability: true,
      rating: 4.7
  },
  {
      type: "Car",
      brand: "Ford",
      model: "Mustang",
      year: 2019,
      description: "Classic sports car with unmatched power and style.",
      image: {
        url:"https://imgd.aeplcdn.com/370x208/cw/ec/40369/Ford-EcoSport-Right-Front-Three-Quarter-159249.jpg?wm=0",
        filename:"listingImage",
      },
      pricePerDay: 8000, // Approx ₹
      location: "Dallas",
      country: "USA",
      features: ["Sports Mode", "Convertible", "Bluetooth"],
      availability: true,
      rating: 4.8
  },
  {
      type: "Bike",
      brand: "Ducati",
      model: "Monster 821",
      year: 2022,
      description: "High-performance bike designed for enthusiasts and thrill-seekers.",
      image: {
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8T5jumLlRkmOSsxZtYDe91Pbu87OTvkV-Q&s",
        filename:"listingImage",
      },
      pricePerDay: 7800, // Approx ₹
      location: "Rome",
      country: "Italy",
      features: ["Quick Shifter", "LED Lights", "ABS"],
      availability: true,
      rating: 4.9
  },
  {
      type: "Car",
      brand: "Hyundai",
      model: "Tucson",
      year: 2022,
      description: "Spacious and comfortable SUV, ideal for family trips and group travel.",
      image: {
        url:"https://imgd-ct.aeplcdn.com/370x231/n/cw/ec/107917/creta-right-front-three-quarter.jpeg?isig=0&q=80",
        filename:"listingImage",
      },
      pricePerDay: 4800, // Approx ₹
      location: "Berlin",
      country: "Germany",
      features: ["All-Wheel Drive", "Air Conditioning", "Touchscreen Display"],
      availability: true,
      rating: 4.6
  },
  {
      type: "Bike",
      brand: "Kawasaki",
      model: "Ninja 650",
      year: 2021,
      description: "Powerful and agile bike for both city and open-road adventures.",
      image: {
        url:"https://m.media-amazon.com/images/I/71c7-154VDL.jpg",
        filename:"listingImage",
      },
      pricePerDay: 6000, // Approx ₹
      location: "Tokyo",
      country: "Japan",
      features: ["Fuel Efficient", "Digital Display", "LED Lights"],
      availability: true,
      rating: 4.7
  }
];

module.exports = {data:sampleVehicles};
