
import React, { lazy, Suspense } from 'react'
import { JsxElement } from 'typescript'

interface FallbackProps {
    children: React.FC
}

const Fallback = (props: FallbackProps) => {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <props.children />
        </Suspense>
    )
}

const LAZY = {
    LANDING_PAGE: lazy(() => import('../pages/Landing/Landing')),
    SEARCH_PAGE: lazy(() => import('../pages/Search/Search')),
    SEARCH_FLIGHTS: lazy(() => import('../pages/Search/flight_search/FlightSearch')),
    SEARCH_HOTELS: lazy(() => import('../pages/Search/hotel_search/HotelSearch'))
}

export {LAZY , Fallback}