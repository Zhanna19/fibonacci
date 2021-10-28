import express from 'express';
import {nearestFibonacciNumber} from '../controllers/nearestFibonacciNumber';

const router = express.Router();
router.get('/:number', nearestFibonacciNumber)

export default router
