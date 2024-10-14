'use client';

import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

export default function CustomBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  // Function to determine link color based on the URL
  const getLinkColor = (value: string) => {
    if ( pathnames.includes('products') || pathnames.includes('productDetails') || pathnames.includes("seller")) {
      return 'text-white';
    }
    return 'text-black'; // Default color for other links
  };

  // Determine if any of the pathnames match the special keywords
  const shouldApplyWhiteColor = () => {
    return pathnames.includes('seller') || pathnames.includes('products') || pathnames.includes('productDetails');
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" separator=">" className={`macan font-[400] text-sm  ${shouldApplyWhiteColor() ? 'text-white' : ''}`}>
      {/* Home link */}
      <Link
        underline="hover"
        color="inherit"
        component={NextLink}
        href="/"
        className={getLinkColor('home')} // Apply the appropriate color
      >
        Source Arabia
      </Link>

      {/* Map over pathnames to create breadcrumb links */}
      {pathnames.map((value, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // Replace %20 with space in the breadcrumb text
        const breadcrumbText = decodeURIComponent(value).replace(/-/g, ' ');

        return isLast ? (
          <Typography 
            color="textPrimary" 
            className={`macan font-[400] text-sm  ${getLinkColor(value)}`} 
            key={href}
          >
            {breadcrumbText.charAt(0).toUpperCase() + breadcrumbText.slice(1)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            component={NextLink}
            href={href}
            className={getLinkColor(value)}
            key={href}
          >
            {breadcrumbText.charAt(0).toUpperCase() + breadcrumbText.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
