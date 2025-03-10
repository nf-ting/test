import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "Unknown IP";

  // Create a single supabase client for interacting with your database
  const supabase = createClient("https://vltihetrproitvikpwko.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdGloZXRycHJvaXR2aWtwd2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1OTQwMzksImV4cCI6MjA1NzE3MDAzOX0.qwYnGX5erDHpEQB5BY2WcKJW5ftp1Q_vpgDoH0K4xDc')

  const { data, error } = await supabase
  .from('recorded_ip')
  .insert([
    { ip: ip },
  ])
  .select()
          
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ip: ip });
}
