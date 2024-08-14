import connectToDatabase from "@/lib/mongodb";
import Account from "@/models/accounts";

export async function POST(request, { params }) {
  await connectToDatabase();
  const { targetAccountId, amount } = await request.json();

  if (targetAccountId === params.id)
    return new Response("Target and source accounts cannot be the same", {
      status: 400,
    });

  try {
    const account = await Account.findById(params.id);
    const targetAccount = await Account.findById(targetAccountId);

    if (!account || !targetAccount) {
      return new Response("Account(s) not found", { status: 404 });
    }

    if (account.balance < amount) {
      return new Response("Insufficient balance", { status: 400 });
    }

    // Deduct from source account
    account.balance -= amount;
    account.transactions.push({
      type: "Transfer",
      amount,
      description: "Funds Transfer to " + targetAccount.userName,
      targetAccount: targetAccountId,
    });

    // Add to target account
    targetAccount.balance += amount;
    targetAccount.transactions.push({
      type: "Transfer",
      amount,
      description: "Funds Transfer from " + account.userName,
      targetAccount: params.id,
    });

    await account.save();
    await targetAccount.save();

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
