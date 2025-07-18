import { createClient } from "@/app/lib/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = '/success_authenticated';

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.verifyOtp({
     type,
      token_hash,
    });

    const { error: profileError } = await supabase.from('profiles').update({
      email: data?.user?.email,
    }).eq('id', data?.user?.id);

    if (!error && !profileError) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo);
    }
  }

  redirectTo.pathname = '/error'; // TODO: add error page
  return NextResponse.redirect(redirectTo);
}