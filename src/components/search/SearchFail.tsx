import styled from '@emotion/styled'
import { fontSize, fontWeight } from '@/styles/font'

const SearchFail = ({ previousSearchTag }: { previousSearchTag: string }) => (
  <Container>
    <div className="search-fail">
      <h3 className="fail-title">검색 태그 : {previousSearchTag}</h3>
      <div className="fail-text">
        죄송합니다.
        <br />
        &quot;{previousSearchTag}&quot; 에 <br />
        해당하는 플레이리스트를 <br />
        찾을 수 없습니다.
      </div>
    </div>
  </Container>
)

export default SearchFail
const Container = styled.div`
  .search-fail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(80vh - 100px);
    min-height: 300px;
    text-align: center;
  }
  .fail-title {
    padding: 15% 0;
    font-size: ${fontSize.xl};
  }
  .fail-text {
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.medium};
    line-height: 2;
  }
`
