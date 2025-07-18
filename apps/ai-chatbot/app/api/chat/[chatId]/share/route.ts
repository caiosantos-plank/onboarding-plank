import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/lib/utils/supabase/server";


export async function POST(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
    const { chatId } = await params;
    const { email } = await request.json();

    const supabase = await createClient();
    const { data, error } = await supabase.from('profiles').select('*').eq('email', email).single();

    if (!data) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: chat, error: chatError } = await supabase.from('chat_users').insert({
        chat_id: chatId,
        user_id: data.id,
    }).select();

    if (chatError) {
        return NextResponse.json({ error: chatError.message }, { status: 500 });
    }

    return NextResponse.json(chat);
}