const fs = require('fs');

// Replace with your actual private key from the Firebase JSON
const PRIVATE_KEY = `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuMLJOulyTxNyD
Hy9I8xDq9/D3O5xyf7ndUHGJWTJZIwj9AA/JAqIlq3cE2+7fVImk0AZrvM7pT+Ws
... (truncated for clarity)
-----END PRIVATE KEY-----
`;

const escapedKey = PRIVATE_KEY.replace(/\n/g, '\\n');

console.log(escapedKey);
