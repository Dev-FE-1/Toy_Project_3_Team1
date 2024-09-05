import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import { fontSize } from '@/constants/font'
import { X } from 'lucide-react'

interface TagListProps {
  tags: string[]
  onTagDelete: (id: number) => void
}

const TagList = ({ tags, onTagDelete }: TagListProps) => {
  return (
    <Container>
      <div className="container-tag">
        {tags.map((t, idx) => (
          <span key={idx} className="tag">
            {t}
            <div className="btn-tagdelete" onClick={() => onTagDelete(idx)}>
              <X size={18} />
            </div>
          </span>
        ))}
      </div>
    </Container>
  )
}

export default TagList

const Container = styled.div`
  .tag {
    background-color: ${colors.lightPurPle};
    color: ${colors.primaryPurple};
  }

  .btn-tagdelete {
    border: none !important;
    cursor: pointer;
    margin-top: 4px;
    margin-left: 2px;
  }

  .container-tag {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 100%;
    white-space: nowrap;
  }

  .tag {
    border-radius: 20px;
    padding: 5px 10px;
    font-size: ${fontSize.sm};
    display: flex;
    align-items: center;
    flex-shrink: 0;

    @media (min-width: 400px) {
      font-size: ${fontSize.sm};
    }
  }
`
