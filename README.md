# Fuzgram Admin

## Steps 

1. Install mkcert
``` 
brew install mkcert
brew install nss # if you use Firefox 
```

2. Install local root CAs
```
mkcert -install
```

3. Install localhost certificates
```
mkcert localhost
```

4. ``` npm i ```
5. ``` npm start ```