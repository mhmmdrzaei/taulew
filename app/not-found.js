"use client"
// app/not-found.js
import Link from 'next/link'
import Layout from './components/LayoutPage'
export default function NotFound() {
  return (
    <Layout>
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/">
          <button>Go back to home</button>
        </Link>
      </div>
      <style jsx>{`
        .not-found {
          text-align: center;
          padding: 3rem 0;
        }
        button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>
    </Layout>
  )
}