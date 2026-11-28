import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'recepcion@clinica.com' },
                password: { type: 'string', example: '123456' },
                role: { type: 'string', example: 'RECEPCIONISTA' }
            },
            required: ['email', 'password', 'role']
        }
    })
    @Post('register')
    register(
        @Body() datos: {
            email: string;
            password: string;
            role: string;
        }
    ) {
        return this.authService.register(
            datos.email,
            datos.password,
            datos.role
        );
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'recepcion@clinica.com'
                },
                password: {
                    type: 'string',
                    example: '123456'
                }
            },
            required: ['email', 'password']
        }
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(
        @Body() datos: {
            email: string;
            password: string;
        }
    ) {
        return this.authService.login(
            datos.email,
            datos.password
        );
    }
}