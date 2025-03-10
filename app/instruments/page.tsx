"use client";
import { useEffect, useState } from 'react';

// import { createClient } from '@/utils/supabase/server';
// import { useEffect } from 'react';

// export default async function Instruments() {
//   const supabase = await createClient();
//   const { data: instruments } = await supabase.from("instruments").select();

//   return <pre>{JSON.stringify(instruments, null, 2)}</pre>
// }

export default function Page() {
    const [ip, setIp] = useState<string | null>(null);

    useEffect(() => {
      fetch("/api/get-ip")
        .then((res) => res.json())
        .then((data) => setIp(data.ip))
        .catch((err) => console.error("Error fetching IP:", err));
    }, []);
  
    return (
      <div>
        <h1>Your Public IP:</h1>
        <p>{ip || "Fetching..."}</p>
      </div>
    );
}