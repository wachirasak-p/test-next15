export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto">{children}</div>;
}
