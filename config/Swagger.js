const swaggerJsDoc = require('swagger-jsdoc')

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'eCommerce API',
            description: "eCommerce API Information",
            contact: {
                name: "Dominyk Smith"
            },
            servers: ["htt[://localhost:3500"]
        }
    },
   
    apis: ['.routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs