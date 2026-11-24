import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicosService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.doctor.findMany({
            include: {
                speciality: true
            }
        });
    }

    findOne(id: number) {
        return this.prisma.doctor.findUnique({
            where: { id },
            include: {
                speciality: true
            }
        });
    }

    create(datos: {
        name: string;
        lastName: string;
        specialityId: number;
        userId: number;
    }) {
        return this.prisma.doctor.create({
            data: datos
        });
    }

    update(id: number, datos: {
        name?: string;
        lastName?: string;
        specialityId?: number;
        userId?: number;
        activo?: boolean;
    }) {
        return this.prisma.doctor.update({
            where: { id },
            data: datos
        });
    }

    remove(id: number) {
        return this.prisma.doctor.delete({
            where: { id }
        });
    }

    findAllPublic() {
        return this.prisma.doctor.findMany({
            where: {
                activo: true
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                speciality: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    findBySpeciality(specialityId: number) {
        return this.prisma.doctor.findMany({
            where: {
                specialityId
            },
            include: {
                speciality: true
            }
        });
    }

    updateStatus(id: number, activo: boolean) {
        return this.prisma.doctor.update({
            where: { id },
            data: { activo }
        });
    }
}