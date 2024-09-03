const SearchFail = ({ previousSearchTag }: { previousSearchTag: string }) => (
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
)

export default SearchFail
