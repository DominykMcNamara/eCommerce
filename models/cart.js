const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
    constructor(data = {}) {
        this.isActive = data.isActive || true
    }

    async create(data) {
        
    }
}