



export const metadata = {
  title: 'Scholarship Selector',
  description: 'AI-powered applicant selection tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}
