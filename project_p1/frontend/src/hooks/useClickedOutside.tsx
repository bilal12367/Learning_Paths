

import React, { MouseEvent, useEffect } from 'react'

const useClickedOutside = (ref: React.RefObject<HTMLDivElement>, handleClickOutside: () => void) => {

    useEffect(() => {

        if (ref.current) {
            const clickedOutside = (e: any) => {
                if (ref.current && !ref.current.contains(e.target))
                    handleClickOutside();
            }

            document.addEventListener("mousedown", clickedOutside);
            return () => {
                document.removeEventListener("mousedown", clickedOutside);
            }
        }
    }, [ref])

}

export default useClickedOutside