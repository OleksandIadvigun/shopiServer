
function getIndex(list, id){
  for(var i = 0; i < list.length; i++) {
  if(list[i].id === id){
    return i;
     }
   }
   return -1;
}

var productApi = Vue.resource('/product{/id}');

Vue.component('product-form', {
props: ['products', 'productAttr'],
data: function() {
return {
    name: '',
    id: '' ,
    amount: '' ,
    expiration: ''
   }
 },
 watch:  {

 productAttr: function(newVal, oldVal){
     this.name = newVal.name;
     this.id = newVal.id;
     this.amount = newVal.amount;
     this.expiration = newVal.expiration;
   }
 },
template:
'<div style="position: relative; left: 28%">' +
'<div style="position: relative; right: 27.5%" >' +
'<input type ="text" placeholder="Add new product" v-model="name" style="marginBottom: 4px; fontSize: 13px;  border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #424242; color: #DCDCDC" />' +
'</div>' +
'<div style="position: relative; right: 27.5%" >' +
'<input type ="number" placeholder="Add amount" v-model="amount" style="marginBottom: 4px; border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #424242; color: #DF7401" />' +
'</div>' +
'<div style="position: relative; right: 27.5%">' +
'<input type ="number" placeholder="Expiration/number of days" v-model="expiration" style="border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #424242; color: #DF7401" /> </div>' +
'<div style="position: absolute; right: 54.5%; top: 57% " >' +
'<input type ="button" value="Add product" @click="save" style="marginLeft: 7px; color: #DCDCDC; background: #008080; border: 1px solid; borderColor: #DCDCDC; border-radius: 4px" />' +
'</div>' +
'<div style="position: relative; right: 28%; marginTop: 10px; marginBottom: 5px">PRODUCTS:</div>' +
 '</div>' ,
 //commit
 methods: {
     save: function() {
     var product = { name: this.name, amount: this.amount, expiration: this.expiration }

   if(this.id){
   productApi.update({id: this.id}, product).then( result =>
   result.json().then(data => {
     var index = getIndex(this.products, data.id);
     this.products.splice(index, 1, data);
     this.name = '',
          this.id = '' ,
          this.amount = '' ,
          this.expiration = ''
         }
       )
     )
   }else {
      productApi.save({}, product).then(result =>
      result.json().then(data => {
      this.products.push(data);
      this.name = '',
       this.amount = '' ,
         this.expiration = ''
           })
       )
       }
    }
 }
});

// Определяем новый компонент под именем todo-item
Vue.component('product-row', {
props: ['product', 'editMethod', 'products'],
template: '<div style="marginBottom: 7px; fontWeight: lighter; border: 1px solid; borderColor: #A4A4A4;  padding: 7px; border-radius: 5px" >' +
         '</i><span style="color: #66CDAA; position: absolute; left: 23%">{{ product.name }} </span>' +
         '<span style=" position: absolute; left: 40%; fontWeight: lighter "> amount: {{product.amount}}</span>' +
         '<span style=" position: relative; left: 20%"> expiration: {{product.expiration}} day (s) </span>' +
         '<span style="position: absolute; right: 21% ">' +
         '<input type="button" value="Edit" @click="edit" style="marginRight: 5px; color: #DCDCDC; background: #696969; border: 1px solid; borderColor: #DCDCDC; border-radius: 4px"  />' +
         '<input type="button" value="X" @click="del" style= "color: #DCDCDC ; background: #B22222; border: 1px solid; borderColor: #DCDCDC; border-radius: 4px" />' +
         '</span>' +
         '</div>',

   methods:  {
      edit: function() {
       this.editMethod(this.product);
      },

      del: function() {
      productApi.remove({id: this.product.id}).then(result => {
      if(result.ok){
      this.products.splice(this.products.indexOf(this.product), 1)
       }
      })
     }
   }
});

Vue.component('products-list', {
  props: ['products'],
  data: function(){
  return{
    product: null
    }
  },
  template:
  '<div style=" marginLeft: 20%; marginRight: 20%">' +
  '<product-form :products="products" :productAttr="product" />' +
  '<product-row v-for="product in products" :key="product.id" :product="product" :editMethod="editMethod" ' +
  ':products="products" />' +
 '</div>',
 created: function(){
 productApi.get().then(result =>
 result.json().then(data =>
 data.forEach(product => this.products.push(product))
     )
   )
 },
 methods:  {
 editMethod: function(product){
  this.product = product;
    }
 }
});

var app = new Vue({
  el: '#app',
  template: '<products-list :products="products" />',
  data: {
    products: [

    ]

  }
});