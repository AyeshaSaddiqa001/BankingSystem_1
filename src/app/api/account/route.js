// src/app/api/account/route.js

import connectToDatabase from "@/lib/mongodb";
import Account from "@/models/accounts";

export async function POST(request) {
  await connectToDatabase();

  const { accountType, userName } = await request.json();

  const existingAccount = await Account.find({ userName: userName });
  console.log(existingAccount);

  if (existingAccount.length > 0) {
    return new Response(JSON.stringify({ error: "Account Already Exists!" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

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

export async function GET(request) {
  await connectToDatabase();

  try {
    const accounts = await Account.find();
    if (!accounts) {
      return new Response("Accounts not found", { status: 404 });
    }
    return new Response(JSON.stringify(accounts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
