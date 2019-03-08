# NationBuilder

Quickstart guide to save and retrieve data from NationBuilder through API

## Getting Started

### Prerequisites

Access token, nation slug and site slug are required to get data from the NationBuilder. Please make sure they are present in the */src/config.js* file. There are two ways to get the access token.

1. Log into the NationBuilder admin and go to *Settings > Developer > API token*. Create a new one if not present.

2. Or, register a app by going to *Settings > Developer > Register app* with *OAuth callback URL* as *http://yourdomain.com/getToken/callback*. Get the client id and secret, and update the */src/config.js* file with the credentials. Make sure the config file has *nation_slug, client_id, client_secret and redirect_uri*  values set as these are required to generate the access token.

### Installing

Clone the repository and install the required dependencies by running the following command from root of the folder

```
npm install
```
### Running the application

From root of the folder run the following command.

```
npm start
```
The application will be up and running. The default port used is 3000.