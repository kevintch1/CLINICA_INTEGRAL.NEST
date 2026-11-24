import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException
} from '@nestjs/common';

import { PacientesService } from './pacientes.service.js';

@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) { }

    // GET /pacientes
    @Get()
    findAll() {
        return this.pacientesService.findAll();
    }

    // GET /pacientes/1
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const paciente = await this.pacientesService.findOne(Number(id));

        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return paciente;
    }

    // POST /pacientes
    @Post()
    create(@Body() datos: any) {
        datos.birthDate = new Date(datos.birthDate);
        return this.pacientesService.create(datos);
    }

    // PUT /pacientes/1
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() datos: any
    ) {
        const paciente = await this.pacientesService.findOne(Number(id));

        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        if (datos.birthDate) {
            datos.birthDate = new Date(datos.birthDate);
        }

        return this.pacientesService.update(Number(id), datos);
    }

    // DELETE /pacientes/1
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const paciente = await this.pacientesService.findOne(Number(id));

        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return this.pacientesService.remove(Number(id));
    }
}