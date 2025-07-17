import { createClient } from "@/app/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const supabase = await createClient();

    await supabase.auth.signOut();

    revalidatePath('/', 'layout');
    return NextResponse.redirect(new URL('/login', request.url), {
        status: 302,
    });
}