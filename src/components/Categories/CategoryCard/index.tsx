'use client'
import React from 'react'
import Link from 'next/link'

import { Category } from '../@/payload-types'
import { useFilter } from '../@/providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()

  return (
    <Link
      href="/products"
      className={classes.card}
      style={{ backgroundImage: `url(${media?.url})` }}
      onClick={() => setCategoryFilters([category.id])}
    >
      <h6 className={classes.title}>{category.title}</h6>
    </Link>
  )
}

export default CategoryCard