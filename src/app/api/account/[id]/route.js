import connectToDatabase from "@/lib/mongodb";
import Account from "@/models/accounts";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const account = await Account.findById(params.id);
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
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

export async function PATCH(request, { params }) {
  await connectToDatabase();

  const { accountType, userName } = await request.json();

  try {
    const account = await Account.findByIdAndUpdate(
      params.id,
      { accountType, userName },
      { new: true }
    );
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
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

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const account = await Account.findByIdAndDelete(params.id);
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
    return new Response("Account deleted", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
