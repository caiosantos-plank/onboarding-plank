import { createClient } from "@/app/lib/utils/supabase/server";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const supabase = await createClient();
  const { data, error } = await supabase.from('chats').select('*').eq('id', chatId).single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}