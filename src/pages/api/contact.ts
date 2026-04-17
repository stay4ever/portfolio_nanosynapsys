import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString().trim() ?? '';
  const email = data.get('email')?.toString().trim() ?? '';
  const subject = data.get('subject')?.toString().trim() ?? '';
  const message = data.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Connect an email service here.
  // Option A — Resend (recommended): https://resend.com
  //   import { Resend } from 'resend';
  //   const resend = new Resend(import.meta.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'contact@nano-synapsys.com',
  //     to: 'hello@nano-synapsys.com',
  //     subject: `[nano-synapsys.com] ${subject || 'New contact'}`,
  //     text: `From: ${name} <${email}>\n\n${message}`,
  //   });
  //
  // Option B — Nodemailer with SMTP:
  //   import nodemailer from 'nodemailer';
  //   ...

  console.log('[Contact]', {
    name,
    email,
    subject,
    message: message.slice(0, 120),
    timestamp: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
