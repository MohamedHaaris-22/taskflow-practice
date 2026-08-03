"use client";

import { CSSProperties, FormEvent, useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  status: string;
  tone: "high" | "progress" | "done";
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Design onboarding flow", status: "High", tone: "high", completed: false },
  { id: 2, title: "Build dashboard widgets", status: "In progress", tone: "progress", completed: false },
  { id: 3, title: "Review API integration", status: "Done", tone: "done", completed: true },
];

const faqs = [
  {
    question: "Is TaskFlow free to try?",
    answer: "Yes. The Starter plan is free forever and does not require a credit card.",
  },
  {
    question: "Can I use it with my team?",
    answer: "Yes. Invite teammates, assign work, add due dates, and follow progress from one workspace.",
  },
  {
    question: "Can I cancel a paid plan?",
    answer: "You can change or cancel your plan at any time from the workspace settings.",
  },
];

const plans = [
  { name: "Starter", price: "$0", text: "For personal projects", features: ["Up to 3 projects", "Basic task tracking", "1 workspace"] },
  { name: "Team", price: "$12", text: "For growing teams", features: ["Unlimited projects", "Team collaboration", "Progress reports"], popular: true },
  { name: "Business", price: "$24", text: "For larger companies", features: ["Everything in Team", "Advanced permissions", "Priority support"] },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const [submitted, setSubmitted] = useState(false);

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  useEffect(() => {
    if (!demoOpen) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDemoOpen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [demoOpen]);

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const goToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="TaskFlow home">
            <span className="brand-mark" aria-hidden="true"><i /></span>
            <span>TaskFlow</span>
          </a>

          <nav className={mobileOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
            <button className="mobile-login" type="button">Log in</button>
          </nav>

          <div className="nav-actions">
            <button className="login-button" type="button">Log in</button>
            <button className="button button-primary button-small" type="button" onClick={goToPricing}>Start free</button>
          </div>

          <button
            className={mobileOpen ? "menu-button active" : "menu-button"}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Make room for what matters</p>
            <h1>Plan less.<br />Achieve more.</h1>
            <p className="hero-text">Bring tasks, priorities, and progress into one calm workspace—so your team can focus on doing great work.</p>
            <div className="hero-buttons">
              <button className="button button-primary" type="button" onClick={goToPricing}>Start for free</button>
              <button className="button button-outline" type="button" onClick={() => setDemoOpen(true)}>
                <span className="play" aria-hidden="true">▶</span> Watch demo
              </button>
            </div>
            <p className="microcopy">Free forever <span>•</span> No credit card</p>
          </div>

          <div className="dashboard-shell" aria-label="Interactive TaskFlow dashboard preview">
            <aside className="dashboard-sidebar">
              <span className="mini-logo" aria-hidden="true">✓</span>
              <button className="side-item active" type="button"><span>⌂</span> Today</button>
              <button className="side-item" type="button"><span>☑</span> My tasks</button>
              <button className="side-item" type="button"><span>□</span> Projects</button>
              <button className="side-item" type="button"><span>▣</span> Calendar</button>
              <button className="side-item" type="button"><span>▱</span> Inbox</button>
              <div className="side-bottom">
                <button className="side-item" type="button"><span>♙</span> Team</button>
                <button className="side-item" type="button"><span>⚙</span> Settings</button>
              </div>
            </aside>

            <div className="dashboard-main">
              <div className="dashboard-top">
                <h2>Today</h2>
                <div className="user-tools"><span aria-label="Notifications">♢</span><b>AK</b></div>
              </div>

              <div className="progress-card">
                <div className="progress-copy">
                  <span>Progress</span><strong>{progress}%</strong>
                  <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
                </div>
                <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}><span>{completedCount}/{tasks.length}</span></div>
              </div>

              <div className="task-list">
                {tasks.map((task) => (
                  <button
                    className={task.completed ? "task-row completed" : "task-row"}
                    type="button"
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    aria-label={`${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`}
                  >
                    <span className="checkbox">{task.completed ? "✓" : ""}</span>
                    <span className="task-title">{task.title}</span>
                    <span className={`status ${task.tone}`}>{task.completed ? "Done" : task.status}</span>
                    <span className="arrow">›</span>
                  </button>
                ))}
              </div>

              <div className="team-note">
                <span className="note-star" aria-hidden="true">☆</span>
                <p><strong>Team note</strong><br />Good momentum! Let&apos;s aim to ship the dashboard by end of week.</p>
                <span aria-hidden="true">♡</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container benefit-strip" aria-label="Key benefits">
          <div><span>✓</span><p><strong>Stay organized</strong>Everything in one place.</p></div>
          <div><span>♙</span><p><strong>Work better together</strong>Share, assign, and collaborate.</p></div>
          <div><span>↗</span><p><strong>See progress</strong>Track what matters, celebrate wins.</p></div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Everything in one place</p>
            <h2>A calmer way to get work done</h2>
            <p>Simple tools that help your team stay clear, focused, and moving forward.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card coral"><span>☑</span><h3>Smart task planning</h3><p>Turn big goals into clear tasks with priorities, owners, and due dates.</p></article>
            <article className="feature-card yellow"><span>♙</span><h3>Team collaboration</h3><p>Share updates, assign work, and keep every conversation connected.</p></article>
            <article className="feature-card green"><span>↗</span><h3>Visual progress</h3><p>Use simple reports to spot blockers and celebrate steady progress.</p></article>
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container how-grid">
          <div className="section-heading align-left">
            <p className="eyebrow">How it works</p>
            <h2>From idea to done in three simple steps</h2>
            <p>No complicated setup. Create a workspace and start making progress in minutes.</p>
            <button className="text-link" type="button" onClick={() => setDemoOpen(true)}>See TaskFlow in action <span>→</span></button>
          </div>
          <ol className="steps">
            <li><span>01</span><div><h3>Create a project</h3><p>Choose a goal and add the work that needs to happen.</p></div></li>
            <li><span>02</span><div><h3>Invite your team</h3><p>Assign tasks and give everyone a clear next step.</p></div></li>
            <li><span>03</span><div><h3>Track progress</h3><p>Complete work and watch the project move forward.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Simple pricing</p>
            <h2>Start small. Grow when you&apos;re ready.</h2>
            <p>Every plan includes a 14-day trial. No hidden charges.</p>
          </div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article className={plan.popular ? "price-card popular" : "price-card"} key={plan.name}>
                {plan.popular && <span className="popular-label">Most popular</span>}
                <h3>{plan.name}</h3>
                <p>{plan.text}</p>
                <div className="price"><strong>{plan.price}</strong><span>/ month</span></div>
                <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                <button
                  className={plan.popular ? "button button-primary full" : "button button-outline full"}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {selectedPlan === plan.name ? "Selected ✓" : `Choose ${plan.name}`}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="container quote-card">
          <div className="quote-mark">“</div>
          <blockquote>TaskFlow removed the noise from project management. Our team now knows exactly what matters every morning.</blockquote>
          <div className="quote-person"><span>NM</span><p><strong>Nina Morgan</strong>Product Lead at Northstar</p></div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="section-heading align-left"><p className="eyebrow">Questions, answered</p><h2>Frequently asked questions</h2><p>Everything you need to know before getting started.</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq.question}>
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  {faq.question}<span>{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p>{faq.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-card">
          <div><p className="eyebrow">Ready when you are</p><h2>Make today feel more manageable.</h2><p>Join thousands of teams doing their best work with TaskFlow.</p></div>
          {submitted ? (
            <div className="success-message" role="status"><span>✓</span><strong>You&apos;re on the list!</strong><p>We&apos;ll send your workspace invite shortly.</p></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Work email</label>
              <div><input id="email" name="email" type="email" placeholder="you@company.com" required /><button className="button button-primary" type="submit">Start free</button></div>
              <small>By signing up, you agree to our Terms and Privacy Policy.</small>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><a className="brand" href="#top"><span className="brand-mark"><i /></span><span>TaskFlow</span></a><p>Clear work. Calm teams. Better days.</p></div>
          <div><strong>Product</strong><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#how-it-works">How it works</a></div>
          <div><strong>Company</strong><a href="#top">About</a><a href="#top">Careers</a><a href="#top">Contact</a></div>
          <div><strong>Resources</strong><a href="#faq">Help center</a><a href="#top">Blog</a><a href="#top">Privacy</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 TaskFlow. All rights reserved.</span><span>Made for focused teams.</span></div>
      </footer>

      {demoOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setDemoOpen(false)}>
          <div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close demo" onClick={() => setDemoOpen(false)}>×</button>
            <span className="demo-icon">▶</span>
            <p className="eyebrow">60-second tour</p>
            <h2 id="demo-title">See how TaskFlow keeps work moving</h2>
            <div className="demo-steps"><span><b>1</b>Add a task</span><span><b>2</b>Assign your team</span><span><b>3</b>Celebrate progress</span></div>
            <button className="button button-primary full" type="button" onClick={() => { setDemoOpen(false); goToPricing(); }}>Try TaskFlow free</button>
          </div>
        </div>
      )}
    </main>
  );
}
