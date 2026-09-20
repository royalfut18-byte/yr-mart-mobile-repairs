export function LoginForm({ failed }: { failed: boolean }) {
  return (
    <div className="card mx-auto max-w-md p-8 sm:p-10">
      <h1 className="font-display text-2xl font-bold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Add and remove the products shown on the website.
      </p>

      {failed ? (
        <p
          role="alert"
          className="mt-6 rounded-2xl bg-ember/10 px-4 py-3 text-sm font-medium text-ember"
        >
          That username or password was not right.
        </p>
      ) : null}

      <form method="POST" action="/api/admin/login" className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            autoFocus
            className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 text-base text-ink outline-none focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 text-base text-ink outline-none focus:border-brand"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-4 font-display text-base font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
