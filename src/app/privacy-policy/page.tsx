import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Privacy Policy
        <span className="ml-1 text-neutral-400 dark:text-neutral-500">.</span>
      </h1>

      <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
        Coming soon.
      </p>

      <Link
        href="/"
        className="mt-10 flex w-fit flex-row items-center justify-center gap-1 text-sm text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
      >
        Back to Home
      </Link>
    </div>
  );
}
