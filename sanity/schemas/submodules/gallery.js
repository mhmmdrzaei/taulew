import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "gallery",
  type: "object",
  title: "Image Gallery",
  icon: Images,
  fields: [
    defineField({
      name: 'slideImages',
      type: 'array',
      of: [
        defineField({
        name: "slideImage",
        title: "slide Image",
        type: "image",
        fields: [
          defineField({
            name: 'caption',
            type: 'string',
          }),
          defineField({
            name: 'altText',
            title: "Alt Text",
            type: 'string',
          })
        ]
      
    })
      ]
  
    
    })
  ],
  preview: {

  prepare({   }) {
    return {
      title: 'Gallery',

    };
  },
}
});
