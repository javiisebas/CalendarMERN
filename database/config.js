const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB is connected!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la inicialización de la BBDD en MongoDB')
    }
}

module.exports = {
    dbConnection
} 