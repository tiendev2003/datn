export default function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg font-medium text-gray-700">Đang tải...</p>
            </div>
        </div>
    );
}
