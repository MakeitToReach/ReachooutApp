export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Reachpage Missing
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like this page isn&apos;t live yet. The owner may still be working on
          it. Head back to the <a href="https://reachoout.com" className="text-orange-500">Reachoout.com</a> to explore more.
        </p>
      </div>
    </div>
  );
}
