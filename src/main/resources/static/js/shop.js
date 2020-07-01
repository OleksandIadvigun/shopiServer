
function getIndex(list, id){
  for(var i = 0; i < list.length; i++) {
  if(list[i].id === id){
    return i;
     }
   }
   return -1;
}

var shopApi = Vue.resource('/shop{/id}');

Vue.component('shop-form', {
props: ['shops', 'shopAttr'],
data: function() {
return {
    name: '',
    id: '' ,
    latitude: '' ,
    longitude: '' ,
    areaSize: ''
   }
 },
 watch:  {

 shopAttr: function(newVal, oldVal){
     this.name = newVal.name;
     this.id = newVal.id;
     this.latitude = newVal.latitude;
     this.longitude = newVal.longitude;
     this.areaSize = newVal.areaSize;

   }
 },
template:
'<div style="position: relative; width: 650px;">' +
'<div style="position: relative; width: 350px;" >' +
'<input type ="text" placeholder="Add shop name" v-model="name" />' +
'</div>' +
'<div style="position: relative; width: 350px;" >' +
'<input type ="number" placeholder="Input latitude" v-model="latitude" />' +
'</div>' +
'<div style="position: relative; width: 350px;" >' +
'<input type ="number" placeholder="Input longitude" v-model="longitude" />' +
'</div>' +
'<input type ="number" placeholder="Input area size" v-model="areaSize" />' +
'<input type ="button" value="Add shop" @click="save" />' +
'<div>SHOPS:</div>' +
 '</div>' ,
 methods: {
     save: function() {
     var shop = { name: this.name, latitude: this.latitude, longitude: this.longitude, areaSize: this.areaSize}

   if(this.id){
   shopApi.update({id: this.id}, shop).then( result =>
   result.json().then(data => {
     var index = getIndex(this.shops, data.id);
     this.shops.splice(index, 1, data);
     this.name = '',
          this.id = '' ,
          this.latitude = '' ,
          this.longitude = '' ,
          this.areaSize = ''

         }
       )
     )
   }else {
      shopApi.save({}, shop).then(result =>
      result.json().then(data => {
      this.shops.push(data);
      this.name = '',
        this.latitude = '' ,
        this.longitude = '' ,
        this.areaSize = ''

           })
         )
       }
    }
 }
});

// Определяем новый компонент под именем todo-item
Vue.component('shop-row', {
props: ['shop', 'editMethod', 'shops'],
template: '<div>' +
         '<span style="color: #A4A4A4">{{ shop.name }} </span>' +
          '(latitude: {{shop.latitude}}) (longitude: {{shop.longitude}}) (area size: {{shop.areaSize}} m)' +
         '<span style="position: absolute; right: 0">' +
         '<input type="button" value="Edit" @click="edit" />' +
         '<input type="button" value="X" @click="del" />' +
         '</span>' +
         '</div>',

   methods:  {
      edit: function() {
       this.editMethod(this.shop);
      },

      del: function() {
      shopApi.remove({id: this.shop.id}).then(result => {
      if(result.ok){
      this.shops.splice(this.shops.indexOf(this.shop), 1)
       }
      })
     }
   }
});

Vue.component('shops-list', {
  props: ['shops'],
  data: function(){
  return{
    shop: null
    }
  },
  template:
  '<div style="position: relative; width: 650px;" >' +
  '<shop-form :shops="shops" :shopAttr="shop" />' +
  '<shop-row v-for="shop in shops" :key="shop.id" :shop="shop" :editMethod="editMethod" ' +
  ':shops="shops" />' +
 '</div>',
 created: function(){
 shopApi.get().then(result =>
 result.json().then(data =>
 data.forEach(shop => this.shops.push(shop))
     )
   )
 },
 methods:  {
 editMethod: function(shop){
  this.shop = shop;
    }
 }
});

var shop = new Vue({
  el: '#shop',
  template: '<shops-list :shops="shops" />',
  data: {
    shops: [

    ]

  }
});