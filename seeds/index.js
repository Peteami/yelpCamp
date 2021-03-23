const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
                const random1000 = Math.floor(Math.random() * 1000);
                const price = Math.floor(Math.random() * 20) + 10;
                const camp = new Campground({
                    author: '605259cca1273d6680383dc8',
                    location: `${cities[random1000].city}, ${cities[random1000].state}`,
                    title: `${sample(descriptors)} ${sample(places)}`,
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ut obcaecati autem corrupti nihil quis numquam harum deleniti porro officiis atque laborum ipsam iste reiciendis sed sunt, reprehenderit id. Quae.',
                    price,
                    geometry: {
                        type: 'Point', 
                        coordinates: [ 
                          cities[random1000].longitude,
                          cities[random1000].latitude,
                        ]
                    },
                    images: [
                        {
                          url: 'https://res.cloudinary.com/djlahm0em/image/upload/v1616164344/YelpCamp/l9grgueltukmob0baqsb.jpg',
                          filename: 'YelpCamp/l9grgueltukmob0baqsb'
                        },
                        {
                          url: 'https://res.cloudinary.com/djlahm0em/image/upload/v1616164344/YelpCamp/uovzttejqczp8vbea27i.jpg',
                          filename: 'YelpCamp/uovzttejqczp8vbea27i'
                        }
                      ] 
                })
                await camp.save();
            }
        }
        
        seedDB().then(() => {
            mongoose.connection.close();
        })