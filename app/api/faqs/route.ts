import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id') ?? '';
        if (id) {
            const res = await prisma.faqs.findUnique({
                where: { id: Number(id) },
            });
            if (res) {
                return NextResponse.json({ data: res });
            } else {
                return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
            }
        } else {
            const services = await prisma.faqs.findMany();

            return NextResponse.json({ data: services }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') ?? '';
    if (id) {
        try {
            const res = await prisma.faqs.delete({
                where: { id: Number(id) }
            });

            if (res) {
                return NextResponse.json({ data: true }, { status: 200 });
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'ID is required to delete service' }, { status: 400 });
    }

    return NextResponse.json({ data: null }, { status: 400 });
}

export async function POST(req: NextRequest) {
    const data = await req.json(); // Body verisini al 
    if (data.id && Number(data.id) > 0) {
        // Update işlemi
        const res = await prisma.faqs.update({
            where: { id: Number(data.id) },
            data: data
        });

        return NextResponse.json({ data: res });
    } else {
        // Create işlemi
        const res = await prisma.faqs.create({
            data: data
        });

        return NextResponse.json({ data: res }, { status: 201 });
    }
}