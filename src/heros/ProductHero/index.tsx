import { formatDateTime } from 'src/utilities/formatDateTime'
import React, { Suspense } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Gutter } from '@payloadcms/ui'
import classes from './index.module.scss'
import ProductImages from '@/components/ProductImages'
import Add from '@/components/Add'
import Reviews from '@/components/Recviews'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { id, title, categories, images, price, description, compareAtPrice, layout } = product

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.heroContainer}>
        {/* IMG */}
        <div className={classes.heroImageContainer}>
          <ProductImages items={images} />
        </div>
        {/* TEXTS */}
        <div className={classes.heroTextContainer}>
          <h1 className={classes.heroTitle}>{title}</h1>
          <p className={classes.heroDescription}>{description}</p>

          <div className={classes.heroDivider}></div>

          {!compareAtPrice || price === compareAtPrice ? (
            <h2 className={classes.heroPrice}>Rs. {price}</h2>
          ) : (
            <div className={classes.heroPriceContainer}>
              <h3 className={classes.heroComparePrice}>Rs. {compareAtPrice}</h3>
              <h2 className={classes.heroPrice}>Rs. {price}</h2>
            </div>
          )}

          <div className={classes.heroDivider}></div>

          <Add
            productId={id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={9999}
            product={product}
          />

          <div className={classes.heroDivider}></div>

          <Suspense fallback="Loading...">
            <Reviews productId={id!} />
          </Suspense>

          {layout && <RenderBlocks blocks={layout} />}
        </div>
      </div>
    </Gutter>
  )
}
