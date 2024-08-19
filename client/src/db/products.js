const products = [
    {
      id: 1,
      name: "Smartphone X",
      price: 799,
      category: "Smartphones",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: 1299,
      category: "Laptops",
      count: 15,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 99,
      category: "Audio",
      count: 30,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 4,
      name: "Smartwatch S",
      price: 199,
      category: "Wearables",
      count: 25,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 5,
      name: "Tablet Mini",
      price: 299,
      category: "Tablets",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 6,
      name: "Gaming Console",
      price: 399,
      category: "Gaming",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 7,
      name: "Drone X",
      price: 499,
      category: "Drones",
      count: 8,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 8,
      name: "Camera Pro",
      price: 899,
      category: "Cameras",
      count: 10,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 9,
      name: "Smart Home Hub",
      price: 149,
      category: "Smart Home",
      count: 22,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 10,
      name: "Fitness Tracker",
      price: 79,
      category: "Fitness",
      count: 0,
      inStock: false,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      price: 99,
      category: "Audio",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 12,
      name: "Virtual Reality Headset",
      price: 349,
      category: "Gaming",
      count: 10,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 13,
      name: "Smart TV",
      price: 599,
      category: "TVs",
      count: 15,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 14,
      name: "Wireless Keyboard",
      price: 49,
      category: "Accessories",
      count: 25,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 15,
      name: "External Hard Drive",
      price: 89,
      category: "Storage",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 16,
      name: "Wireless Mouse",
      price: 29,
      category: "Accessories",
      count: 30,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 17,
      name: "Portable Charger",
      price: 39,
      category: "Accessories",
      count: 25,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 18,
      name: "Noise-Canceling Headphones",
      price: 199,
      category: "Audio",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 19,
      name: "Smart Home Security Camera",
      price: 129,
      category: "Smart Home",
      count: 22,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 20,
      name: "Action Camera",
      price: 249,
      category: "Cameras",
      count: 15,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 21,
      name: "Gaming Laptop",
      price: 1499,
      category: "Laptops",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 22,
      name: "Smart Home Thermostat",
      price: 99,
      category: "Smart Home",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 23,
      name: "Wireless Printer",
      price: 149,
      category: "Office",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 24,
      name: "Smartwatch Pro",
      price: 299,
      category: "Wearables",
      count: 15,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 25,
      name: "Tablet Pro",
      price: 499,
      category: "Tablets",
      count: 10,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 26,
      name: "4K Home Theater Projector",
      price: 799,
      category: "TVs",
      count: 8,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 27,
      name: "Drone Pro",
      price: 699,
      category: "Drones",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 28,
      name: "Professional Camera",
      price: 1299,
      category: "Cameras",
      count: 6,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 29,
      name: "Smart Home Lighting Kit",
      price: 249,
      category: "Smart Home",
      count: 16,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 30,
      name: "Fitness Tracker Pro",
      price: 149,
      category: "Fitness",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 31,
      name: "Wireless Earbuds Pro",
      price: 149,
      category: "Audio",
      count: 25,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 32,
      name: "Smart Home Security System",
      price: 399,
      category: "Smart Home",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 33,
      name: "Wireless Gaming Headset",
      price: 99,
      category: "Gaming",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 34,
      name: "Compact Camera",
      price: 299,
      category: "Cameras",
      count: 14,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 35,
      name: "Smartphone Pro",
      price: 999,
      category: "Smartphones",
      count: 10,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 36,
      name: "Laptop Ultrabook",
      price: 1099,
      category: "Laptops",
      count: 8,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 37,
      name: "Wireless Gaming Controller",
      price: 59,
      category: "Gaming",
      count: 22,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 38,
      name: "Virtual Reality Gaming System",
      price: 499,
      category: "Gaming",
      count: 9,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 39,
      name: "Smart Home Voice Assistant",
      price: 79,
      category: "Smart Home",
      count: 16,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 40,
      name: "Wireless Gaming Mouse",
      price: 49,
      category: "Gaming",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 41,
      name: "Smart Home Energy Monitor",
      price: 129,
      category: "Smart Home",
      count: 14,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 42,
      name: "Portable Bluetooth Speaker",
      price: 49,
      category: "Audio",
      count: 25,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 43,
      name: "Tablet Pro with Stylus",
      price: 599,
      category: "Tablets",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 44,
      name: "Wireless Charging Pad",
      price: 29,
      category: "Accessories",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 45,
      name: "Smart Home Security Camera Pro",
      price: 199,
      category: "Smart Home",
      count: 10,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 46,
      name: "Fitness Tracker with GPS",
      price: 119,
      category: "Fitness",
      count: 15,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 47,
      name: "Wireless Gaming Keyboard",
      price: 79,
      category: "Gaming",
      count: 12,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 48,
      name: "Smartphone Accessories Bundle",
      price: 49,
      category: "Accessories",
      count: 20,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 49,
      name: "Wireless Earbuds with Charging Case",
      price: 129,
      category: "Audio",
      count: 18,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    },
    {
      id: 50,
      name: "Smart Home Robotic Vacuum",
      price: 349,
      category: "Smart Home",
      count: 8,
      inStock: true,
      published: true,
      image: "https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg"
    }
  ];
  
  export default products;
  