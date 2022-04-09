const { logErrorMiddleware, responseError } = require('./middleware/errorHandlerMiddleware');
const loggerMorganHttp = require('./middleware/loggerMorganHttpMiddleware');
const loggerWinston = require('./middleware/loggerWinstonMiddleware');
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
        origin: '',
        optionsSuccessStatus: 200
    };

    setCors() {
        if (!process.env.NODE_ENV) {
            return this.corsOptions;
        }

        switch (process.env.NODE_ENV) {
            case 'dev' || 'DEV': {
                this.corsOptions.origin = `${process.env.HOST_DEV}` + `${process.env.PORT}`;
                break;
            }

            case 'prod' || 'PROD': {
                this.corsOptions.origin = `${process.env.HOST_PROD}` + `${process.env.PORT}`;
                break;
            }
        }
        return this.corsOptions;
    }

    logCommon() {
        loggerWinston.info(`Currently, time zone = ${process.env.PARAMS_TIME_ZONE}`);
        loggerWinston.info(`Workplace is running on: ${process.env.NODE_ENV}`);
        loggerWinston.info(this.corsOptions);
    }

    middleware() {
        // begin::Style common
        process.env.TZ = process.env.PARAMS_TIME_ZONE;
        // begin::Style common
        this.logCommon();
        app.use(logger('dev'));
        // begin::Json Handler
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(express.static(paths.join(__dirname, 'public')));
        // begin::Style cors
        app.use(cors(this.corsOptions));
        // begin::Error Handler Trigger, use next() function to callback error middleware
        app.use(logErrorMiddleware);
        app.use(responseError);
        // begin::Morgan HTTP Request
        app.use(loggerMorganHttp);
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

        let sysRoutes = require('./routes/sys-files-routes');
        app.use('/api/v1/sys-files', sysRoutes);
    }
    // end::Config global routes

}

export default App;