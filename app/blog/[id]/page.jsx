'use client'
import Layout from "@/components/layout/Layout"
import data from "@/util/blog.json"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BlogDetails() {
    let Router = useParams()
    const [blogPost, setBlogPost] = useState(null)
    const id = Router?.id

    useEffect(() => {
        if (id) {
            const post = data?.find((post) => String(post.id) === String(id))
            setBlogPost(post || null)
        }
    }, [id])

    return (
        <>
            <Layout>
                {blogPost && (
                    <>
                        {blogPost.title}
                    </>
                )}
            </Layout>
        </>
    )
}
