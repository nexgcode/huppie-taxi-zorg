import { createClient } from '@supabase/supabase-js';
import type { H3Event } from 'h3';
import { z } from 'zod';
import type { Database, TablesInsert } from '~/types/database.types';

const formTypeSchema = z.enum(['contact', 'ride', 'partner', 'driver']);
const contactSchema = z.object({ name: z.string().trim().min(1), email: z.string().trim().email(), phone: z.string(), message: z.string().trim().min(1) });
const rideSchema = z.object({ first_name: z.string().trim().min(1), last_name: z.string().trim().min(1), birth_date: z.string().date(), email: z.string().trim().email(), phone: z.string().trim().min(1), insurer: z.string().trim().min(1), has_transport_authorisation: z.boolean(), authorisation_number: z.string().trim().min(1).nullable(), contact_consent: z.boolean() }).superRefine((value, ctx) => {
  if (value.has_transport_authorisation && !value.authorisation_number) ctx.addIssue({ code: 'custom', message: 'Machtigingsnummer ontbreekt.' });
  if (value.has_transport_authorisation && value.contact_consent) ctx.addIssue({ code: 'custom', message: 'Ongeldige toestemming.' });
  if (!value.has_transport_authorisation && value.authorisation_number) ctx.addIssue({ code: 'custom', message: 'Ongeldig machtigingsnummer.' });
});
const partnerSchema = z.object({ email: z.string().trim().email(), appointment_date: z.string().date(), appointment_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Ongeldige tijd.') });
const driverSchema = z.object({ name: z.string().trim().min(1), company: z.string().trim().min(1), phone: z.string().trim().min(1), email: z.string().trim().email(), kvk_number: z.string().trim().min(1), tx_certificate: z.boolean(), license_plate: z.string().trim().min(1), vehicle: z.string().trim().min(1) });

const documentTypes = new Set(['driver_license', 'driver_card']);
const permittedContentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function adminClient(event: H3Event) {
  const config = useRuntimeConfig(event);
  const url = config.public.supabase.url;
  const key = config.supabase.secretKey;
  if (!url || !key) throw createError({ statusCode: 503, statusMessage: 'Formulieropslag is niet geconfigureerd.' });
  return createClient<Database>(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function notifyTelegram(event: H3Event, type: string, table: 'contact_submissions' | 'ride_requests' | 'partner_requests' | 'driver_applications', id: string) {
  const config = useRuntimeConfig(event);
  const client = adminClient(event);
  if (!config.telegramBotToken || !config.telegramChatId) return;
  const submittedAt = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Amsterdam' }).format(new Date());
  const text = `Nieuw formulier: ${type}\n${submittedAt}\nhttps://zorg.huppietaxi.nl/admin`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: config.telegramChatId, text }) });
    if (!response.ok) throw new Error(`Telegram antwoordde met ${response.status}.`);
    await client.from(table).update({ telegram_notified_at: new Date().toISOString(), telegram_notification_error: null }).eq('id', id);
  } catch (error) {
    await client.from(table).update({ telegram_notification_error: error instanceof Error ? error.message : 'Telegram-notificatie mislukt.' }).eq('id', id);
  }
}

export default defineEventHandler(async (event) => {
  const contentType = getHeader(event, 'content-type') || '';
  const multipart = contentType.includes('multipart/form-data') ? await readMultipartFormData(event) : undefined;
  const body = multipart ? { type: multipart.find((part) => part.name === 'type')?.data.toString(), payload: multipart.find((part) => part.name === 'payload')?.data.toString() } : await readBody(event);
  const type = formTypeSchema.parse(body.type);
  const payload = typeof body.payload === 'string' ? JSON.parse(body.payload) : body.payload;
  const client = adminClient(event);

  if (type === 'contact') {
    const data = contactSchema.parse(payload) satisfies TablesInsert<'contact_submissions'>;
    const { data: submission, error } = await client.from('contact_submissions').insert(data).select('id').single();
    if (error) throw createError({ statusCode: 500, statusMessage: 'Opslaan van het contactformulier is mislukt.' });
    await notifyTelegram(event, 'contactformulier', 'contact_submissions', submission.id);
    return { id: submission.id };
  }
  if (type === 'ride') {
    const data = rideSchema.parse(payload) satisfies TablesInsert<'ride_requests'>;
    const { data: submission, error } = await client.from('ride_requests').insert(data).select('id').single();
    if (error) throw createError({ statusCode: 500, statusMessage: 'Opslaan van de ritaanvraag is mislukt.' });
    await notifyTelegram(event, 'ritaanvraag', 'ride_requests', submission.id);
    return { id: submission.id };
  }
  if (type === 'partner') {
    const data = partnerSchema.parse(payload) satisfies TablesInsert<'partner_requests'>;
    const { data: submission, error } = await client.from('partner_requests').insert(data).select('id').single();
    if (error) throw createError({ statusCode: 500, statusMessage: 'Opslaan van de partneraanvraag is mislukt.' });
    await notifyTelegram(event, 'partneraanvraag', 'partner_requests', submission.id);
    return { id: submission.id };
  }

  const data = driverSchema.parse(payload) satisfies TablesInsert<'driver_applications'>;
  const documents = (multipart || []).filter((part) => part.filename && documentTypes.has(part.name || ''));
  if (!['driver_license', 'driver_card'].every((required) => documents.some((document) => document.name === required))) throw createError({ statusCode: 400, statusMessage: 'Vereiste documenten ontbreken.' });
  if (documents.some((document) => !document.type || !permittedContentTypes.has(document.type) || document.data.byteLength > 10 * 1024 * 1024)) throw createError({ statusCode: 400, statusMessage: 'Een document is ongeldig of te groot.' });
  const { data: application, error } = await client.from('driver_applications').insert(data).select('id').single();
  if (error) throw createError({ statusCode: 500, statusMessage: 'Opslaan van de chauffeursaanmelding is mislukt.' });
  for (const document of documents) {
    const documentType = document.name as 'driver_license' | 'driver_card';
    const contentType = document.type as string;
    const extension = document.filename?.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'bin';
    const path = `${application.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await client.storage.from('driver-application-documents').upload(path, document.data, { contentType, upsert: false });
    if (uploadError) throw createError({ statusCode: 500, statusMessage: 'Uploaden van een document is mislukt.' });
    const { error: documentError } = await client.from('driver_application_documents').insert({ application_id: application.id, document_type: documentType, object_path: path, original_filename: document.filename || 'document', content_type: contentType, size_bytes: document.data.byteLength });
    if (documentError) throw createError({ statusCode: 500, statusMessage: 'Opslaan van een document is mislukt.' });
  }
  await notifyTelegram(event, 'chauffeursaanmelding', 'driver_applications', application.id);
  return { id: application.id };
});
