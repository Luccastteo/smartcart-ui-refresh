import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN")

serve(async (req) => {
    // CORS check
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const { amount, email, description } = await req.json()

        if (!MERCADO_PAGO_ACCESS_TOKEN) {
            throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not set")
        }

        const response = await fetch("https://api.mercadopago.com/v1/payments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
                "X-Idempotency-Key": crypto.randomUUID(),
            },
            body: JSON.stringify({
                transaction_amount: amount,
                payment_method_id: "pix",
                description: description || "PAGLY Shopping Cart",
                payer: {
                    email: email,
                },
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return new Response(JSON.stringify({ error: data.message }), {
                status: response.status,
                headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
            })
        }

        // Extract relevant PIX data
        const pixData = {
            id: data.id,
            status: data.status,
            qr_code: data.point_of_interaction?.transaction_data?.qr_code,
            qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64,
        }

        return new Response(JSON.stringify(pixData), {
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        })
    }
})
