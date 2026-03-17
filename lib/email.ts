import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@tononkira.com";

export async function sendVerificationEmail({
  to,
  verificationLink,
}: {
  to: string;
  verificationLink: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Vérifiez votre adresse email — Tononkira",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h1 style="font-size: 24px; color: #1a1a1a;">Bienvenue sur Tononkira</h1>
          <p style="color: #555; line-height: 1.6;">
            Cliquez sur le bouton ci-dessous pour vérifier votre adresse email et activer votre compte.
          </p>
          <a href="${verificationLink}"
             style="display: inline-block; background: #8b4513; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
            Vérifier mon email
          </a>
          <p style="color: #999; font-size: 13px;">
            Si vous n'avez pas créé de compte, ignorez cet email.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

export async function sendPasswordResetEmail({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Réinitialisation de mot de passe — Tononkira",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h1 style="font-size: 24px; color: #1a1a1a;">Réinitialiser votre mot de passe</h1>
          <p style="color: #555; line-height: 1.6;">
            Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.
          </p>
          <a href="${resetLink}"
             style="display: inline-block; background: #8b4513; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
            Réinitialiser le mot de passe
          </a>
          <p style="color: #999; font-size: 13px;">
            Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
}
