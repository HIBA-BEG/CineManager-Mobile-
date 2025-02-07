const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const router = require('./src/routes/router');
const dbConnect = require('./src/config/config');


class Server {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();
        this.config();
        this.routing();
        this.db();
    }

    db() {
        dbConnect()
    }

    config() {
        // this.app.use(cors());
        this.app.use(cors({ origin: 'http://localhost:3001' }));
        this.app.use(express.json());
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        
    }

    routing() {
        this.app.use('/', router);
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log('Server started on port ' + this.port);
        });
    }
}

new Server().start();
