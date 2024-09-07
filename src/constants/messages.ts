import { MAX_TAG_COUNT, MAX_TAG_LENGTH } from '@/hooks/useTags'

export const MESSAGES = {
  LOGIN: {
    FAIL: '아이디 또는 비밀번호를 입력해주세요.',
  },
  RESET_PASSWORD: {
    SUCCESS: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
    FAIL: '비밀번호 재설정 링크 전송에 실패했습니다. 다시 시도해주세요.',
  },
  COMMNET_OVER: '댓글은 최대 400자까지 입력할 수 있습니다.',
  CREATE_PL: {
    TAG_FAIL: '유효하지 않은 태그입니다.',
    TAG_SPACE_FAIL: '태그에는 공백을 포함할 수 없습니다.',
    TAG_COUNT_FAIL: `태그는 최대 ${MAX_TAG_COUNT}개까지 입력 가능합니다.`,
    TAG_LENGTH_FAIL: `태그는 최대 ${MAX_TAG_LENGTH - 1}자까지 가능합니다.`,
    YOUTUBE: '유효한 유튜브 링크를 입력하세요.',
  },
}
