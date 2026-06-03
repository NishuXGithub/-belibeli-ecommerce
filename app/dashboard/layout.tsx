import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="ml-[50px] min-h-screen">
        <Navbar />

        <main className="pl-5 pr-2 pt-2 pb-5">
          {children}
        </main>
      </div>
    </div>
  );
}