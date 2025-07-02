import { getPage, getsettings } from "@/sanity/sanity.utils";
import Layout from "@/app/components/LayoutPage";
import VideoItem from "@/app/components/VideoItem";
import PhotoGallery from "@/app/components/PhotoGallery";
import { PortableText } from "next-sanity";
const componentMap = {
  gallery: PhotoGallery,
  video: VideoItem,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const settings = await getsettings();
  const page = await getPage(slug);

  const title = `${settings?.siteTitle || ""} | ${page?.meta_title ? `${page.meta_title}` : `${page?.title}`}`;
  const description = page?.meta_description || settings?.siteDescription || "";

  const fallbackImage = settings?.seoImg?.asset?.url || "";
  const seoImage = page?.ogImage?.asset?.url || fallbackImage;
  const pageUrl = `${settings.siteUrl}/${slug}`


  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: settings?.siteTitle || "",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 628,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImage],
    },
  };
}

// This function handles fetching page content based on slug
export default async function Page({ params }) {
  const { slug } = await params;
  const pageData = await getPage(slug);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const { content, title, textinfo } = pageData;
  return (
    <Layout>
      
      {content &&
      content.map(block => {
  if (block._type === 'gallery') {
    return (
      <PhotoGallery
        key={block._key}
        slideImages={block.slideImages}
      />
    )
  }
  if (block._type === 'video') {
    return (
      <VideoItem
        key={block._key}
        {...block}          // or pass in block.videoEmbed, etc.
      />
    )
  }
  return null
})
        }
        {textinfo && 
        <div className="textInfo">
           <PortableText value={textinfo}/>

        </div>
       
        }

    </Layout>
  );
}
