const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "shreyash_junje",
    to: "dujal",
    message: "kay mg",
    created_at: new Date(),
  },
  {
    from: "shreyash_junje",
    to: "prajwal",
    message: "hello sir",
    created_at: new Date(),
  },
  {
    from: "shubham",
    to: "om",
    message: "namskar",
    created_at: new Date(),
  },
  {
    from: "dujal",
    to: "abhya",
    message: "mg kya hal chal",
    created_at: new Date(),
  },
  {
    from: "shreyash_junje",
    to: "vivek",
    message: "mg raju",
    created_at: new Date(),
  },
];

chat.insertMany(allChats);
