

import React, { useEffect, useRef, useState } from 'react'

interface ISliderProps {
  children: React.ReactNode
}

const Slider = (props: ISliderProps) => {
  const [selected,setSelected] = useState(0)
  const parent = useRef<HTMLDivElement>(null)
  const child = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (child.current != null && parent.current != null) {
      // parent.current.style.height = child.current.clientHeight + 'px'
    }
  }, [child])
  return (
    <div ref={parent} className='d-flex position-relative' style={{ height:100, display: 'flow-root', overflowX: 'hidden' }}>
      <div ref={child} className='d-flex slider-cont' style={{ left: '-' + selected * 100 + '%' }}>
        {
          React.Children.map(props.children,(child, index) => 
            <div className='page'>
              {child}
            </div>
          )
        }
      </div>
      <div className='mt-4'>
      <button onClick={() => {setSelected(selected + 1)}}>Next</button>
      <button onClick={() => {setSelected(selected - 1)}}>Prev</button>
      </div>

    </div>
  )
}

export default Slider