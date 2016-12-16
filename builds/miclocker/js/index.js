'use strict';
// var db = new PouchDB('inventory_database');
var remoteCouch = false;
// var currentItems = getAllItems();

//TODO:: fix pouchdb issues
function getAllItems(){
    db.allDocs({include_docs: true, descending: true})
        .then(function (doc) {
            return doc.rows;
        })
        .catch(function (err) {
            console.log(err);
            console.log(`Unable to retrieve data`)
        });
}

var card = new Vue({
    el: "#card",
    data: {
        header: "Mic Locker",
        addItemBool: false,
        itemEditBool: false,
        currentIndex: null,
        editableValues: {},
        totalMics: 0,
        totalModels: 0,
        items: [
            {
                text: 'c414',
                manufacturer: 'AKG',
                quantity: 1
            },
            {
                text: 'u87',
                manufacturer: 'neumann',
                quantity: 2
            },
            {
                text: 'sm57',
                manufacturer: 'sennheiser',
                quantity: 5
            }
        ]
    },
    methods: {
        addItem: function(){
            var itemInput = document.getElementById("addItem");
            var manufacturerInput = document.getElementById("itemMake");
            var itemQuantity = document.getElementById("itemQuantity");

            if (itemInput. value !== ""){
                var newItem = {
                    _id: itemInput.value,
                    text: itemInput.value,
                    manufacturer: manufacturerInput.value,
                    quantity: parseInt(itemQuantity.value)
                };
                this.items.push(newItem);
                db.put(newItem)
                    .then(function(result){
                    console.log(result);
                    console.log(`Successfully posted new item to db!`)})
                    .catch(function(err){
                        console.log(err);
                        console.log(`Whoops! There's an error`)
                    });
                itemInput.value = "";
                manufacturerInput.value = "";
                itemQuantity.value = "";
                this.addItemBool = false;
            }
        },
        showAllItems: function(){
            db.allDocs({include_docs: true, descending: true})
                .then(function (doc){
                    return doc.rows;
                })
                .catch(function (err) {
                    console.log(err);
                    console.log(`Unable to retrieve data`)
                });
        },
        editItem: function (index) {
            this.itemEditBool = true;
            this.editableValues.text = this.items[index].text;
            this.editableValues.manufacturer = this.items[index].manufacturer;
            this.editableValues.quantity = this.items[index].quantity;
            this.currentIndex = index;
        },
        updateItem: function () {
            //TODO:::::Persist Update With PouchDB
                this.items[this.currentIndex] = this.editableValues;
                this.itemEditBool = false;
                this.currentIndex = null;
                this.editableValues = {};
        },
        deleteItem: function(index){
            this.items.splice(index, 1);
        },
        subtractMic: function (index) {
            if (this.items[index].quantity > 0) {
                this.items[index].quantity -= 1;
            }
        },
        addMic: function (index) {
            this.items[index].quantity += 1;
        }
    },
    computed: {
        totalMics: function () {
            var sum = 0;
            var items = this.items;

            for(var i in items){
                sum += items[i].quantity;
            }
            return sum;
        },
        totalModels: function () {
            var sum;
            var items = this.items;

            sum = items.length;
            return sum;
        }
    },
    filters: {
        capitalize: function(value){
            if(!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        uppercase: function (value){
            if(!value) return '';
            value = value.toString();
            return value.toUpperCase();
        },
        lowercase: function (value){
            if(!value) return '';
            value = value.toString();
            return value.toLowerCase();
        },
        url: function(value){
            if(!value) return '';
            value = value.toString();
            return `https://www.wikipedia.org/wiki/${value}`
        }
    }
});