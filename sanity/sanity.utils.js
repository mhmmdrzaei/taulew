import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// Site Settings Query
export async function getsettings() {
  return createClient(clientConfig).fetch(groq`
    *[_type == "settings"][0]{
      siteTitle,
      siteDescription,
      seoImg { asset->{url} },
      subTitle,

      mainHeadingMenu[]->{
        _type,
        _id,
        title,
        slug,

      },

    }
  `);
}

export async function getPage(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  content[]{
     _type == 'gallery' => {
      _type,
      _key,
        slideImages[]{
        
        asset->{
          url
        },
        caption,
        altText
      },
          
        

    },
    _type == 'video' => {
      _type,
      _key,
      videoEmbed
      
    },
},
    textinfo[]{
    ...
    },


  meta_title,
  meta_description,
  ogImage {
    asset->{
      url
    }
  }
}
`,
    { slug }
  );
}

// Page Query by Slug
export async function getProject(slug) {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "project" && slug.current == $slug][0] {
  title,
  slug,
  year, 
  order,
  categories[]->{
    _id,
    title,
    slug
  },
  content[]{
     _type == 'gallery' => {
      _type,
      _key,
        slideImages[]{
        _key,
        
        asset->{
          url
        },
        caption,
        altText
      },  

    },
    _type == 'video' => {
      _type,
      _key,
      videoEmbed
      
    },
},
    textinfo[]{
    ...
    },

  meta_title,
  meta_description,
  ogImage {
    asset->{
      url
    }
  }
}

  `,
    { slug }
  );
}

export async function getProjectsByCategory(categorySlug) {
  return createClient(clientConfig).fetch(
    groq`
      *[
        _type == "project" && $categorySlug in categories[]->slug.current
      ]
      | order(
    year desc,
    coalesce(order, 9999) asc,   // missing → 9999 → sorted after real numbers
    title asc
  )
      {
        title,
        "slug": slug.current,
        year,
        order,
        categories[]-> {
          _id,
          title,
          "slug": slug.current
        },  
      }
    `,
    { categorySlug }
  );
}
export async function getProjectsByCategoryAndYear(categorySlug, year) {
  return createClient(clientConfig).fetch(
    groq`
      *[
        _type == "project" &&
        $categorySlug in categories[]->slug.current &&
        year == $year
      ]
      | order(order asc, title asc)
      {
        title,
        "slug": slug.current,
        year,
        order,
                content[]{ 
             _type == 'gallery' => {
      _type,
      _key,
        slideImages[]{
        _key,
        asset->{
          url
        },
        caption,
        altText
      },  

    },
    _type == 'video' => {
      _type,
      _key,
      videoEmbed
      
    },
        
        },    
        textinfo[]{ ... },
      }
    `,
    { categorySlug, year: parseInt(year, 10) }
  );
}
export async function getProjectByCategoryAndSlug(categorySlug, projectSlug) {
  return createClient(clientConfig).fetch(
    groq`
      *[
        _type == "project" &&
        slug.current == $projectSlug &&
        $categorySlug in categories[]->slug.current
      ][0] {
        title,
        "slug": slug.current,
        year,
        order,
        categories[]-> {
          _id,
          title,
          "slug": slug.current
        },
        content[]{ 
        
             _type == 'gallery' => {
      _type,
      _key,
        slideImages[]{
        _key,
        asset->{
          url
        },
        caption,
        altText
      },  

    },
    _type == 'video' => {
      _type,
      _key,
      videoEmbed
      
    },
        
        },
        textinfo[]{ ... },
        meta_title,
        meta_description,
        "ogImage": ogImage.asset->url
      }
    `,
    { categorySlug, projectSlug }
  );
}
export async function getCategory() {
  return createClient(clientConfig).fetch(
    groq`
*[_type == "category"] {
  _id,
  title,
  slug,
  projects[]->{
    title,
    slug,
    year,
    order,
    categories[]->{
      _id,
      title,
      slug
    }
  }
}  

`
  );
}
