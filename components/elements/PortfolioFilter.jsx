'use client'
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function PortfolioFilter() {
    const isotope = useRef(null)
    const [filterKey, setFilterKey] = useState("*")
    const [isClient, setIsClient] = useState(false)

    // Initialize isotope on client-side only
    useEffect(() => {
        setIsClient(true)
        if (typeof window !== 'undefined') {
            const initIsotope = async () => {
                const Isotope = (await import('isotope-layout')).default
                const timeout = setTimeout(() => {
                    isotope.current = new Isotope(".masonry-active", {
                        itemSelector: ".filter-item",
                        percentPosition: true,
                        transitionDuration: '0.7s',
                        masonry: {
                            columnWidth: ".filter-item",
                        },
                        animationOptions: {
                            duration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    })
                }, 1000)
                return () => clearTimeout(timeout)
            }
            initIsotope()
        }
    }, [])

    // Handle filter changes with animation
    useEffect(() => {
        if (isotope.current) {
            const filterValue = filterKey === "*" ? "*" : `.${filterKey}`
            isotope.current.arrange({ 
                filter: filterValue,
                transitionDuration: '0.7s'
            })
        }
    }, [filterKey])

    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    }, [])

    const activeBtn = useCallback((value) => (
        value === filterKey 
            ? "active btn btn-md btn-filter mb-2 me-2 text-uppercase" 
            : "btn btn-md btn-filter mb-2 me-2 text-uppercase"
    ), [filterKey])

    const portfolioItems = [
        {
            image: "/assets/imgs/projects/projects-1/img-1.png",
            title: "Photo App UI/UX",
            company: "Bokeh network",
            categories: ["brand", "ui", "app"]
        },
        {
            image: "/assets/imgs/projects/projects-1/img-2.png",
            title: "Mobile App Design",
            company: "Tech Innovators Inc.",
            categories: ["webdesign", "brand", "dataanalysis"]
        },
        {
            image: "/assets/imgs/projects/projects-1/img-3.png",
            title: "Interaction Design",
            company: "HealthTrack Solutions",
            categories: ["ui", "app"]
        },
        {
            image: "/assets/imgs/projects/projects-1/img-4.png",
            title: "Design Consultation",
            company: "Creative Pulse Studios",
            categories: ["app", "dataanalysis", "brand"]
        }
    ]

    return (
        <div className="container">
            <div className="text-start">
                <div className="button-group filter-button-group filter-menu-active">
                    {[
                        { key: "*", label: "All Projects" },
                        { key: "brand", label: "Branding" },
                        { key: "webdesign", label: "Web Design" },
                        { key: "ui", label: "UI/UX" },
                        { key: "app", label: "App Dev" }
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            className={activeBtn(key)}
                            onClick={handleFilterKeyChange(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="row masonry-active justify-content-between mt-6">
                <div className="grid-sizer" />
                {portfolioItems.map((item, index) => (
                    <div 
                        key={index}
                        className={`filter-item col-lg-6 col-12 ${item.categories.join(' ')}`}
                    >
                        <div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
                            <Link href="/work-single">
                                <img 
                                    className="rounded-3 w-100 zoom-img" 
                                    src={item.image} 
                                    alt={item.title}
                                />
                            </Link>
                            <div className="d-flex align-items-center mt-4">
                                <Link href="/work-single" className="project-card-content">
                                    <h3 className="fw-semibold">{item.title}</h3>
                                    <p>{item.company}</p>
                                </Link>
                                <Link href="/work-single" className="project-card-icon icon-shape ms-auto icon-md rounded-circle">
                                    <i className="ri-arrow-right-up-line" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
