# CORS / HTTP / HTTPS XHR demo

This is a small tool I built to test the behaviour of XHR requests between combinations of secure, non secure, CORS and non CORS-enabled web servers.

It runs on a single node.js server, having multiple handlers for different domains and security combinations. Uses [Hapi.js](http://hapijs.com) framework and self signed certificates.

## Usage

Create local self signed certificate in the project root directory and add them to the keychain

```
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout secure.example.dev.key -out secure.example.dev.crt -subj '/CN=secure.example.dev'
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout alsosecure.example.dev.key -out alsosecure.example.dev.crt -subj '/CN=alsosecure.example.dev'
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout securecors.example.dev.key -out securecors.example.dev.crt -subj '/CN=securecors.example.dev'
sudo security add-trusted-cert -p ssl -d -r trustRoot -k ~/Library/Keychains/login.keychain secure.example.dev.crt
sudo security add-trusted-cert -p ssl -d -r trustRoot -k ~/Library/Keychains/login.keychain alsosecure.example.dev.crt
sudo security add-trusted-cert -p ssl -d -r trustRoot -k ~/Library/Keychains/login.keychain securecors.example.crt
```

Add the domains to /etc/hosts to be able to address them by name

```
127.0.0.1   insecure.example.dev alsoinsecure.example.dev insecurecors.example.dev
127.0.0.1   secure.example.dev   alsosecure.example.dev   securecors.example.dev
```

Remember to `npm install` and then run the server either by `gulp` or directly through `node index.js`

Browse to `https://secure.example.dev:3005/` and try the buttons to fetch content. Open the javascript console to see the error messages from the browser.

## TL;DR

Modern browsers will **not** allow https pages to fetch **non secure** XHR content, even if CORS settings allow it. XHR fetched content from non secure sources is considered [blockable content](https://w3c.github.io/webappsec-mixed-content/#category-blockable).

To avoid the majority of web sites to break completely when going https, browsers allow https pages to fetch less risky content as described in [optionally blockable content](https://w3c.github.io/webappsec-mixed-content/#category-optionally-blockable).
