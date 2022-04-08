function solve() {
   document.querySelector('#btnSend').addEventListener('click', clickHandler);

   function clickHandler() {
      let btn = document.getElementById('btnSend');
      let input = document.querySelector('#inputs textarea');
      let bestRestourantP = document.querySelector('#bestRestaurant p');
      let workersP = document.querySelector('#workers p');

      if (btn == null || input == null || bestRestourantP == null || workersP == null) {
         throw new Error('Missing DOM element!');
      }
   
      
   }
}