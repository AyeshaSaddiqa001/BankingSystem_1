// src/app/api/account/[id]/deposit/route.js
import connectToDatabase from "@/lib/mongodb";
import Account from "@/models/accounts";

export async function POST(request, { params }) {
  await connectToDatabase();
  const { amount } = await request.json();

  try {
    const account = await Account.findById(params.id);
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }

    account.balance += Number(amount);
    account.transactions.push({
      type: "Deposit",
      amount,
      description: "Cash Deposit",
    });

    await account.save();
    return new Response(JSON.stringify(account), {
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
