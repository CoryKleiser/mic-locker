'use strict';

var card = new Vue({
    el: "#card",
    data: {
        header: "Microphones",
        items: [
            {
                text: "akg414",
                manufacturer: "AKG"
            },
            {
                text: "U87",
                manufacturer: "Neumann"},
            {
                text: "sm58",
                manufacturer: "sennheiser"
            }
        ]
    },
    methods: {
        addItem: function(){
            let itemInput = document.getElementById("addItem");
            let manufacturerInput = document.getElementById("itemMake");

            if (itemInput.value !== ""){
                this.items.push({
                    text: itemInput.value,
                    manufacturer: manufacturerInput.value
                });
                itemInput.value = "";
            }
        },
        deleteItem: function(index){
            this.items.splice(index, 1);
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