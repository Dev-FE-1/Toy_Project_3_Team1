import styled from '@emotion/styled'
import { fontSize, fontWeight } from '@/styles/font'
import { colors } from '@/styles/colors'

const SearchFail = ({ previousSearchTag }: { previousSearchTag: string }) => (
  <Container>
    <div className="search-fail">
      <div className="fail-title">
        {' '}
        &quot;{previousSearchTag}&quot; 에 대한 검색된 플레이리스트를 찾을 수 없습니다. <br />{' '}
      </div>
      <ul className="fail-text">
        <li>단어의 철자가 정확한지 확인해 주세요.</li>
        <li>검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.</li>
        <li>보다 일반적인 검색어로 다시 검색해 보세요.</li>
      </ul>
    </div>
  </Container>
)

export default SearchFail
const Container = styled.div`
  .search-fail {
    display: flex;
    flex-direction: column;
    height: calc(80vh - 100px);
    min-height: 300px;
    color: ${colors.darkGray};
  }
  .fail-title {
    padding: 5% 0;
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.medium};
  }
  .fail-text {
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.regular};
    line-height: 1.7;
    list-style-type: disc;
    padding: 0 30px;
  }
`
