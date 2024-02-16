import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../service/payment.service";

const service = container.resolve(PaymentService);
