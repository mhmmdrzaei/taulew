'use client'
import React from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export default function VideoPlayer({ videoEmbed }) {
  // Quick sanity check
  const isVimeo = /vimeo\.com/.test(videoEmbed)
  const isYouTube = /youtu\.?be/.test(videoEmbed)
  if (!isVimeo && !isYouTube) {
    return <p>Unsupported video URL</p>
  }

  return (
    <div className="relative w-full pb-[56.25%]">
      <ReactPlayer
        url={videoEmbed}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        controls
        // Pass Vimeo-specific options here:
        config={{
          vimeo: {
            playerOptions: {
              // hide byline, title, portrait if you like:
              byline: false,
              portrait: false,
              title: false,
            }
          }
        }}
      />
    </div>
  )
}
