// app/projects/[categorySlug]/page.js
import Link from 'next/link'
import { getsettings, getProjectsByCategory } from '@/sanity/sanity.utils'
import Layout from '@/app/components/LayoutPage'

export async function generateMetadata({ params }) {
  const { categorySlug } = await params
  const settings = await getsettings()

  const title = `${settings?.siteTitle || ''} | Projects: ${categorySlug}`
  const description = settings?.siteDescription || ''
  const seoImage = settings?.seoImg?.asset?.url || ''
  const pageUrl = `${settings?.siteUrl || ''}/projects/${categorySlug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: settings?.siteTitle || '',
      images: [{ url: seoImage, width: 1200, height: 628 }],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seoImage],
    },
  }
}

export default async function CategoryPage({ params }) {
  // ✅ await params before using its properties
  const { categorySlug } = await params

  const projects = await getProjectsByCategory(categorySlug)

  if (!projects || projects.length === 0) {
    return (
      <Layout>
        <h1 className="text-2xl">
          No projects found for “{categorySlug}”
        </h1>
      </Layout>
    )
  }

  // Group by year
  const byYear = projects.reduce((acc, proj) => {
    const y = proj.year || 'No Year'
    if (!acc[y]) acc[y] = []
    acc[y].push(proj)
    return acc
  }, {})

  // Sort years descending, with “No Year” at the end
  const sortedYears = Object.keys(byYear).sort((a, b) => {
    if (a === 'No Year') return 1
    if (b === 'No Year') return -1
    return b - a
  })

  return (
    <Layout>
      <h2 className="heading">
        {categorySlug}
      </h2>

      {sortedYears.map((year) => (
        <div key={year} className="listContainer">
          <h3 className="text-2xl font-semibold"><Link href={`/projects/${categorySlug}/year/${year}`}>{year}</Link></h3>
          <ul className="projectList">
            {byYear[year].map((proj) => (
              <li key={proj.slug}>
                <Link
                  href={`/projects/${categorySlug}/${proj.slug}`}
                  className="text-cyan-600 hover:underline"
                >
                  {proj.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  )
}
