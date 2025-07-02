import { defineField, defineType } from "sanity";
import { VideoIcon } from "lucide-react";

export default defineType({
  name: "video",
  type: "object",
  title: "Video Embed",
  icon: VideoIcon,
  fields: [
      defineField({
        name: "videoEmbed",
        title: "Video url",
        type: "url",
        description: "Put your link here",
  
      }),
  ],
    preview: {

  prepare({  }) {
    return {
      title: 'Video'
    };
  },
}
});
