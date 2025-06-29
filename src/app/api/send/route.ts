import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Instancia o Resend com a chave da API do arquivo .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Obtém os dados do corpo da requisição
  const { email, subject, message } = await request.json();

  try {
    // Tenta enviar o email
    const { data, error } = await resend.emails.send({
      // Substitua por seu email verificado no Resend
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      // O email para onde você quer receber as mensagens
      to: ['renanmvc421@icloud.com'], 
      subject: subject,
      // O corpo do email em formato HTML
      html: `<p>Nova mensagem de <strong>${email}</strong>!</p><p><strong>Assunto:</strong> ${subject}</p><p>${message}</p>`,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Erro ao enviar o email.' }, { status: 500 });
    }

    console.log({ data });
    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocorreu um erro inesperado.' }, { status: 500 });
  }
}