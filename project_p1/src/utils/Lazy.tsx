
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
    LANDING_PAGE: lazy(() => import('../pages/Landing/Landing'))
}

export default LAZY