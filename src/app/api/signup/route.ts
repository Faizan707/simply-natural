import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const JWT_SECRET = process.env.JWT_SECRET ;

const getDefaultAvatar = (name: string) => `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(name)}`;

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        
        const image = data.get("image") as File | null;
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        console.log("Received data:", { name, email, hasPassword: !!password, hasImage: !!image });

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let imageUrl = getDefaultAvatar(name);

        if (image && image.size > 0) {
            console.log("Processing image of size:", image.size);
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imageUrl = `data:${image.type};base64,${buffer.toString('base64')}`;
            console.log("Image processed successfully");
        }

        console.log("Creating user in database...");
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: imageUrl,
                isAdmin: false,
                createAt: new Date(),
                updatedAt: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                isAdmin: true,
                createAt: true,
                updatedAt: true
            }
        });

        console.log("User created successfully:", { userId: newUser.id });

        // Create token payload
        const tokenPayload = {
            userId: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        };

        console.log("Creating JWT with payload:", tokenPayload);
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });
        console.log("JWT created successfully");

        return NextResponse.json({
            message: "User created successfully",
            token,
            user: newUser
        });

    } catch (error: any) {
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}