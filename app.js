//requiring Mongoose Model 
const mongoose = require('mongoose');


//Connecting to the server 27017
mongoose.connect("mongodb://localhost:27017/peopleDB");


//Creating a fruits Schema 
const fruitsSchema= new mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"Plase fill your name!"] //required : true  will be mandetory field
    },
    score:
    {
        type:Number,
        max:10,
        min:1
    },
    review:String
    
})


//Creating a Fruits Document

const Fruits= mongoose.model('fruit',fruitsSchema);

//Inserting the data into Fruits Collection
const pineapple = new Fruits({
    name:"Pineapple",
    score:9,
    review:"Great Fruit"
});

const kiwi= new Fruits({
    name:"kiwi",
    score:6,
    review:"Average!"
});
const Apple= new Fruits({
    name:"Apple",
    score:8,
    review:"Pretty Good!"
})

const Mango= new Fruits({
    name:"mango",
    score:10,
    review:"God!"
});

const Banana = new Fruits({
    name:"Banana",
    score:9,
    review:"Decent"
});

//Saving the data into collection

pineapple.save();
kiwi.save();
Apple.save();
Mango.save();
Banana.save();


//Creating a Person Schema 
const personSchema= new mongoose.Schema({
    name:String,
       
    age : {
        type:Number,
        min:1,
        max: 100
    },
    favouriteFruit:fruitsSchema
});

//Making a model or collection
const Person = mongoose.model("Person",personSchema);




//Inserting data into people collection

const person1 = new Person({
    name:"Amy",
    age:12,
    favouriteFruit:pineapple
});

const person2 = new Person({
    name:"anthony",
    age:30
})

const person3 = new Person({
    name:"Shan",
    age:23
})

const person4 = new Person({
    name:"Agraj",
    age:24
})

const person5 = new Person({
    name:"Ananay",
    age:19
})

//saving the data into database
person1.save();
person2.save();
person3.save();
person4.save();
person5.save();




// Making a relationship between fruitsSchema and personsSchema by adding a favourite fruit to person : "Shaan" a "Banana"
Person.updateOne({name:"Shaan"},{favouriteFruit:Banana},(err)=>{
    if(err)
    {
        console.log(err);

    }
    else
    {
        console.log("updated the favourite fruit for Shaan, Mango!");
    }
})


// If u want to Insert a lot of enteries at once use this method

Person.insertMany([person1,person2,person3,person4],function(err){
    if(err)
    {console.log(err);}
    else
    {
        console.log("successfully saved all the persons to peopleDb");
    }
})



//Entering into people collection and then into all person's Array and then printing the name of each person

Person.find(function(err,people){
    if(err)
    {
        console.log(err);
    }
    else
    {
        mongoose.connection.close();
        people.forEach(function(person){
            console.log(person.name);
        });
       
    }
   
});


//Updating the name of id : "615b0bcd4ad9058c725cf2c6"
Person.updateOne({_id:"615b0bcd4ad9058c725cf2c6"}, {name:"Peach"}, function(err){
  
  if(err)
  {
    console.log(err);
  }  
  else
  {
      console.log("updated the data");
  }

})

//Updating the age of id : "615b0baf5f3b728c1a88c37c"

Person.updateOne({_id:"615b0baf5f3b728c1a88c37c"},{age:22},function(err){
    if(err)
    {
        console.log(err);        
    }
    else
    {
        console.log("updated!");
    }
});
  
//Delete all the enteries with name:"anthony" and age:30
Person.deleteMany({name:"anthony"},{age:30},(err)=>{
    if(err)
    {console.log(err);}
    else
    {
        console.log("successFully Deleted!");
    }
});

mongoose.disconnect();





