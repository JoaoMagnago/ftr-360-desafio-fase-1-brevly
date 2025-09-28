export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-dvh flex items-center justify-center px-3">
      {children}
    </main>
  );
};
