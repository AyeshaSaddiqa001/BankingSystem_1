// src/app/api/account/[id]/withdraw/route.js
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

    if (account.balance < amount) {
      return new Response("Insufficient balance", { status: 400 });
    }

    account.balance -= Number(amount);
    account.transactions.push({
      type: "Withdrawal",
      amount,
      description: "Cash Withdrawal",
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
