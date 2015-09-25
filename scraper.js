#!/usr/bin/env node

var request = require('request');
var _ = require('underscore');
var parseArgs = require('minimist');

var args = parseArgs(process.argv.slice(2));
console.dir(args);

var minPrice = args.minPrice || 0;
var maxPrice = args.maxPrice || 9999;
var numBedrooms = args.bedrooms || 2;
var numBathrooms = args.bathrooms || 2;

request('http://api.avalonbay.com/json/reply/ApartmentSearch?communityCode=CA067&min=' + minPrice + '&max=' + maxPrice + '&_=1443137667833', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var aptData = JSON.parse(body);
    var availableApts = aptData.results.availableFloorPlanTypes;
    var twoBrApts = _.where(availableApts, { floorPlanTypeCode: (numBedrooms + "BD") })[0].availableFloorPlans;
    var twoBrTwoBaApts = _.where(twoBrApts, { floorPlanBathType: (numBathrooms + " baths") });
    var cheapTwoBrTwoBaApts = _.filter(twoBrTwoBaApts, function (e) {
        var pricing = e.finishPackages[0].apartments[0].pricing;
        return Math.min(pricing.amenitizedRent, pricing.effectiveRent) < 4900;
    });
    console.log(JSON.stringify(cheapTwoBrTwoBaApts));
  }
});