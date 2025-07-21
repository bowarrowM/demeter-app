// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        console.log('Signup request received:', { name, email });

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Password strength validation
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists with this email' },
                { status: 409 }
            );
        }

        // Create new user
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: user
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Error in signup API:', error);

        // Handle Prisma unique constraint error (P2002)
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'User already exists with this email' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}