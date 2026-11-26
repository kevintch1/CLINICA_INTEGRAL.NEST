
import {
    ArgumentsHost,
    Catch,
    ConflictException,
    ExceptionFilter,
    NotFoundException,
    HttpStatus
} from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        switch (exception.code) {
            case 'P2002':
                return response
                    .status(HttpStatus.CONFLICT)
                    .json(
                        new ConflictException(
                            'Ya existe un registro con ese valor único'
                        ).getResponse()
                    );

            case 'P2025':
                return response
                    .status(HttpStatus.NOT_FOUND)
                    .json(
                        new NotFoundException(
                            'Registro no encontrado'
                        ).getResponse()
                    );

            default:
                throw exception;
        }
    }
}
