import createError from 'http-errors'
import express, {Request, Response, NextFunction} from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import userRouter from './routes/users'
import indexRouter from './routes/index'
// import { testConnection } from './db-config/postgres-connection';
import cors from 'cors'

//documentation rendering
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('document.yaml')

// testConnection()

const app = express();

app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});



// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
