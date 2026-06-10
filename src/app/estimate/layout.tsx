import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Free Estimate | Resendiz Landscaping",
  description:
    "Get a free landscaping estimate in Northern Virginia. Select your service and property size to request a quote via WhatsApp.",
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
