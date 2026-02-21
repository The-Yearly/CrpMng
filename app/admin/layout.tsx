import { AdminWrapper } from "./components/adminWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminWrapper>{children}</AdminWrapper>
    </>
  );
}
