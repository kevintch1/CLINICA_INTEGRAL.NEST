import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.patient.findMany();
    }

    findOne(id: number) {
        return this.prisma.patient.findUnique({
            where: { id }
        });
    }

    create(datos: CreatePacienteDto) {
        const birthDate = new Date(datos.birthDate);

        if (birthDate > new Date()) {
            throw new BadRequestException(
                'La fecha de nacimiento no puede ser futura'
            );
        }

        return this.prisma.patient.create({
            data: {
                ...datos,
                birthDate
            }
        });
    }


    update(id: number, datos: UpdatePacienteDto) {
        if (datos.birthDate) {
            const birthDate = new Date(datos.birthDate);

            if (birthDate > new Date()) {
                throw new BadRequestException(
                    'La fecha de nacimiento no puede ser futura'
                );
            }

            return this.prisma.patient.update({
                where: { id },
                data: {
                    ...datos,
                    birthDate
                }
            });
        }

        return this.prisma.patient.update({
            where: { id },
            data: datos
        });
    }

    remove(id: number) {
        return this.prisma.patient.delete({
            where: { id }
        });
    }

    getHistory(id: number) {
        return this.prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    include: {
                        doctor: {
                            include: {
                                speciality: true
                            }
                        }
                    }
                }
            }
        });
    }

    findByUser(userId: number) {
        return this.prisma.patient.findUnique({
            where: { userId }
        });
    }
}