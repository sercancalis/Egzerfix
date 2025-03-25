import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const otherSettings = await prisma.settings.findMany();
    return NextResponse.json({ data: otherSettings });
}

export async function POST(req: NextRequest) {
    var body: { [key: string]: string } = await req.json();
    for (const [name, value] of Object.entries(body)) {
        await updateOrCreateOtherSetting(name, value);
    }

    return NextResponse.json(true);
}

async function updateOrCreateOtherSetting(name: string, value: string) {
    const existingSetting = await prisma.settings.findFirst({
        where: {
            name: name
        }
    });

    if (existingSetting) {
        await prisma.settings.update({
            where: {
                id: existingSetting.id
            },
            data: {
                value: value
            }
        });
    } else {
        await prisma.settings.create({
            data: {
                name: name,
                value: value
            }
        });
    }
}