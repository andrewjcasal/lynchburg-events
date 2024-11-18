import type { Metadata } from "next";
import AmplitudeContextProvider from "./context/amplitude-context";

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
        <AmplitudeContextProvider>
          <div id="root">{children}</div>
          <script type="module" src="/src/main.tsx"></script>
        </AmplitudeContextProvider>
      </body>
    </html>
  );
}
