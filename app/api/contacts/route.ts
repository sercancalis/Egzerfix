import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Tüm deneyimleri almak
        const contacts = await prisma.contacts.findMany();

        return NextResponse.json({ data: contacts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') ?? '';
    if (id) {
        try {
            // ID'ye göre deneyimi silme işlemi
            const deleteContact = await prisma.contacts.delete({
                where: { id: Number(id) }
            });

            if (deleteContact) {
                return NextResponse.json({ data: true }, { status: 200 });
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'ID is required to delete contact' }, { status: 400 });
    }

    return NextResponse.json({ data: null }, { status: 400 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    // Create işlemi
    const newContact = await prisma.contacts.create({
        data: body
    });

    return NextResponse.json({ data: newContact }, { status: 201 });

}