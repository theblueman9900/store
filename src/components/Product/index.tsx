'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

import type { Product } from '@/payload-types'
import { Media } from '@/components/Media'

export const ProductCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Product
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, title, description, images, priceJSON } = doc || {}
  const metaImage = images?.[0] ?? ''

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const [price, setPrice] = useState<any>({})
  const [showDescription, setShowDescription] = useState<any>(false)

  useEffect(() => {
    // setPrice(priceFromJSON(priceJSON))
    setPrice({ currency: 'Rs.' })
  }, [priceJSON])
  return (
    <>
      <article
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className="relative w-full ">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage?.image} size="360px" />
          )}
        </div>
        <div className="p-4">
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {description && showDescription && (
            <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
          )}
          <div className="flex justify-between flex-col ">
            {doc?.compareAtPrice && doc.compareAtPrice != doc.price && doc.compareAtPrice > 0 && (
              <span className="line-through text-sm">
                {price?.currency} {doc?.compareAtPrice?.toFixed(2)}
              </span>
            )}

            <div className="flex justify-between">
              <span className="text-lg font-semibold">
                {price?.currency} {doc?.price?.toFixed(2)}
              </span>
              {doc?.compareAtPrice && doc.compareAtPrice != doc.price && (
                <div
                  className="border py-1 px-2 border-border rounded-lg overflow-hidden bg-card"
                  style={{
                    borderRadius: '1rem',
                  }}
                >
                  Sale
                </div>
              )}
            </div>
          </div>
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          {categoryTitle}
                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </Fragment>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
