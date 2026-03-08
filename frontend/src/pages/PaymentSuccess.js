function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-4">Thank you for upgrading your inventory system.</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
