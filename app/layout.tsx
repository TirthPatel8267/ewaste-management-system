import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import "leaflet/dist/leaflet.css";
export const metadata = {
  title: "E-Waste Management System",
  description: "Modern E-Waste Management Platform",
};

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}