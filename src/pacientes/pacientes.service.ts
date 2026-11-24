import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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

    create(datos: {
        name: string;
        lastName: string;
        email: string;
        phone: string;
        birthDate: Date;
        address: string;
    }) {
        return this.prisma.patient.create({
            data: datos
        });
    }

    update(id: number, datos: {
        name?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        birthDate?: Date;
        address?: string;
    }) {
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