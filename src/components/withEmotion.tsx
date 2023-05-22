/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CacheProvider, css } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'

const memoizedCreateCacheWithContainer = weakMemoize(
  (container: any) => {
    const newCache = createCache({
      container,
      key: 'with-emotion'
    })
    return newCache
  }
)

export const WithEmotion = ({
  children,
  title,
  ...props
}) => {
  const [contentRef, setContentRef] = useState(null)
  const doc = contentRef?.contentWindow?.document
  const mountNode = doc?.body
  const insertionTarget = doc?.head

  return (
    <iframe style={{boxShadow: "-10px 10px black"}} width={380} height={600} title={title} {...props} ref={setContentRef}>
      {mountNode &&
        insertionTarget &&
        createPortal(
          <CacheProvider
            value={memoizedCreateCacheWithContainer(
              insertionTarget
            )}
          >
            {children}
          </CacheProvider>,
          mountNode
        )}
    </iframe>
  )
}
