import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Home.module.css'
import stylesHeader from '../../../styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
    const [beers, setBeers] = useState([])
    const [searchBox, setSearchBox] = useState()
    const [pages, setPages] = useState(1)
    const [finds, setFinds] = useState([])
    const [tempSearch, setTempSearch] = useState('')

    async function searchBeer() {
        const rray = await fetch(`https://api.punkapi.com/v2/beers?page=${pages}&per_page=30`)
        const data = JSON.stringify(await rray.json())
        setBeers(JSON.parse(data))
        searchSome()
    }

    function searchSome() {
        if (searchBox) {
            beers?.forEach(el => {
                if (el?.name?.toLowerCase().includes(searchBox?.toLowerCase())) {

                    if (!finds?.includes(el)) {
                        setFinds(finds => [...finds, el])
                    }
                }
            });
            if (finds.length < 6) setPages(pages + 1)
        }

    }

    useEffect(() => {
        setFinds(finds => [])
        setPages(1)
        setTempSearch(searchBox)
    }, [searchBox])

    useEffect(() => {
        if (pages < 12 && searchBox) { searchBeer() }
    }, [pages, tempSearch])



    return (
        <>
            <div className={stylesHeader.header}>
                <Link href='/'>
                    <div className={stylesHeader.logo} onClick={() => window.scrollTo(0, 0)}>
                        <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M109.555 23.8865C109.555 14.4208 101.854 6.72 92.3887 6.72C90.7528 6.72 88.6851 6.85576 86.668 7.36259C83.3487 2.90785 77.8272 0 72.2294 0C68.5798 0 65.0565 1.16563 62.1494 3.27515C59.2427 1.16563 55.7194 0 52.0702 0C46.2134 0 40.8551 2.98667 37.7293 7.73177C35.8773 7.06467 33.9141 6.71962 31.9109 6.71962C22.4452 6.71962 14.7444 14.4208 14.7444 23.8862C14.7444 31.6613 19.942 38.2418 27.044 40.346V43.048H18.4713C9.63426 43.048 2.44476 50.7394 2.44476 60.193V76.4059C2.44476 85.8595 9.63426 93.5505 18.4713 93.5505H27.0437V94.8553C27.0437 104.309 34.7347 112 44.1883 112H78.8506C88.3039 112 95.9953 104.309 95.9953 94.8553V40.6688C103.735 39.0069 109.555 32.1142 109.555 23.8865ZM18.4713 86.0967C13.7443 86.0967 9.89899 81.7498 9.89899 76.4063V60.1934C9.89899 54.8498 13.7443 50.503 18.4713 50.503H27.0437V86.0971H18.4713V86.0967ZM78.851 104.546H44.1887C38.8451 104.546 34.4983 100.199 34.4983 94.8553V40.8551C35.602 40.6877 36.6836 40.4177 37.7293 40.0409C40.8551 44.7857 46.2134 47.7731 52.0702 47.7731C58.8505 47.7731 64.7258 43.8214 67.513 38.1007C70.9635 40.2061 75.2248 41.0531 78.9491 41.0531C81.2637 41.0531 83.5516 40.5832 85.6687 39.6823C86.5967 40.0775 87.5591 40.3841 88.5411 40.6104V94.8557C88.5415 100.199 84.1946 104.546 78.851 104.546ZM92.3883 33.5989C90.6838 33.5989 89.0061 33.149 87.5361 32.2979C86.3807 31.6293 84.9567 31.6293 83.8016 32.2979C82.3313 33.149 80.6532 33.5989 78.9494 33.5989C74.9691 33.5989 70.3205 32.1987 68.9056 29.0706C68.1824 27.4709 66.4413 26.5915 64.7243 26.963C63.0081 27.3325 61.7825 28.8504 61.7825 30.6062C61.7825 35.9614 57.4254 40.3185 52.0702 40.3185C47.9511 40.3185 44.2679 37.7074 42.9047 33.8214C42.5227 32.733 41.6591 31.8827 40.5647 31.5188C40.1805 31.3905 39.7834 31.3279 39.3882 31.3279C38.6573 31.3279 37.9333 31.5425 37.3115 31.96C35.7125 33.0321 33.8451 33.5992 31.9109 33.5992C26.5553 33.5992 22.1986 29.2422 22.1986 23.8869C22.1986 18.5313 26.5553 14.1742 31.9109 14.1742C33.8455 14.1742 35.7125 14.741 37.3111 15.8139C38.2689 16.4561 39.4696 16.6194 40.5647 16.2551C41.6587 15.8908 42.5227 15.0404 42.9047 13.9525C44.2675 10.066 47.9511 7.45498 52.0702 7.45498C54.8536 7.45498 57.5084 8.6553 59.3547 10.7479C60.0622 11.55 61.08 12.0096 62.1494 12.0096C63.2189 12.0096 64.2367 11.55 64.9445 10.7479C66.7908 8.65492 69.446 7.45498 72.2291 7.45498C76.0623 7.45498 80.1241 10.0449 81.6767 13.4796C82.1111 14.4393 82.9305 15.1705 83.9332 15.4926C84.9363 15.8139 86.0288 15.6973 86.9403 15.1698C88.0165 14.5468 90.0533 14.1742 92.3879 14.1742C97.7436 14.1742 102.101 18.5313 102.101 23.8869C102.101 29.2418 97.7439 33.5989 92.3883 33.5989Z" fill="black" />
                            <path d="M76.8939 49.1982C74.8356 49.1982 73.1669 50.8672 73.1669 52.9251V89.824C73.1669 91.8822 74.8356 93.5509 76.8939 93.5509C78.9525 93.5509 80.6212 91.8822 80.6212 89.824V52.9251C80.6212 50.8672 78.9525 49.1982 76.8939 49.1982Z" fill="black" />
                            <path d="M61.5196 49.1982C59.4614 49.1982 57.7927 50.8672 57.7927 52.9251V89.824C57.7927 91.8822 59.4614 93.5509 61.5196 93.5509C63.5783 93.5509 65.2469 91.8822 65.2469 89.824V52.9251C65.2466 50.8672 63.5783 49.1982 61.5196 49.1982Z" fill="black" />
                            <path d="M46.1451 49.1982C44.0869 49.1982 42.4182 50.8672 42.4182 52.9251V89.824C42.4182 91.8822 44.0869 93.5509 46.1451 93.5509C48.2037 93.5509 49.8724 91.8822 49.8724 89.824V52.9251C49.8724 50.8672 48.2037 49.1982 46.1451 49.1982Z" fill="black" />
                        </svg>
                        <div className={stylesHeader.logoText}>
                            <div className={styles.textBold48}>
                                Beer Market
                            </div>
                            <div className={styles.textBold25} style={{ marginTop: '-5px' }}>drink & chill</div>
                        </div>
                    </div></Link>
                <div className={stylesHeader.searchBox}>
                    <input type='text' className={`${stylesHeader.searchItem} ${styles.textBold25} ${styles.textLight25}`} placeholder='search your favorite' onChange={e => setSearchBox(e.target.value)} />

                    <div className={stylesHeader.resultList} style={finds?.length?{visibility:'visible'}:{visibility:'hidden'}}>
                        {finds?.map(find =>
                            <Link href={{
                                pathname: '/beer/' + find?.name?.replace(/\s+/g, ''),
                                query: find
                            }}>
                                <div className={`${styles.textLight25} ${styles.textBold25} ${stylesHeader.findItem}`}>{find?.name}</div>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}