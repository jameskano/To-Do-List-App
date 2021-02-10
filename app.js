// jshint esversion:9

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const converter = require("json-2-csv");
const fs = require("fs");
const dayjs = require("dayjs");
const formidable = require("formidable");
const path = require("path");
const csv = require("csvtojson");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

dayjs().format();



mongoose.connect("mongodb+srv://admin-jaime:pass-jaime@cluster0.rxytn.mongodb.net/todolist?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb://localhost:27017/todolist", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
  featured: Boolean
});

const List = mongoose.model("List", listSchema);



app.get('/favicon.ico', function(req, res) { res.status(204); });

app.get("/", function(req, res) {
  List.find({}, function(err, results) {
    if(err) {
      console.log(err);
      } else {
        res.render("index", {
          listTitle: results
        });
      }
    });
});

app.post("/", function(req, res) {
  let listName = req.body.newList;

  const list = new List({
    name: listName,
    featured: false
  });

  List.findOne({name: listName}, function(err, results) {
    if(!results) {
      list.save();
      res.redirect("/");
    }
  });
});

app.post("/deletelist", function(req, res) {
  const deleteList = req.body.deletelist;

  List.findByIdAndDelete(deleteList, function(err) {
    if(!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.post("/delete", function(req, res){
  const deleteItem = req.body.checkbox;
  const listName = req.body.listName;

  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: deleteItem}}}, function(err, results) {
    if(!err) {
      res.redirect("/" + listName);
    } else {
      console.log(err);
    }
  });
});

app.get("/destacados", function(req, res) {
  List.find({featured: true}, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      res.render("featured", {
        listTitle: results
      });
    }
  });
});

app.post("/destacados", function(req, res) {
  let featuredId = req.body.featuredId;

  List.findById(featuredId, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      if(result.featured === false) {
        result.featured = true;
        result.save();
      } else {
        result.featured = false;
        result.save();
      }
    }
  });
});

app.get("/:customList", function (req, res) {
  let customList = req.params.customList;

  List.findOne({name: customList}, function(err, result) {
    if(!err) {
      List.find(function(err, lists) {
        if(!err) {
          res.render("list", {
            title: result.name,
            items: result.items,
            listTitle: lists
          });
        }
      });
    }
  });
});

app.post("/list", function(req, res) {
  let listName = req.body.listButton;
  let itemName = req.body.newItem;
  let newItem = new Item({
    name: itemName
  });

  List.findOne({name: listName}, function(err, result) {
    if(!err) {
      if(result) {
        result.items.push(newItem);
        result.save();
        res.redirect("/" + listName);
      }
    } else {
      console.log(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
