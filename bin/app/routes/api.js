module.exports = project => `
import express, { Express, Request, Response, NextFunction } from "express";
import Logger from '../tools/logger';
const router: any = express.Router();

router.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        v: "0.0.1",
        message: "Hello World"
    });
});
export default router;
`