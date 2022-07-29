import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BeerCard from './BeerCard'
import styles from '../../../styles/Home.module.css'
import stylesMain from '../../../styles/Main.module.css'

export default function Mainpage() {
    const [pages, setPages] = useState(1)
    const [beers, setBeers] = useState([])
    const beerArray = []

    const getBeer = async () => {
        const rray = await fetch(`https://api.punkapi.com/v2/beers?page=${pages}&per_page=6`)
        const data = await rray.json()
        // console.log(data);
        setBeers(data)
    }


    useEffect(() => {
        getBeer()
    }, [pages])
    return (
        <>

            <div className='container'>
                <div className='row'>
                    <div className={stylesMain.cardField}>
                        {beers?.map(beer =>
                            <BeerCard beer={beer} />
                        )}
                    </div>
                </div>
                <div className={stylesMain.paginationMenu}>
                    <div className={styles.textLight20} onClick={() => setPages(pages > 1 ? pages - 1 : 1)}>Prev</div>
                    {pages > 1 ? <div className={styles.textBold25} onClick={() => setPages(pages > 1 ? pages - 1 : 1)}>{pages - 1}</div> : ''}
                    <div className={styles.textBold25}>{pages}</div>
                    <div className={styles.textBold25} onClick={() => setPages(pages + 1)}>{pages + 1}</div>
                    <div className={styles.textLight20} onClick={() => setPages(pages < 41 ? pages + 1 : 41)}>Next</div>
                </div>


            </div>

        </>
    )
}