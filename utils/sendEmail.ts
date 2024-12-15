import { EmailConfig } from 'next-auth/providers/email';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { Theme } from '@auth/core/types';

interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: EmailConfig;
  theme: Theme;
}

interface EmailParams {
  url: string;
  host: string;
  theme?: Theme;
}

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
): Promise<void> {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport: Transporter = createTransport(provider.server);

  const mailOptions: SendMailOptions = {
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme })
  };

  const result = await transport.sendMail(mailOptions);
  const failed = result.rejected.concat(result.pending).filter(Boolean);

  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}

function text({ url, host }: EmailParams): string {
  return `Sign in to ${host}\n\nClick the link below to sign in:\n${url}\n\nIf you did not request this email, you can safely ignore it.`;
}

function html({ url, host, theme }: EmailParams): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Sign in to ${host}</h2>
      <p>Click the link below to sign in:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #6366F1; color: #ffffff; text-decoration: none; border-radius: 5px;">Sign In</a>
      <p style="margin-top: 20px;">If you did not request this email, you can safely ignore it.</p>
    </div>
  `;
}
