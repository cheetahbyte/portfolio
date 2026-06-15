import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Legal
        <span className="ml-1 text-neutral-400 dark:text-neutral-500">.</span>
      </h1>

      <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
        Information pursuant to sect. 5 German Telemedia Act{" "}
        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          (TMG)
        </span>
      </p>

      <div className="mt-10 space-y-10 text-sm text-neutral-500 dark:text-neutral-400">
        <section className="space-y-1">
          <p className="text-xs uppercase tracking-wider">Address</p>
          <p className="text-neutral-900 dark:text-neutral-100">
            Leonhard Breuer <br />
            c/o COCENTER
            <br />
            Koppoldstr. 1 <br />
            86551 Aichach
          </p>
        </section>

        <section className="space-y-1">
          <p className="text-xs uppercase tracking-wider">Email</p>
          <a
            href="mailto:mail@leob.re"
            className="cursor-pointer text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            mail [at] leob [dot] re
          </a>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 flex w-fit flex-row items-center justify-center gap-1 text-sm text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
      >
        Back to Home
      </Link>
    </div>
  );
}
