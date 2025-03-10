import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

const isPrivateIP = (ip: string) => {
    return /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|127\.)/.test(ip);
};

export async function GET(req: NextRequest & { ip?: string }) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "Unknown IP";

  const forwarded = req.headers.get("x-forwarded-for")?.split(",").map(ip => ip.trim());
  // const ip = forwarded ? forwarded.split(",").at(0)?.trim() : req.ip ;
  const publicIP = forwarded?.find(ip => !isPrivateIP(ip)) || req.ip;

  const supabase = createClient("https://vltihetrproitvikpwko.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdGloZXRycHJvaXR2aWtwd2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1OTQwMzksImV4cCI6MjA1NzE3MDAzOX0.qwYnGX5erDHpEQB5BY2WcKJW5ftp1Q_vpgDoH0K4xDc')

  const { data, error } = await supabase
  .from('recorded_ip')
  .insert([
    { ip: publicIP },
  ])
  .select()

  console.log(publicIP, req.ip, req.headers.get("x-forwarded-for"))
          
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ip: publicIP });
}
