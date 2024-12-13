const mongoose = require('mongoose');

const FinancialSchema = new mongoose.Schema({
    accountId: String,
    accountHolderName: String,
    balance: String, // Encrypted
    transactions: String, // Encrypted
    lastUpdated: String // Encrypted
});

module.exports = mongoose.model('Financial', FinancialSchema);