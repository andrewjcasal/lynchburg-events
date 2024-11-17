import type { Metadata } from "next";
import * as amplitude from "@amplitude/analytics-browser";

amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string, {
  autocapture: true,
});

// eslint-disable-next-line
export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  );
}
