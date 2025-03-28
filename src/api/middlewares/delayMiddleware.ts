import { getValue } from '../../helpers/localStorage';
import { Request, NextFunction, Response } from 'express';


export const delayMiddleware = (_req:Request, _res: Response, next: NextFunction) => {

    const delay = getValue("delay") as number;

    console.log(delay)

    setTimeout(next, delay * 1000);
};