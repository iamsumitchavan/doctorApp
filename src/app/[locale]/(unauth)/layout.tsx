import { unstable_setRequestLocale } from 'next-intl/server';

// import { DemoBanner } from "@/components/DemoBanner";
// import { BaseTemplate } from "@/templates/BaseTemplate";
// import Link from "next/link";

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations("RootLayout");

  return (
    <>
      {/* <DemoBanner />
      <BaseTemplate
        leftNav={
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("home_link")}
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("about_link")}
              </Link>
            </li>
            <li>
              <Link
                href="/counter/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("counter_link")}
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("portfolio_link")}
              </Link>
            </li>
            <li>
              <a
                className="border-none text-gray-700 hover:text-gray-900"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
          </>
        }
        rightNav={
          <>
            <li>
              <Link
                href="/sign-in/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("sign_in_link")}
              </Link>
            </li>

            <li>
              <Link
                // href="/sign-up/"
                href="/sign-up"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("sign_up_link")}
              </Link>
            </li>

            <li>
              <LocaleSwitcher />
            </li>
          </>
        }
      > */}
      <div className="">{props.children}</div>
    </>
  );
}
