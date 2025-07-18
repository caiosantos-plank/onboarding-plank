import { createClient } from "@/app/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { title } = await request.json();
    
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error: "Unauthorized!" }, { status: 403 });
    }

    const { data: chat, error: chatError } = await supabase.from('chats').insert({
        title: title,
    }).select().single();

    if (chatError) {
        return NextResponse.json({ error: "Error creating chat!" }, { status: 500 });
    }
    
    const { data: chatUser, error: chatUserError } = await supabase.from("chat_users").insert({
        chat_id: chat.id,
        user_id: data.user.id,
    }).select().single();

    if (chatUserError) {
        return NextResponse.json({ error: "Error creating chat user!" }, { status: 500 });
    }

    return NextResponse.json({ data: chat });
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error: "Unauthorized!" }, { status: 403 });
    }

    // const { data: chats, error: chatsError } = await supabase.from("chats").select(`
    //     id, title, created_at, chat_users (*)
    // `).eq("chat_users.user_id", data.user.id);

    const { data: chats, error: chatsError } = await supabase
        .from("chats")
        .select(`
            id,
            title,
            created_at,
            chat_users!inner (
            user_id
            )
        `)
        .eq("chat_users.user_id", data.user.id);
    
    if (chatsError) {
        return NextResponse.json({ error: "Error fetching chats!" }, { status: 500 });
    }

    return NextResponse.json({ data: chats });
}