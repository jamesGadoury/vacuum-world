exports.home_page_get = function(req, res) {
   res.render('index', { 
      title: 'Vacuum World',
   });
}