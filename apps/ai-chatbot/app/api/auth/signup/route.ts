import { createClient } from "@/app/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}