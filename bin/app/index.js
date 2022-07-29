module.exports = (project) => `
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import ApiRouter from './routes/api';


import Logger from "./tools/logger";
import morganMiddleware from "./middlewares/morgan";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 4646;

app.use(morganMiddleware);

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    v: "0.0.1",
  });
});

app.use("/api", ApiRouter);

app.listen(port, () => {
  Logger.debug('⚡️[server]: Server is running at https://localhost:' + port);
});
`