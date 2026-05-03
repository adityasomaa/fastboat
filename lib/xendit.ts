// Minimal Xendit Invoice API wrapper.
// https://developers.xendit.co/api-reference/#create-invoice

const BASE = "https://api.xendit.co";

export function isXenditConfigured(): boolean {
  const key = process.env.XENDIT_SECRET_KEY ?? "";
  return key.length > 0 && !key.includes("placeholder");
}

type CreateInvoiceArgs = {
  externalId: string;
  amount: number;
  payerEmail: string;
  description: string;
  successRedirectUrl?: string;
  failureRedirectUrl?: string;
};

export type XenditInvoice = {
  id: string;
  invoice_url: string;
  status: string;
  external_id: string;
  amount: number;
};

export async function createInvoice(args: CreateInvoiceArgs): Promise<XenditInvoice> {
  if (!isXenditConfigured()) {
    // Stub response for local/preview without Xendit creds
    return {
      id: "stub_" + Date.now(),
      invoice_url: "https://checkout-staging.xendit.co/web/STUB_DEMO_LINK",
      status: "PENDING",
      external_id: args.externalId,
      amount: args.amount,
    };
  }
  const auth = Buffer.from((process.env.XENDIT_SECRET_KEY ?? "") + ":").toString("base64");
  const res = await fetch(`${BASE}/v2/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      external_id: args.externalId,
      amount: args.amount,
      payer_email: args.payerEmail,
      description: args.description,
      success_redirect_url: args.successRedirectUrl,
      failure_redirect_url: args.failureRedirectUrl,
      currency: "IDR",
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Xendit error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return {
    id: data.id,
    invoice_url: data.invoice_url,
    status: data.status,
    external_id: data.external_id,
    amount: data.amount,
  };
}
