# CORS / HTTP / HTTPS demo

A simple node.js server with multiple handlers on different domains. Uses Hapi.js framework and self signed certificates
A web tool to populate a [MongoDB Atlas](https://cloud.mongo.com) instance with sample data (fetches datasets from [Mockaroo](https://www.mockaroo.com).

## Usage

Create localhost self signed certificate and add them to the keychain

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
127.0.0.1       insecure.example.dev secure.example.dev alsosecure.example.dev securecors.example.dev
```

Browse to `https://secure.example.dev:8081/`
