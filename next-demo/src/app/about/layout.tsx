"use client"
import React, { ReactNode } from 'react'
import { PageProps } from '../global'
import { usePathname } from 'next/navigation'
import NextLogo from '../../../public/next.svg'
import Image from 'next/image'
import '@/app/about/about.css'


const layout = (params: PageProps) => {
    const activeRoute = usePathname().split('/').at(-1)
    const routes = ["contact-us", "appointment"]
    const isActive = (pathname: string) => activeRoute === pathname
    return (
        <React.Fragment>
            <header>
                <title>About Us</title>
                <div className='d-flex navbar justify-content-between w-100' style={{ padding: '10px 16px' }}>
                    <div>
                        <Image priority height={30} src={NextLogo as any} alt='logo' />
                    </div>
                    <div>
                        <nav className='d-flex'>
                            {
                                Object.values(routes).map((route: string) => {
                                    return (
                                        <div className='nav-cont p-2'>
                                            <span className='nav-link'>{route}</span>
                                            <div className='underline'></div>
                                        </div>
                                    )
                                })
                            }
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                <section>
                    {params.children}
                </section>
            </main>
            <footer>

            </footer>
        </React.Fragment>
    )
}

export default layout