import { Mulish } from "next/font/google";
import "../../globals.css";
const mulish = Mulish({ subsets: ["latin"], weight: "600" });

export const metadata = {
  title: {
    default: "Register",
  },
  description: "Generated by create next app",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
