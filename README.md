# NationBuilder

Quickstart guide to save and retrieve data from NationBuilder through API

## Getting Started

### Prerequisites

Register your app by going to *Settings > Developer > Register* app with *OAuth callback URL* as *http://yourdomain.com/getToken/callback*. Get the client id and secret, and update */src/config.js* with your nation credentials. Make sure the config file has *nation_slug, client_id, client_secret and redirect_uri*  values set as these are required to generate the access token.

Access token and site slug are required to get data from NationBuilder.

### Installing

Clone the repository and install the required dependencies by running the following command from root of the folder

```
npm install
```
