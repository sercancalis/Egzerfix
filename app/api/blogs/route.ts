import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id') ?? '';
        if (id) {
            const res = await prisma.blogs.findUnique({
                where: { id: Number(id) },
            });
            if (res) {
                return NextResponse.json({ data: res });
            } else {
                return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
            }
        } else {
            const services = await prisma.blogs.findMany();

            return NextResponse.json({ data: services }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'ID is required to delete the category' }, { status: 400 });
    }

    try {
        const category = await prisma.blogs.delete({
            where: { id: Number(id) }
        });

        if (category) {
            return NextResponse.json({ data: true }, { status: 200 });
        }

        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category and related blogs' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (data.id && Number(data.id) > 0) {
        // Update işlemi
        const res = await prisma.blogs.update({
            where: { id: Number(data.id) },
            data: data
        });

        return NextResponse.json({ data: res });
    } else {
        // Create işlemi
        const res = await prisma.blogs.create({
            data: data
        });

        return NextResponse.json({ data: res }, { status: 201 });
    }
}