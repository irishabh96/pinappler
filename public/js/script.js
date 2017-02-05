$.ajax({
	url: "/api/pages",
	    success: function( results ) {
	    console.log(result)
	    for(i=0 ; i < results.length ; i++){
	    	var result = results[i];
	    	$('#page_data').append('<tr><td>'+result.page_name+'</td>'+'<td>'+result.page_title+'</td>'+'<td>'+result.myslug+'</td></tr>');
	    }
  	} 
});


$.ajax({
	url: "/api/products",
	success: function( products ){
 		for(i=0; i < products.length ; i++){
 			var product = products[i];
 			console.log(products)
 			$('#page_data').append('<tr><td>'+product.product_name+'</td>'+'<td>'+product.brand+'</td>'+'<td>'+product.category+'</td>'+'<td>'+product.discription+'</td>'+'<td>'+product.myslug+'</td>'+'<td>'+product.url+'</td></tr>')
 		}
	}
});
