const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? "2187825869").replace(/\D/g, "");
const whatsappMessage =
  import.meta.env.VITE_WHATSAPP_MESSAGE ?? "Hi, I'd like to know more about your HRMS solution.";

const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

function WhatsAppLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M20.52 3.48A11.79 11.79 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.61 6.03L0 24l6.13-1.6A11.94 11.94 0 0 0 12 23.9c6.63 0 12-5.37 12-11.99 0-3.19-1.25-6.19-3.48-8.43Zm-8.52 18.48c-1.8 0-3.57-.48-5.08-1.39l-.37-.21-3.65.96.97-3.56-.24-.37A9.9 9.9 0 0 1 2.11 12C2.11 6.48 6.48 2.11 12 2.11c2.65 0 5.13 1.03 7.01 2.91a9.85 9.85 0 0 1 2.89 7.01c0 5.51-4.38 9.93-9.9 9.93Zm5.49-7.47c-.29-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.66.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.79-1.68-2.09-.18-.3-.02-.47.13-.62.14-.14.3-.35.46-.53.15-.18.2-.3.3-.51.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.94-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.94 1.24 3.14c.15.2 2.16 3.29 5.23 4.62.73.31 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.81-.74 2.07-1.46.25-.71.25-1.33.18-1.46-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="whatsapp-button fixed bottom-28 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_rgba(37,211,102,0.32)] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#22c55e] hover:shadow-[0_22px_42px_rgba(37,211,102,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-transparent text-white">
        <WhatsAppLogo />
      </span>
    </a>
  );
}
