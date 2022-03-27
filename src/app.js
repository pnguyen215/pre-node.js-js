import {
    express,
    dotenv,
    logger,
    bodyParser,
    paths,
    cors
} from './commons/commons';
const app = express();

class App {

    constructor() {
        dotenv.config();
        this.setCors();
        this.middleware();
        this.startServer();
        this.configRoutes();
    }

    corsOptions = {
        origin: "",
        optionsSuccessStatus: 200
    };

    setCors() {
        if (!process.env.NODE_ENV) {
            return this.corsOptions;
        }

        switch (process.env.NODE_ENV) {
            case 'dev': {
                this.corsOptions.origin = `${process.env.HOST_DEV}` + `${process.env.PORT}`;
                break;
            }
            case 'prod': {
                this.corsOptions.origin = `${process.env.HOST_PROD}` + `${process.env.PORT}`;
                break;
            }
        }
        return this.corsOptions;
    }

    logDev() {
        // begin::Log console
        console.log('==> Workplace is running on: ', `${process.env.NODE_ENV}`, ` - on ${new Date()}`);
        console.log(this.corsOptions);
        // end::Log console
    }

    middleware() {
        this.logDev();
        // begin::Log API
        app.use(logger('dev'));
        // end::Log API
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(express.static(paths.join(__dirname, 'public')));
        app.use(cors(this.corsOptions));
    }

    // begin::Start Server
    startServer() {
        const PORT = process.env.PORT || 9090;
        app.listen(PORT, () => {
            console.log(`NgxOses Server is listening on port ${PORT}.`);
        });
    }
    // end::Start Server

    // begin::Config global routes
    configRoutes() {
        require('./routes/app-routes.js')(app); // 1st way

        let customRoutes = require('./routes/memo-routes.js'); // 2nd way
        app.use('/api/v1/memo', customRoutes);
    }
    // end::Config global routes

}

export default App;