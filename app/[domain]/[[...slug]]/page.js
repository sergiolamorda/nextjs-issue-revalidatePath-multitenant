import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export default async function Page({
  params: {
    domain: domainName,
    slug,
  },
}) {
  console.log('Page render')
  const unestableData = await getUnestableData({ domainName, slug })
  const data = await getData({ domainName, slug })

  return <>
    <div>Page:</div>
    <hr />
    <div>Unestable Cached Data</div>
    <div dangerouslySetInnerHTML={{ __html: unestableData }} />
    <hr />
    <div>Cached Data</div>
    <div dangerouslySetInnerHTML={{ __html: data }} />
  </>

  notFound()
}

const getUnestableData = unstable_cache(async ({ domainName, slug }) => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  return `
    domain: ${domainName} <br>
    slug: ${slug} <br>
    time: ${timestamp} <br>
  `
})

const getData = cache(async ({ domainName, slug }) => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  return `
    domain: ${domainName} <br>
    slug: ${slug} <br>
    time: ${timestamp} <br>
  `
})