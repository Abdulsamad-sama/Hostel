import VerifyPaymentClient from "./Verify-payment-client";

export default async function VerifyPaymentPage(props: {
  params: Promise<{ reference: string }>;
}) {
  const params = await props.params;

  return <VerifyPaymentClient reference={params.reference} />;
}
