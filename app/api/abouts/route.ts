import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const otherSettings = await prisma.abouts.findMany();
    return NextResponse.json({ data: otherSettings });
}

export async function POST(req: NextRequest) {
    const body: { [key: string]: string } = await req.json();
    for (const [name, value] of Object.entries(body)) {
        await updateOrCreateOtherSetting(name, value);
    }

    return NextResponse.json(true);
}

async function updateOrCreateOtherSetting(name: string, value: string) {
    const existingSetting = await prisma.abouts.findFirst({
        where: {
            name: name
        }
    });

    if (existingSetting) {
        await prisma.abouts.update({
            where: {
                id: existingSetting.id
            },
            data: {
                value: value
            }
        });
    } else {
        await prisma.abouts.create({
            data: {
                name: name,
                value: value
            }
        });
    }
}