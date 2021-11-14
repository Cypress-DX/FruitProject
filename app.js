const mongoose = require('mongoose');

// Call async main function declared below and catch any errors.
main().catch(err => console.log(err));


// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');

  // Creating the Schema.
  const fruitSchema = new mongoose.Schema({
    name: String,
    // type: String,
    // required: [true, "Please check your data entry, please specify the name"]
    // },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String,
  });

  // Compiling Schema into a Model.
  const Fruit = mongoose.model("Fruit", fruitSchema);

  // Create a fruit document with properties and behaviors as declared in our Schema.
  const fruit = new Fruit({
    name: "Peach",
    rating: 10,
    review: "Peaches are yammy!",
  });
  // Save fruit document.
  // await fruit.save();

  //ATTENTION: EVERY TIME YOU RUN .save() IT WILL SAVE AGAIN AND AGAIN YOUR fruit!!!
  //So comment it out after the first time you launch app.js.
  // After the first time saving you can comment out every console.log.
  // console.log(fruit.name);

  // Creating person Schema.
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
  });

  // Compiling person Schema into a model.
  const Person = mongoose.model("Person", personSchema);

  const melon = new Fruit({
    name: "Melon",
    score: 8,
    review: "Sweet and smells good."
  });

  melon.save();

Person.updateOne({name: "John"}, {favoriteFruit: melon}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Document has been updated");
  }
});
  // Creating a person document with properties and behaviors as declared in our Schema.
  // const person = new Person({
  //   name: "Amy",
  //   age: 12,
  //   favoriteFruit: pineapple
  // });

// const
  // Save person document. USE ONLY THE FIRST TIME YOU LAUNCH APP.JS!!!
  // await person.save();

  // console.log(person.name);


  // Creating 3 different fruits.
  // const kiwi = new Fruit({
  //   name: "Kiwi",
  //   score: 10,
  //   review: "The best fruit!"
  // });
  //
  // const orange = new Fruit({
  //   name: "Orange",
  //   score: 4,
  //   review: "Not for me.."
  // });
  //
  // const banana = new Fruit({
  //   name: "Banana",
  //   score: 10,
  //   review: "Awesome!"
  // });


  // .create() is similar to .insertMany(), but the first makes a call to db for each document in the array,
  // while the second makes an unique call bypassing Mongoose validation!
  // See here for more details: https://mongoosejs.com/docs/api.html#model_Model.insertMany
  // REMEMBER TO COMMENT IT OUT AFTER SAVING THE FIRST TIME IN THE DB!!!
  // (i'm not sure about the callback function(err) part if it's right to write it like that in this case... but it seems to work :P).
  // await Fruit.create( [kiwi, orange, banana], err => {
  //   if (err) {
  //     return handleError(err);
  //   } else {
  //     console.log("Successfully saved all the fruits to fruitsDB inside fruits collection.")
  //   }
  // });

  Fruit.find(function(err, fruits){
    if (err) {
      console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(function(fruit) {
          console.log(fruit.name);
        });
    }
  });

  // Fruit.updateOne({_id: "618b7c18efb296b2c3cf75af"}, {name: "Peach"}, function(err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     console.log("Successfully updated the document.");
  //   }
  // });


  // Fruit.deleteOne({_id: "618b7c18efb296b2c3cf75af"}, function(err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     console.log("Successfully deleted from the document.");
  //   }
  // });

// Person.deleteMany({name: "John"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Objects successfully deleted.");
//   }
// });


} // end of async main func.
