
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
'<div style="position: relative; left: 28%">' +
'<div style="position: relative; right: 27.5%" >' +
'<input type ="text" placeholder="Add shop name" v-model="name" style="marginBottom: 4px; fontSize: 13px;  border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #333333; color: #DCDCDC" />' +
'</div>' +
'<div style="position: relative; right: 27.5%" >' +
'<input type ="number" placeholder="Input latitude" v-model="latitude" style="marginBottom: 4px; border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #333333; color: #DF7401" />' +
'</div>' +
'<div style="position: relative; right: 27.5%">' +
'<input type ="number" placeholder="Input longitude" v-model="longitude" style="marginBottom: 4px; border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #333333; color: #DF7401" />' +
'</div>' +
'<div style="position: relative; right: 22.8%">' +
'<input type ="number" placeholder="Input area size" v-model="areaSize" style="marginBottom: 4px; border: 1px solid; borderColor: #A4A4A4;  padding: 5px; border-radius: 5px; background: #333333; color: #DF7401" />' +
'<input type ="button" value="Add shop" @click="save" style="marginLeft: 7px; color: #DCDCDC; background: #008080; border: 1px solid; borderColor: #DCDCDC; border-radius: 4px" />' +
'</div>' +
'<div style="position: relative; right: 28%; marginBottom: 5px; marginTop: 20px">SHOPS:</div>' +
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
template: '<div style="marginBottom: 7px; fontWeight: lighter; border: 1px solid; borderColor: #A4A4A4;  padding: 7px; border-radius: 5px" >' +
         '<span style="color: #66CDAA; position: absolute; left: 23%">{{ shop.name }} </span>' +
          '<span style=" position: absolute; left: 37%; fontWeight: lighter "> latitude: {{shop.latitude}} </span>' +
          '<span style=" position: relative; left: 15%"> longitude: {{shop.longitude}} </span>' +
           '<span style=" position: relative; left: 20%"> area: {{shop.areaSize}} m </span>' +
         '<span style="position: absolute; right: 21% ">' +
         '<input type="button" value="Edit" @click="edit" style="marginRight: 5px; color: #bfbfbf; background: #424242; border: 1px solid; borderColor: #bfbfbf; border-radius: 4px"  />' +
         '<input type="button" value="X" @click="del" style= "color: #bfbfbf ; background: #B22222; border: 1px solid; borderColor: #bfbfbf; border-radius: 4px" />' +
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
  '<div style=" marginLeft: 20%; marginRight: 20%">' +
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