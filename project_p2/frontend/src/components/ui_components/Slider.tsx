

import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface ISliderProps {
  children: React.ReactNode,
  currentPage: number,
  style?: CSSProperties
}

const Slider = (props: ISliderProps) => {
  const parent = useRef<HTMLDivElement>(null)
  const child = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (child.current != null && parent.current != null) {
        parent.current.style.height = (document.getElementsByClassName('page')[props.currentPage].clientHeight + 18).toString() + 'px';
    }
  }, [child, child.current, props.currentPage])
  // useEffect(() => {
  //   if (child.current != null && parent.current != null) {
  //     console.log(child.current.clientHeight)
  //     parent.current.style.height = child.current.clientHeight.toString() + 'px'
  //   }
  // }, [child, child.current?.clientHeight])
  // useLayoutEffect(() => {
  //   console.log("Test",child.current?.clientHeight)

  // },[])
  return (
    <div ref={parent} className='d-flex flex-column position-relative w-100' style={{ overflow: 'hidden', backgroundColor: 'white', transition: '0.4s height ease-in-out' }}>
      <div ref={child} className='d-flex w-100  flex-row slider-cont' style={{ left: '-' + props.currentPage * 100 + '%' }}>
        {
          React.Children.map(props.children, (child, index) => {

            return (
              <div className='page'>
                {child}
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Slider