// src/app/api/account/route.js

import connectToDatabase from "@/lib/mongodb";
import Account from "@/models/accounts";

export async function POST(request) {
  await connectToDatabase();

  const { accountType, userName } = await request.json();

  const account = new Account({
    accountType,
    userName,
  });

  try {
    await account.save();
    return new Response(JSON.stringify(account), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
