import { resizeContactPhotos, ContactPhotoError } from './resizeContactPhotos';

type FormConfig = { apiUrl: string; apiToken: string; subject: string; ui: Record<string, string> };

export function initContactForm(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#mlp-contact-dialog');
  const form = document.querySelector<HTMLFormElement>('#mlp-contact-form');
  const status = document.querySelector<HTMLElement>('#mlp-contact-status');
  if (!dialog || !form || !status || form.dataset.ready) return;
  form.dataset.ready = 'true';
  const config: FormConfig = JSON.parse(form.dataset.config || '{}');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const close = dialog.querySelector<HTMLButtonElement>('[data-mlp-contact-close]')!;
  let pending = false;
  let opener: HTMLElement | null = null;
  const report = (key: string) => {
    status.textContent = config.ui[key];
    status.hidden = false;
    status.focus();
  };
  document.querySelectorAll<HTMLElement>('[data-mlp-contact-open]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      status.hidden = true;
      dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', event => { if (pending) event.preventDefault(); });
  // Preserve drafts on accidental dismissal; reset only after confirmed delivery.
  dialog.addEventListener('close', () => opener?.focus());
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('website')) return;
    if (!config.apiUrl.startsWith('https://') || !config.apiToken || config.apiToken.includes('your_')) {
      report('errorConfig');
      return;
    }
    const field = (name: string) => String(data.get(name) || '').trim();
    pending = true;
    submit.disabled = close.disabled = true;
    form.setAttribute('aria-busy', 'true');
    report('sending');
    try {
      const photos = data.getAll('photos').filter((value): value is File => value instanceof File && value.size > 0);
      const attachments = await resizeContactPhotos(photos);
      const response = await fetch(config.apiUrl, {
        method: 'POST', signal: AbortSignal.timeout(25000),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiToken}` },
        body: JSON.stringify({
          from_email: field('email'), from_name: field('name'), subject: config.subject,
          message: field('message'),
          fields: { nom: field('name'), email: field('email'), téléphone: field('phone'),
            commune: field('city'), prestation: field('service'), surface_m2: field('surface'),
            période: field('timeline'), message: field('message'), privacy_acknowledged: true },
          attachments,
        }),
      });
      if (!response.ok) { report('error'); return; }
      form.reset();
      report('success');
    } catch (error) {
      report(error instanceof ContactPhotoError ? 'errorPhotos' : 'errorNetwork');
    } finally {
      pending = false;
      submit.disabled = close.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}
