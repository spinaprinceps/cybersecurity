const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

const encrypt = (text) => {
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey.slice(0, 32), Buffer.alloc(16, 0));
    return Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
};

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey.slice(0, 32), Buffer.alloc(16, 0));
    return Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]).toString();
};

module.exports = { encrypt, decrypt };
