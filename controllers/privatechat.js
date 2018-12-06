module.exports = function(){
  return {
    SetRouting: function(router){
      router.get('/chat', this.getchatPage);
    },

    getchatPage: function(req, res){
      res.render('private/privatechat', {user:req.user});
    }
  }
}
