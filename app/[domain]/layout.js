

export const dynamic = 'force-static'

export default async function Layout({
  params: {
    domain: domainName,
  },
  children,
}) {

  return (
    <html>
      <head>
      </head>
      <body>
        <div>Domain: {domainName}</div>
        <main>{children}</main>
      </body>
    </html>
  )
}