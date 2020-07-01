
function getIndex(list, id){
  for(var i = 0; i < list.length; i++) {
  if(list[i].id === id){
    return i;
     }
   }
   return -1;
}

var productApi = Vue.resource('/alarms{/id}');

Vue.component('product-form', {
props: ['products', 'productAttr'],
data: function() {
return {
    name: '',
    id: '' ,
    amount: '' ,
    expiration: '' ,
    overdueDate: ''
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
'<div style="position: relative; width: 450px;">' +
'<div style="position: relative; width: 350px;" >' +
'<input type ="text" placeholder="Add new product" v-model="name" />' +
'</div>' +
'<div style="position: relative; width: 350px;" >' +
'<input type ="number" placeholder="Add amount" v-model="amount" />' +
'</div>' +
'<input type ="number" placeholder="Expiration/number of days" v-model="expiration" />' +
'<input type ="button" value="Add product" @click="save" />' +
'<input type="button" value="refresh" @click="refresh" />' +
'<div> OVERDUE PRODUCTS (ALARMS):</div>' +
 '</div>' ,
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
    },

     refresh: function() {
                  productApi.get().then(result =>
                   result.json().then(data =>
                   data.forEach(product => this.products.push())
                       )
                     )
}
}
});

// Определяем новый компонент под именем todo-item
Vue.component('product-row', {
props: ['product', 'editMethod', 'products'],
template: '<div>' +
         '<span style="color: #01DF01">{{ product.name }} </span>' +
         '(amount: {{product.amount}}) (expiration: {{product.expiration}})' +
          '(alarm date: <span style="color: #DF0101">{{product.overdueDate}}</span>) ' +
         '<span style="position: absolute; right: 0">' +
         '<input type="button" value="Edit" @click="edit" />' +

         '<input type="button" value="X" @click="del" />' +
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
  '<div style="position: relative; width: 550px;" >' +
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
  el: '#alarms',
  template: '<products-list :products="products" />',
  data: {
    products: [

    ]
  }
});