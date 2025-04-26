/**
 * Loading spinner component
 */
export function LoadingSpinner() {
  return (
    <div className="flex justify-center p-4">
      <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
    </div>
  );
}
