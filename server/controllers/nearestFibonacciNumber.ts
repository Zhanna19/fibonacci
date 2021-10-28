import {Request, Response, NextFunction} from 'express';
import logging from '../source/config/logging';

const NAMESPACE = 'Fibonacci Numbers Controller';

const nearestFibonacciNumber = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Calculate nearest Fibonacci number')

    const number = parseInt(req.params.number);

    let first = 0;
    let second = 1;

    if(number === 0) {
        return 0;
    }

    let third = first + second;

    while (third <= number) {
        first = second;
        second = third;

        third = first + second
    }

    const result = (Math.abs(third - number) >= Math.abs(second - number)) ? second : third;

    return res.status(200).json({
        number: result
    })
}

export {nearestFibonacciNumber}