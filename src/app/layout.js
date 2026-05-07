import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
