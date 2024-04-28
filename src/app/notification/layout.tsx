export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <span className="w-full p-6 flex items-center font-semibold text-4xl">
        Notifications
      </span>
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
