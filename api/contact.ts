import type { VercelRequest, VercelResponse } from '@vercel/node';

// POST /api/contact — forwards to adityadxt1910@gmail.com
// Uses RESEND_API_KEY if set (preferred), otherwise falls back to FormSubmit ajax (zero-config, works immediately)

const EMAIL_TO = 'adityadxt1910@gmail.com';
const EMAIL_FROM = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'; // change after verifying domain in Resend

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — allow portfolio origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || 'Portfolio inquiry').trim();
    const message = String(body.message || '').trim();
    const gotcha = String(body._gotcha || '').trim(); // honeypot

    // honeypot — bots fill hidden field
    if (gotcha) return res.status(200).json({ ok: true }); // silently accept

    if (!name || name.length < 2) return res.status(400).json({ ok: false, error: 'Name is required (min 2 chars)' });
    if (!email || !isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Valid email is required' });
    if (!message || message.length < 10) return res.status(400).json({ ok: false, error: 'Message must be at least 10 characters' });
    if (message.length > 5000) return res.status(400).json({ ok: false, error: 'Message too long (max 5000 chars)' });

    const safeSubject = subject.slice(0, 120) || 'Portfolio inquiry';
    const htmlBody = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0F1F3D">
        <h2 style="margin:0 0 8px;color:#0F1F3D">New portfolio message</h2>
        <p style="margin:0 0 16px;color:#555">From <b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;</p>
        <p style="margin:0 0 8px"><b>Subject:</b> ${escapeHtml(safeSubject)}</p>
        <div style="margin:12px 0;padding:16px;background:#FAF7F0;border:1px solid rgba(200,155,60,0.18);border-radius:12px;white-space:pre-wrap">${escapeHtml(message)}</div>
        <p style="font-size:12px;color:#888;margin-top:16px">Sent via aditya-dixit.vercel.app — reply directly to ${escapeHtml(email)}</p>
      </div>
    `.trim();

    const textBody = `New portfolio message\nFrom: ${name} <${email}>\nSubject: ${safeSubject}\n\n${message}\n\n— sent via aditya-dixit.vercel.app (reply to ${email})`;

    // 1) Try Resend if API key is configured (best — you own the sender)
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [EMAIL_TO],
          replyTo: email,
          subject: `${safeSubject} — from ${name}`,
          html: htmlBody,
          text: textBody,
        }),
      });
      const data: any = await r.json().catch(() => ({}));
      if (!r.ok) {
        console.error('Resend error', data);
        return res.status(502).json({ ok: false, error: (data as any)?.message || 'Email provider error (Resend)' });
      }
      return res.status(200).json({ ok: true, id: (data as any).id, via: 'resend' });
    }

    // 2) Fallback: FormSubmit AJAX — zero config, no API key, delivers to adityadxt1910@gmail.com
    // First submission needs you to click confirmation email from FormSubmit — after that all deliver instantly.
    const formRes = await fetch('https://formsubmit.co/ajax/adityadxt1910@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject: `${safeSubject} — from ${name}`,
        message: textBody,
        _subject: `${safeSubject} — from ${name} (portfolio)`,
        _template: 'table',
        _captcha: 'false',
      }),
    });
    const formData: any = await formRes.json().catch(() => ({}));
    if (!formRes.ok) {
      console.error('FormSubmit error', formData);
      return res.status(502).json({ ok: false, error: (formData as any)?.message || 'Email service temporarily unavailable' });
    }
    return res.status(200).json({ ok: true, via: 'formsubmit' });
  } catch (err: any) {
    console.error('contact api error', err);
    return res.status(500).json({ ok: false, error: 'Server error — please email adityadxt1910@gmail.com directly' });
  }
}
