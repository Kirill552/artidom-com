interface ContactData {
  name: string
  phone?: string
  email?: string
  company?: string
  projectType?: string
  country?: string
  message?: string
}

export function formatTelegramMessage(data: ContactData): string {
  let text = `🌍 Заявка с artidom.art\n\n`
  text += `👤 Имя: ${data.name}\n`
  if (data.phone) text += `📞 Телефон: ${data.phone}\n`
  if (data.email) text += `📧 Email: ${data.email}\n`
  if (data.company) text += `🏢 Компания: ${data.company}\n`
  if (data.projectType) text += `📋 Тип проекта: ${data.projectType}\n`
  if (data.country) text += `🌐 Страна: ${data.country}\n`
  if (data.message) text += `💬 Сообщение: ${data.message}\n`
  return text
}

export async function sendToTelegram(data: ContactData): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured')
    return false
  }

  const text = formatTelegramMessage(data)

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  )

  return res.ok
}
