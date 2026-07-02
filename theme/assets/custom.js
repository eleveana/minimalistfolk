/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/

(function() {
  // Klaviyo — Added to Cart tracking

  function klaviyoTrackAddToCart(item) {
    if (typeof window._learnq === 'undefined') return;

    var productUrl = window.location.origin + '/products/' + item.handle;
    var imageUrl = item.featured_image ? item.featured_image.url : (item.image || '');

    window._learnq.push(['track', 'Added to Cart', {
      '$value':               (item.final_line_price / 100),
      'AddedItemProductName': item.product_title || item.title,
      'AddedItemProductID':   item.product_id,
      'AddedItemSKU':         item.sku,
      'AddedItemCategories':  item.product_type ? [item.product_type] : [],
      'AddedItemImageURL':    imageUrl,
      'AddedItemURL':         productUrl,
      'AddedItemPrice':       (item.final_price / 100),
      'AddedItemQuantity':    item.quantity,
      'ItemNames':            [item.product_title || item.title],
      'CheckoutURL':          window.location.origin + '/checkout',
    }]);
  }

  var origFetch = window.fetch;
  window.fetch = function(input, init) {
    var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
    var isCartAdd = url.indexOf('/cart/add') !== -1;

    return origFetch.apply(this, arguments).then(function(response) {
      if (isCartAdd && response.ok) {
        response.clone().json().then(function(data) {
          var items = data.items || [data];
          items.forEach(function(item) {
            klaviyoTrackAddToCart(item);
          });
        }).catch(function() {});
      }
      return response;
    });
  };

})();