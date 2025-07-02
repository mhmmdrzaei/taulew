// app/projects/[categorySlug]/year/[year]/page.js

import Link from 'next/link'
import { PortableText } from 'next-sanity'
import {
  getProjectsByCategoryAndYear,
  getsettings
} from '@/sanity/sanity.utils'
import Layout from '@/app/components/LayoutPage'
import PhotoGallery from '@/app/components/PhotoGallery'
import VideoItem from '@/app/components/VideoItem'

export async function generateMetadata({ params }) {
  // ✅ await params before destructuring
  const { categorySlug, year } = await params
  const settings = await getsettings()

  const title = `${settings.siteTitle} | ${categorySlug} • ${year}`
  const description = settings.siteDescription || ''
  const seoImage = settings.seoImg?.asset?.url || ''
  const pageUrl = `${settings.siteUrl}/projects/${categorySlug}/year/${year}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: settings.siteTitle,
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

export default async function YearPage({ params }) {
  // ✅ same pattern for the page component
  const { categorySlug, year } = await params
  const projects = await getProjectsByCategoryAndYear(categorySlug, year)

  if (!projects?.length) {
    return (
      <Layout>
        <h1 className="text-2xl">
          No projects found for “{categorySlug}” in {year}
        </h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        {categorySlug} — {year}
      </h1>

      {projects.map((proj) => (
        <section key={proj.slug} className="mb-12">
          {/* Title (links to detail page) */}
          <h2 className="text-2xl font-semibold mb-3">
            <Link
              href={`/projects/${categorySlug}/${proj.slug}`}
              className="text-cyan-600 hover:underline"
            >
              {proj.title}
            </Link>
          </h2>

          {/* Gallery blocks */}
          {proj.content
            ?.filter((b) => b._type === 'gallery')
            .map((g) => (
              <PhotoGallery key={g._key} slideImages={g.slideImages} />
            ))}

          {/* Video blocks */}
          {proj.content
            ?.filter((b) => b._type === 'video')
            .map((v) => (
              <VideoItem key={v._key} {...v} />
            ))}

          {/* Rich text */}
          {proj.textinfo && (
            <div className="mt-4 prose max-w-none">
              <PortableText value={proj.textinfo} />
            </div>
          )}
        </section>
      ))}
    </Layout>
  )
}
