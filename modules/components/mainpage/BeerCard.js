import React from 'react'
import styles from '../../../styles/Home.module.css'
import stylesMain from '../../../styles/Main.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function BeerCard(props) {
    const data = props
    const name = data?.beer?.name

    return (
        <>

            <div className={stylesMain.card}>
                <Image
                    src={data?.beer?.image_url}
                    width={85}
                    height={333}
                />
                <div className={styles.textBold25}>{data?.beer?.name}</div>
                <div className={styles.textLight20}>{data?.beer?.tagline}</div>
                <Link href={'/beer/' + data?.beer?.name?.replace(/\s+/g, '')}>
                    <div className={`${styles.textLight20} ${styles.textLight16} ${stylesMain.button}`} >Tap to see more</div>
                </Link>
            </div>
        </>
    )
}