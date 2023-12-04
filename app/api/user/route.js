// import { NextResponse } from "next/server";
// import { Hash } from "crypto";


// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { email, username, password, room } = body;

//         const hashedPassword = await Hash(password, 10)

//         const newUser = await db.user.create({
//             data: {
//                 email,
//                 username,
//                 password: hashedPassword,
//                 room
//             }
//         })

//         return NextResponse.json(body)
//     } catch (error) {

//     }
// }


import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";


export async function POST(req) {

    try {

        const body = await req.json();

        const { email, username, password, room } = body;

        // weka validation hapa
        // mfano: ======================= //
        // kama hamna email: return { "errors": ["Email ni lazima iwepo"] }

        const errorMessages = []

        if (!email) errorMessages.push("Email is required")
        if (!username) errorMessages.push("Username is required")
        if (!password) errorMessages.push("Password is required")
        if (!room) errorMessages.push("Room is required")

        if (errorMessages.length > 0) return NextResponse.json({
            errors: errorMessages
        })

        // end of the example ================= //

        // Check if email exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Check if username exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUserByUsername) {
            return NextResponse.json(
                { user: null, message: "User with this username already exists" },
                { status: 409 }
            );
        }

        // Hash the password using bcrypt
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                room,
            }
        });

        return NextResponse.json(
            { user: newUser, message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {

        console.error("Error creating user:", error);

        return NextResponse.json(
            { user: null, message: "Internal Server Error" },
            { status: 500 }
        );

    }
}
