import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">You&apos;re offline</h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>It seems you&apos;re currently offline. Some features might be limited until you reconnect.</p>
        </div>
        <p className="text-gray-600 mb-8">
          You can still access previously visited pages and features that have been cached.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}