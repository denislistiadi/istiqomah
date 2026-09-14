import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from './db';
import { decryptApiKey } from './crypto';
import { logError } from './logger';
import { GeminiPrayerResponse, GeminiModel } from '@/types';

export interface PrayerSearchOptions {
  query: string;
}

export async function searchIslamicPrayer(query: string): Promise<GeminiPrayerResponse> {
  const settings = await db.settings.get('main');
  
  if (!settings?.encryptedApiKey || !settings?.apiKeySalt || !settings?.apiKeyIv) {
    throw new Error('API_KEY_MISSING');
  }

  let decryptedApiKey = '';
  try {
    decryptedApiKey = await decryptApiKey(
      settings.encryptedApiKey,
      settings.apiKeySalt,
      settings.apiKeyIv
    );
  } catch (err) {
    throw new Error('DECRYPTION_FAILED');
  }

  const modelName: GeminiModel = settings.geminiModel || 'gemini-2.0-flash';

  const systemInstruction = `Anda adalah asisten Islami terpercaya yang ahli dalam Al-Quran dan Hadis Shahih.
Tugas Anda adalah memberikan doa atau dzikir shahih/hasan yang relevan dengan kebutuhan pengguna dalam format JSON murni.

Format JSON yang HARUS dikembalikan (tanpa markdown backtick atau teks lain):
{
  "title": "Nama/Judul Doa Singkat",
  "arabic": "Teks Arab dengan harakat lengkap yang benar",
  "latin": "Transliterasi Latin dalam ejaan Indonesia",
  "translation": "Arti doa dalam Bahasa Indonesia yang indah",
  "source": "Sumber rujukan shahih (contoh: HR. Bukhari no. 6306 / QS. Al-Baqarah: 201)",
  "category": "Kategori (contoh: Perlindungan / Rezeki / Ketenangan / Kesehatan)",
  "benefit": "Keutamaan atau waktu terbaik membaca doa ini secara ringkas"
}

Pastikan teks Arab memiliki harakat lengkap. Jangan gunakan em-dash pada seluruh teks penjelasan.`;

  const userPrompt = `Berikan doa/dzikir terbaik yang shahih untuk kebutuhan berikut: "${query.trim()}". Kembalikan HANYA format JSON yang diminta.`;

  try {
    const genAI = new GoogleGenerativeAI(decryptedApiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    // Parse JSON
    const parsed: GeminiPrayerResponse = JSON.parse(responseText);
    
    // Basic validation
    if (!parsed.title || !parsed.arabic || !parsed.translation) {
      throw new Error('INVALID_STRUCTURE');
    }

    return parsed;
  } catch (error: any) {
    logError('Gemini API Error:', error);
    const errorMessage = error?.message || '';

    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('401') || errorMessage.includes('403')) {
      throw new Error('API_KEY_INVALID');
    }
    if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('QUOTA_EXCEEDED');
    }
    if (errorMessage.includes('not found') || errorMessage.includes('is not supported')) {
      throw new Error('MODEL_UNSUPPORTED');
    }

    throw new Error(error?.message || 'UNKNOWN_ERROR');
  } finally {
    // Clear decrypted key reference from local variable
    decryptedApiKey = '';
  }
}
