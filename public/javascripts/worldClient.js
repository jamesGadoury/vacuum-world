console.log('Client-side code running');

function reset() {
   console.log('Reset button clicked.');

   fetch('/world/1', {method: 'POST'})
      .then(function(res) {
         if(res.ok) {
            console.log('Click was recorded.');
            return;
         }
         throw new Error('Request failed.');
      })
      .catch(function(err) {
         console.log(err);
      });
}