"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const rewriteString = (str: string) => str.replace(/[-\s]+/g, "_").toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setOutput(rewriteString(value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">String Converter</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter text here"
        className="border p-2 rounded w-80"
      />
      <p className="mt-4 text-lg font-mono bg-gray-100 p-2 rounded text-black">{output || "Output will appear here..."}</p>
    </div>
  );
}
