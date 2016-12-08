'use strict';

var card = new Vue({
    el: "#card",
    data: {
        header: "Microphones",
        totalMics: 0,
        totalModels: 0,
        items: [
            {
                text: "akg414",
                manufacturer: "AKG",
                quantity: 1
            },
            {
                text: "U87",
                manufacturer: "Neumann",
                quantity: 2
            },
            {
                text: "sm58",
                manufacturer: "sennheiser",
                quantity: 6
            }
        ]
    },
    methods: {
        addItem: function(){
            let itemInput = document.getElementById("addItem");
            let manufacturerInput = document.getElementById("itemMake");
            let itemQuantity = document.getElementById("itemQuantity");

            if (itemInput.value !== ""){
                this.items.push({
                    text: itemInput.value,
                    manufacturer: manufacturerInput.value,
                    quantity: parseInt(itemQuantity.value)
                });
                itemInput.value = "";
                manufacturerInput.value = "";
                itemQuantity.value = "";
            }
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
        undercase: function (value){
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