var item  = $('input[name=item]');
var quantity = $('input[name=quant]');
var src_floor = $('input[name=src1]');
var src_street = $('input[name=src2]');
var src_city = $('input[name=src3]');
var src_state = $('input[name=src4]');
var src_pinCode = $('input[name=src5]');
var dest_floor = $('input[name=dest1]');
var dest_street = $('input[name=dest2]');
var dest_city = $('input[name=dest3]');
var dest_state = $('input[name=dest4]');
var dest_pinCode = $('input[name=dest5]');
var shippingDate = $('input[name=shippingDate]');

$function(){

    $('input[name=submit1]').on('click', function(req, res){
        var order = {
            item  : item.val(),
            quantity : quantity.val(),
            src_floor : src_floor.val(),
            src_street : src_street.val(),
            src_city : src_city.val(),
            src_state : src_state.val(),
            src_pinCode : src_pinCode.val(),
            dest_floor : dest_floor.val(),
            dest_street : dest_street.val(),
            dest_city : dest_city.val(),
            dest_state : dest_state.val(),
            dest_pinCode : dest_pinCode.val(),
            shippingDate : shippingDate.val()
        };  

        $.ajax({
            type: 'POST',
            url: '/ship',
            data: order,
            headers: {"Accept": "application/json; odata=verbose"}
        })
        .done(function(response){
            console.log(response);
        });
      });
}