# Overview

# Requirements
* Node.js v4.1.1
* The propensity and determination to find an overpriced apartment at Avalon Mission Bay in San Francisco, CA

# Setup
```shell
npm install
chmod a+x scraper.js
```

# Options
```
--minRent	Positive (zero-inclusive) integer value for the minimum rent you want to pay.
--maxRent	Positive (zero-inclusive) integer value for the maximum rent you're willing to pay.
--bedrooms	0, 1, 2, or 3. The number of bedrooms you want in your apartment.
--bathrooms 0, 1, 2, or 3. The number of bathrooms you want in your apartment.
```

# Run
Run the script via command line:
```shell
./scraper.js --minRent <value> --maxRent <value> --bedrooms <value> --bathrooms <value>
```

Example:
```shell
./scraper.js --minRent 0 --maxRent 5000 --bedrooms 2 --bathrooms 2
```