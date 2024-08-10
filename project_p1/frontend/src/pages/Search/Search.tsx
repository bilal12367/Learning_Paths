import React from 'react'
import './styles.css'
import Button from '../../components/Button'
const Search = () => {
    return (
        <div className='w-100 d-flex flex-column'>
            <div className='bg-img'>
                <img style={{ height: 600, width: '100%' }} src='https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg3.jpg' />
            </div>
            <div className='std-padding'>
                <div className='header'>
                    <Button style={{ backgroundColor: '#2892D7', fontWeight: 'bold', borderRadius: 3, color: 'white', padding: '0.8rem 4rem' }}>
                        Test
                    </Button>
                </div>

                <div className='w-100 d-flex' style={{ height: 350, marginTop: 100, position: 'relative', backgroundColor: 'white', borderRadius: 8 }}>
                    <div className='w-100 d-flex justify-content-center ' >
                        <div className='shadow-sm p-3 mb-5 bg-white rounded' style={{ backgroundColor: 'white', height: 100, borderRadius: 8, position: 'absolute', width: '80%', top: -50 }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search