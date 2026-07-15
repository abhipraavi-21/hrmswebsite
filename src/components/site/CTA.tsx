export default function CTA() {
  return (
    <section id="trial" className="py-20 bg-white scroll-mt-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#0a4fda] p-10 md:p-16 text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-success/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Ready to simplify HR and business communication?
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Join thousands of growing businesses already running their teams and campaigns on one
              platform.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="/company/book-demo"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-primary-soft transition-colors"
              >
                Book Free Demo
              </a>
              <a href="/pricing" className="btn-success">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
