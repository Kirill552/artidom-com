import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const payload = {
        name: data.get('name'),
        company: data.get('company'),
        projectType: data.get('projectType'),
        country: data.get('country'),
        message: data.get('message'),
        receivedAt: new Date().toISOString(),
    };
    // TODO: подключить email (Resend / Nodemailer) или сохранить в Payload CMS
    console.log('[Contact form]', payload);
    return NextResponse.json({ ok: true });
}
