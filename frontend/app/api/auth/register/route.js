import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, password } = await request.json();

    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: 'POST',
        body: JSON.stringify({
            name, email, password
        }),
        headers: { "Content-Type": "application/json" }
    })

    const response = await res.json();

    return NextResponse.json({
        response
    })

}