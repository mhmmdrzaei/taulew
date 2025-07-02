import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "textTile",
  type: "object",
  title: "Text",
  icon: TextQuote,
  fields: [
      defineField({
        name: "slideText",
        title: "text info",
        type: 'array', 
        of: [{type: 'block'}]
      }),
  ],
});
