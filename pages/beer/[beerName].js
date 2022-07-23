import React from 'react'
import Header from '../../modules/components/globals/Header'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import stylesMain from '../../styles/Main.module.css'
import stylesBeer from '../../styles/Beer.module.css'
import { useRouter } from 'next/router'

export default function BeerName() {
    const router = useRouter()
    const query = router.query
    console.log(query);
    return (
        <>
            <Head>
                <title>Beer Name</title>
                <meta name="description" content="Generated by remixrty" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <link rel="icon" href="/beer_ico.png" />
            </Head>
            <main>
                <Header />
                <div className='container'>
                    <div className='row'>
                        <div className={stylesBeer.content}>
                            <div className={styles.textBold95}>
                                {query?.name}
                            </div>
                            <div className={stylesBeer.mainContent}>
                                <div className={stylesBeer.additional}>
                                    <div className={styles.textBold25}>
                                        Alcohol by volume: {query.abv}%
                                    </div>
                                    <div className={styles.textBold25}>
                                        Bitterness: {query.ibu / 10}/12
                                    </div>
                                </div>
                                <div className={stylesBeer.imageBeer}>
                                    <Image
                                        src={query.image_url}
                                        width={134}
                                        height={525}
                                    />
                                </div>
                                <div className={stylesBeer.additional}>
                                    <div className={styles.textBold25}>
                                        First brewed: {query.first_brewed}
                                    </div>
                                    <div className={styles.textBold25}>
                                        {query.tagline}
                                    </div>
                                </div>
                            </div>
                            <div className={stylesBeer.descriptional}>
                                <div className={styles.textBold95}>
                                    Description
                                </div>
                                <div className={styles.textBold31}>
                                    {query.description}
                                </div>
                                <div className={styles.textBold95}>
                                    Food pairing
                                </div>
                                <div className={styles.textBold31}>
                                    {query.food_pairing?.map(food =>
                                        <div key={food}>{food}</div>
                                    )}
                                </div>
                                <div className={styles.textBold95}>
                                    Brewers tips
                                </div>
                                <div className={styles.textBold31}>
                                    {query.brewers_tips}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}