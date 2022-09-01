$(function(){
  $(document).ready(function () {
    get_goods()
    $("#categorySelect").on("change", function () {
        get_goods($(this).val())
    })
})

    function get_goods(category) {
      $("#goodsList").empty()
      console.log(category)
      $.ajax({
          type: "GET",
          url: `/notice/:id${category ? "?tag=" + category : ""}`,
          data: {},
          success: function (response) {
              let products = response["products"]
              for (let i = 0; i < products.length; i++) {
                  make_card(products[i])
              }
          }
      })
    }

    function get2digits (num){
      return ('0' + num).slice(-2);
    }
  
    function getDate(dateObj){
      if(dateObj instanceof Date)
        return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1)+ '-' + get2digits(dateObj.getDate());
    }
  
    function getTime(dateObj){
      if(dateObj instanceof Date)
        return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
    }
  
    function convertDate(){
      $('[data-date]').each(function(index,element){
        var dateString = $(element).data('date');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date));
        }
      });
    }
  
    function convertDateTime(){
      $('[data-date-time]').each(function(index,element){
        var dateString = $(element).data('date-time');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date)+' '+getTime(date));
        }
      });
    }
    
    function showValue(target){
      const value = target.value;
      const text =  target.options[target.selectedIndex].text;
      console.log(value);
      console.log(text);
    }
  
    convertDate();
    convertDateTime();
    showValue();
  });