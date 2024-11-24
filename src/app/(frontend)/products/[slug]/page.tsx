import type { Metadata } from 'next'

import { RelatedProducts } from '@/blocks/RelatedProducts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import type { Product } from '@/payload-types'

import { ProductHero } from '@/heros/ProductHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { Blocks } from '@/components/Blocks'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />
  const { relatedProducts, layout } = product

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <ProductHero product={product} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          {/* <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={product.content}
            enableGutter={false}
          /> */}
        </div>

        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <RelatedProducts
            className="mt-12"
            docs={product.relatedProducts.filter((product) => typeof product === 'object')}
          />
        )}
      </div>
    </article>
  )
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
