# README

## quick start

`npm install`

`yarn start`

navigate to http://localhost:3000

## Update layout

Options and menu items can be configured in config.json

### Component types and options

- Boolean
- Number or Boolean: type ‘Number’ set allowBoolean to true 
- String
- Dropdown: provide Options array with option objects keyed by [text, value, label]
- Dropdown allowing for user input: as above with property: allowAdditions set to true 

### To run PT Feeder

1. Download and extract this zip file [https://www.dropbox.com/s/g3o4m1crxfj0g7x/test.zip?dl=0](https://www.dropbox.com/s/g3o4m1crxfj0g7x/test.zip?dl=0)
2. To make startup a little quicker, you might want to change the trading.exchange = BITTREX to trading.exchange = BINANCE in application.properties of the folder in 1. 
3. Download and extract this zip file somewhere [https://www.dropbox.com/s/e7mj19nes98nwnf/pt-feeder-1.4.1-beta2.zip?dl=0](https://www.dropbox.com/s/e7mj19nes98nwnf/pt-feeder-1.4.1-beta2.zip?dl=0). Excuse the dll hell. Working on fixing that at some point. 
4. Install PTF installation guide [here](https://github.com/mehtadone/PTFeeder/wiki/Installation)
5. Edit the hostsettings.json in the PT Feeder config directory. Point ProfitTrailerFolder1 to the download location of 1. The license key is 5A11-A425-3518-4D86-9E74-814B-DDB3
7. Start PT Feeder by calling 'dotnet pt-feeder.dll'

GET settings file: http://localhost:5001/api/v1/app/settings
POST settings file: http://localhost:5001/api/v1/app/settings

### Authentication on api calls

I have implemented a basic authorization system. It requires standard `Authorization` header with the plain secret token value (no hashing yet).

Initially there is no security token set in the `hostsettings.json`. So all the API endpoints will be closed by default except the `api/v1/app/hostsettings/token`. This endpoint allows to set the token initially. 

Sample request `api/v1/app/hostsettings/token`:
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:5001/api/v1/app/hostsettings/token",
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache",
    "Postman-Token": "6136d16f-de79-5bef-743d-157eca97db10"
    //"Authorization" : "<current token value>"
  },
  "data": {
    "token": "newtoken"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
Please note that for changing the security token after the initial set you have to pass the current token value as well.

Possible results:
401 - not authorized
400 - bad request (in case if empty new token or equals to the current one)
502 - server error (exception)

For all the rest API endpoints need to pass the `"Authorization" : "<current token value>"` header with the plain token value (right now I have applied the Authorization header checking only to the status controller `api/v1/app/status`).


