

import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./Reactquery/ReactqueryProvider";
import Nav from "./components/Nav";
import CartProvider from "./context/Cart";
import MoveProvider from "./context/ausmovecontext";




export const metadata = {
  title: "SH-Ecommerce",
  description: "exercitationem. Recusandae nam fuga impedit ipsa necessitatibus. Perferendis consequuntur est maiores",
};



export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/svg/heart.svg" type="image/png" />
      </head>

      <body className="font-inter " >
        <ReactQueryProvider>

          <MoveProvider>

            <CartProvider>

              {children}

            </CartProvider>

          </MoveProvider>

        </ReactQueryProvider>
      </body>
    </html>
  );
}
