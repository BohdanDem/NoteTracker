import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate as validateUuid } from 'uuid';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const isValidId = validateUuid(req.params.id);
      if (isValidId) {
        next();
      } else throw new BadRequestException('Not valid ID');
      return;
    }
  }
}
