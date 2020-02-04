# Info
NodeJs adapter for `2Checkout REST API v6`.

# Disclaimer
⚠Right now, with "amazing 2checkout" documentation i can't to fully describe types of models. 

# TODOs
### Services:
* [ ] ProductsService
    * [x] getProducts
    * [ ] getProductByCode
    * [x] createProduct
    * [x] deleteProduct (disable product/subscription)
    * [ ] enableProduct (enable product/subscription)
    * [ ] updateProduct
* [ ] OrdersService
    * [x] getOrders
    * [x] createOrder
* [ ] InvoicesService
* [ ] CustomersService
* [ ] PayoutsService
* [ ] SubscriptionsService
### Utils:
* [x] Api
* [x] HashCreator
* [x] ConvertPlusUrlGenerator
    * [x] test for simple dynamic product
    * [ ] write test function for 2checkout page(for ensure that generated link is correct)
    * [ ] test for simple catalog product
    * [ ] test generating link with redirect url
    * [ ] required parameters checking

# How to test?
2Checkout do not have a test environment for `REST API v6`, for running tests you must to create `.env` file and define in it variables:
* `MERCHANT_ID` - Your merchant id
* `SECRET_KEY` - Your secret key
* `BUY_LINK_SECRET_WORD` - Your Buy Link secret word, that you can to get in your merchant panel
* `BUY_LINK_EXPECTED_DYNAMIC_LINK` -
Getting of this string is harder. For getting, you must to generate `Buy link` on [this page](https://secure.2checkout.com/cpanel/integration.php?flow=ConvertPlus) with parameters:

    * **Products type**: dynamic
    * **Currency**: USD
    * **Product type**: Physical/Tangible
    * **Product name**: Name
    * **Product quantity**: 1
    * **Product price**: 10
    * **Order tamplate**: default

    After filling form you will get link like this:`https://secure.2checkout.com/checkout/buy?merchant=250283563061&dynamic=1&currency=USD&tpl=default&prod=Name&tangible=1&price=10&type=product&qty=1&signature=89e285b1902d66eda5292ec0ea0b6f191109e1e0ea696108df13a21ba691166f`.


📄**My advice**: create new account for running tests.

```sh
# .env file
MERCHANT_ID='xxxxxxxxxxxx'
SECRET_KEY='xxxxxxxxxxxxxxxxxxxx'
# Testing of ConvertPlus url generator
BUY_LINK_SECRET_WORD='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
BUY_LINK_EXPECTED_DYNAMIC_LINK="https://secure.2checkout.com/checkout/buy?merchant=250283563061&dynamic=1&currency=USD&tpl=default&prod=Name&tangible=1&price=10&type=product&qty=1&signature=89e285b1902d66eda5292ec0ea0b6f191109e1e0ea696108df13a21ba691166f"
```
