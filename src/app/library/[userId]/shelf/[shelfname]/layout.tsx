export default async function ShelfLayout({library, children}: {library: React.ReactNode, children: React.ReactNode}) {
  return (
    <>
      {library}
      {children}
    </>
  )
}