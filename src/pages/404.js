import * as React from "react"
import { Link } from "gatsby"
import "../components/index.css"

export default function NotFoundPage() {
  return(
    <div className="container">
      <p>The page you are looking for does note exist... <Link to="/">Go Home</Link></p>
    </div>
  )
}