import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ScrolltoEnd = () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, index) => ({
        id: items.length + index + 1,
        title: `Item ${items.length + index + 1}`,
      }))
      setItems([...items, ...newItems])
      if (items.length + newItems.length >= 100) {
        setHasMore(false)
      }
    }, 1500)
  }

  useEffect(() => {
    fetchMoreData()
  }, [])

  const ItemSkeleton = () => (
    <div style={{ margin: '20px 0' }}>
      <Skeleton width={`${Math.floor(Math.random() * 200) + 100}px`} />
    </div>
  )

  return (
    <div>
      <h1>무한 스크롤 예제</h1>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </>
        }
        endMessage={<p>모든 데이터를 불러왔습니다.</p>}
      >
        {items.map((item) => (
          <div key={item.id} style={{ margin: '20px 0' }}>
            <h3>{item.title}</h3>
            <p>아이템 내용...</p>
          </div>
        ))}
      </InfiniteScroll>
      {items.length === 0 && (
        <>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </>
      )}
    </div>
  )
}

export default ScrolltoEnd
