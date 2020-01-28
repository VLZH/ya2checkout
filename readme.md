# Info
NodeJs adapter for `2Checkout REST API v6`.

# Disclaimer
⚠Right now, with "amazing 2checkout" documentation i can't to fully describe types of models. 

# TODO
- [x] ProductsService
- [x] OrdersService

# How to test?
2Checkout do not have a test environment for `REST API v6`, for running tests you must to create `.env` file and define in it two variable: `MERCHANT_ID` and `SECRET_KEY`.

📄**My advice**: create new account for running tests.

```sh
# .env file
MERCHANT_ID='************'
SECRET_KEY='********************'
```
